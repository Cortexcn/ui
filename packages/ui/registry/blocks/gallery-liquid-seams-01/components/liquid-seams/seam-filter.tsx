"use client";

import { type MotionValue, useMotionValueEvent } from "motion/react";
import { useRef } from "react";

interface SeamFilterProps {
  id: string;
  /** Seeds the noise, so no two seams swirl the same way. */
  seed: number;
  /** How hard the noise pushes the paint, in pixels. Follows the scroll. */
  scale: MotionValue<number>;
}

/**
 * Soft noise, wide from side to side and tight from top to bottom. The green
 * channel is pushed toward its extremes and the red one is flattened, so the
 * paint runs up and down in wavy streaks and barely drifts sideways.
 */
const NOISE_TO_FLOW = [
  "0.4 0 0 0 0.3",
  "0 1.8 0 0 -0.4",
  "0 0 1 0 0",
  "0 0 0 0 1",
].join(" ");

/**
 * The SVG filter that marbles one seam. It moves every pixel of the seam band
 * up or down by an amount read from the noise, so the two pictures run into
 * each other in streaks. The push is set straight on the element as the
 * scroll speed changes, so it never re-renders React.
 */
export function SeamFilter({ id, seed, scale }: SeamFilterProps) {
  const mapRef = useRef<SVGFEDisplacementMapElement>(null);

  useMotionValueEvent(scale, "change", (value) => {
    mapRef.current?.setAttribute("scale", value.toFixed(2));
  });

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute size-0 overflow-hidden"
      focusable="false"
    >
      <filter
        colorInterpolationFilters="sRGB"
        height="140%"
        id={id}
        width="120%"
        x="-10%"
        y="-20%"
      >
        <feTurbulence
          baseFrequency="0.008 0.03"
          numOctaves={2}
          result="noise"
          seed={seed}
          type="fractalNoise"
        />
        <feColorMatrix
          in="noise"
          result="flow"
          type="matrix"
          values={NOISE_TO_FLOW}
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="flow"
          ref={mapRef}
          scale={0}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
