"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FlutedLayer } from "./fluted-glass/fluted-layer";
import { SlideCaption } from "./fluted-glass/slide-caption";
import { SlideControls } from "./fluted-glass/slide-controls";
import { SlideProgress } from "./fluted-glass/slide-progress";
import { DEFAULT_SLIDES, type Slide } from "./fluted-glass/slides";
import { usePageHidden, useSlideshow } from "./fluted-glass/use-slideshow";

export type { Slide } from "./fluted-glass/slides";

export interface FlutedGlassSlideshowProps {
  slides?: Slide[];
  /** Seconds each slide stays while the slideshow plays. */
  interval?: number;
  /** Vertical ribs in the glass. Fewer, wider ribs bend the picture more. */
  flutes?: number;
  /** Moves on by itself. Always off for visitors who prefer less motion. */
  autoPlay?: boolean;
  /** Names the slideshow for screen readers. */
  label?: string;
  className?: string;
}

/**
 * A wide slideshow where each new slide arrives through fluted glass: cut
 * into vertical ribs that bend it, which clear one after another as it lands.
 * It plays on its own; pointing at it holds it, and focus inside or the
 * pause button stops it until Play is pressed. Arrow keys, the previous and
 * next buttons, and the bars along the bottom move between slides.
 */
export function FlutedGlassSlideshow({
  slides = DEFAULT_SLIDES,
  interval = 6,
  flutes = 24,
  autoPlay = true,
  label = "Paintings",
  className,
}: FlutedGlassSlideshowProps) {
  const show = useSlideshow(slides.length);
  const reduceMotion = useReducedMotion();
  const pageHidden = usePageHidden();
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  /** Play pressed while focus is inside, which overrides the focus pause. */
  const [resumed, setResumed] = useState(false);

  const autoplay = autoPlay && reduceMotion === false && slides.length > 1;
  // Focus inside stops it until Play is pressed; pointing at it only holds it.
  const paused = userPaused || (focused && !resumed);
  const playing = autoplay && !paused && !hovered && !pageHidden;

  const rootRef = useRef<HTMLElement>(null);
  const moves = useRef({ next: show.next, previous: show.previous });
  moves.current = { next: show.next, previous: show.previous };

  // Arrow keys move between slides, focus inside stops autoplay until Play
  // is pressed, and pointing at the slideshow holds it.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moves.current.next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moves.current.previous();
      }
    };
    const onFocusIn = () => setFocused(true);
    const onFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null)) {
        setFocused(false);
        setResumed(false);
      }
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Loads every picture up front, so no slide waits on the network mid-change.
  useEffect(() => {
    for (const slide of slides) {
      const image = new Image();
      image.src = slide.src;
    }
  }, [slides]);

  const slide = slides[show.current];
  const base = slides[show.base];
  if (!(slide && base)) {
    return null;
  }

  const change = show.change;
  const arriving = change ? slides[change.to] : undefined;

  const togglePause = () => {
    if (paused) {
      setUserPaused(false);
      setResumed(true);
    } else {
      setUserPaused(true);
    }
  };

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={cn("w-full", className)}
      ref={rootRef}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted sm:aspect-video lg:aspect-21/9">
        {/* biome-ignore lint/performance/noImgElement: framework-agnostic registry block */}
        <img
          alt=""
          className="absolute inset-0 size-full object-cover"
          decoding="async"
          draggable={false}
          height={base.height}
          src={base.src}
          width={base.width}
        />
        {change && arriving ? (
          <FlutedLayer
            direction={change.direction}
            flutes={flutes}
            key={change.id}
            onSettled={() => show.settle(change.id)}
            slide={arriving}
          />
        ) : null}

        {/* Keeps the caption and controls readable on light pictures. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-black/70 via-black/25 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 lg:p-8">
          <div className="flex items-end justify-between gap-4">
            {/* biome-ignore lint/a11y/useSemanticElements: a carousel slide is a labeled group, not a form fieldset */}
            <div
              aria-label={`${show.current + 1} of ${slides.length}`}
              aria-live={playing ? "off" : "polite"}
              aria-roledescription="slide"
              className="min-w-0"
              role="group"
            >
              <SlideCaption
                count={slides.length}
                index={show.current}
                slide={slide}
              />
              <p className="sr-only">{slide.alt}</p>
            </div>
            <SlideControls
              autoplay={autoplay}
              onNext={show.next}
              onPrevious={show.previous}
              onTogglePause={togglePause}
              paused={paused}
            />
          </div>
          <SlideProgress
            autoplay={autoplay}
            current={show.current}
            onDone={show.next}
            onSelect={(index) => show.goTo(index)}
            playing={playing}
            seconds={interval}
            slides={slides}
          />
        </div>
      </div>
    </section>
  );
}
