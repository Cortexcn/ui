"use client";

import { useEffect, useState } from "react";

const DAY_MS = 24 * 60 * 60 * 1000;

/** The visitor's own calendar day, `YYYY-MM-DD`. */
function localDay(offsetDays = 0) {
  const date = new Date(Date.now() - offsetDays * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * A day heading: "Saturday, November 7, 2026" from the server, which reads
 * "Today" or "Yesterday" once the page knows the visitor's date. The full
 * date stays beside it.
 */
export function RelativeDay({ date, label }: { date: string; label: string }) {
  const [relative, setRelative] = useState<string | null>(null);

  useEffect(() => {
    if (date === localDay()) {
      setRelative("Today");
    } else if (date === localDay(1)) {
      setRelative("Yesterday");
    }
  }, [date]);

  return (
    <time className="flex flex-wrap items-baseline gap-x-3" dateTime={date}>
      {relative ? (
        <>
          <span>{relative}</span>
          <span className="font-normal font-sans text-muted-foreground text-sm tracking-normal">
            {label}
          </span>
        </>
      ) : (
        label
      )}
    </time>
  );
}
