"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupSupport01Meta } from "./meta";
import { ChartGroupSupportPreview } from "./preview";

export function ChartGroupSupportBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupSupport01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupSupportPreview />}
    />
  );
}
