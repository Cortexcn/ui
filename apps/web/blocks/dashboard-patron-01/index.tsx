"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { dashboardPatron01Meta } from "./meta";
import { DashboardPatronPreview } from "./preview";

export function DashboardPatronBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...dashboardPatron01Meta}
      {...props}
      embedded={embedded}
      preview={<DashboardPatronPreview />}
    />
  );
}
