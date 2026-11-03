"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { chartGroupSocial01Meta } from "./meta";
import { ChartGroupSocialPreview } from "./preview";

export function ChartGroupSocialBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...chartGroupSocial01Meta}
      {...props}
      embedded={embedded}
      preview={<ChartGroupSocialPreview />}
    />
  );
}
