import type { BlockFile } from "@/lib/blocks/types";

export const galleryLiquidSeams01Meta = {
  name: "Gallery: Liquid Seams",
  description:
    "A centered column of pictures whose joins run together like wet paint while the page scrolls fast, then part into crisp, separate pictures with a clear gap as it slows. It reads the scroll speed and stays still for visitors who prefer less motion.",
  registryName: "gallery-liquid-seams-01",
  previewHeight: 720,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
