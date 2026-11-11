"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationEvents01Meta } from "./meta";
import { IntegrationEventsPreview } from "./preview";

export function IntegrationEventsBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationEvents01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationEventsPreview />}
    />
  );
}
