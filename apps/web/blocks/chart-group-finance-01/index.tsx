"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupFinance01Meta } from "./meta";
import { ChartGroupFinancePreview } from "./preview";

export function ChartGroupFinanceBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupFinance01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupFinancePreview />}
    />
  );
}
