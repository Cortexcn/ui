import type { BlockFile } from "@/lib/blocks/types";

export const heroTideline01Meta = {
  name: "Hero: Tideline",
  description:
    "A newsletter hero on a full-bleed watercolor picture, with spaced-capital nav, an issue line, a serif headline with an italic second line, and a frosted email field that turns into a thank-you line after sign-up.",
  registryName: "hero-tideline-01",
  previewHeight: 720,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
