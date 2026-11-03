"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupLogistics01Meta } from "./meta";
import { ChartGroupLogisticsPreview } from "./preview";

export function ChartGroupLogisticsBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupLogistics01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupLogisticsPreview />}
    />
  );
}
