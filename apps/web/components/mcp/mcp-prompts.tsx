import { CopyButton } from "@/components/copy-button";
import { PrimaryLink, SecondaryLink } from "@/components/ui-home/primitives";

import { MCP_DOCS_PATH, MCP_PROMPTS } from "./mcp-setup";

/** What to ask once connected, then where to go next. */
export function McpPrompts() {
  return (
    <section
      aria-labelledby="mcp-prompts"
      className="border-border border-t px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3">
          <h2
            className="m-0 font-light font-sentient text-[clamp(2rem,5vw,3rem)] leading-[1.08] tracking-[-0.045em]"
            id="mcp-prompts"
          >
            Then ask for what you need
          </h2>
          <p className="m-0 max-w-xl text-body text-lg leading-[1.45]">
            Your project needs shadcn set up first. If there is no{" "}
            <code className="rounded-[0.3rem] bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
              components.json
            </code>{" "}
            in its root, run{" "}
            <code className="rounded-[0.3rem] bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
              npx shadcn@latest init
            </code>
            .
          </p>
        </div>

        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2">
          {MCP_PROMPTS.map((prompt) => (
            <li
              className="flex items-start gap-3 rounded-shell-xl border border-border bg-card p-5"
              key={prompt}
            >
              <p className="m-0 flex-1 text-foreground leading-relaxed">
                "{prompt}"
              </p>
              <CopyButton aria-label="Copy the prompt" text={prompt} />
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-start gap-6 rounded-shell-xl border border-border bg-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="m-0 font-medium text-foreground text-lg tracking-tight">
              Every tool, limit, and client
            </p>
            <p className="m-0 text-body text-sm leading-relaxed">
              The reference covers the eight tools, the rate limits, and setup
              for Zed, ChatGPT, and more.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink href={MCP_DOCS_PATH}>Read the reference</PrimaryLink>
            <SecondaryLink href="/docs/installation">
              Install with the CLI
            </SecondaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
