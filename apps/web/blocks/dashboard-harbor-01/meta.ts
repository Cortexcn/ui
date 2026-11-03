import type { BlockFile } from "@/lib/blocks/types";

export const dashboardHarbor01Meta = {
  name: "Dashboard: Harbor",
  description:
    "A hotel front desk for one evening: tonight's numbers, a room board by floor that filters by status, a 14-night occupancy chart, and the day's schedule.",
  registryName: "dashboard-harbor-01",
  previewHeight: 1040,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
