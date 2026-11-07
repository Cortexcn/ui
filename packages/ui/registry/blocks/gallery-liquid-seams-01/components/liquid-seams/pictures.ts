export interface Picture {
  src: string;
  /** Describes the picture for screen readers. */
  alt: string;
  /**
   * The picture's size in pixels. Its tile takes the same shape, so the
   * edges in each seam line up with the pictures around them.
   */
  width: number;
  height: number;
  /** A short label shown on the picture. */
  title?: string;
}

/** The oil paintings from the Cortexcn site. Swap in your own pictures. */
const ART_BASE = "https://www.cortexcn.dev/images/ui-home";

export const DEFAULT_PICTURES: Picture[] = [
  {
    src: `${ART_BASE}/soft-meadow-grass.webp`,
    alt: "An oil painting of pale seed heads on long green stems bending to the right across a soft blue sky, with blurred patches of peach behind them",
    title: "Seed heads in the wind",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/white-blooms.webp`,
    alt: "An oil painting of fluffy white flower heads with amber centers, tossed by the wind above a base of teal and green under a pale blue sky",
    title: "White blooms",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/pastel-wildflowers.webp`,
    alt: "An oil painting of small yellow and coral wildflowers on thin stems rising from dark green grass on the right, against a misty blue background",
    title: "Yellow wildflowers",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/neutral-florals.webp`,
    alt: "An oil painting of three white flowers with peach centers on long, thin stems against a hazy blue and green background",
    title: "Three white flowers",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/pastel-daisies.webp`,
    alt: "An oil painting of white daisies with gold centers scattered through tall green grass under a pale sky",
    title: "Daisies in the grass",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/blue-cream-florals.webp`,
    alt: "An oil painting of two white flowers with yellow centers on the left, above grass brushed in green, teal, and gold under a misty blue sky",
    title: "Edge of the field",
    width: 1344,
    height: 896,
  },
];
