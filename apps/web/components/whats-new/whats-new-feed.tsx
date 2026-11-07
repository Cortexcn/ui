import { Badge } from "@cortexcn/ui/components/badge";
import { Button } from "@cortexcn/ui/components/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@cortexcn/ui/components/empty";
import Link from "next/link";
import { Container } from "@/components/ui-home/primitives";
import { FEED_DAYS, type NewDay } from "@/lib/whats-new";
import { NewItemCard } from "./new-item-card";
import { RelativeDay } from "./relative-day";

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "Saturday, November 7, 2026", the same for every visitor. */
function longDate(iso: string) {
  return LONG_DATE.format(new Date(`${iso}T00:00:00Z`));
}

/** One day: a heading that stays under the site header, then its cards. */
function Day({ day }: { day: NewDay }) {
  const headingId = `day-${day.date}`;
  const count = day.entries.length;
  return (
    <li
      aria-labelledby={headingId}
      className="scroll-mt-[calc(var(--site-header-height)+1rem)]"
      id={`feed-${day.date}`}
    >
      <div className="sticky top-(--site-header-height) z-10 -mx-2 mb-6 flex items-center justify-between gap-4 border-border border-b bg-background/90 px-2 py-3 backdrop-blur-md">
        <h2
          className="font-light font-sentient text-2xl tracking-[-0.04em] md:text-[28px]"
          id={headingId}
        >
          <RelativeDay date={day.date} label={longDate(day.date)} />
        </h2>
        <Badge className="shrink-0 tabular-nums" variant="secondary">
          {count} {count === 1 ? "item" : "items"}
        </Badge>
      </div>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {day.entries.map((entry) => (
          <li key={entry.href}>
            <NewItemCard entry={entry} />
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * The feed: every day with something new, newest first, each with a count
 * and a grid of cards across the full width.
 */
export function WhatsNewFeed({ days }: { days: NewDay[] }) {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        {days.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyTitle>Nothing new in the last {FEED_DAYS} days</EmptyTitle>
              <EmptyDescription>
                Every earlier release is in the changelog.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ol className="flex flex-col gap-14 md:gap-20">
            {days.map((day) => (
              <Day day={day} key={day.date} />
            ))}
          </ol>
        )}
        <p className="mt-16 flex flex-wrap items-center gap-x-1 text-body text-sm">
          Looking for an older release? Every one is in the
          <Button asChild className="h-auto px-0" variant="link">
            <Link href="/changelog">changelog.</Link>
          </Button>
        </p>
      </Container>
    </section>
  );
}
