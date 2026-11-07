import { Badge } from "@cortexcn/ui/components/badge";
import { Button } from "@cortexcn/ui/components/button";
import Link from "next/link";
import { Container } from "@/components/ui-home/primitives";
import { HeadingWords } from "@/components/ui-home/reveal";
import { formatChangelogDate } from "@/lib/changelog";
import {
  FEED_DAYS,
  type ShipCalendar,
  type WhatsNewStats,
} from "@/lib/whats-new";
import { ActivityCard } from "./activity-card";

/** The kinds of item the feed holds, each a link to where they all live. */
function kindLinks(stats: WhatsNewStats) {
  return [
    { label: "Blocks", count: stats.byType.block, href: "/blocks" },
    {
      label: "Components",
      count: stats.byType.component,
      href: "/docs/components",
    },
    { label: "Templates", count: stats.byType.template, href: "/templates" },
  ];
}

/**
 * The top of /new. The heading sits on the left, with the totals and a
 * button per kind of item on the right, both on one baseline. The activity
 * card runs the full width underneath.
 */
export function WhatsNewHero({
  stats,
  calendar,
}: {
  stats: WhatsNewStats;
  calendar: ShipCalendar;
}) {
  const span = stats.fromStart
    ? `since ${formatChangelogDate(stats.firstRelease)}`
    : `in the last ${FEED_DAYS} days`;

  return (
    <section className="pt-28 pb-14 md:pt-36 md:pb-20">
      <Container className="flex flex-col gap-10 md:gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div className="flex flex-col items-start gap-5">
            <Badge className="gap-1.5" variant="outline">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
              />
              What's new
            </Badge>
            <h1 className="text-balance font-light font-sentient text-[46px] leading-[1.05] tracking-[-0.05em] md:text-5xl lg:text-[56px]">
              <HeadingWords
                breakLines
                enterOnLoad
                lines={[
                  { text: "What shipped," },
                  { text: "day by day.", muted: true },
                ]}
                mutedClassName="text-body"
              />
            </h1>
            <p className="max-w-md text-pretty text-body text-lg leading-[1.4]">
              Components, blocks, and templates as they ship, newest first. Open
              a card to see it live.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-muted-foreground text-sm tabular-nums">
              {stats.added} new and {stats.updated} updated {span}
            </p>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {kindLinks(stats).map((kind) => (
                <Button asChild key={kind.href} variant="outline">
                  <Link href={kind.href}>
                    {kind.label}
                    <Badge className="tabular-nums" variant="secondary">
                      {kind.count}
                    </Badge>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <ActivityCard calendar={calendar} stats={stats} />
      </Container>
    </section>
  );
}
