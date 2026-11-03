"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { dashboardMuster01Meta } from "./meta";
import { DashboardMusterPreview } from "./preview";

export function DashboardMusterBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...dashboardMuster01Meta}
      {...props}
      embedded={embedded}
      preview={<DashboardMusterPreview />}
    />
  );
}
