import type { BlockFile } from "@/lib/blocks/types";

export const galleryFlutedGlass01Meta = {
  name: "Gallery: Fluted Glass Slideshow",
  description:
    "A wide slideshow where each new slide arrives through ribbed glass that splits it into bent vertical strips, which line up into a clear picture as it lands. It plays on its own, with a pause button, arrows, and a bar per slide.",
  registryName: "gallery-fluted-glass-01",
  previewHeight: 620,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
