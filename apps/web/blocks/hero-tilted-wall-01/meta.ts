import type { BlockFile } from "@/lib/blocks/types";

export const heroTiltedWall01Meta = {
  name: "Hero: Tilted Wall",
  description:
    "A badge, a headline, a short description, and two buttons in front of a tilted wall of paintings whose columns scroll endlessly in opposite directions. On small screens the wall sits below the copy.",
  registryName: "hero-tilted-wall-01",
  previewHeight: 820,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
