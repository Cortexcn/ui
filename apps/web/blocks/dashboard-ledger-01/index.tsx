"use client";

import { BlockViewer } from "@/components/blocks/block-viewer";
import type { BlockDisplayProps } from "./meta";
import { dashboardLedger01Meta } from "./meta";
import { DashboardLedgerPreview } from "./preview";

export function DashboardLedgerBlock({
  embedded,
  ...props
}: BlockDisplayProps) {
  return (
    <BlockViewer
      {...dashboardLedger01Meta}
      {...props}
      embedded={embedded}
      preview={<DashboardLedgerPreview />}
    />
  );
}
