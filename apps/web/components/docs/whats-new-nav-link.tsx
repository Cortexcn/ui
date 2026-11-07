"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import Link from "next/link";
import {
  type RefObject,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";
import type { WhatsNewNav } from "@/lib/whats-new";
import { NewsTicker } from "./news-ticker";

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

/** Tailwind's `xl`: below it the header has no room for the ticker at all. */
const WIDE_QUERY = "(min-width: 80rem)";

/** The slot's width plus the gap before it, in pixels. */
const SLOT_SPACE = 186;

/** Spare room the header keeps beside the nav, so its buttons never squeeze. */
const BUFFER = 8;

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useWide() {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false,
  );
}

/**
 * Whether the header row has room for the ticker. It measures the spare
 * space between the nav and the buttons on the right (marked
 * `data-header-actions`), hides the ticker once that runs out, and brings it
 * back only when the whole slot fits again, so it never flickers at the edge.
 */
function useRoomForTicker(slotRef: RefObject<HTMLElement | null>) {
  const [room, setRoom] = useState(true);

  useEffect(() => {
    const nav = slotRef.current?.closest("nav");
    const row = nav?.parentElement;
    const actions = row?.querySelector<HTMLElement>(
      ":scope > [data-header-actions]",
    );
    if (!(nav && row && actions)) {
      return;
    }
    const check = () => {
      const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
      const spare =
        actions.getBoundingClientRect().left -
        nav.getBoundingClientRect().right -
        gap;
      setRoom((shown) =>
        shown ? spare >= BUFFER : spare >= SLOT_SPACE + BUFFER,
      );
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(row);
    observer.observe(nav);
    observer.observe(actions);
    return () => observer.disconnect();
  }, [slotRef]);

  return room;
}

/**
 * The first item in the library nav: "New" with a live dot, the week's count,
 * and, when the header has room, a line that cycles through what just
 * shipped. It links to /new, and the line pauses while the link is hovered
 * or focused.
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
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const slotRef = useRef<HTMLSpanElement>(null);
  const wide = useWide();
  const room = useRoomForTicker(slotRef);

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
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        render={<Link href={nav.url} />}
      >
        <LiveDot />
        <span>New</span>
        <NewCount count={nav.count} />
        <span
          className={cn(
            "hidden h-5 w-44 items-center gap-2.5 overflow-hidden",
            room && "xl:flex",
          )}
          ref={slotRef}
        >
          <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-border" />
          <NewsTicker
            className="h-full min-w-0 flex-1 overflow-hidden font-normal text-[13px] text-foreground/85 [mask-image:linear-gradient(to_right,#000_82%,transparent)]"
            messages={nav.messages}
            paused={hovered || focused || !(wide && room)}
          />
        </span>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

/** The same item in the mobile menu sheet, where the ticker runs while the sheet is open. */
export function WhatsNewMobileLink({
  nav,
  active,
  open,
  className,
  onClose,
}: {
  nav: WhatsNewNav;
  active: boolean;
  open: boolean;
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
      <NewsTicker
        className="ml-auto h-5 w-40 min-w-0 overflow-hidden font-normal text-muted-foreground text-xs"
        messages={nav.messages}
        paused={!open}
      />
    </Link>
  );
}
