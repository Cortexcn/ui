"use client";

import { BlockPreviewFrame } from "@/blocks/_shared/preview-frame";
import { FlutedGlassSlideshow } from "./files/components/fluted-glass-slideshow";

export function GalleryFlutedGlassPreview() {
  return (
    <BlockPreviewFrame maxWidth={1152}>
      <FlutedGlassSlideshow className="py-4 sm:py-8" />
    </BlockPreviewFrame>
  );
}
