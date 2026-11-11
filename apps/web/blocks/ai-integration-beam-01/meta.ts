import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationBeam01Meta = {
  name: "AI Assistant: Integration Beam",
  description:
    "Your product between the tools it connects, joined by curved beams. In sync cycles, pulses travel from the tools on the left into your product and out to the tools on the right. Point at a tool to bring its beam forward, or press it to pause it.",
  registryName: "ai-integration-beam-01",
  previewHeight: 440,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
