"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import { type CSSProperties, useId } from "react";
import type { Picture } from "./pictures";
import { SeamFilter } from "./seam-filter";

interface SeamBandProps {
  /** The picture above the seam. */
  upper: Picture;
  /** The picture below the seam. */
  lower: Picture;
  flow: MotionValue<number>;
  strength: MotionValue<number>;
  /** The furthest, in pixels, the paint is pushed at full speed. */
  maxSmear: number;
  seed: number;
}

/** Below this strength the band is hidden and runs no filter at all. */
const AT_REST = 0.005;
/** How far the paint lags behind the scroll, as a share of the smear. */
const TRAIL_SHARE = 0.5;

/** Fades the band out at its top and bottom, into the crisp pictures. */
const EDGE_FADE =
  "linear-gradient(to bottom, transparent, black 24%, black 76%, transparent)";
/** Brings the lower picture in across the middle of the band. */
const CROSSFADE = "linear-gradient(to bottom, transparent 30%, black 70%)";

const UNSAFE_ID = /[^\w-]/g;

/**
 * One picture's edge as paint for the seam: the picture lined up with its
 * tile, and a mirrored copy past the edge, so the paint runs on into the gap
 * without a hard line. Both lag a little behind the scroll.
 */
function PaintedEdge({
  picture,
  edge,
  trail,
}: {
  picture: Picture;
  edge: "top" | "bottom";
  trail: MotionValue<number>;
}) {
  const shape = { aspectRatio: `${picture.width} / ${picture.height}` };
  // Where the picture's edge sits in the band, from the band's own edge.
  const lined: CSSProperties =
    edge === "bottom"
      ? { bottom: "calc(var(--seam-depth) + var(--seam-gap))" }
      : { top: "calc(var(--seam-depth) + var(--seam-gap))" };
  const mirrored: CSSProperties =
    edge === "bottom"
      ? { top: "var(--seam-depth)" }
      : { bottom: "var(--seam-depth)" };

  return (
    <motion.div className="absolute inset-0" style={{ y: trail }}>
      {/* biome-ignore lint/performance/noImgElement: framework-agnostic registry block */}
      <img
        alt=""
        className="absolute inset-x-0 h-auto w-full"
        decoding="async"
        draggable={false}
        height={picture.height}
        loading="lazy"
        src={picture.src}
        style={{ ...shape, ...lined }}
        width={picture.width}
      />
      {/* biome-ignore lint/performance/noImgElement: framework-agnostic registry block */}
      <img
        alt=""
        className="absolute inset-x-0 h-auto w-full -scale-y-100"
        decoding="async"
        draggable={false}
        height={picture.height}
        loading="lazy"
        src={picture.src}
        style={{ ...shape, ...mirrored }}
        width={picture.width}
      />
    </motion.div>
  );
}

/**
 * The join between two pictures. It reaches into both and spans the gap, and
 * only shows while the page scrolls fast: the lower picture fades in over the
 * upper one across the middle, and the seam filter swirls the two together.
 * As the scroll slows it fades out, and the crisp pictures and the gap
 * between them show through again. At rest it is hidden with no filter.
 */
export function SeamBand({
  upper,
  lower,
  flow,
  strength,
  maxSmear,
  seed,
}: SeamBandProps) {
  const filterId = `liquid-seam-${useId().replace(UNSAFE_ID, "")}`;
  const opacity = useTransform(strength, [0, 0.5], [0, 1]);
  const visibility = useTransform(strength, (value) =>
    value > AT_REST ? "visible" : "hidden",
  );
  const filter = useTransform(strength, (value) =>
    value > AT_REST ? `url(#${filterId})` : "none",
  );
  // feDisplacementMap moves a pixel by up to half its scale either way.
  const scale = useTransform(strength, (value) => value * maxSmear * 2);
  const trail = useTransform(flow, (value) => value * maxSmear * TRAIL_SHARE);

  return (
    <>
      <SeamFilter id={filterId} scale={scale} seed={seed} />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-10 overflow-hidden"
        style={{
          top: "calc(100% - var(--seam-depth))",
          height: "calc(var(--seam-depth) * 2 + var(--seam-gap))",
          opacity,
          visibility,
          filter,
          maskImage: EDGE_FADE,
          WebkitMaskImage: EDGE_FADE,
        }}
      >
        <PaintedEdge edge="bottom" picture={upper} trail={trail} />
        {/* The mask stays put while the paint inside it trails. */}
        <div
          className="absolute inset-0"
          style={{ maskImage: CROSSFADE, WebkitMaskImage: CROSSFADE }}
        >
          <PaintedEdge edge="top" picture={lower} trail={trail} />
        </div>
      </motion.div>
    </>
  );
}
