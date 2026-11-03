"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupBusiness01Meta } from "./meta";
import { ChartGroupBusinessPreview } from "./preview";

export function ChartGroupBusinessBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupBusiness01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupBusinessPreview />}
    />
  );
}
