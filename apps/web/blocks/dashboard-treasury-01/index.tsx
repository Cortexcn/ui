"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { dashboardTreasury01Meta } from "./meta";
import { DashboardTreasuryPreview } from "./preview";

export function DashboardTreasuryBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...dashboardTreasury01Meta}
      {...props}
      embedded={embedded}
      preview={<DashboardTreasuryPreview />}
    />
  );
}
