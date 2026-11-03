"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupProduct01Meta } from "./meta";
import { ChartGroupProductPreview } from "./preview";

export function ChartGroupProductBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupProduct01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupProductPreview />}
    />
  );
}
