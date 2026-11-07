"use client";

import {
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { type RefObject, useEffect } from "react";

export interface SeamFlow {
  /**
   * From -1 to 1: positive while the page scrolls down, negative while it
   * scrolls up, and 0 when it is still.
   */
  flow: MotionValue<number>;
  /** How far the seams have melted, from 0 when still to 1 at full speed. */
  strength: MotionValue<number>;
}

/** Scrolling slower than this share of the full speed leaves the seams alone. */
const CALM_SHARE = 0.25;
/** A pause longer than this, in milliseconds, means the next scroll is new. */
const IDLE_MS = 120;
/** Picks up quickly and settles in about half a second, without a bounce. */
const SETTLE = { stiffness: 170, damping: 28, mass: 0.7 };

/**
 * Turns the gallery's speed on screen into how far its seams melt. It reads
 * the gallery's own position on every scroll, so it works whether the window
 * scrolls or a box around the gallery does. With reduced motion it never
 * listens, and the seams stay crisp.
 */
export function useSeamFlow(
  target: RefObject<HTMLElement | null>,
  fullSpeed: number,
): SeamFlow {
  const reduceMotion = useReducedMotion();
  /** How far the gallery has moved up the screen, in pixels. */
  const travel = useMotionValue(0);
  const speed = useVelocity(travel);
  const calm = fullSpeed * CALM_SHARE;
  const push = useTransform(
    speed,
    [-fullSpeed, -calm, calm, fullSpeed],
    [-1, 0, 0, 1],
  );
  const flow = useSpring(push, SETTLE);
  const strength = useTransform(flow, (value) => Math.min(Math.abs(value), 1));

  useEffect(() => {
    const node = target.current;
    if (!node || reduceMotion) {
      return;
    }
    let lastAt = Number.NEGATIVE_INFINITY;
    const measure = () => {
      const now = performance.now();
      const moved = -node.getBoundingClientRect().top;
      // The first reading of a new scroll only marks where it starts, so a
      // layout change made while the page was still never counts as speed.
      if (now - lastAt > IDLE_MS) {
        travel.jump(moved);
      } else {
        travel.set(moved);
      }
      lastAt = now;
    };
    // Scroll events do not bubble, so listening while they travel down to
    // the target catches the window and every scrolling box alike.
    const options = { capture: true, passive: true };
    document.addEventListener("scroll", measure, options);
    return () => document.removeEventListener("scroll", measure, options);
  }, [target, reduceMotion, travel]);

  return { flow, strength };
}
