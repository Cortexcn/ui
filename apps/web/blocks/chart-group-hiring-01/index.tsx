"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupHiring01Meta } from "./meta";
import { ChartGroupHiringPreview } from "./preview";

export function ChartGroupHiringBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupHiring01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupHiringPreview />}
    />
  );
}
