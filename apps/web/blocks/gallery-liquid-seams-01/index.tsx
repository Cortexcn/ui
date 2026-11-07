"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { galleryLiquidSeams01Meta } from "./meta";
import { GalleryLiquidSeamsPreview } from "./preview";

export function GalleryLiquidSeamsBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...galleryLiquidSeams01Meta}
      {...props}
      embedded={embedded}
      preview={<GalleryLiquidSeamsPreview />}
    />
  );
}
