import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupSaas01Meta = {
  name: "Chart Group: SaaS Metrics",
  description:
    "Five key numbers and five charts for a subscription app, with a 3, 6, or 12 month switch: stacked MRR, churn, plan mix, signups against cancellations, and net revenue retention.",
  registryName: "chart-group-saas-01",
  previewHeight: 1100,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
