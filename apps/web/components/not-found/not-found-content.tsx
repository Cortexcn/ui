import Link from "next/link";

import {
  ChevronRightIcon,
  Container,
  PrimaryLink,
  SecondaryLink,
} from "@/components/ui-home/primitives";
import { cn } from "@/lib/utils";

/** CSS-only entrance, as on the home and templates heroes. */
const enterClassName =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

export interface NotFoundLink {
  label: string;
  href: string;
}

export interface NotFoundPlace extends NotFoundLink {
  description: string;
}

interface NotFoundContentProps {
  /** The first line of the heading. */
  title: string;
  /** The second, muted line of the heading. */
  subtitle: string;
  body: string;
  primary: NotFoundLink;
  secondary: NotFoundLink;
  /** Four places to go next, shown as one row of cards on wide screens. */
  places: [NotFoundPlace, NotFoundPlace, NotFoundPlace, NotFoundPlace];
}

/**
 * The body of the www and library 404 pages, in the home's type: a Sentient
 * heading, the yellow call to action, and four places to go instead.
 */
export function NotFoundContent({
  title,
  subtitle,
  body,
  primary,
  secondary,
  places,
}: NotFoundContentProps) {
  return (
    <main className="flex flex-1 flex-col justify-center pt-(--site-header-height)">
      <Container className="py-16 md:py-24">
        <p
          className={cn(
            "inline-flex items-center gap-2.5 text-body text-sm sm:text-base",
            enterClassName,
          )}
        >
          <span className="rounded-[4px] bg-muted px-1.5 py-1 font-medium text-xs uppercase leading-none">
            404
          </span>
          Page not found
        </p>

        <h1
          className={cn(
            "mt-7 font-light font-sentient text-[clamp(2.25rem,8vw,4rem)] leading-[1.06] tracking-[-0.05em]",
            enterClassName,
          )}
        >
          {title}
          <br />
          <span className="text-body">{subtitle}</span>
        </h1>

        <p
          className={cn(
            "mt-6 max-w-lg text-pretty text-body text-lg leading-[1.4] delay-200",
            enterClassName,
          )}
        >
          {body}
        </p>

        <div
          className={cn(
            "mt-9 flex flex-wrap items-center gap-3 delay-300",
            enterClassName,
          )}
        >
          <PrimaryLink href={primary.href}>{primary.label}</PrimaryLink>
          <SecondaryLink href={secondary.href}>{secondary.label}</SecondaryLink>
        </div>

        <nav
          aria-label="Places to go instead"
          className={cn("mt-16 delay-500 md:mt-20", enterClassName)}
        >
          <ul className="grid gap-px overflow-hidden rounded-shell-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {places.map((place) => (
              <li className="flex" key={place.href}>
                <Link
                  className="group flex w-full flex-col gap-2 bg-background p-5 outline-none transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none"
                  href={place.href}
                >
                  <span className="flex items-center justify-between gap-2 font-medium text-foreground">
                    {place.label}
                    <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                  </span>
                  <span className="text-body text-sm leading-snug">
                    {place.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
