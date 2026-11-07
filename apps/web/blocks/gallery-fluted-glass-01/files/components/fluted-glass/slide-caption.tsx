"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Slide } from "./slides";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * The slide's number, title, and one line about it, over the picture. The
 * words change as soon as a new slide is picked, while its glass clears.
 */
export function SlideCaption({
  slide,
  index,
  count,
}: {
  slide: Slide;
  index: number;
  count: number;
}) {
  return (
    <div className="min-w-0 text-white">
      <p className="font-mono text-white/70 text-xs tabular-nums">
        {pad(index + 1)} / {pad(count)}
      </p>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          initial={{ opacity: 0, y: 8 }}
          key={slide.src}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <p className="mt-1.5 truncate font-medium text-lg tracking-tight sm:text-2xl">
            {slide.title}
          </p>
          <p className="mt-1 hidden truncate text-sm text-white/75 sm:block">
            {slide.caption}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
