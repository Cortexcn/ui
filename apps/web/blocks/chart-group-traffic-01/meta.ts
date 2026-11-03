import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupTraffic01Meta = {
  name: "Chart Group: Website Traffic",
  description:
    "Sessions over time, traffic sources, the paths visitors take through the site, and top pages.",
  registryName: "chart-group-traffic-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
