import Image from "next/image";

import { CATALOG_COUNTS } from "@/lib/catalog-counts";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

interface Agent {
  name: string;
  /** File stem in /logos/agents. */
  icon: string;
  /** Has `-light` and `-dark` files, rather than one for both themes. */
  themed?: boolean;
}

/**
 * MCP clients the server works with: the ones the MCP docs set up, then
 * other clients that connect to remote MCP servers. Logos from svgl.app.
 */
const AGENTS: Agent[] = [
  { name: "Claude Code", icon: "claude" },
  { name: "Cursor", icon: "cursor", themed: true },
  { name: "VS Code", icon: "vscode" },
  { name: "Codex", icon: "codex", themed: true },
  { name: "Gemini CLI", icon: "gemini" },
  { name: "GitHub Copilot", icon: "copilot", themed: true },
  { name: "Windsurf", icon: "windsurf", themed: true },
  { name: "JetBrains", icon: "jetbrains" },
  { name: "Zed", icon: "zed", themed: true },
  { name: "Warp", icon: "warp" },
  { name: "ChatGPT", icon: "openai", themed: true },
  { name: "OpenCode", icon: "opencode", themed: true },
];

/** What an agent can install through the server: the free registry. */
const INSTALLS = [
  `${CATALOG_COUNTS.freeComponents} components`,
  `${CATALOG_COUNTS.freeBlocks} blocks`,
  "2 agent skills",
  "1 DESIGN.md",
];

/** The ring is an ellipse, as wide as the box and a little shorter. */
const RADIUS = { x: 43, y: 42 };

function AgentIcon({ agent }: { agent: Agent }) {
  const className = "size-6 object-contain md:size-8";
  if (!agent.themed) {
    return (
      <Image
        alt=""
        className={className}
        height={32}
        src={`/logos/agents/${agent.icon}.svg`}
        unoptimized
        width={32}
      />
    );
  }
  return (
    <>
      <Image
        alt=""
        className={cn(className, "dark:hidden")}
        height={32}
        src={`/logos/agents/${agent.icon}-light.svg`}
        unoptimized
        width={32}
      />
      <Image
        alt=""
        className={cn(className, "hidden dark:block")}
        height={32}
        src={`/logos/agents/${agent.icon}-dark.svg`}
        unoptimized
        width={32}
      />
    </>
  );
}

/**
 * The agents that work with the Cortexcn MCP server, in a ring around what
 * they can install.
 */
export function AgentRing({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[600px] sm:aspect-6/5",
        className,
      )}
    >
      <ul aria-label="Agents it works with" className="absolute inset-0">
        {AGENTS.map((agent, index) => {
          // Clockwise from the top, evenly spaced.
          const angle = (index / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <li
              className="absolute -translate-x-1/2 -translate-y-1/2"
              key={agent.name}
              style={{
                left: `${50 + RADIUS.x * Math.cos(angle)}%`,
                top: `${50 + RADIUS.y * Math.sin(angle)}%`,
              }}
            >
              <Reveal delay={index * 60}>
                <span className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_12px_24px_-12px_rgb(28_26_21/0.25)] md:size-16 dark:shadow-[0_12px_24px_-12px_rgb(0_0_0/0.6)]">
                  <AgentIcon agent={agent} />
                </span>
                <span className="sr-only">{agent.name}</span>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm md:text-base">
          Your agent can install
        </p>
        <ul className="mt-3 flex flex-col gap-1">
          {INSTALLS.map((line) => (
            <li
              className="font-light font-sentient text-[26px] leading-[1.1] tracking-[-0.04em] sm:text-[34px] lg:text-[40px]"
              key={line}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
