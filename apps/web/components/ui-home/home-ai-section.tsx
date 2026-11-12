import { AI_PATH } from "@/lib/ai-page";
import { CATALOG_COUNTS } from "@/lib/catalog-counts";

import { AiStageLoader } from "./home-stage-loaders";
import { ProductShowcase } from "./product-showcase";

/** The AI Assistant blocks, with reasoning and a task queue running. */
export function HomeAiSection() {
  const chatBlocks =
    CATALOG_COUNTS.aiBlocks - CATALOG_COUNTS.aiIntegrationBlocks;

  return (
    <ProductShowcase
      art="white-blooms"
      badge="AI"
      description="Reasoning that streams in, thinking states, agent steps, a task queue, tool calls, and views of the tools an assistant connects to. Everything a chat or agent screen needs around the model."
      id="ai"
      lines={[
        { text: "The interface" },
        { text: "around your model.", muted: true },
      ]}
      primary={{ label: "Explore AI", href: AI_PATH }}
      reverse
      secondary={{
        label: "See the blocks",
        href: "/blocks?category=ai-assistant",
      }}
      stage={<AiStageLoader />}
      stageLabel="The Reasoning block streaming an assistant's thinking into a chat."
      stats={[
        { value: String(CATALOG_COUNTS.aiBlocks), label: "AI blocks" },
        { value: String(chatBlocks), label: "for chat and agents" },
        {
          value: String(CATALOG_COUNTS.aiIntegrationBlocks),
          label: "for connected tools",
        },
      ]}
      tag="Pro"
    />
  );
}
