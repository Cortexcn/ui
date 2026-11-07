import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@cortexcn/ui/components/tooltip";
import Link from "next/link";
import { type CSSProperties, Fragment } from "react";
import { formatChangelogDate } from "@/lib/changelog";
import { cn } from "@/lib/utils";
import {
  CALENDAR_WEEKS,
  type ShipCalendar,
  type ShipDay,
  type ShipLevel,
} from "@/lib/whats-new";

export type GraphMetric = "items" | "releases";

/** GitHub's five steps, in the theme's success green. */
export const LEVEL_CLASS: Record<ShipLevel, string> = {
  0: "bg-foreground/[0.07]",
  1: "bg-success/30",
  2: "bg-success/55",
  3: "bg-success/80",
  4: "bg-success",
};

/** Weeks shown on phones, where a whole year would shrink the days to dots. */
const FEW_WEEKS = 20;

const WEEKDAYS = [
  { name: "Sun", shown: false },
  { name: "Mon", shown: true },
  { name: "Tue", shown: false },
  { name: "Wed", shown: true },
  { name: "Thu", shown: false },
  { name: "Fri", shown: true },
  { name: "Sat", shown: false },
];

const cellClassName =
  "block aspect-square w-full rounded-[3px] ring-1 ring-foreground/[0.04] ring-inset";

/** Days before these are left out on phones. */
const hiddenOnPhones = (week: number) =>
  week < CALENDAR_WEEKS - FEW_WEEKS ? "hidden md:block" : undefined;

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function DayCell({
  day,
  week,
  metric,
}: {
  day: ShipDay;
  week: number;
  metric: GraphMetric;
}) {
  const level = metric === "items" ? day.itemLevel : day.releaseLevel;
  const hidden = hiddenOnPhones(week);
  if (day.future) {
    return <span aria-hidden="true" className={cn("block", hidden)} />;
  }
  if (day.releases === 0) {
    return (
      <span
        aria-hidden="true"
        className={cn(cellClassName, LEVEL_CLASS[0], hidden)}
      />
    );
  }

  const date = formatChangelogDate(day.date);
  const summary =
    metric === "items"
      ? `${plural(day.items, "item")} on ${date}`
      : `${plural(day.releases, "release")} on ${date}`;
  const detail =
    metric === "items"
      ? plural(day.releases, "release")
      : plural(day.items, "item");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          aria-label={`${summary}, ${detail}`}
          className={cn(
            cellClassName,
            LEVEL_CLASS[level],
            "outline-none transition-transform hover:scale-125 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            hidden,
          )}
          href={day.inFeed ? `#feed-${day.date}` : "/changelog"}
        />
      </TooltipTrigger>
      <TooltipContent side="top">
        <span className="font-medium">{summary}</span>
        <span className="opacity-70">{detail}</span>
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * A GitHub-style activity graph: a column per week and a row per weekday,
 * each day shaded by how much shipped. Days with a release show their counts
 * on hover or focus and jump to that day on the feed. Months, weekdays, and
 * days share one grid, so every label sits on its column or row. Phones see
 * the last {@link FEW_WEEKS} weeks.
 */
export function ContributionGraph({
  calendar,
  metric,
}: {
  calendar: ShipCalendar;
  metric: GraphMetric;
}) {
  const monthAt = new Map(
    calendar.months.map((month) => [month.column, month.label]),
  );
  const columns = {
    "--weeks-all": CALENDAR_WEEKS,
    "--weeks-few": FEW_WEEKS,
  } as CSSProperties;

  return (
    <div
      className="grid grid-cols-[auto_repeat(var(--weeks),minmax(0,1fr))] gap-[3px] text-[10px] text-muted-foreground leading-none [--weeks:var(--weeks-few)] md:[--weeks:var(--weeks-all)]"
      style={columns}
    >
      <span aria-hidden="true" />
      {calendar.weeks.map((week, column) => (
        <span
          aria-hidden="true"
          className={cn(
            "h-4 overflow-visible whitespace-nowrap",
            hiddenOnPhones(column),
          )}
          key={`month-${week[0]?.date}`}
        >
          {monthAt.get(column) ?? ""}
        </span>
      ))}
      {WEEKDAYS.map((weekday, row) => (
        <Fragment key={weekday.name}>
          <span aria-hidden="true" className="flex items-center pr-2">
            {weekday.shown ? weekday.name : ""}
          </span>
          {calendar.weeks.map((week, column) => {
            const day = week[row];
            return day ? (
              <DayCell day={day} key={day.date} metric={metric} week={column} />
            ) : null;
          })}
        </Fragment>
      ))}
    </div>
  );
}

/** "Less", the five shades, "More", as under GitHub's graph. */
export function GraphLegend() {
  return (
    <span
      aria-hidden="true"
      className="flex items-center gap-1 text-[11px] text-muted-foreground"
    >
      Less
      {([0, 1, 2, 3, 4] as const).map((level) => (
        <span
          className={cn(
            "size-2.5 rounded-[2px] ring-1 ring-foreground/[0.04] ring-inset",
            LEVEL_CLASS[level],
          )}
          key={level}
        />
      ))}
      More
    </span>
  );
}
