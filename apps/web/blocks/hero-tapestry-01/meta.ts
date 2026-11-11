import type { BlockFile } from "@/lib/blocks/types";

export const heroTapestry01Meta = {
  name: "Hero: Tapestry",
  description:
    "A wide painting redrawn as fine needlepoint glyphs that resolve from coarse to sharp, with a serif headline, a short pitch, two buttons, and a ruled strip of tool names.",
  registryName: "hero-tapestry-01",
  previewHeight: 820,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
