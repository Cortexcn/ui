import type { BlockFile } from "@/lib/blocks/types";

export const bentoGridInsights01Meta = {
  name: "Bento Grid: Insights",
  description:
    "A fresh UI component exploration built around data, growth, and user insights. Playing with bold numbers, soft gradients, glassy surfaces, charts, avatars, and modular cards to create a dashboard system that feels both functional and expressive. Designed for products that turn complex metrics into clear decisions.",
  registryName: "bento-grid-insights-01",
  previewHeight: 1000,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
