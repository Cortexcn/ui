"use client";

import { FeatureBentoGridPreview } from "@/blocks/feature-bento-grid-01/preview";
import { FitToFrame } from "@/components/blocks/fit-to-frame";

import { StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/** The free Feature Bento Grid block, as a section of a landing page. */
export function BlocksStage() {
  return (
    <StageLayout>
      <Safari url="acme.com">
        <FitToFrame className="aspect-auto h-full bg-background">
          <FeatureBentoGridPreview />
        </FitToFrame>
      </Safari>
    </StageLayout>
  );
}
