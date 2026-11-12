"use client";

import { CommandSearchDemo } from "@/components/docs/command-search-demo";

import { ScaledFrame } from "./home-stage-frame";
import { StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/** Command Search typing out queries and filtering its results. */
export function ComponentsStage() {
  return (
    <StageLayout>
      <Safari url="acme.com">
        <ScaledFrame className="px-24 py-6" height={385} width={660}>
          <div className="w-full">
            <CommandSearchDemo />
          </div>
        </ScaledFrame>
      </Safari>
    </StageLayout>
  );
}
