import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupBusiness01Meta = {
  name: "Chart Group: Business Analytics",
  description:
    "Five key numbers and four charts for a 30-day range, with arrows to step through earlier ranges: performance, devices, customer types, and hourly traffic.",
  registryName: "chart-group-business-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
