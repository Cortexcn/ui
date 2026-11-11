import type { BlockFile } from "@/lib/blocks/types";

export const aiToolRouter01Meta = {
  name: "AI Assistant: Tool Router",
  description:
    "An agent works through a task by calling tools. Each call runs as a pulse from the agent to the tool and back, and a list marks the call done with what came back.",
  registryName: "ai-tool-router-01",
  previewHeight: 680,
} as const;

export interface BlockDisplayProps {
  files: BlockFile[];
  embedded?: boolean;
}
