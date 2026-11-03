"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { ThemedImage } from "@/lib/site-templates";
import { usePauseWhenOffscreen } from "@/lib/use-pause-when-offscreen";
import { cn } from "@/lib/utils";
import { TemplateScreenshotCrop } from "./template-screenshot";

export interface DeckSlide {
  key: string;
  image: ThemedImage;
  /** A CSS object-position, for a section further down a full-page capture. */
  position: string;
}

/** How long each screenshot stays in front. */
const STEP_MS = 2000;
/** Cards drawn behind the front one; the rest wait out of sight. */
const VISIBLE_BEHIND = 2;

/**
 * Template screenshots stacked like a deck. Every two seconds the front one
 * goes to the back and the next comes forward. It rests for visitors who
 * prefer less motion, while off screen, and while the tab is hidden.
 */
export function TemplateDeck({ slides }: { slides: DeckSlide[] }) {
  const reduceMotion = useReducedMotion();
  const { ref, paused: offscreen } = usePauseWhenOffscreen();
  const [front, setFront] = useState(0);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const running = reduceMotion === false && !offscreen && !tabHidden;

  useEffect(() => {
    if (!running) {
      return;
    }
    const timer = window.setInterval(
      () => setFront((current) => (current + 1) % slides.length),
      STEP_MS,
    );
    return () => window.clearInterval(timer);
  }, [running, slides.length]);

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/11] w-full pt-6"
      ref={ref}
    >
      {slides.map((slide, index) => {
        // How far behind the front card this one sits.
        const depth = (index - front + slides.length) % slides.length;
        const shown = depth <= VISIBLE_BEHIND;
        return (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 aspect-[16/10] overflow-hidden rounded-lg border bg-background shadow-md transition-[transform,opacity] duration-700 ease-out motion-reduce:transition-none",
              shown ? "opacity-100" : "opacity-0",
            )}
            key={slide.key}
            style={{
              transform: `translateY(${-depth * 12}px) scale(${1 - depth * 0.06})`,
              transformOrigin: "50% 0%",
              zIndex: slides.length - depth,
            }}
          >
            <TemplateScreenshotCrop
              image={slide.image}
              position={slide.position}
              sizes="340px"
            />
          </div>
        );
      })}
    </div>
  );
}
