import type { BlockFile } from "@/lib/blocks/types";

export const dashboardPatron01Meta = {
  name: "Dashboard: Patron",
  description:
    "Helps a fundraising team turn its data into decisions: how the current appeal is tracking, last month's donations, prospects ready for a major gift, today's donor meetings, campaigns that are behind, top gift channels, daily gift activity, and the year-end forecast.",
  registryName: "dashboard-patron-01",
  previewHeight: 1200,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
