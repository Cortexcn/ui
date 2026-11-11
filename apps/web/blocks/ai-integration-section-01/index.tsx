"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationSection01Meta } from "./meta";
import { IntegrationSectionPreview } from "./preview";

export function IntegrationSectionBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationSection01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationSectionPreview />}
    />
  );
}
