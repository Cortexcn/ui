"use client";

import { type ReactNode, useEffect, useState } from "react";
import type { TemplateFilter } from "@/lib/site-templates";
import { cn } from "@/lib/utils";

export interface TemplateGalleryItem {
  slug: string;
  /** The filter slugs this template matches. */
  filters: string[];
  row: ReactNode;
}

const chipClassName =
  "flex h-9 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors";

/**
 * The category chips and the template rows they filter. A ?category= link
 * opens on that filter, and picking one updates the address without a reload.
 */
export function TemplateGallery({
  filters,
  items,
}: {
  filters: TemplateFilter[];
  items: TemplateGalleryItem[];
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "category",
    );
    if (filters.some((filter) => filter.slug === requested && !filter.soon)) {
      setActive(requested ?? "");
    }
  }, [filters]);

  const choose = (slug: string) => {
    setActive(slug);
    window.history.replaceState(
      null,
      "",
      slug ? `?category=${slug}` : window.location.pathname,
    );
  };

  const visible = active
    ? items.filter((item) => item.filters.includes(active))
    : items;
  const options = [
    { slug: "", name: "All", count: items.length },
    ...filters.map((filter) => ({
      ...filter,
      count: items.filter((item) => item.filters.includes(filter.slug)).length,
    })),
  ];

  return (
    <div className="flex flex-col">
      <nav
        aria-label="Template categories"
        className="border-y bg-muted/30 py-3"
      >
        <ul className="no-scrollbar container mx-auto flex gap-2 overflow-x-auto">
          {options.map((option) => (
            <li className="shrink-0" key={option.slug || "all"}>
              {"soon" in option && option.soon ? (
                <span
                  aria-disabled="true"
                  className={cn(chipClassName, "text-foreground/70")}
                >
                  {option.name}
                  <span className="rounded-full bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground uppercase">
                    Soon
                  </span>
                </span>
              ) : (
                <button
                  aria-pressed={active === option.slug}
                  className={cn(
                    chipClassName,
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active === option.slug
                      ? "border-transparent bg-foreground font-medium text-background"
                      : "text-foreground hover:bg-muted",
                  )}
                  onClick={() => choose(option.slug)}
                  type="button"
                >
                  {option.name}
                  <span className="font-mono text-xs tabular-nums opacity-70">
                    {option.count}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="container mx-auto flex flex-col divide-y">
        {visible.map((item) => (
          <div key={item.slug}>{item.row}</div>
        ))}
      </div>
    </div>
  );
}
