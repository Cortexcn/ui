import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupHiring01Meta = {
  name: "Chart Group: Hiring and Team",
  description:
    "Five key numbers and four charts with a department filter: headcount against the hiring plan, people by department or team, skills coverage against a target, and the hiring funnel.",
  registryName: "chart-group-hiring-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
