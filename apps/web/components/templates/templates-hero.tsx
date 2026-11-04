"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import {
  ChevronRightIcon,
  PrimaryLink,
  SecondaryLink,
} from "@/components/ui-home/primitives";
import { PRO_PRICING_PATH } from "@/lib/pro";
import { cn } from "@/lib/utils";

// The wall of screenshots loads in the browser after the hero's text has
// painted, as on the landing page and /blocks.
const TemplatesHeroCanvas = dynamic(
  () =>
    import("@/components/templates/templates-hero-canvas").then(
      (mod) => mod.TemplatesHeroCanvas,
    ),
  { ssr: false },
);

/** CSS-only entrance, so the copy animates in before hydration finishes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

interface TemplatesHeroProps {
  landings: number;
  kits: number;
}

/**
 * The top of /templates, built like the landing page and /blocks heroes: the
 * copy on the left, and on the right a wall of template screens that a camera
 * glides across.
 */
export function TemplatesHero({ landings, kits }: TemplatesHeroProps) {
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
              href="/templates/mirador"
            >
              <span className="rounded-[4px] bg-muted px-1.5 py-1 font-medium text-xs uppercase leading-none">
                New
              </span>
              <span className="truncate underline-offset-4 group-hover:underline">
                Mirador, an AWS monitoring dashboard
              </span>
              <ChevronRightIcon className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <h1
              className={cn(
                "font-light font-sentient text-[min(3.25rem,calc((100vw-3rem)/9.6))] leading-[1.08] tracking-[-0.05em] lg:text-[min(3.25rem,3.6vw)]",
                enterClassName,
              )}
            >
              Templates for every launch,
              <br />
              <span className="text-body">ready to ship.</span>
            </h1>

            <p
              className={cn(
                "mt-6 max-w-lg text-pretty text-body text-lg leading-[1.4] delay-200",
                enterClassName,
              )}
            >
              {landings} one-page sites and {kits} dashboard kits, designed and
              built by Cortexcn. Each one adapts to every screen, switches
              between light and dark, and ships as a Next.js project you own.
            </p>

            <div
              className={cn(
                "mt-9 flex flex-wrap items-center gap-3 delay-300",
                enterClassName,
              )}
            >
              <PrimaryLink href="#templates">Browse templates</PrimaryLink>
              <SecondaryLink href={PRO_PRICING_PATH}>
                Get every template with Pro
              </SecondaryLink>
            </div>
          </div>
        </div>

        {/* Screens read at a glance only on wide layouts, so the wall shows there. */}
        <div className="relative hidden w-full lg:block">
          <TemplatesHeroCanvas className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
