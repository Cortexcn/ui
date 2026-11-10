"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { WhatsNewNav } from "@/lib/whats-new";

/** A violet dot with a slow ping, the sign that something just shipped. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative flex size-1.5 shrink-0", className)}
    >
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60 [animation-duration:2s] motion-reduce:animate-none" />
      <span className="relative inline-flex size-1.5 rounded-full bg-violet-400" />
    </span>
  );
}

/** This week's count of new items, in a small violet chip. */
export function NewCount({ count }: { count: number }) {
  if (count <= 0) {
    return null;
  }
  return (
    <span
      aria-hidden="true"
      className="shrink-0 rounded-sm bg-violet-400/15 px-1 py-px font-mono font-semibold text-[10.5px] text-violet-200 tabular-nums leading-tight ring-1 ring-violet-400/25 ring-inset"
    >
      {count}
    </span>
  );
}

/**
 * The first item in the library nav: "New" with a live dot and the week's
 * count. It links to /new.
 */
export function WhatsNewNavLink({
  nav,
  active,
  className,
}: {
  nav: WhatsNewNav;
  active: boolean;
  className: string;
}) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        active={active}
        aria-label={nav.label}
        className={cn(
          className,
          "gap-2 text-foreground/90",
          active && "bg-muted/70",
        )}
        render={<Link href={nav.url} />}
      >
        <LiveDot />
        <span>New</span>
        <NewCount count={nav.count} />
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

/** The same item in the mobile menu sheet. */
export function WhatsNewMobileLink({
  nav,
  active,
  className,
  onClose,
}: {
  nav: WhatsNewNav;
  active: boolean;
  className: string;
  onClose: () => void;
}) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      aria-label={nav.label}
      className={cn(className, "gap-2 font-medium")}
      href={nav.url}
      onClick={onClose}
    >
      <LiveDot />
      New
      <NewCount count={nav.count} />
    </Link>
  );
}
