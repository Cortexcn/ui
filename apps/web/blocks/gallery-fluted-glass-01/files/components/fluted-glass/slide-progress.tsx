"use client";

import { type AnimationPlaybackControls, useAnimate } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Slide } from "./slides";

/**
 * The bar of the slide on screen, filling while it plays. It pauses where it
 * is, and when it is full the slideshow moves on.
 */
function PlayingFill({
  seconds,
  playing,
  onDone,
}: {
  seconds: number;
  playing: boolean;
  onDone: () => void;
}) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const playback = animate(
      scope.current,
      { scaleX: [0, 1] },
      { duration: seconds, ease: "linear", onComplete: () => done.current() },
    );
    controls.current = playback;
    return () => playback.stop();
  }, [animate, scope, seconds]);

  useEffect(() => {
    if (playing) {
      controls.current?.play();
    } else {
      controls.current?.pause();
    }
  }, [playing]);

  return (
    <span
      className="absolute inset-0 origin-left rounded-full bg-white"
      ref={scope}
      // A transform, not a scale class, since the animation drives `transform`.
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/**
 * One bar per slide that also picks it: the ones already seen are full, the
 * one on screen fills while the slideshow plays, and the rest are empty.
 */
export function SlideProgress({
  slides,
  current,
  autoplay,
  playing,
  seconds,
  onSelect,
  onDone,
}: {
  slides: Slide[];
  current: number;
  autoplay: boolean;
  playing: boolean;
  seconds: number;
  onSelect: (index: number) => void;
  onDone: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {slides.map((slide, index) => {
        const isCurrent = index === current;
        return (
          <button
            aria-current={isCurrent ? "true" : undefined}
            aria-label={`Show slide ${index + 1}, ${slide.title}`}
            className="group/bar flex h-6 flex-1 items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            key={slide.src}
            onClick={() => onSelect(index)}
            type="button"
          >
            <span className="relative h-1 w-full overflow-hidden rounded-full bg-white/30 transition-colors group-hover/bar:bg-white/45">
              {isCurrent && autoplay ? (
                <PlayingFill
                  key={current}
                  onDone={onDone}
                  playing={playing}
                  seconds={seconds}
                />
              ) : (
                <span
                  className={cn(
                    "absolute inset-0 origin-left rounded-full bg-white transition-transform duration-300",
                    index <= current ? "scale-x-100" : "scale-x-0",
                  )}
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
