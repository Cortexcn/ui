"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupFitness01Meta } from "./meta";
import { ChartGroupFitnessPreview } from "./preview";

export function ChartGroupFitnessBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupFitness01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupFitnessPreview />}
    />
  );
}
