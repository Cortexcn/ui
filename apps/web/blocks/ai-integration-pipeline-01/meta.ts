import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationPipeline01Meta = {
  name: "AI Assistant: Workflow Pipeline",
  description:
    "A workflow drawn as steps joined by beams. Each step runs, finishes with a check, and sends a pulse to the next. A switch turns the workflow off, and on narrow screens the steps stack into a list.",
  registryName: "ai-integration-pipeline-01",
  previewHeight: 520,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
