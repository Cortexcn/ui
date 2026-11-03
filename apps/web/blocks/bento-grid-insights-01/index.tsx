"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { bentoGridInsights01Meta } from "./meta";
import { BentoGridInsightsPreview } from "./preview";

export function BentoGridInsightsBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...bentoGridInsights01Meta}
      {...props}
      embedded={embedded}
      preview={<BentoGridInsightsPreview />}
    />
  );
}
