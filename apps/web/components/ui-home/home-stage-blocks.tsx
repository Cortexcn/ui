"use client";

import { HeroDashboardPreview } from "@/blocks/hero-dashboard-01/preview";

import { ScaledFrame } from "./home-stage-frame";
import { StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/**
 * The free Hero Dashboard block as the top of a landing page: laid out at
 * desktop width and filling the window from the top, as a site opens.
 */
export function BlocksStage() {
  return (
    <StageLayout>
      <Safari url="acme.com">
        <ScaledFrame className="items-start" height={747} width={1280}>
          <div className="w-full">
            <HeroDashboardPreview />
          </div>
        </ScaledFrame>
      </Safari>
    </StageLayout>
  );
}
