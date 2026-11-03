import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { blockLivePreviewPath } from "@/lib/blocks/block-links";
import { getGalleryBlocks } from "@/lib/blocks/gallery";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { canonicalUrlFor, DOCS_URL } from "@/lib/site-url";
import { source } from "@/lib/source";
import registry from "@/public/r/registry.json";

export type ItemKind = "component" | "block" | "chart" | "hook" | "lib";

/** One installable item, as the MCP tools describe it. */
export interface CatalogItem {
  name: string;
  title: string;
  kind: ItemKind;
  /** The group it is listed under on the site, such as "Cortex" or "Hero". */
  category: string;
  description: string;
  /** The page to read about it: its docs page, or its block page. */
  url: string;
  /** The same page as markdown, when it has a docs page. */
  markdownUrl?: string;
  /** Blocks only: the block on its own, full screen. */
  livePreviewUrl?: string;
  /** Path of its docs page under content/docs, for reading the MDX. */
  docsPath?: string;
  /** npm packages, pinned to a major version where the registry pins one. */
  dependencies: string[];
  devDependencies: string[];
  /** Other registry items: Cortexcn item URLs, or shadcn/ui item names. */
  registryDependencies: string[];
  /** Where its files land in the project, relative to the project root. */
  files: string[];
  /** It adds theme variables or rules to the project's global CSS file. */
  changesCss: boolean;
  author?: string;
  license: string;
  /** The project it was adapted from, when it was. */
  adaptedFrom?: { name: string; url: string };
  /** The hash of its current published revision. */
  revision?: string;
}

interface RegistryIndexItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  categories?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: { path: string; target?: string }[];
  css?: unknown;
  cssVars?: unknown;
  author?: string;
  meta?: {
    license?: string;
    adaptedFrom?: { name: string; url: string };
    revision?: string;
  };
}

/** "@cortexcn/lanyard-3d" names the same item as "lanyard-3d". */
const NAMESPACE = /^@cortexcn\//;

export const REGISTRY_ITEM_URL = `${DOCS_URL}/r/{name}.json`;

/** A revision as the registry build names it: twelve hex characters. */
export const REVISION_RE = /^[0-9a-f]{12}$/;

/** The registry build writes Cortexcn dependencies as URLs on its homepage. */
const PUBLISHED_ITEM_URL = new RegExp(
  `^${registry.homepage.replaceAll(".", "\\.")}/r/([\\w.-]+)\\.json$`,
);

/** The Cortexcn item a registry dependency points at, or null for others. */
export function cortexcnDependencyName(dependency: string) {
  if (NAMESPACE.test(dependency)) {
    return dependency.replace(NAMESPACE, "");
  }
  return PUBLISHED_ITEM_URL.exec(dependency)?.[1] ?? null;
}

/** The copy of one revision of an item, which never changes. */
export function pinnedItemUrl(name: string, revision: string) {
  return `${DOCS_URL}/r/v/${name}/${revision}.json`;
}

/** The revisions of an item the registry keeps pinned copies of. */
export async function pinnedRevisions(name: string) {
  try {
    const files = await readdir(join(process.cwd(), "public/r/v", name));
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.slice(0, -".json".length))
      .filter((revision) => REVISION_RE.test(revision))
      .sort();
  } catch {
    return [];
  }
}

const CHART_PART =
  /^(chart-|x-axis$|y-axis$|grid$|legend$|markers$|background$|bar-depth$|reference-area$|projection-line$)/;

const CATEGORY_NAMES: Record<string, string> = {
  components: "Components",
  cortex: "Cortex",
  backgrounds: "Backgrounds",
  charts: "Charts",
  "ai-assistant": "AI Assistant",
  agents: "Agent files",
};

function kindOf(item: RegistryIndexItem): ItemKind {
  if (item.type === "registry:block") {
    return "block";
  }
  if (item.type === "registry:hook") {
    return "hook";
  }
  if (item.type === "registry:lib" || item.type === "registry:item") {
    return "lib";
  }
  if (item.categories?.includes("charts") || CHART_PART.test(item.name)) {
    return "chart";
  }
  return "component";
}

function categoryOf(item: RegistryIndexItem, kind: ItemKind) {
  const named = item.categories
    ?.map((slug) => CATEGORY_NAMES[slug])
    .find(Boolean);
  if (named) {
    return named;
  }
  if (kind === "chart") {
    return "Chart parts";
  }
  if (item.name.startsWith("theme-toggle-effect")) {
    return "Theme toggle";
  }
  if (kind === "hook" || kind === "lib") {
    return "Utilities";
  }
  return "Components";
}

/** Agent files are documented together under Integration. */
const INTEGRATION_PAGES: Record<string, string> = {
  "design-md": "design-md",
  "agent-skills": "skills",
  "agent-kit": "skills",
};

