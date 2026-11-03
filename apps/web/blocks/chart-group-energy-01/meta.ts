import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupEnergy01Meta = {
  name: "Chart Group: Energy Monitor",
  description:
    "Five key numbers and four charts for a home or a small studio with solar panels, with tabs to switch sites: live power, use by room, solar against grid, and busy hours.",
  registryName: "chart-group-energy-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
