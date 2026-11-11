"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationBeam01Meta } from "./meta";
import { IntegrationBeamPreview } from "./preview";

export function IntegrationBeamBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationBeam01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationBeamPreview />}
    />
  );
}
