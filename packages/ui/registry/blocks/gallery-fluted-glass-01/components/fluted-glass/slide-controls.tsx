"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Round glassy buttons that read on any picture, in either theme. */
const glassButton =
  "rounded-full border-white/25 bg-black/25 text-white backdrop-blur-md hover:bg-black/45 hover:text-white dark:border-white/25 dark:bg-black/25 dark:hover:bg-black/45";

/**
 * Play or pause, then previous and next. The pause button only shows when
 * the slideshow plays on its own.
 */
export function SlideControls({
  autoplay,
  paused,
  onTogglePause,
  onPrevious,
  onNext,
}: {
  autoplay: boolean;
  paused: boolean;
  onTogglePause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {autoplay ? (
        <Button
          aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          className={glassButton}
          onClick={onTogglePause}
          size="icon"
          variant="outline"
        >
          {paused ? <Play /> : <Pause />}
        </Button>
      ) : null}
      <Button
        aria-label="Previous slide"
        className={glassButton}
        onClick={onPrevious}
        size="icon"
        variant="outline"
      >
        <ChevronLeft />
      </Button>
      <Button
        aria-label="Next slide"
        className={glassButton}
        onClick={onNext}
        size="icon"
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
