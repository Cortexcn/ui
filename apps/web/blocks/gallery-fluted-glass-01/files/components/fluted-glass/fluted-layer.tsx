"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Slide } from "./slides";
import type { Direction } from "./use-slideshow";

interface FlutedLayerProps {
  slide: Slide;
  direction: Direction;
  /** Vertical ribs in the glass. */
  flutes: number;
  /** Called once the glass has cleared and the picture is whole. */
  onSettled: () => void;
}

/** Seconds the arriving slide takes to cross the frame. */
const SLIDE_SECONDS = 0.9;
/** When the glass starts to clear, as a share of the slide. */
const CLEAR_START = 0.55;
/** Seconds between one rib clearing and the next. */
const CLEAR_STAGGER = 0.022;
/** Seconds each rib takes to clear. */
const CLEAR_SECONDS = 0.62;

/** How much each rib magnifies its slice, like a lens, before it clears. */
const RIB_ZOOM = 1.22;
/** Pixels each slice is pushed against the travel, as the glass bends it. */
const RIB_SHIFT = 10;

const SLIDE_EASE = [0.65, 0, 0.35, 1] as const;
const CLEAR_EASE = [0.22, 1, 0.36, 1] as const;

/** Light down one side of each rib and shade down the other. */
const RIB_SHEEN =
  "linear-gradient(90deg, rgb(255 255 255 / 0.32), rgb(255 255 255 / 0) 36%, rgb(0 0 0 / 0) 64%, rgb(0 0 0 / 0.22))";

function Rib({
  slide,
  index,
  flutes,
  direction,
  delay,
  onCleared,
}: {
  slide: Slide;
  index: number;
  flutes: number;
  direction: Direction;
  delay: number;
  onCleared?: () => void;
}) {
  const left = (index / flutes) * 100;
  const right = ((flutes - index - 1) / flutes) * 100;
  const center = ((index + 0.5) / flutes) * 100;
  const transition = { delay, duration: CLEAR_SECONDS, ease: CLEAR_EASE };

  return (
    <div
      className="absolute inset-0"
      style={{ clipPath: `inset(0 ${right}% 0 ${left}%)` }}
    >
      {/* biome-ignore lint/performance/noImgElement: framework-agnostic registry block */}
      <motion.img
        alt=""
        animate={{ x: 0, scaleX: 1 }}
        className="absolute inset-0 size-full object-cover will-change-transform"
        decoding="async"
        draggable={false}
        height={slide.height}
        initial={{ x: -direction * RIB_SHIFT, scaleX: RIB_ZOOM }}
        onAnimationComplete={onCleared}
        src={slide.src}
        style={{ transformOrigin: `${center}% 50%` }}
        transition={transition}
        width={slide.width}
      />
      <motion.span
        animate={{ opacity: 0 }}
        className="absolute inset-y-0"
        initial={{ opacity: 1 }}
        style={{
          left: `${left}%`,
          right: `${right}%`,
          backgroundImage: RIB_SHEEN,
        }}
        transition={transition}
      />
    </div>
  );
}

/**
 * The arriving slide, seen through a sheet of fluted glass. It slides in cut
 * into vertical ribs, each showing its own slice magnified and pushed aside
 * the way ribbed glass bends light, with light down one edge and shade down
 * the other. Once it lands, the ribs ease back one after another, starting
 * from the side it came from, until the slices meet as one clear picture.
 * With reduced motion it fades in instead.
 */
export function FlutedLayer({
  slide,
  direction,
  flutes,
  onSettled,
}: FlutedLayerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      // biome-ignore lint/performance/noImgElement: framework-agnostic registry block
      <motion.img
        alt=""
        animate={{ opacity: 1 }}
        className="absolute inset-0 size-full object-cover"
        height={slide.height}
        initial={{ opacity: 0 }}
        onAnimationComplete={onSettled}
        src={slide.src}
        transition={{ duration: 0.35 }}
        width={slide.width}
      />
    );
  }

  const ribs = Array.from({ length: flutes }, (_, rib) => rib);
  const clearFrom = SLIDE_SECONDS * CLEAR_START;

  return (
    <motion.div
      animate={{ x: "0%" }}
      aria-hidden="true"
      className="absolute inset-0"
      initial={{ x: `${direction * 100}%` }}
      transition={{ duration: SLIDE_SECONDS, ease: SLIDE_EASE }}
    >
      {ribs.map((rib) => {
        // The ribs clear in the order the slide travels.
        const order = direction === 1 ? rib : flutes - 1 - rib;
        return (
          <Rib
            delay={clearFrom + order * CLEAR_STAGGER}
            direction={direction}
            flutes={flutes}
            index={rib}
            key={rib}
            onCleared={order === flutes - 1 ? onSettled : undefined}
            slide={slide}
          />
        );
      })}
    </motion.div>
  );
}
