import type { ReactNode } from "react";

import { CATALOG_COUNTS } from "@/lib/catalog-counts";
import { formatUsd } from "@/lib/service-pricing";

import { ChevronRightIcon, Container } from "./primitives";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

interface ProductLine {
  name: string;
  /** The section further down the page that shows it running. */
  href: string;
  size: string;
  description: string;
  tag: string;
  glyph: ReactNode;
}

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

const LINES: ProductLine[] = [
  {
    name: "Components",
    href: "#components",
    size: `${CATALOG_COUNTS.components} shadcn/ui, ${CATALOG_COUNTS.originals} originals`,
    description: "Everyday building blocks, plus originals for motion.",
    tag: "Free and Pro",
    glyph: (
      <Glyph>
        <rect height="7" rx="1.5" width="7" x="3.5" y="3.5" />
        <rect height="7" rx="1.5" width="7" x="13.5" y="3.5" />
        <rect height="7" rx="1.5" width="7" x="3.5" y="13.5" />
        <circle cx="17" cy="17" r="3.5" />
      </Glyph>
    ),
  },
  {
    name: "Blocks",
    href: "#blocks",
    size: `${CATALOG_COUNTS.pageBlocks} page sections`,
    description: "Heroes, features, services, galleries, a blog, and loaders.",
    tag: `${CATALOG_COUNTS.freeBlocks} free`,
    glyph: (
      <Glyph>
        <rect height="17" rx="2" width="17" x="3.5" y="3.5" />
        <path d="M3.5 9.5h17M9.5 9.5v11" />
      </Glyph>
    ),
  },
  {
    name: "Charts",
    href: "#charts",
    size: `${CATALOG_COUNTS.charts} chart types, ${CATALOG_COUNTS.chartBlocks} blocks`,
    description:
      "Charts, stat cards, chart groups, and full dashboard screens.",
    tag: "Pro",
    glyph: (
      <Glyph>
        <path d="M3.5 20.5h17" />
        <path d="m4.5 15 4.5-5 4 3.5 6.5-7.5" />
      </Glyph>
    ),
  },
  {
    name: "AI",
    href: "#ai",
    size: `${CATALOG_COUNTS.aiBlocks} blocks`,
    description:
      "Reasoning, agent steps, a task queue, tool calls, and integrations.",
    tag: "Pro",
    glyph: (
      <Glyph>
        <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
        <path d="M12 8.5 13.2 10.8 15.5 12 13.2 13.2 12 15.5 10.8 13.2 8.5 12 10.8 10.8Z" />
      </Glyph>
    ),
  },
  {
    name: "Dashboard kits",
    href: "#dashboard-kits",
    size: `${CATALOG_COUNTS.kits} kits, ${CATALOG_COUNTS.kitPages} pages`,
    description:
      "Complete Next.js dashboards with every page and a data model.",
    tag: `From ${formatUsd(CATALOG_COUNTS.kitFromPrice)}`,
    glyph: (
      <Glyph>
        <rect height="17" rx="2" width="17" x="3.5" y="3.5" />
        <path d="M8.5 3.5v17M8.5 9h12M14.5 9v11.5" />
      </Glyph>
    ),
  },
  {
    name: "Templates",
    href: "#templates",
    size: `${CATALOG_COUNTS.templates} websites`,
    description: "Full landing pages in Next.js, and a free portfolio.",
    tag: `${CATALOG_COUNTS.freeTemplates} free`,
    glyph: (
      <Glyph>
        <rect height="15" rx="2" width="17" x="3.5" y="4.5" />
        <path d="M3.5 8.5h17M7 12.5h6M7 15.5h10" />
      </Glyph>
    ),
  },
  {
    name: "MCP and agents",
    href: "#mcp",
    size: "8 tools, 2 skills, DESIGN.md",
    description:
      "Your AI agent searches the library and installs what you ask for.",
    tag: "Free",
    glyph: (
      <Glyph>
        <path d="m7.5 8.5-4 3.5 4 3.5M16.5 8.5l4 3.5-4 3.5M13.5 5.5l-3 13" />
      </Glyph>
    ),
  },
  {
    name: "Custom work",
    href: "#custom-work",
    size: "Quoted per project",
    description: "Components, dashboards, or pages built to your brief.",
    tag: "Quote",
    glyph: (
      <Glyph>
        <path d="M14.5 5.5 18.5 9.5M4 20l1-4.5L16 4.5a1.4 1.4 0 0 1 2 0l1.5 1.5a1.4 1.4 0 0 1 0 2L8.5 19Z" />
      </Glyph>
    ),
  },
];

function LineCard({ line }: { line: ProductLine }) {
  return (
    <div className="group relative flex h-full flex-col gap-10 rounded-2xl border border-border bg-(--surface) p-5 transition-colors duration-300 hover:bg-(--surface-strong) has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-[10px] border border-border bg-background text-foreground">
          {line.glyph}
        </span>
        <span className="rounded-[4px] border border-border bg-background px-1.5 py-1 font-medium text-[11px] text-muted-foreground uppercase leading-none tracking-[0.06em]">
          {line.tag}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center justify-between gap-2">
          <a
            className="text-xl tracking-[-0.02em] outline-none after:absolute after:inset-0 after:rounded-2xl"
            href={line.href}
          >
            {line.name}
          </a>
          <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
        </span>
        <span className="font-mono text-muted-foreground text-xs">
          {line.size}
        </span>
        <span className="mt-1 text-body text-sm leading-[1.45]">
          {line.description}
        </span>
      </div>
    </div>
  );
}

/** Every product line, each card jumping to the section that shows it running. */
export function HomeProductsSection() {
  return (
    <section className="scroll-mt-20 py-20 md:py-28" id="products">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            badge="What's inside"
            lines={[
              { text: "Everything Cortexcn makes," },
              { text: "in one place.", muted: true },
            ]}
          />
          <p className="max-w-sm text-base text-body leading-[1.45] lg:pb-1.5">
            Every line installs the same way, with the shadcn CLI or your AI
            agent, and leaves the source in your repo. Pick one to see it
            running.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {LINES.map((line, index) => (
            <li className="min-w-0" key={line.name}>
              <Reveal className="h-full" delay={(index % 4) * 80}>
                <LineCard line={line} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
