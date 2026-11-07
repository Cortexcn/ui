export interface Slide {
  src: string;
  /** Describes the picture for screen readers. */
  alt: string;
  title: string;
  caption: string;
  /** The picture's size, so the browser can reserve its space. */
  width: number;
  height: number;
}

/** The oil paintings from the Cortexcn site. Swap in your own pictures. */
const ART_BASE = "https://www.cortexcn.dev/images/ui-home";

export const DEFAULT_SLIDES: Slide[] = [
  {
    src: `${ART_BASE}/pastel-meadow-flowers.webp`,
    alt: "An oil painting of white flowers on tall stems bending in the wind against a pale blue sky",
    title: "Wind through the meadow",
    caption: "White blooms on tall stems, leaning into a blue haze.",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/meadow-grass.webp`,
    alt: "An oil painting of tall grass and seed heads sweeping across a blue sky",
    title: "Tall grass",
    caption: "Seed heads sweeping across an open sky.",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/white-blossoms.webp`,
    alt: "An oil painting of a branch of white blossoms with amber centers",
    title: "Blossom branch",
    caption: "White petals with amber hearts, drifting in from the right.",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/pastel-daisies.webp`,
    alt: "An oil painting of daisies with gold centers rising out of green grass",
    title: "Field of daisies",
    caption: "Gold centers rising out of soft green grass.",
    width: 1344,
    height: 896,
  },
  {
    src: `${ART_BASE}/blue-white-flowers.webp`,
    alt: "An oil painting of white and pink flowers whose stems blur into blue and green",
    title: "Morning bouquet",
    caption: "White and pink blooms, their stems washed into blue and green.",
    width: 1344,
    height: 896,
  },
];
