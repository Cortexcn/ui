"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import {
  ChevronRightIcon,
  PrimaryLink,
  SecondaryLink,
} from "@/components/ui-home/primitives";
import { PRO_PATH } from "@/lib/pro";
import { cn } from "@/lib/utils";

// A dozen live blocks are heavy, so the wall loads in the browser after the
// hero's text has painted, as on the landing page.
const BlocksHeroCanvas = dynamic(
  () =>
    import("@/components/blocks/blocks-hero-canvas").then(
      (mod) => mod.BlocksHeroCanvas,
    ),
  { ssr: false },
);

/** CSS-only entrance, so the copy animates in before hydration finishes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

interface BlocksHeroProps {
  total: number;
  free: number;
  pro: number;
}

/**
 * The top of /blocks, built like the landing page hero: the copy on the left,
 * and on the right a wall of live blocks that a camera glides across.
 */
export function BlocksHero({ total, free, pro }: BlocksHeroProps) {
  return (
    <section className="pb-6 md:pb-10">
      <div className="lg:grid lg:min-h-[min(680px,80svh)] lg:grid-cols-[min(42rem,48%)_minmax(0,1fr)]">
        <div className="relative z-10 flex items-center px-4 pt-12 pb-6 sm:px-6 md:pt-16 lg:pt-12 lg:pr-4 lg:pb-12 lg:pl-8">
          <div className="flex w-full min-w-0 max-w-[36rem] flex-col items-start">
            <Link
              className={cn(
                "group mb-7 inline-flex max-w-full items-center gap-2.5 text-body text-sm sm:text-base",
                enterClassName,
              )}
              href="/blocks?category=chart-groups"
            >
              <span className="rounded-[4px] bg-muted px-1.5 py-1 font-medium text-xs uppercase leading-none">
                New
              </span>
              <span className="underline-offset-4 group-hover:underline">
                15 chart groups, now in Cortexcn Pro
              </span>
              <ChevronRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <h1
              className={cn(
                "font-light font-sentient text-[min(3.25rem,calc((100vw-3rem)/9.6))] leading-[1.08] tracking-[-0.05em] lg:text-[min(3.25rem,3.6vw)]",
                enterClassName,
              )}
            >
              Blocks for every page,
              <br />
              <span className="text-body">ready to ship.</span>
            </h1>

            <p
              className={cn(
                "mt-6 max-w-lg text-pretty text-body text-lg leading-[1.4] delay-200",
                enterClassName,
              )}
            >
              {total} sections, chart groups, and dashboards, designed and built
              by Cortexcn. Preview any block live, install the {free} free ones
              with one command, and get the other {pro} with Cortexcn Pro.
            </p>

            <div
              className={cn(
                "mt-9 flex flex-wrap items-center gap-3 delay-300",
                enterClassName,
              )}
            >
              <PrimaryLink href="#blocks">Browse blocks</PrimaryLink>
              <SecondaryLink href={PRO_PATH}>See Cortexcn Pro</SecondaryLink>
            </div>
          </div>
        </div>

        {/* Blocks are wide layouts, so the wall only shows where they read at a glance. */}
        <div className="relative hidden w-full lg:block">
          <BlocksHeroCanvas className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
