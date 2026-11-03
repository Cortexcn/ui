"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupMarkets01Meta } from "./meta";
import { ChartGroupMarketsPreview } from "./preview";

export function ChartGroupMarketsBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupMarkets01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupMarketsPreview />}
    />
  );
}
