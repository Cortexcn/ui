import Link from "next/link";

import { SiteHeader } from "@/components/docs/site-header";
import { InteractiveGrid } from "@/components/landing/interactive-grid";
import { ActionLink } from "@/components/landing/kit";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Container } from "@/components/landing/primitives";
import { SITE_CTA, siteNavItems } from "@/lib/nav-menus";
import { cn } from "@/lib/utils";

/** CSS-only entrance, as on the Studio hero. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/** The Studio pages a lost visitor most likely wanted. */
const PLACES = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

/**
 * The 404 page of studio.cortexcn.dev, in the Studio's own look: the dark
 * grid band from its home, pixel type, square buttons, and its footer.
 */
export function StudioNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader cta={SITE_CTA} items={siteNavItems()} variant="landing" />
      {/* The Studio theme, scoped as on its pages (see app/(site)/(landing)/layout.tsx). */}
      <div className="syntiq flex flex-1 flex-col bg-background text-foreground">
        <main className="flex-1">
          {/* The band starts under the fixed header, as on the Studio home. */}
          <div className="relative h-75 pt-(--site-header-height) text-(--band-foreground) md:h-90">
            <InteractiveGrid className="absolute inset-0" />
            {/* Lets pointer events through, so the grid under it still reacts. */}
            <Container className="pointer-events-none relative flex h-full flex-col justify-center gap-3">
              <span
                className={cn(
                  "self-start bg-(--band-line) px-1.5 py-0.5 font-mono text-xs uppercase",
                  enterClassName,
                )}
              >
                Error 404
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "font-pixel text-[clamp(5rem,24vw,10rem)] leading-none delay-100",
                  enterClassName,
                )}
              >
                404
              </span>
            </Container>
          </div>

          <Container className="grid gap-10 pt-14 pb-20 md:pt-16 md:pb-24 xl:grid-cols-[minmax(0,1fr)_28rem] xl:gap-12">
            <h1
              className={cn(
                "font-medium text-[clamp(2.25rem,10.5vw,2.75rem)] leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[4.5rem]",
                enterClassName,
              )}
            >
              This page
              <br />
              <span className="font-normal font-pixel text-[0.86em] text-primary tracking-normal sm:text-[1em]">
                [went missing]
              </span>
            </h1>

            <div
              className={cn(
                "flex flex-col gap-7 delay-200 xl:pt-3",
                enterClassName,
              )}
            >
              <p className="max-w-md text-balance text-lg text-muted-foreground leading-relaxed">
                The page you asked for isn't on the Studio site. It may have
                moved, or the address may have a typo.
              </p>

              <div className="flex flex-wrap gap-3">
                <ActionLink href="/" label="Back to Studio" />
                <ActionLink
                  href="/contact"
                  label="Start a project"
                  variant="outline"
                />
              </div>

              <nav aria-label="Studio pages">
                <ul className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
                  {PLACES.map((place) => (
                    <li className="flex" key={place.href}>
                      <Link
                        className="flex w-full items-center gap-2 bg-background px-3 py-2.5 font-mono text-muted-foreground text-sm uppercase outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none"
                        href={place.href}
                      >
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 bg-primary"
                        />
                        {place.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Container>
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
