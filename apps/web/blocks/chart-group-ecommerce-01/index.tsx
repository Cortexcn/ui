"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupEcommerce01Meta } from "./meta";
import { ChartGroupEcommercePreview } from "./preview";

export function ChartGroupEcommerceBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupEcommerce01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupEcommercePreview />}
    />
  );
}
