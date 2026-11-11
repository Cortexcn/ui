"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationSyncStatus01Meta } from "./meta";
import { IntegrationSyncStatusPreview } from "./preview";

export function IntegrationSyncStatusBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationSyncStatus01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationSyncStatusPreview />}
    />
  );
}
