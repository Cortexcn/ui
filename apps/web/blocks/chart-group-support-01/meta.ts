import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupSupport01Meta = {
  name: "Chart Group: Support Desk",
  description:
    "Tickets by priority, first response time, customer satisfaction, and tickets by channel.",
  registryName: "chart-group-support-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
