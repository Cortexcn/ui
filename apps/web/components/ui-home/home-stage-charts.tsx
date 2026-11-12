"use client";

import { LiveLineChartDemo } from "@/components/docs/live-line-chart-demo";

import { ScaledFrame } from "./home-stage-frame";
import { StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/** The Live Line Chart, drawing new points as they arrive. */
export function ChartsStage() {
  return (
    <StageLayout>
      <Safari url="acme.com/analytics">
        <ScaledFrame className="px-10 py-8" height={350} width={600}>
          <div className="w-full">
            <LiveLineChartDemo />
          </div>
        </ScaledFrame>
      </Safari>
    </StageLayout>
  );
}
