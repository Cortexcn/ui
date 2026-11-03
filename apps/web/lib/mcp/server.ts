import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { mdxToMarkdown } from "@/lib/llms";
import {
  type CatalogItem,
  categoryCounts,
  findItem,
  getCatalog,
  installPlan,
  pinnedItemUrl,
  pinnedRevisions,
  REGISTRY_ITEM_URL,
  REVISION_RE,
} from "@/lib/mcp/catalog";
import { searchItems } from "@/lib/mcp/search";
import { DOCS_URL } from "@/lib/site-url";

const SERVER_VERSION = "1.1.0";

const KINDS = ["component", "block", "chart", "hook", "lib"] as const;
const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const SHADCN: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "npx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

/** "lanyard-3d@39d534c092c8": an item name with a kept revision. */
const PINNED_NAME_RE = /^(.+)@([0-9a-f]{12})$/;

const INSTRUCTIONS = `Cortexcn is a registry of React and Tailwind CSS components, page blocks, and charts, installed with the shadcn CLI. The code is copied into the user's project, so there is no runtime package. This server is read-only: it never writes files or installs anything.

How to work with it:
1. Find what fits with search_items, or browse with list_items and list_categories.
2. Read get_item before using an item. It gives the item's license, author, and revision, every file, registry item, and npm package the install adds, including what its dependencies add, the commands, and its docs with usage and props.
3. Run the preview command from get_item or get_install_command first, in the user's project root. It uses the shadcn CLI's --dry-run, which writes nothing and lists every file and package for that project. Then run the install command. The project needs shadcn set up first; get_setup_guide explains how.
4. Every revision of an item stays at a fixed URL. To install one the user already reviewed, pass name@revision to get_install_command.
5. Before writing new UI around Cortexcn pieces, read get_design_guide so the result matches the Cortexcn look.
Never invent props or item names: read them from get_item.`;

interface ToolResult {
  [key: string]: unknown;
  content: { type: "text"; text: string }[];
  isError?: boolean;
}

function text(body: string): ToolResult {
  return { content: [{ type: "text", text: body }] };
}

function failure(message: string): ToolResult {
  return { content: [{ type: "text", text: message }], isError: true };
}

function itemUrl(name: string) {
  return REGISTRY_ITEM_URL.replace("{name}", name);
}

export function installCommand(urls: string[], manager: PackageManager) {
  return `${SHADCN[manager]} ${urls.join(" ")}`;
}

function previewCommand(urls: string[], manager: PackageManager) {
  return `${installCommand(urls, manager)} --dry-run`;
}

function licenseText({
  license,
  adaptedFrom,
}: Pick<CatalogItem, "license" | "adaptedFrom">) {
  return adaptedFrom
    ? `${license}, adapted from ${adaptedFrom.name} (${adaptedFrom.url})`
    : license;
}

function summary(item: CatalogItem) {
  return {
    name: item.name,
    title: item.title,
    kind: item.kind,
    category: item.category,
    description: item.description,
    license: item.license,
    url: item.url,
  };
}

function notFound(name: string) {
  const suggestions = searchItems(getCatalog(), name, 5).map(
    ({ item }) => item.name,
  );
  return failure(
    suggestions.length > 0
      ? `No Cortexcn item is called "${name}". Close matches: ${suggestions.join(", ")}.`
      : `No Cortexcn item is called "${name}". Use search_items to find one.`,
  );
}

async function docsMarkdown(item: CatalogItem) {
  if (!item.docsPath) {
    return "";
  }
  try {
    const mdx = await readFile(
      join(process.cwd(), "content/docs", item.docsPath),
      "utf8",
    );
    return mdxToMarkdown(mdx);
  } catch {
    return "";
  }
}

interface RegistryItemFile {
  path: string;
  target?: string;
  content?: string;
}

interface RegistryItemJson {
  files?: RegistryItemFile[];
  meta?: Pick<CatalogItem, "license" | "adaptedFrom" | "revision">;
}

/** An item's published JSON: the current revision, or a kept one. */
async function readRegistryItem(
  name: string,
  revision?: string,
): Promise<RegistryItemJson> {
  const path = revision
    ? join(process.cwd(), "public/r/v", name, `${revision}.json`)
    : join(process.cwd(), "public/r", `${name}.json`);
  return JSON.parse(await readFile(path, "utf8")) as RegistryItemJson;
}

function codeList(values: string[]) {
  return values.map((value) => `\`${value}\``).join(", ");
}

