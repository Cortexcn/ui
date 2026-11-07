"use client";

import { BlockPreviewFrame } from "@/blocks/_shared/preview-frame";
import { LiquidSeamsGallery } from "./files/components/liquid-seams-gallery";

export function GalleryLiquidSeamsPreview() {
  return (
    <BlockPreviewFrame maxWidth={768}>
      <LiquidSeamsGallery className="py-4 sm:py-8" />
    </BlockPreviewFrame>
  );
}
