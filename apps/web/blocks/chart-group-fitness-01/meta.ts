import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupFitness01Meta = {
  name: "Chart Group: Fitness Tracker",
  description:
    "Five key numbers and four charts for one person's training week, with tabs for the day and arrows to step through weeks: activity rings, steps, heart rate, and training balance.",
  registryName: "chart-group-fitness-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
