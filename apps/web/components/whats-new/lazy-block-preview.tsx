"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";
import { FitToFrame } from "@/components/blocks/fit-to-frame";

/**
 * A block's live preview on a /new card. The previews load only once a card
 * nears the screen, so a long day of blocks does not draw them all at once.
 */
export function LazyBlockPreview({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [Preview, setPreview] = useState<ComponentType | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || near) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    if (!near) {
      return;
    }
    let alive = true;
    import("@/blocks/previews").then((mod) => {
      const found = mod.BLOCK_PREVIEWS[slug as keyof typeof mod.BLOCK_PREVIEWS];
      if (alive && found) {
        setPreview(() => found);
      }
    });
    return () => {
      alive = false;
    };
  }, [near, slug]);

  return (
    <div className="size-full" ref={ref}>
      {Preview ? (
        <FitToFrame className="aspect-4/3">
          <Preview />
        </FitToFrame>
      ) : (
        <div
          aria-hidden="true"
          className="aspect-4/3 w-full animate-pulse bg-muted/60 motion-reduce:animate-none"
        />
      )}
    </div>
  );
}
