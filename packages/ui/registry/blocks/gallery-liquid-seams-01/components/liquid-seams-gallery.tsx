"use client";

import { type CSSProperties, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { GalleryHeader } from "./liquid-seams/gallery-header";
import { PictureTile } from "./liquid-seams/picture-tile";
import { DEFAULT_PICTURES, type Picture } from "./liquid-seams/pictures";
import { SeamBand } from "./liquid-seams/seam-band";
import { useSeamFlow } from "./liquid-seams/use-seam-flow";

export type { Picture } from "./liquid-seams/pictures";

export interface LiquidSeamsGalleryProps {
  /** The pictures, top to bottom. Each tile takes its picture's shape. */
  pictures?: Picture[];
  /** Leave it empty to show the column on its own. */
  heading?: string;
  description?: string;
  /** Pixels between pictures while the page is still. */
  gap?: number;
  /** The furthest, in pixels, the paint is pushed at full speed. */
  maxSmear?: number;
  /**
   * How far, in pixels, each seam reaches into the pictures on either side.
   * Narrow screens use less, so a seam never covers most of a picture.
   */
  seamDepth?: number;
  /** The scroll speed, in pixels per second, that melts the seams fully. */
  fullSpeed?: number;
  /** Names the gallery for screen readers when there is no heading. */
  label?: string;
  className?: string;
}

/**
 * A centered column of pictures whose joins run together like wet paint
 * while the page scrolls fast. Each join is a band over the gap that blends
 * the two pictures' edges and swirls them with an SVG filter, as strongly as
 * the scroll is fast. When the scroll slows the bands fade away, leaving
 * crisp, separate pictures with a clear gap. With reduced motion the
 * pictures always stay crisp.
 */
export function LiquidSeamsGallery({
  pictures = DEFAULT_PICTURES,
  heading = "Paintings from the meadow",
  description = "Scroll quickly and the edges between the pictures run together like wet paint. Slow down and each one settles back into its own frame.",
  gap = 24,
  maxSmear = 40,
  seamDepth = 88,
  fullSpeed = 2400,
  label = "Paintings",
  className,
}: LiquidSeamsGalleryProps) {
  const headingId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const { flow, strength } = useSeamFlow(listRef, fullSpeed);

  const seams = {
    "--seam-gap": `${gap}px`,
    "--seam-depth": `min(${seamDepth}px, 12cqw)`,
    gap: "var(--seam-gap)",
  } as CSSProperties;

  return (
    <section
      aria-label={heading ? undefined : label}
      aria-labelledby={heading ? headingId : undefined}
      className={cn("w-full", className)}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        {heading ? (
          <GalleryHeader
            description={description}
            heading={heading}
            id={headingId}
          />
        ) : null}
        <ul className="@container flex flex-col" ref={listRef} style={seams}>
          {pictures.map((picture, index) => {
            const next = pictures[index + 1];
            return (
              <li className="relative" key={picture.src}>
                <PictureTile
                  eager={index === 0}
                  number={index + 1}
                  picture={picture}
                />
                {next ? (
                  <SeamBand
                    flow={flow}
                    lower={next}
                    maxSmear={maxSmear}
                    seed={index * 3 + 1}
                    strength={strength}
                    upper={picture}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
