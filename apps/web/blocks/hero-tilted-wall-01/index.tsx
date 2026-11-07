"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { heroTiltedWall01Meta } from "./meta";
import { HeroTiltedWallPreview } from "./preview";

export function HeroTiltedWallBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...heroTiltedWall01Meta}
      {...props}
      embedded={embedded}
      preview={<HeroTiltedWallPreview />}
    />
  );
}
