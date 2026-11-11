"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { aiIntegrationPipeline01Meta } from "./meta";
import { IntegrationPipelinePreview } from "./preview";

export function IntegrationPipelineBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...aiIntegrationPipeline01Meta}
      {...props}
      embedded={embedded}
      preview={<IntegrationPipelinePreview />}
    />
  );
}
