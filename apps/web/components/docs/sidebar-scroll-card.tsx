"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** How far, in pixels, the list must scroll before an edge counts as cut off. */
const EDGE = 4;

const fadeClassName =
  "pointer-events-none absolute inset-x-0 z-10 h-14 backdrop-blur-[3px] transition-opacity duration-200 motion-reduce:transition-none";

/**
 * The frame of the docs sidebar: a rounded card that scrolls inside. While
 * there is more list above or below, that edge fades out under a soft blur.
 */
export function SidebarScrollCard({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) {
      return;
    }
    const update = () => {
      setEdges({
        top: scroller.scrollTop > EDGE,
        bottom:
          scroller.scrollTop + scroller.clientHeight <
          scroller.scrollHeight - EDGE,
      });
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    // Watch the list too, so opening or closing a group updates the fades.
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    if (scroller.firstElementChild) {
      observer.observe(scroller.firstElementChild);
    }
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-shell-xl border border-border bg-card shadow-sm">
      <div
        className="no-scrollbar h-full overflow-y-auto overscroll-contain"
        ref={scrollRef}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          fadeClassName,
          "top-0 bg-linear-to-b from-card to-transparent [mask-image:linear-gradient(to_bottom,black_35%,transparent)]",
          edges.top ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          fadeClassName,
          "bottom-0 bg-linear-to-t from-card to-transparent [mask-image:linear-gradient(to_top,black_35%,transparent)]",
          edges.bottom ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
