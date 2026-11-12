"use client";

import dynamic from "next/dynamic";

// The live examples load in the browser, after the page has painted, since
// they measure their windows and some draw charts. Until then the panel
// shows its painting.

export const ComponentsStageLoader = dynamic(
  () => import("./home-stage-components").then((mod) => mod.ComponentsStage),
  { ssr: false },
);

export const BlocksStageLoader = dynamic(
  () => import("./home-stage-blocks").then((mod) => mod.BlocksStage),
  { ssr: false },
);

export const ChartsStageLoader = dynamic(
  () => import("./home-stage-charts").then((mod) => mod.ChartsStage),
  { ssr: false },
);

export const AiStageLoader = dynamic(
  () => import("./home-stage-ai").then((mod) => mod.AiStage),
  { ssr: false },
);
