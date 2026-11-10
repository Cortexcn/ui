"use client";

import { Icon } from "@cortexcn/icons";
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  type TOCItemType,
} from "fumadocs-core/toc";
import { useRef } from "react";
import { SPONSOR_URL } from "@/lib/site-config";
import { OutlineLine, outlineIndent } from "./toc-outline";

interface TableOfContentsProps {
  items: TOCItemType[];
}

/** A card that asks readers to back the library on GitHub Sponsors. */
function SponsorCard() {
  return (
    <a
      className="group/sponsor block shrink-0 rounded-shell-xl border border-border bg-card p-4 no-underline shadow-sm outline-none transition-[border-color,box-shadow] duration-200 hover:border-pink-500/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none [@media(max-height:620px)]:hidden"
      href={SPONSOR_URL}
      rel="noopener"
      target="_blank"
    >
      <span className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-shell-sm bg-pink-500/10 text-pink-500 ring-1 ring-pink-500/25">
          <Icon className="size-4.5" name="IconSparklesSoft" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold text-foreground text-sm tracking-tight">
            Sponsor Cortexcn
          </span>
          <span className="text-muted-foreground text-xs">
            On GitHub Sponsors
          </span>
        </span>
      </span>
      <span className="mt-3 block text-muted-foreground text-xs leading-relaxed">
        Sponsoring helps fund new components, charts, and blocks, and keeps
        these docs up to date.
      </span>
      <span className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-shell-sm border border-border bg-background font-medium text-foreground text-sm transition-colors group-hover/sponsor:bg-muted motion-reduce:transition-none">
        <Icon className="size-4 text-pink-500" name="IconSparklesSoft" />
        Become a sponsor
        <Icon
          className="size-3.5 text-muted-foreground"
          name="IconArrowUpRight"
        />
      </span>
    </a>
  );
}

/**
 * The right rail: the page's headings, then the sponsor card. The templates
 * card sits at the foot of the left sidebar.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="fixed top-(--site-header-height) right-0 hidden h-[calc(100vh-var(--site-header-height))] w-72 overflow-hidden px-5 pt-8 pb-6 xl:block">
      <div className="flex h-full flex-col gap-6">
        {items.length > 0 ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <p className="m-0 mb-2 px-3 font-medium text-foreground text-sm">
              On this page
            </p>
            <AnchorProvider toc={items}>
              <div
                className="min-h-0 flex-1 overflow-y-auto"
                ref={containerRef}
              >
                <ScrollProvider containerRef={containerRef}>
                  {/* Positioned, so the line's measurements start here. */}
                  <div className="relative ml-3" ref={listRef}>
                    <OutlineLine items={items} listRef={listRef} />
                    <ul className="m-0 list-none p-0">
                      {items.map((item) => (
                        <li key={item.url}>
                          <TOCItem
                            className="block py-1.5 pr-1 text-[13px] text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:text-foreground"
                            href={item.url}
                            style={{ paddingLeft: outlineIndent(item.depth) }}
                          >
                            {item.title}
                          </TOCItem>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollProvider>
              </div>
            </AnchorProvider>
          </div>
        ) : (
          <div className="flex-1" />
        )}
        <SponsorCard />
      </div>
    </aside>
  );
}
