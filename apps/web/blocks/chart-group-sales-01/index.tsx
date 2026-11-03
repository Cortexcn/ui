"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupSales01Meta } from "./meta";
import { ChartGroupSalesPreview } from "./preview";

export function ChartGroupSalesBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupSales01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupSalesPreview />}
    />
  );
}
