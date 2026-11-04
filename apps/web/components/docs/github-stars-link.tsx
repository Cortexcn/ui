"use client";

import { Icon } from "@cortexcn/icons";
import { useEffect, useState } from "react";

import { OPEN_SOURCE_REPO_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Asked once per visit and kept, so moving between pages does not ask again. */
let starsRequest: Promise<number | null> | null = null;

function loadStars() {
  starsRequest ??= fetch("/api/github-stars")
    .then((response) => (response.ok ? response.json() : { stars: null }))
    .then((data: { stars: number | null }) => data.stars)
    .catch(() => null);
  return starsRequest;
}

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * The header's link to the open-source repository, with its star count.
 * The count's space is kept while it loads, so the header doesn't shift;
 * if GitHub can't be reached, the link shows the icon alone.
 */
export function GitHubStarsLink({ className }: { className?: string }) {
  // undefined while loading, null when the count is unavailable.
  const [stars, setStars] = useState<number | null | undefined>(undefined);

  useEffect(() => {
    let live = true;
    loadStars().then((count) => {
      if (live) {
        setStars(count);
      }
    });
    return () => {
      live = false;
    };
  }, []);

  const label =
    typeof stars === "number"
      ? `Cortexcn on GitHub, ${stars} ${stars === 1 ? "star" : "stars"}`
      : "Cortexcn on GitHub, the open-source components";

  return (
    <a
      aria-label={label}
      className={cn(
        "hidden h-9 shrink-0 items-center justify-center gap-1.5 rounded-shell-sm border border-border bg-muted/60 px-2.5 text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 sm:inline-flex",
        className,
      )}
      href={OPEN_SOURCE_REPO_URL}
      rel="noopener noreferrer"
      target="_blank"
      title="Star Cortexcn on GitHub"
    >
      <Icon aria-hidden="true" className="size-4" name="IconGithub" />
      {stars === null ? null : (
        <span
          aria-hidden="true"
          className="min-w-[2ch] font-medium text-foreground tabular-nums"
        >
          {typeof stars === "number" ? compact.format(stars) : ""}
        </span>
      )}
    </a>
  );
}
