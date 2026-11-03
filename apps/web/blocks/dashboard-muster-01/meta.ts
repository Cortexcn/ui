import type { BlockFile } from "@/lib/blocks/types";

export const dashboardMuster01Meta = {
  name: "Dashboard: Muster",
  description:
    "A people dashboard for startup teams: who checked in and when, who is away or out, new hires' onboarding, a time tracker, the employee spotlight, notes, and the current project. Notes, tracked time, comments, and requests can be created, edited, and deleted. Connect it to your own API through one prop, or have Cortexcn Studio wire it up for you.",
  registryName: "dashboard-muster-01",
  previewHeight: 1200,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
