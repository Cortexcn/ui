import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupProduct01Meta = {
  name: "Chart Group: Product Usage",
  description:
    "Five key numbers and four charts for the last 30 days, with a switch for all platforms, web, iOS, and Android: active users, feature adoption, retention by cohort, and sessions.",
  registryName: "chart-group-product-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
