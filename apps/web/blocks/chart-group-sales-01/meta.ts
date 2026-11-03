import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupSales01Meta = {
  name: "Chart Group: Sales Pipeline",
  description:
    "Deals by pipeline stage, revenue won over time, a team leaderboard, and the win rate against target.",
  registryName: "chart-group-sales-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
