import type { BlockFile } from "@/lib/blocks/types";

export const chartGroupMarkets01Meta = {
  name: "Chart Group: Market Watch",
  description:
    "Daily price candles, trading volume, portfolio allocation, and profit and loss by day.",
  registryName: "chart-group-markets-01",
  previewHeight: 1160,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
