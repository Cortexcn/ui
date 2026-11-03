import type { BlockFile } from "@/lib/blocks/types";

export const dashboardTreasury01Meta = {
  name: "Dashboard: Treasury",
  description:
    "A finance team's vendor payouts: four key numbers with daily bars, a map of the payment rails and their health, a filterable table of payment exceptions, and the active payment policy.",
  registryName: "dashboard-treasury-01",
  previewHeight: 1100,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
