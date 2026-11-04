import { Icon } from "@cortexcn/icons";

import { CopyButton } from "@/components/copy-button";
import { PrimaryLink, SecondaryLink } from "@/components/ui-home/primitives";
import { cn } from "@/lib/utils";

import { ClientLogo } from "./client-logo";
import { MCP_CLIENTS, MCP_DOCS_PATH, MCP_URL } from "./mcp-setup";

/** CSS-only entrance, so the copy animates in before hydration finishes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * The top of /mcp-server: centered, unlike the split heroes of the home and
 * the galleries, with the server URL itself and the clients it works with.
 */
export function McpHero() {
  return (
    <section className="px-4 pt-14 pb-12 sm:px-6 md:pt-20 md:pb-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1.5 text-body text-sm",
            enterClassName,
          )}
        >
          <span className="grid size-6 place-items-center rounded-full bg-muted text-foreground">
            <Icon className="size-3.5" name="IconAgent" />
          </span>
          Cortexcn MCP server
        </p>

        <h1
          className={cn(
            "mt-7 text-balance font-light font-sentient text-[clamp(2.4rem,7vw,4.25rem)] leading-[1.05] tracking-[-0.05em] delay-100",
            enterClassName,
          )}
        >
          The whole library,
          <br />
          <span className="text-body">inside your AI editor.</span>
        </h1>

        <p
          className={cn(
            "mt-6 max-w-xl text-pretty text-body text-lg leading-[1.45] delay-200",
            enterClassName,
          )}
        >
          Connect Claude Code, Cursor, VS Code, or another assistant once. Then
          ask for a component in plain words, and your assistant finds it, reads
          its docs, and installs the source into your project.
        </p>

        <div
          className={cn(
            "mt-9 flex flex-wrap items-center justify-center gap-3 delay-300",
            enterClassName,
          )}
        >
          <PrimaryLink href="#install">Install the MCP server</PrimaryLink>
          <SecondaryLink href={MCP_DOCS_PATH}>Read the reference</SecondaryLink>
        </div>

        <div
          className={cn(
            "mt-6 flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/50 py-1 pr-1 pl-3 delay-500",
            enterClassName,
          )}
        >
          <span className="font-mono text-muted-foreground text-xs">URL</span>
          <code className="min-w-0 flex-1 truncate text-left font-mono text-foreground text-sm">
            {MCP_URL}
          </code>
          <CopyButton aria-label="Copy the server URL" text={MCP_URL} />
        </div>

        <div className={cn("mt-12 delay-700", enterClassName)}>
          <p className="font-mono text-muted-foreground text-xs uppercase tracking-wide">
            Works with
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {MCP_CLIENTS.map((client) => (
              <li
                className="flex items-center gap-2 text-body text-sm"
                key={client.id}
              >
                <ClientLogo logo={client.logo} size={18} />
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
