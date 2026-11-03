"use client";

import { useEffect, useState } from "react";
import { STATUS_PAGE } from "@/lib/site-config";
import {
  isSystemState,
  SYSTEM_STATE_LABELS,
  type SystemState,
} from "@/lib/system-status-state";
import { cn } from "@/lib/utils";

const DOT_COLORS: Record<SystemState, string> = {
  operational: "bg-success",
  "partial-outage": "bg-warning",
  "major-outage": "bg-destructive",
};

/**
 * The live state of Cortexcn's monitors, linking to the public status page.
 * It reads the cached /api/status and shows nothing until it has a state it
 * can verify, so a failed check never shows as operational.
 */
export function StatusBadge({
  className,
  separator = false,
}: {
  className?: string;
  /** A dot before the badge, for a row of credits. Hidden with the badge. */
  separator?: boolean;
}) {
  const [state, setState] = useState<SystemState | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/status", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((body: { state?: unknown } | null) => {
        const next = body?.state;
        setState(isSystemState(next) ? next : null);
      })
      .catch(() => {
        // Aborted, offline, or not JSON: keep the badge hidden.
      });
    return () => controller.abort();
  }, []);

  if (!state) {
    return null;
  }

  const dot = DOT_COLORS[state];
  return (
    <>
      {separator ? (
        <span aria-hidden className="text-muted-foreground">
          ·
        </span>
      ) : null}
      <a
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-sm underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        href={STATUS_PAGE.url}
        rel="noopener"
        target="_blank"
      >
        <span aria-hidden className="relative flex size-2">
          <span
            className={cn(
              "absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping",
              dot,
            )}
          />
          <span
            className={cn("relative inline-flex size-2 rounded-full", dot)}
          />
        </span>
        {SYSTEM_STATE_LABELS[state]}
        <span className="sr-only">, opens the status page in a new tab</span>
      </a>
    </>
  );
}