/** Everything the install adds, with the license of each item it comes from. */
function installSummary(item: CatalogItem) {
  const plan = installPlan(item);
  const lines = [
    "## What installing it adds",
    "",
    "Cortexcn items and the files each adds. Paths are as the registry lists them; the preview below shows where they land in the project. Every script file carries a comment naming its item, revision, and license.",
    "",
    ...plan.items.map((entry) => {
      const revision = entry.revision ? `, revision ${entry.revision}` : "";
      const files = entry.files.length > 0 ? codeList(entry.files) : "no files";
      return `- \`${entry.name}\` (${licenseText(entry)}${revision}): ${files}`;
    }),
  ];
  if (plan.shadcnItems.length > 0) {
    lines.push(
      "",
      `shadcn/ui items, which the CLI adds from ui.shadcn.com: ${codeList(plan.shadcnItems)}`,
    );
  }
  if (plan.otherItems.length > 0) {
    lines.push("", `Other registry items: ${plan.otherItems.join(", ")}`);
  }
  lines.push(
    "",
    `npm packages: ${plan.dependencies.length > 0 ? codeList(plan.dependencies) : "none"}`,
  );
  if (plan.devDependencies.length > 0) {
    lines.push(`npm dev packages: ${codeList(plan.devDependencies)}`);
  }
  const css = plan.items.filter((entry) => entry.changesCss);
  if (css.length > 0) {
    lines.push(
      "",
      `Global CSS: ${codeList(css.map((entry) => entry.name))} ${css.length === 1 ? "adds" : "add"} theme variables or rules to the project's CSS file.`,
    );
  }
  lines.push(
    "",
    "A version like `motion@13` means the latest 13.x. Packages without one install at their latest version. The CLI installs them when the install command runs.",
  );
  return lines;
}

async function installSection(item: CatalogItem) {
  const url = itemUrl(item.name);
  const lines = [
    "## Install",
    "",
    "Preview first. The dry run writes nothing and lists every file and package for this project:",
    "",
    "```bash",
    previewCommand([url], "pnpm"),
    "```",
    "",
    "Then install, in the project root:",
    "",
    "```bash",
    installCommand([url], "pnpm"),
    "```",
    "",
    `With npm: \`${installCommand([url], "npm")}\`, with \`--dry-run\` to preview.`,
  ];
  if (item.revision) {
    lines.push(
      "",
      `To install exactly this revision later, use its pinned URL instead: ${pinnedItemUrl(item.name, item.revision)}. The Cortexcn items it depends on install at their current revision.`,
    );
  }
  const revisions = await pinnedRevisions(item.name);
  if (revisions.length > 0) {
    const kept = revisions.map((revision) =>
      revision === item.revision ? `${revision} (current)` : revision,
    );
    lines.push(
      `Kept revisions: ${kept.join(", ")}. Pass \`${item.name}@<revision>\` to get_install_command, or a revision to get_item_source.`,
    );
  }
  return lines;
}

async function itemDetails(item: CatalogItem, includeDocs: boolean) {
  const lines = [
    `# ${item.title} (\`${item.name}\`)`,
    item.description,
    "",
    `- Kind: ${item.kind}, in ${item.category}`,
    `- Page: ${item.url}`,
  ];
  if (item.livePreviewUrl) {
    lines.push(`- Live preview: ${item.livePreviewUrl}`);
  }
  if (item.markdownUrl) {
    lines.push(`- Docs as markdown: ${item.markdownUrl}`);
  }
  lines.push(`- License: ${licenseText(item)}`);
  if (item.author) {
    lines.push(`- Author: ${item.author}`);
  }
  if (item.revision) {
    lines.push(`- Revision: ${item.revision}`);
  }
  lines.push(
    `- Registry JSON: ${itemUrl(item.name)}`,
    "",
    ...installSummary(item),
    "",
    ...(await installSection(item)),
  );
  if (includeDocs) {
    const docs = await docsMarkdown(item);
    if (docs) {
      lines.push("", "## Docs", "", docs);
    }
  }
  return lines.join("\n");
}

async function registryFileText(name: string) {
  const { files = [] } = await readRegistryItem(name);
  return files.map((file) => file.content ?? "").join("\n\n");
}

type InstallTarget =
  | { url: string }
  | { missing: string }
  | { unknownRevision: string };

