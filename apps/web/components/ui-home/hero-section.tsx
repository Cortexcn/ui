import Link from "next/link";
import { ProductHuntBadge } from "@/components/product-hunt-badge";
import { cn } from "@/lib/utils";

import { HeroCanvasLoader } from "./hero-canvas-loader";
import { ChevronRightIcon, PrimaryLink, SecondaryLink } from "./primitives";
import { HeadingWords } from "./reveal";
import { StackTicker } from "./stack-ticker";

const ANNOUNCEMENT = {
  tag: "New",
  text: "The Invoicing Dashboard Kit, with invoices, payouts, and reports",
  href: "/templates/florin",
};

const HEADLINE = [
  { text: "Landing pages" },
  { text: "and dashboards," },
  { text: "one prompt away.", muted: true },
];

/** CSS-only entrance, so the copy animates in before hydration finishes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

export function HeroSection() {
  return (
    <section className="pb-16 md:pb-20" id="hero">
      {/*
        Two columns from lg up: the copy on the left, starting on the header's
        gutter so it lines up with the logo, and the component wall on the
        right, running to the screen's edge. On phones the wall sits below.
      */}
      <div className="lg:grid lg:min-h-[min(880px,100svh)] lg:grid-cols-[min(44rem,50%)_minmax(0,1fr)]">
        <div className="relative z-10 flex items-center px-4 pt-28 pb-10 sm:px-6 md:pt-36 lg:pt-24 lg:pr-4 lg:pb-16 lg:pl-8">
          <div className="flex w-full min-w-0 max-w-[38rem] flex-col items-start">
            <ProductHuntBadge className={cn("mb-6", enterClassName)} />

            <Link
              className={cn(
                "group mb-7 inline-flex max-w-full items-center gap-2.5 text-body text-sm sm:text-base",
                enterClassName,
              )}
              href={ANNOUNCEMENT.href}
            >
              <span className="rounded-[4px] bg-muted px-1.5 py-1 font-medium text-xs uppercase leading-none">
                {ANNOUNCEMENT.tag}
              </span>
              <span className="underline-offset-4 group-hover:underline">
                {ANNOUNCEMENT.text}
              </span>
              <ChevronRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/*
              Three rows, each kept whole. The widest, "one prompt away.", is
              about 7.5 times the font size wide, so the size follows the
              column: the screen width on phones, and the text column beside
              the canvas from lg up.
            */}
            <h1 className="whitespace-nowrap font-light font-sentient text-[min(3.25rem,calc((100vw-3rem)/7.9))] leading-[1.08] tracking-[-0.05em] lg:text-[min(3.25rem,3.6vw)]">
              <HeadingWords
                breakLines
                enterOnLoad
                lines={HEADLINE}
                mutedClassName="text-body"
              />
            </h1>

            <p
              className={cn(
                "mt-6 max-w-lg text-pretty text-body text-lg leading-[1.4] delay-300",
                enterClassName,
              )}
            >
              Components, blocks, charts, AI interfaces, dashboard kits, and
              website templates for shadcn/ui. Ask Claude, Cursor, or VS Code
              for one, and the source lands in your repo, ready to ship.
            </p>

            <div
              className={cn(
                "mt-9 flex flex-wrap items-center gap-3 delay-500",
                enterClassName,
              )}
            >
              <PrimaryLink href="#products">Explore Cortexcn</PrimaryLink>
              <SecondaryLink href="/docs/installation">
                Read the docs
              </SecondaryLink>
            </div>
          </div>
        </div>

        <HeroCanvasLoader className="h-[60svh] min-h-[440px] w-full lg:h-auto lg:min-h-0" />
      </div>

      <StackTicker />
    </section>
  );
}
