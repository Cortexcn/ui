import type { BlockFile } from "@/lib/blocks/types";

export const galleryPrintPile01Meta = {
  name: "Gallery: Print Pile",
  description:
    "Portrait prints lie in a loose, tilted pile until one button lays them out in a four-column grid with captions, two columns on phones. Pressing it again gathers them back into the pile.",
  registryName: "gallery-print-pile-01",
  previewHeight: 880,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
