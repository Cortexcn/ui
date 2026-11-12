"use client";

import { Activity, type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A live example laid out at `width` by `height` pixels, about its size on
 * its own page, then scaled to the width of its window. It mounts once it
 * comes near the screen and pauses while off screen. Decorative, since the
 * panel around it has a label, so it is inert and hidden from assistive
 * technology.
 */
export function ScaledFrame({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: ReactNode;
  /** Classes for the laid-out frame, such as its padding and alignment. */
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) {
      return;
    }
    const resize = new ResizeObserver(([entry]) => {
      setScale((entry?.contentRect.width ?? 0) / width);
    });
    const view = new IntersectionObserver(
      ([entry]) => {
        const near = entry?.isIntersecting ?? false;
        setVisible(near);
        if (near) {
          setMounted(true);
        }
      },
      { rootMargin: "200px" },
    );
    resize.observe(box);
    view.observe(box);
    return () => {
      resize.disconnect();
      view.disconnect();
    };
  }, [width]);

  return (
    <div
      className="relative overflow-hidden"
      ref={boxRef}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {mounted && scale > 0 ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-0 left-0 flex items-center justify-center text-foreground",
            className,
          )}
          inert
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          <Activity mode={visible ? "visible" : "hidden"}>{children}</Activity>
        </div>
      ) : null}
    </div>
  );
}
