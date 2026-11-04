"use client";

import { type TOCItemType, useActiveAnchors } from "fumadocs-core/toc";
import { type RefObject, useEffect, useState } from "react";

/**
 * How far the line steps right for each heading level below h2, in pixels.
 * Raise it for a wider zigzag, or set it to 0 for a straight line.
 */
export const OUTLINE_STEP = 10;

/** Room between the line and a heading's title, in pixels. */
const OUTLINE_GAP = 13.5;

/**
 * Where the line runs beside a heading: h2 on the left edge, h3 one step in,
 * and deeper headings two steps in. The half pixel keeps the line crisp.
 */
function lineX(depth: number) {
  return Math.min(Math.max(depth - 2, 0), 2) * OUTLINE_STEP + 0.5;
}

/** The left padding that puts a heading's title just right of its line. */
export function outlineIndent(depth: number) {
  return lineX(depth) + OUTLINE_GAP;
}

interface OutlineShape {
  path: string;
  width: number;
  height: number;
}

interface OutlineRange {
  top: number;
  height: number;
}

function linkFor(list: HTMLElement, url: string) {
  for (const link of list.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if (link.getAttribute("href") === url) {
      return link;
    }
  }
  return null;
}

/** The text box of a link: its top and bottom without the vertical padding. */
function textBox(link: HTMLElement) {
  const styles = getComputedStyle(link);
  const top = link.offsetTop + Number.parseFloat(styles.paddingTop);
  const bottom =
    link.offsetTop +
    link.offsetHeight -
    Number.parseFloat(styles.paddingBottom);
  return { top, bottom };
}

/**
 * The line through every heading: straight down beside each title, and
 * diagonal across the gap wherever the heading level changes.
 */
function measureShape(
  list: HTMLElement,
  items: TOCItemType[],
): OutlineShape | null {
  if (list.clientHeight === 0) {
    return null;
  }
  const parts: string[] = [];
  let width = 0;
  let height = 0;
  for (const item of items) {
    const link = linkFor(list, item.url);
    if (!link) {
      continue;
    }
    const x = lineX(item.depth);
    const { top, bottom } = textBox(link);
    parts.push(
      `${parts.length === 0 ? "M" : "L"}${x} ${top}`,
      `L${x} ${bottom}`,
    );
    width = Math.max(width, x + 1);
    height = Math.max(height, bottom);
  }
  return parts.length === 0 ? null : { path: parts.join(" "), width, height };
}

/** The stretch of line beside the headings currently on screen. */
function measureRange(
  list: HTMLElement,
  active: string[],
): OutlineRange | null {
  let top = Number.POSITIVE_INFINITY;
  let bottom = 0;
  for (const id of active) {
    const link = linkFor(list, `#${id}`);
    if (!link) {
      continue;
    }
    const box = textBox(link);
    top = Math.min(top, box.top);
    bottom = Math.max(bottom, box.bottom);
  }
  return bottom > top ? { top, height: bottom - top } : null;
}

/**
 * The line of the "On this page" outline. It steps in and out with the
 * heading levels instead of running straight, and the part beside the
 * headings in view is drawn in the foreground color, sliding as you scroll.
 * Place it inside the positioned element that holds the outline's links.
 */
export function OutlineLine({
  items,
  listRef,
}: {
  items: TOCItemType[];
  listRef: RefObject<HTMLElement | null>;
}) {
  const active = useActiveAnchors();
  const [shape, setShape] = useState<OutlineShape | null>(null);
  const [range, setRange] = useState<OutlineRange | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const update = () => {
      setShape(measureShape(list, items));
      setRange(measureRange(list, active));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [listRef, items, active]);

  if (!shape) {
    return null;
  }

  // The path becomes a mask, so the base line and the sliding highlight
  // below both take its exact shape.
  const mask = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${shape.width}" height="${shape.height}" viewBox="0 0 ${shape.width} ${shape.height}"><path d="${shape.path}" fill="none" stroke="black" stroke-width="1"/></svg>`,
  )}")`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0"
      style={{
        width: shape.width,
        height: shape.height,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <div className="absolute inset-0 bg-foreground/15" />
      {range ? (
        <div
          className="absolute inset-x-0 bg-foreground transition-[top,height] duration-300 ease-out motion-reduce:transition-none"
          style={{ top: range.top, height: range.height }}
        />
      ) : null}
    </div>
  );
}