/** What one requested name installs: an item's URL, or its pinned revision's. */
async function resolveInstallTarget(requested: string): Promise<InstallTarget> {
  const [, pinnedName, revision] = PINNED_NAME_RE.exec(requested.trim()) ?? [];
  const item = findItem(pinnedName ?? requested);
  if (!item) {
    return { missing: requested };
  }
  if (!revision) {
    return { url: itemUrl(item.name) };
  }
  if (!(await pinnedRevisions(item.name)).includes(revision)) {
    return { unknownRevision: `${item.name}@${revision}` };
  }
  return { url: pinnedItemUrl(item.name, revision) };
}

const kindField = z
  .enum(KINDS)
  .optional()
  .describe(
    "Only this kind: component, block (a page section), chart, hook, or lib.",
  );

export function createServer(): McpServer {
  const server = new McpServer(
    { name: "cortexcn", title: "Cortexcn", version: SERVER_VERSION },
    { instructions: INSTRUCTIONS },
  );

  server.registerTool(
    "search_items",
    {
      title: "Search Cortexcn",
      description:
        "Find Cortexcn components, blocks, and charts by keyword or by what you need, like 'pricing hero', 'animated badge', or 'line chart with tooltip'. Results are ranked by relevance.",
      inputSchema: z.object({
        query: z.string().min(1).describe("Keywords or a short description."),
        kind: kindField,
        limit: z
          .number()
          .int()
          .min(1)
          .max(25)
          .optional()
          .describe("How many results to return. Defaults to 8."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    ({ query, kind, limit }) => {
      const pool = getCatalog().filter((item) => !kind || item.kind === kind);
      const results = searchItems(pool, query, limit ?? 8);
      if (results.length === 0) {
        return text(
          `Nothing in Cortexcn matches "${query}". Try fewer or broader words, or list_items to browse.`,
        );
      }
      return text(
        JSON.stringify(
          results.map(({ item }) => summary(item)),
          null,
          2,
        ),
      );
    },
  );

  server.registerTool(
    "list_items",
    {
      title: "List Cortexcn items",
      description:
        "Every Cortexcn component, block, and chart, optionally filtered by kind or category. Use list_categories to see the category names.",
      inputSchema: z.object({
        kind: kindField,
        category: z
          .string()
          .optional()
          .describe(
            "A category name from list_categories, like Hero or Cortex.",
          ),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    ({ kind, category }) => {
      const wanted = category?.trim().toLowerCase();
      const items = getCatalog().filter(
        (item) =>
          (!kind || item.kind === kind) &&
          (!wanted || item.category.toLowerCase() === wanted),
      );
      if (items.length === 0) {
        return text("No items match. Use list_categories to see what exists.");
      }
      return text(JSON.stringify(items.map(summary), null, 2));
    },
  );

  server.registerTool(
    "list_categories",
    {
      title: "List categories",
      description:
        "The groups Cortexcn items are organized in, with how many items each has.",
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    () => text(JSON.stringify(categoryCounts(), null, 2)),
  );

  server.registerTool(
    "get_item",
    {
      title: "Get an item",
      description:
        "Everything about one Cortexcn item: its license, author, and revision; every file, registry item, and npm package the install adds, including what its dependencies add; the preview and install commands; links to its page and live preview; and its docs with usage, examples, and props.",
      inputSchema: z.object({
        name: z
          .string()
          .min(1)
          .describe("The item's name, like lanyard-3d or hero-studio-01."),
        include_docs: z
          .boolean()
          .optional()
          .describe("Include the full docs page. Defaults to true."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ name, include_docs }) => {
      const item = findItem(name);
      if (!item) {
        return notFound(name);
      }
      return text(await itemDetails(item, include_docs ?? true));
    },
  );

  server.registerTool(
    "get_item_source",
    {
      title: "Get an item's source",
      description:
        "The source code of one item's files, as the CLI would write them, with its revision and license. Use it to read or review the code; to add it to a project, run the install command instead.",
      inputSchema: z.object({
        name: z.string().min(1).describe("The item's name."),
        revision: z
          .string()
          .regex(REVISION_RE)
          .optional()
          .describe(
            "A kept revision from get_item, like 39d534c092c8. Defaults to the current one.",
          ),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ name, revision }) => {
      const item = findItem(name);
      if (!item) {
        return notFound(name);
      }
      if (revision && !(await pinnedRevisions(item.name)).includes(revision)) {
        return failure(
          `${item.name} has no kept revision ${revision}. get_item lists the kept revisions.`,
        );
      }
      const { files = [], meta } = await readRegistryItem(item.name, revision);
      const shown = meta?.revision ?? revision;
      const heading = `Source of \`${item.name}\`${shown ? `, revision ${shown}` : ""}. License: ${licenseText({ license: meta?.license ?? item.license, adaptedFrom: meta?.adaptedFrom })}.`;
      return text(
        [
          heading,
          ...files.map(
            (file) =>
              `// ${file.target ?? file.path}\n${file.content ?? "(no content)"}`,
          ),
        ].join("\n\n"),
      );
    },
  );

  server.registerTool(
    "get_install_command",
    {
      title: "Get the install command",
      description:
        "The shadcn CLI commands that preview and then install one or more Cortexcn items in the current project, for the package manager you name. Run them in the project root, the preview first.",
      inputSchema: z.object({
        names: z
          .array(z.string().min(1))
          .min(1)
          .max(20)
          .describe(
            "Item names, like ['lanyard-3d', 'hero-studio-01']. Add @<revision> to install a kept revision, like 'lanyard-3d@39d534c092c8'.",
          ),
        package_manager: z
          .enum(PACKAGE_MANAGERS)
          .optional()
          .describe("Defaults to pnpm."),
      }),
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ names, package_manager }) => {
      const targets = await Promise.all(names.map(resolveInstallTarget));
      const urls = targets.flatMap((target) =>
        "url" in target ? [target.url] : [],
      );
      const missing = targets.flatMap((target) =>
        "missing" in target ? [target.missing] : [],
      );
      const unknownRevisions = targets.flatMap((target) =>
        "unknownRevision" in target ? [target.unknownRevision] : [],
      );
      if (urls.length === 0 && unknownRevisions.length === 0) {
        return notFound(names.join(", "));
      }
      const notes: string[] = [];
      if (missing.length > 0) {
        notes.push(
          `Not found, left out: ${missing.join(", ")}. Use search_items to find the right names.`,
        );
      }
      if (unknownRevisions.length > 0) {
        notes.push(
          `No such kept revision, left out: ${unknownRevisions.join(", ")}. get_item lists each item's kept revisions.`,
        );
      }
      if (urls.length === 0) {
        return failure(notes.join("\n"));
      }
      const manager = package_manager ?? "pnpm";
      const lines = [
        "Preview (writes nothing, lists every file and package):",
        previewCommand(urls, manager),
        "",
        "Install:",
        installCommand(urls, manager),
      ];
      if (notes.length > 0) {
        lines.push("", ...notes);
      }
      return text(lines.join("\n"));
    },
  );

  server.registerTool(
    "get_setup_guide",
    {
      title: "Get the setup guide",
      description:
        "How to prepare a project for Cortexcn: setting up shadcn, adding the @cortexcn registry to components.json, and the theme.",
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      const install = await readFile(
        join(process.cwd(), "content/docs/installation.mdx"),
        "utf8",
      ).catch(() => "");
      const lines = [
        "# Setting up a project for Cortexcn",
        "",
        "Items install with the shadcn CLI, so the project needs shadcn first (`npx shadcn@latest init`).",
        "",
        "Any item installs from its URL with no further setup. Items name the Cortexcn items they depend on by URL too, so the CLI fetches those directly. Add `--dry-run` to preview what a command would write:",
        "",
        "```bash",
        installCommand([itemUrl("lanyard-3d")], "npm"),
        "```",
        "",
        "To install by name (`npx shadcn@latest add @cortexcn/lanyard-3d`), add the registry to components.json once:",
        "",
        "```json",
        JSON.stringify(
          { registries: { "@cortexcn": REGISTRY_ITEM_URL } },
          null,
          2,
        ),
        "```",
      ];
      lines.push(
        "",
        "Most items depend on `utils` (the `cn` helper), which the CLI installs for you.",
      );
      if (install) {
        lines.push("", "## The installation page", "", mdxToMarkdown(install));
      }
      return text(lines.join("\n"));
    },
  );

  server.registerTool(
    "get_design_guide",
    {
      title: "Get the design guide",
      description:
        "Cortexcn's DESIGN.md: the colors, type, radius, spacing, motion, and component rules to follow when building or changing UI, so new screens match Cortexcn.",
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      try {
        return text(await registryFileText("design-md"));
      } catch {
        return failure(
          `The design guide could not be read. It is also published at ${DOCS_URL}/r/design-md.json.`,
        );
      }
    },
  );

  return server;
}
