import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupEcommerce01Meta = {
  name: "Chart Group: Online Store",
  description:
    "Orders over time, sales by category, average order value, and returns for an online shop.",
  registryName: "chart-group-ecommerce-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
