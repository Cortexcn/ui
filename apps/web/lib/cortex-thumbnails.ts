/**
 * The Cortex components whose overview and /new cards show the component
 * itself instead of a line drawing. The previews live in
 * components/docs/cortex-thumbnails.tsx, which imports Cortexcn Pro and so
 * stays out of the public repository; this list lets shared code ask which
 * slugs have one without importing Pro.
 */
export const CORTEX_THUMBNAILS: ReadonlySet<string> = new Set([
  "spend-flow",
  "model-router",
  "payout-split",
  "threat-shield",
  "usage-receipt",
  "release-line",
  "context-window",
  "pixel-prompt-button",
  "matrix-trail",
]);
