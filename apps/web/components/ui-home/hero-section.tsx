import Link from "next/link";
import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { CopyButton } from "@/components/copy-button";
import { ProductHuntBadge } from "@/components/product-hunt-badge";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { cn } from "@/lib/utils";

import { HeroCanvasLoader } from "./hero-canvas-loader";
import { ChevronRightIcon, PrimaryLink, SecondaryLink } from "./primitives";
import { HeadingWords } from "./reveal";
import { StackTicker } from "./stack-ticker";

/** The MCP server's page: what it is, and setup for each AI client. */
const MCP_PAGE = "/mcp-server";

/** The one-line setup from the MCP docs, for Claude Code. */
const MCP_COMMAND =
  "claude mcp add --transport http cortexcn https://ui.cortexcn.dev/mcp";

const ANNOUNCEMENT = {
  tag: "New",
  text: "Connect your AI agent with the Cortexcn MCP server",
  href: MCP_PAGE,
};

const HEADLINE = [
  { text: "Charts, blocks, and motion," },
  { text: "one prompt away.", muted: true },
];

/**
 * Counted from the docs and the block categories, then rounded down to a ten,
 * so "100+" stays true as the library grows.
 */
const COMPONENT_COUNT = COMPONENT_GROUPS.reduce(
  (count, group) => count + group.slugs.length,
  0,
);
const BLOCK_COUNT = BLOCK_CATEGORIES.reduce(
  (count, category) => count + category.blocks.length,
  0,
);
const LIBRARY_COUNT = Math.floor((COMPONENT_COUNT + BLOCK_COUNT) / 10) * 10;

/** CSS-only entrance, so the copy animates in before hydration finishes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

export function HeroSection() {
  return (
    <section className="pb-16 md:pb-20" id="hero">
      {/*
        Two columns from lg up: the copy on the left, starting on the header's
        gutter so it lines up with the logo, and the component wall on the
        right, running to the screen's edge. On phones the wall sits below.
      */}
      <div className="lg:grid lg:min-h-[min(880px,100svh)] lg:grid-cols-[min(44rem,50%)_minmax(0,1fr)]">
        <div className="relative z-10 flex items-center px-4 pt-28 pb-10 sm:px-6 md:pt-36 lg:pt-24 lg:pr-4 lg:pb-16 lg:pl-8">
          <div className="flex w-full min-w-0 max-w-[38rem] flex-col items-start">
            <Link
              className={cn(
                "group mb-7 inline-flex max-w-full items-center gap-2.5 text-body text-sm sm:text-base",
                enterClassName,
              )}
              href={ANNOUNCEMENT.href}
            >
              <span className="rounded-[4px] bg-muted px-1.5 py-1 font-medium text-xs uppercase leading-none">
                {ANNOUNCEMENT.tag}
              </span>
              <span className="underline-offset-4 group-hover:underline">
                {ANNOUNCEMENT.text}
              </span>
              <ChevronRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/*
              Two rows, each kept whole. The first row is about 11.4 times the
              font size wide, so the size follows the column: the screen width
              on phones, and the text column beside the canvas from lg up.
            */}
            <h1 className="whitespace-nowrap font-light font-sentient text-[min(3.25rem,calc((100vw-3rem)/11.8))] leading-[1.08] tracking-[-0.05em] lg:text-[min(3.25rem,3.6vw)]">
              <HeadingWords
                breakLines
                enterOnLoad
                lines={HEADLINE}
                mutedClassName="text-body"
              />
            </h1>

            <p
              className={cn(
                "mt-6 max-w-lg text-pretty text-body text-lg leading-[1.4] delay-300",
                enterClassName,
              )}
            >
              {LIBRARY_COUNT}+ components and blocks for shadcn/ui, from charts
              to full page sections. Ask Claude, Cursor, or VS Code for one, and
              the source lands in your repo, ready to ship. You own every line.
            </p>

            <div
              className={cn(
                "mt-9 flex flex-wrap items-center gap-3 delay-500",
                enterClassName,
              )}
            >
              <PrimaryLink href={MCP_PAGE}>Connect your AI editor</PrimaryLink>
              <SecondaryLink href="/docs/components">
                Browse components
              </SecondaryLink>
            </div>

            {/* The setup command itself, for readers already in Claude Code. */}
            <div
              className={cn(
                "mt-5 flex w-full max-w-[30rem] items-center gap-2 rounded-xl border border-border bg-muted/50 py-1 pr-1 pl-3 delay-700",
                enterClassName,
              )}
            >
              <span
                aria-hidden="true"
                className="font-mono text-muted-foreground text-xs"
              >
                $
              </span>
              <code className="min-w-0 flex-1 truncate font-mono text-foreground/80 text-xs">
                {MCP_COMMAND}
              </code>
              <CopyButton
                aria-label="Copy the MCP setup command"
                text={MCP_COMMAND}
              />
            </div>

            <ProductHuntBadge
              className={cn("mt-6 delay-1000", enterClassName)}
            />
          </div>
        </div>

        <HeroCanvasLoader className="h-[60svh] min-h-[440px] w-full lg:h-auto lg:min-h-0" />
      </div>

      <StackTicker />
    </section>
  );
}
