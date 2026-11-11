import type { BlockFile } from "@/lib/blocks/types";

export const aiIntegrationSyncStatus01Meta = {
  name: "AI Assistant: Sync Status",
  description:
    "A card of connected tools joined to your product by beams. The tools sync in turn and count up the time since each one last synced, and a switch on each row pauses that tool.",
  registryName: "ai-integration-sync-status-01",
  previewHeight: 520,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
