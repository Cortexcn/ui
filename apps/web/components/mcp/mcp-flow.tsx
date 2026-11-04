import type { ReactNode } from "react";

import { DOCS_URL } from "@/lib/site-url";
import { cn } from "@/lib/utils";

import { MCP_URL } from "./mcp-setup";

const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/** The calls an assistant makes for the request in step two, in order. */
const CALLS = [
  { name: "search_items", args: '"hero with product screenshot"' },
  { name: "get_item", args: '"hero-cover-01"' },
  {
    name: "Bash",
    args: `npx shadcn@latest add ${DOCS_URL}/r/hero-cover-01.json`,
  },
];

function Step({
  index,
  title,
  children,
  className,
}: {
  index: number;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex flex-col gap-4 rounded-shell-xl border border-border bg-card p-5 shadow-sm",
        enterClassName,
        className,
      )}
    >
      <p className="flex items-center gap-2.5 font-medium text-foreground text-sm">
        <span className="grid size-6 place-items-center rounded-full bg-muted font-mono text-muted-foreground text-xs">
          {index}
        </span>
        {title}
      </p>
      {children}
    </li>
  );
}

/**
 * How a session goes, in three cards that share one row: connect the
 * server, ask in plain words, and the assistant installs the item.
 */
export function McpFlow() {
  return (
    <section aria-label="How it works" className="px-4 pb-20 sm:px-6 md:pb-28">
      <ol className="mx-auto my-0 grid max-w-6xl list-none gap-4 p-0 md:grid-cols-3">
        <Step className="delay-500" index={1} title="Connect once">
          <pre className="m-0 flex-1 overflow-x-auto whitespace-pre-wrap break-words rounded-shell border border-border bg-muted/50 p-3 font-mono text-[13px] text-foreground leading-relaxed">
            <span className="select-none text-muted-foreground">$ </span>
            claude mcp add --transport http cortexcn {MCP_URL}
          </pre>
        </Step>

        <Step className="delay-700" index={2} title="Ask in plain words">
          <div className="flex flex-1 flex-col justify-center">
            <p className="m-0 ml-auto max-w-[17rem] rounded-shell-lg rounded-br-sm bg-foreground px-3.5 py-2.5 text-background text-sm leading-snug">
              Add a hero with a product screenshot to the landing page.
            </p>
          </div>
        </Step>

        <Step className="delay-1000" index={3} title="It installs the source">
          <ul className="m-0 flex flex-1 list-none flex-col gap-2 p-0">
            {CALLS.map((call) => (
              <li
                className="flex min-w-0 items-baseline gap-2 rounded-shell border border-border bg-muted/50 px-3 py-2 font-mono text-[12.5px]"
                key={call.name}
              >
                <span className="shrink-0 text-foreground">{call.name}</span>
                <span className="truncate text-muted-foreground">
                  {call.args}
                </span>
              </li>
            ))}
          </ul>
        </Step>
      </ol>
    </section>
  );
}
