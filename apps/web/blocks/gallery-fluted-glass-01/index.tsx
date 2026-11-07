"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { galleryFlutedGlass01Meta } from "./meta";
import { GalleryFlutedGlassPreview } from "./preview";

export function GalleryFlutedGlassBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...galleryFlutedGlass01Meta}
      {...props}
      embedded={embedded}
      preview={<GalleryFlutedGlassPreview />}
    />
  );
}
