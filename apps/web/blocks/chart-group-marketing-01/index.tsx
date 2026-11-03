"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupMarketing01Meta } from "./meta";
import { ChartGroupMarketingPreview } from "./preview";

export function ChartGroupMarketingBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupMarketing01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupMarketingPreview />}
    />
  );
}
