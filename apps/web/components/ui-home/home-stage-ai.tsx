"use client";

import { AiReasoningPreview } from "@/blocks/ai-reasoning-01/preview";

import { ScaledFrame } from "./home-stage-frame";
import { StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/** The Reasoning block, streaming an assistant's thinking into a chat. */
export function AiStage() {
  return (
    <StageLayout>
      <Safari url="acme.com/assistant">
        <ScaledFrame className="px-10 py-8" height={420} width={720}>
          <div className="flex w-full justify-center">
            <AiReasoningPreview />
          </div>
        </ScaledFrame>
      </Safari>
    </StageLayout>
  );
}
