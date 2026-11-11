"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { heroTideline01Meta } from "./meta";
import { HeroTidelinePreview } from "./preview";

export function HeroTidelineBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...heroTideline01Meta}
      {...props}
      embedded={embedded}
      preview={<HeroTidelinePreview />}
    />
  );
}