/** Docs folders that hold one page per registry item: the component families, then the chart parts. */
const DOCS_FOLDERS = [
  ...COMPONENT_GROUPS.map((group) => group.category),
  "utility",
];

/** The docs page for an item, if it has one: a component, a chart part, or an agent file. */
function docsPageFor(name: string) {
  const integration = INTEGRATION_PAGES[name];
  if (integration) {
    return source.getPage(["integration", integration]);
  }
  return DOCS_FOLDERS.map((folder) => source.getPage([folder, name])).find(
    (page) => page !== undefined,
  );
}

function buildCatalog(): CatalogItem[] {
  const blocks = new Map(
    getGalleryBlocks().map((block) => [block.slug, block]),
  );
  const items = (registry.items as RegistryIndexItem[]).filter(
    (item) => item.type !== "registry:example",
  );

  return items.map((item) => {
    const kind = kindOf(item);
    const block = kind === "block" ? blocks.get(item.name as never) : undefined;
    const page = block ? undefined : docsPageFor(item.name);
    let url = REGISTRY_ITEM_URL.replace("{name}", item.name);
    if (block) {
      url = canonicalUrlFor(block.href);
    } else if (page) {
      url = canonicalUrlFor(page.url);
    }
    return {
      name: item.name,
      title: block?.title ?? item.title ?? item.name,
      kind,
      category: block?.categoryName ?? categoryOf(item, kind),
      description: block?.description ?? item.description ?? "",
      url,
      markdownUrl: page ? `${canonicalUrlFor(page.url)}.md` : undefined,
      livePreviewUrl: block
        ? canonicalUrlFor(blockLivePreviewPath(block.slug))
        : undefined,
      docsPath: page?.path,
      ...installFields(item),
    };
  });
}

/** What installing an item adds, and where it came from. */
function installFields(item: RegistryIndexItem) {
  return {
    dependencies: item.dependencies ?? [],
    devDependencies: item.devDependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: (item.files ?? []).map((file) => file.target ?? file.path),
    changesCss: Boolean(item.css || item.cssVars),
    author: item.author,
    license: item.meta?.license ?? "MIT",
    adaptedFrom: item.meta?.adaptedFrom,
    revision: item.meta?.revision,
  };
}

let cached: CatalogItem[] | undefined;

/** Every installable item, built once per server instance. */
export function getCatalog() {
  cached ??= buildCatalog();
  return cached;
}

export function findItem(name: string) {
  const wanted = name.trim().toLowerCase().replace(NAMESPACE, "");
  return getCatalog().find((item) => item.name === wanted);
}

/** Everything one install adds: the item and every registry item it pulls in. */
export interface InstallPlan {
  /** The item first, then the Cortexcn items it depends on. */
  items: CatalogItem[];
  /** shadcn/ui items, which the CLI adds from ui.shadcn.com. */
  shadcnItems: string[];
  /** Registry items from anywhere else, by URL. */
  otherItems: string[];
  dependencies: string[];
  devDependencies: string[];
}

/** "motion@13" and "motion" are the same package. */
function packageName(dependency: string) {
  const at = dependency.lastIndexOf("@");
  return at > 0 ? dependency.slice(0, at) : dependency;
}

function addPackages(target: string[], dependencies: string[]) {
  for (const dependency of dependencies) {
    const name = packageName(dependency);
    if (!target.some((existing) => packageName(existing) === name)) {
      target.push(dependency);
    }
  }
}

export function installPlan(item: CatalogItem): InstallPlan {
  const plan: InstallPlan = {
    items: [],
    shadcnItems: [],
    otherItems: [],
    dependencies: [],
    devDependencies: [],
  };
  const seen = new Set<string>();
  const visit = (current: CatalogItem) => {
    if (seen.has(current.name)) {
      return;
    }
    seen.add(current.name);
    plan.items.push(current);
    addPackages(plan.dependencies, current.dependencies);
    addPackages(plan.devDependencies, current.devDependencies);
    for (const dependency of current.registryDependencies) {
      const name = cortexcnDependencyName(dependency);
      const nested = name ? findItem(name) : undefined;
      if (nested) {
        visit(nested);
      } else if (dependency.includes("/")) {
        plan.otherItems.push(dependency);
      } else if (!plan.shadcnItems.includes(dependency)) {
        plan.shadcnItems.push(dependency);
      }
    }
  };
  visit(item);
  return plan;
}

export function categoryCounts() {
  const counts = new Map<
    string,
    { kind: ItemKind; category: string; count: number }
  >();
  for (const item of getCatalog()) {
    const key = `${item.kind}:${item.category}`;
    const entry = counts.get(key) ?? {
      kind: item.kind,
      category: item.category,
      count: 0,
    };
    entry.count += 1;
    counts.set(key, entry);
  }
  return [...counts.values()].sort(
    (a, b) =>
      a.kind.localeCompare(b.kind) || a.category.localeCompare(b.category),
  );
}
