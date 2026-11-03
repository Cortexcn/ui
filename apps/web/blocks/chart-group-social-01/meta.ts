import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupSocial01Meta = {
  name: "Chart Group: Social Media",
  description:
    "Five key numbers and four charts for one brand's accounts on three networks, with a 7, 30, or 90 day switch: follower growth, posts by format, engagement by format, and the best time to post.",
  registryName: "chart-group-social-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
