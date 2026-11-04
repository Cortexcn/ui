import { Icon, type IconName } from "@cortexcn/icons";

interface Point {
  icon: IconName;
  title: string;
  body: string;
}

/** What the server's tools do for someone building a page. */
const HELPS: Point[] = [
  {
    icon: "IconMagnifyingGlass",
    title: "Finds the right piece",
    body: "Describe what you need, and it searches components and blocks by name or by what they do.",
  },
  {
    icon: "IconFileText",
    title: "Reads before it installs",
    body: "It sees each item's license, revision, files, and npm packages, so you can review the change first.",
  },
  {
    icon: "IconConsole",
    title: "Installs the source",
    body: "It gets the exact shadcn command, your assistant runs it, and the files land in your repo.",
  },
  {
    icon: "IconColorPalette",
    title: "Keeps your style",
    body: "It reads Cortexcn's DESIGN.md, so new code follows the same tokens as the rest of your UI.",
  },
];

/** The server's settings, from the MCP reference page. */
const FACTS: Point[] = [
  {
    icon: "IconServer",
    title: "Hosted",
    body: "Nothing to install or run",
  },
  {
    icon: "IconLock",
    title: "Read-only",
    body: "It never writes files or runs commands",
  },
  {
    icon: "IconGlobe",
    title: "No sign-in",
    body: "One URL for every client",
  },
  {
    icon: "IconLightning",
    title: "Fair use",
    body: "120 requests a minute per IP",
  },
];

/** What MCP is, what the Cortexcn server adds, and its main settings. */
export function McpExplainer() {
  return (
    <section
      aria-labelledby="what-is-mcp"
      className="border-border border-t px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2
            className="m-0 font-light font-sentient text-[clamp(2rem,5vw,3rem)] leading-[1.08] tracking-[-0.045em]"
            id="what-is-mcp"
          >
            What is MCP?
          </h2>
          <div className="flex flex-col gap-4 text-body text-lg leading-[1.5]">
            <p className="m-0">
              MCP, the Model Context Protocol, is an open standard that lets AI
              assistants use tools from outside services. An assistant that
              supports it can call those tools in the middle of a conversation,
              the way it reads a file or runs a command.
            </p>
            <p className="m-0">
              The Cortexcn MCP server gives your assistant read-only tools over
              the Cortexcn registry. It can search for components and blocks,
              read an item's docs and source, and get the command that installs
              it.
            </p>
          </div>
        </div>

        <h3 className="mt-16 mb-6 font-medium text-foreground text-lg tracking-tight md:mt-20">
          How it helps
        </h3>
        <ul className="m-0 grid list-none gap-px overflow-hidden rounded-shell-xl border border-border bg-border p-0 sm:grid-cols-2 lg:grid-cols-4">
          {HELPS.map((point) => (
            <li className="flex flex-col gap-3 bg-card p-6" key={point.title}>
              <span className="grid size-9 place-items-center rounded-shell-sm bg-muted text-foreground">
                <Icon className="size-4.5" name={point.icon} />
              </span>
              <p className="m-0 font-medium text-foreground">{point.title}</p>
              <p className="m-0 text-body text-sm leading-relaxed">
                {point.body}
              </p>
            </li>
          ))}
        </ul>

        <ul className="m-0 mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <li
              className="flex items-center gap-3 rounded-shell-lg border border-border px-4 py-3"
              key={fact.title}
            >
              <Icon
                className="size-4 shrink-0 text-muted-foreground"
                name={fact.icon}
              />
              <span className="min-w-0">
                <span className="block font-medium text-foreground text-sm">
                  {fact.title}
                </span>
                <span className="block text-muted-foreground text-xs">
                  {fact.body}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
