import type { BlockFile } from "@/lib/blocks/types";

export const heroSynapse01Meta = {
  name: "Hero: Synapse",
  description:
    "A two-tone headline, a pitch, and one call to action on a hilltop photo, with a video card and a scrolling logo row under a progressive blur.",
  registryName: "hero-synapse-01",
  previewHeight: 800,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
