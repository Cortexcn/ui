import type { BlockFile } from "@/lib/blocks/types";

export const dashboardLedger01Meta = {
  name: "Dashboard: Ledger",
  description:
    "A store overview with a sidebar, four key numbers with sparklines, weekly sales as stacked square columns, sales by channel, and a sortable table of recent orders.",
  registryName: "dashboard-ledger-01",
  previewHeight: 1180,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
