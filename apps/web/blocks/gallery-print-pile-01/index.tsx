"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { galleryPrintPile01Meta } from "./meta";
import { GalleryPrintPilePreview } from "./preview";

export function GalleryPrintPileBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...galleryPrintPile01Meta}
      {...props}
      embedded={embedded}
      preview={<GalleryPrintPilePreview />}
    />
  );
}
