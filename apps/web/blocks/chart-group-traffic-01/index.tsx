"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupTraffic01Meta } from "./meta";
import { ChartGroupTrafficPreview } from "./preview";

export function ChartGroupTrafficBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupTraffic01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupTrafficPreview />}
    />
  );
}
