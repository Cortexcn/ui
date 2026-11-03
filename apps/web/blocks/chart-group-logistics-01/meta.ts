import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupLogistics01Meta = {
  name: "Chart Group: Shipping and Inventory",
  description:
    "Shipments against returns, on-time delivery, warehouse capacity, and how stock flows between sites.",
  registryName: "chart-group-logistics-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
