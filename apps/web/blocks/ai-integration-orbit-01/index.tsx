"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationOrbit01Meta } from "./meta";
import { IntegrationOrbitPreview } from "./preview";

export function IntegrationOrbitBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationOrbit01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationOrbitPreview />}
    />
  );
}
