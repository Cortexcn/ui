"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { dashboardHarbor01Meta } from "./meta";
import { DashboardHarborPreview } from "./preview";

export function DashboardHarborBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...dashboardHarbor01Meta}
      {...props}
      embedded={embedded}
      preview={<DashboardHarborPreview />}
    />
  );
}
