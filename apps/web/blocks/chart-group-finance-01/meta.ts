import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupFinance01Meta = {
  name: "Chart Group: Cash Flow",
  description:
    "Five key numbers and four charts for one month, with arrows to step back through earlier months: daily profit and loss, months of runway, spending by category, and money in and out by week.",
  registryName: "chart-group-finance-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
