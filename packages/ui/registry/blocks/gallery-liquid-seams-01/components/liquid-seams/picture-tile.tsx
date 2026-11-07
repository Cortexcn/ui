import type { Picture } from "./pictures";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * One picture in the column, the full width of it and the shape of the
 * picture, with rounded corners. Its number and title sit above the seams,
 * so they stay sharp while the edges around them melt.
 */
export function PictureTile({
  picture,
  number,
  eager = false,
}: {
  picture: Picture;
  number: number;
  /** Loads at once instead of when it nears the screen. */
  eager?: boolean;
}) {
  return (
    <figure
      className="relative overflow-hidden rounded-2xl bg-muted"
      style={{ aspectRatio: `${picture.width} / ${picture.height}` }}
    >
      {/* biome-ignore lint/performance/noImgElement: framework-agnostic registry block */}
      <img
        alt={picture.alt}
        className="absolute inset-0 size-full object-cover"
        decoding="async"
        draggable={false}
        height={picture.height}
        loading={eager ? "eager" : "lazy"}
        src={picture.src}
        width={picture.width}
      />
      {/* A hairline that keeps pale pictures apart from a light page. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-foreground/10 ring-inset"
      />
      {picture.title ? (
        <figcaption className="absolute bottom-3 left-3 z-20 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs shadow-sm backdrop-blur-sm sm:bottom-4 sm:left-4">
          <span className="font-mono text-muted-foreground tabular-nums">
            {pad(number)}
          </span>
          <span className="truncate font-medium text-foreground">
            {picture.title}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
