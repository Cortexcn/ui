import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationOrbit01Meta = {
  name: "AI Assistant: Integration Orbit",
  description:
    "Your product at the center of a ring of tools. Waves of pulses sweep around the ring, out to each tool and back in. Point at a tool to bring its beam forward, or press it to pause it.",
  registryName: "ai-integration-orbit-01",
  previewHeight: 620,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
