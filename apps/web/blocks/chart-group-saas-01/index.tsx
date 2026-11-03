"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupSaas01Meta } from "./meta";
import { ChartGroupSaasPreview } from "./preview";

export function ChartGroupSaasBlock({ embedded, ...props }: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupSaas01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupSaasPreview />}
    />
  );
}
