import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationEvents01Meta = {
  name: "AI Assistant: Event Stream",
  description:
    "Events leave your product for the tools that receive them, each riding a pulse along its beam, and a log lists every delivery with the time it landed. A button pauses the stream.",
  registryName: "ai-integration-events-01",
  previewHeight: 560,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
