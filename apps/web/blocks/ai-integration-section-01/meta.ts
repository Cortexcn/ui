import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationSection01Meta = {
  name: "AI Assistant: Integration Section",
  description:
    "A heading, a short pitch, three points, and one call to action beside the Integration Beam scene, where pulses run from your tools into your product and back out.",
  registryName: "ai-integration-section-01",
  previewHeight: 640,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
