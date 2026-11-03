import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupMarketing01Meta = {
  name: "Chart Group: Marketing Campaigns",
  description:
    "A campaign funnel, spend against conversions, return on ad spend by channel, and click-through rate over time.",
  registryName: "chart-group-marketing-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
