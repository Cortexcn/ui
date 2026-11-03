"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupEnergy01Meta } from "./meta";
import { ChartGroupEnergyPreview } from "./preview";

export function ChartGroupEnergyBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupEnergy01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupEnergyPreview />}
    />
  );
}
