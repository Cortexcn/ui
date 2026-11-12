import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { type Artwork, Painting } from "./painting";
import {
  Container,
  PrimaryLink,
  SecondaryLink,
  SectionBadge,
} from "./primitives";
import { type HeadingLine, Reveal, RevealHeading } from "./reveal";

export interface ShowcaseStat {
  value: string;
  label: string;
}

export interface ShowcaseLink {
  label: string;
  href: string;
  /** Opens a page outside the app, such as a live preview, in a new tab. */
  newTab?: boolean;
}

/** The painted panel is seven twelfths of the container on desktop. */
const STAGE_SIZES =
  "(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw";

/**
 * One product line on the home page: what it is, three numbers, an Explore
 * and a Docs button, and a painted panel with live examples from the line.
 * `reverse` puts the panel on the left, so the lines alternate down the page.
 */
export function ProductShowcase({
  id,
  badge,
  tag,
  lines,
  description,
  stats,
  primary,
  secondary,
  art,
  stage,
  stageLabel,
  reverse = false,
}: {
  id: string;
  badge: string;
  /** Free, Pro, or a starting price, beside the badge. */
  tag: string;
  lines: HeadingLine[];
  description: ReactNode;
  stats: ShowcaseStat[];
  primary: ShowcaseLink;
  secondary: ShowcaseLink;
  art: Artwork;
  stage: ReactNode;
  /** Read out in place of the panel, which pictures the examples. */
  stageLabel: string;
  reverse?: boolean;
}) {
  return (
    <section className="scroll-mt-20 py-16 md:py-24" id={id}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <ShowcaseCopy
            badge={badge}
            className={cn("lg:col-span-5", reverse && "lg:order-last")}
            description={description}
            lines={lines}
            primary={primary}
            secondary={secondary}
            stats={stats}
            tag={tag}
          />

          <Reveal className="min-w-0 lg:col-span-7">
            <div
              aria-label={stageLabel}
              className="relative aspect-square overflow-hidden rounded-2xl border border-border sm:aspect-6/5"
              role="img"
            >
              <Painting art={art} sizes={STAGE_SIZES} />
              {stage}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * A product line's copy: the badge and tag, the heading, a description, the
 * numbers when it has them, and its two buttons.
 */
export function ShowcaseCopy({
  badge,
  tag,
  lines,
  description,
  stats,
  primary,
  secondary,
  className,
}: {
  badge: string;
  tag: string;
  lines: HeadingLine[];
  description: ReactNode;
  stats?: ShowcaseStat[];
  primary: ShowcaseLink;
  secondary: ShowcaseLink;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col items-start", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <SectionBadge>{badge}</SectionBadge>
        <span className="rounded-[4px] border border-border bg-(--surface) px-1.5 py-1 font-medium text-[11px] text-muted-foreground uppercase leading-none tracking-[0.06em]">
          {tag}
        </span>
      </div>

      <RevealHeading
        className="mt-5 max-w-xl font-light font-sentient text-[38px] leading-[1.05] tracking-[-0.05em] md:text-[40px] lg:text-[46px]"
        lines={lines}
      />

      <p className="mt-5 max-w-lg text-pretty text-base text-body leading-[1.5] md:text-[17px]">
        {description}
      </p>

      {stats ? (
        <dl className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4 border-border border-t pt-5">
          {stats.map((stat) => (
            <div
              className="flex flex-col-reverse justify-end gap-1.5"
              key={stat.label}
            >
              <dt className="text-pretty text-muted-foreground text-sm leading-[1.35]">
                {stat.label}
              </dt>
              <dd className="font-light font-sentient text-[32px] leading-none tracking-[-0.04em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <PrimaryLink href={primary.href}>{primary.label}</PrimaryLink>
        <SecondaryLink href={secondary.href} newTab={secondary.newTab}>
          {secondary.label}
        </SecondaryLink>
      </div>
    </div>
  );
}

/** The one example on a panel, centered on the painting. */
export function StageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-[4%]">
      <div className="w-full">{children}</div>
    </div>
  );
}
