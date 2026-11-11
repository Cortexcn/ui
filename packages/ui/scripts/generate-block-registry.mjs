/**
 * Syncs blocks from apps/web/blocks into registry sources and registry.json
 * (shadcn add + Open in v0). Run from packages/ui after generate-v0-examples.mjs.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const uiRoot = join(__dirname, "..");
const webBlocksRoot = join(uiRoot, "../../apps/web/blocks");
const registryBlocksRoot = join(uiRoot, "registry/blocks");
const examplesDir = join(uiRoot, "registry/examples");
const registryPath = join(uiRoot, "registry.json");
const SHARED_WORLD_DATA = "lib/use-world-data.tsx";

const BLOCK_CHART_INDEX = {
  "stat-card-area-01": `export { AreaChart } from "./area-chart";
export { Area } from "./area";
export { ChartStatFlow } from "./chart-stat-flow";
export { useChart } from "./chart-context";
export { LinearGradient } from "@visx/gradient";`,
  "stat-card-line-01": `export { LineChart } from "./line-chart";
export { Line } from "./line";
export { ChartStatFlow } from "./chart-stat-flow";
export { useChart } from "./chart-context";`,
  "dashboard-harbor-01": `export { AreaChart } from "./area-chart";
export { Area } from "./area";
export { Grid } from "./grid";
export { XAxis } from "./x-axis";
export { ChartTooltip } from "./tooltip";
export { LinearGradient } from "@visx/gradient";`,
  "dashboard-ledger-01": `export { BarChart } from "./bar-chart";
export { Bar } from "./bar";
export { BarColumnTrack, BarSquares } from "./bar-squares";
export { Grid } from "./grid";
export { YAxis } from "./y-axis";
export { ChartTooltip } from "./tooltip";`,
  "dashboard-muster-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { Ring } from "./ring";
export { RingChart } from "./ring-chart";
export { ChartTooltip } from "./tooltip";`,
  "dashboard-patron-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { ComposedChart } from "./composed-chart";
export { Grid } from "./grid";
export { Line } from "./line";
export { SeriesBar } from "./series-bar";
export { ChartTooltip } from "./tooltip";
export { XAxis } from "./x-axis";`,
  "bento-grid-insights-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { LiveLine } from "./live-line";
export { LiveLineChart, type LiveLinePoint } from "./live-line-chart";
export { LiveXAxis } from "./live-x-axis";
export { LiveYAxis } from "./live-y-axis";
export { ChartTooltip, TooltipContent } from "./tooltip";`,
  "chart-group-business-01": `export { Area } from "./area";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { ComposedChart } from "./composed-chart";
export { Grid } from "./grid";
export { Line } from "./line";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { SeriesBar } from "./series-bar";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-saas-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { Gauge } from "./gauge";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { Ring } from "./ring";
export { RingCenter } from "./ring-center";
export { RingChart } from "./ring-chart";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-marketing-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarYAxis } from "./bar-y-axis";
export { useChartStable, useYScale } from "./chart-context";
export { ComposedChart } from "./composed-chart";
export { FunnelChart } from "./funnel-chart";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { SeriesBar } from "./series-bar";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-ecommerce-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { buildArcs } from "./sunburst";
export { SunburstCenter } from "./sunburst-center";
export { SunburstChart } from "./sunburst-chart";
export { type SunburstNode } from "./sunburst-data";
export { SunburstHint } from "./sunburst-hint";
export { SunburstLabels } from "./sunburst-labels";
export { SunburstSegment } from "./sunburst-segment";
export { ChartTooltip } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-traffic-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarYAxis } from "./bar-y-axis";
export { useChartStable } from "./chart-context";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { SankeyChart, type SankeyData, SankeyLink, SankeyNode, SankeyTooltip, useSankey } from "./sankey";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-finance-01": `export { useChartHover, useChartStable, useYScale } from "./chart-context";
export { ComposedChart } from "./composed-chart";
export { Gauge } from "./gauge";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { PROFIT_LOSS_NEGATIVE_COLOR, PROFIT_LOSS_POSITIVE_COLOR, profitLossColor, ProfitLossLine } from "./profit-loss-line";
export { SeriesBar } from "./series-bar";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-product-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarYAxis } from "./bar-y-axis";
export { Grid } from "./grid";
export { HeatmapCells, HeatmapChart, type HeatmapColumn, type HeatmapLevelStyles, HeatmapTooltip } from "./heatmap";
export { Scatter } from "./scatter";
export { ScatterChart } from "./scatter-chart";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-support-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { Gauge } from "./gauge";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-sales-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarYAxis } from "./bar-y-axis";
export { FunnelChart } from "./funnel-chart";
export { Gauge } from "./gauge";
export { Grid } from "./grid";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-social-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { Grid } from "./grid";
export { HeatmapCells, HeatmapChart, type HeatmapColumn, type HeatmapLevelStyles, HeatmapTooltip, HeatmapYAxis } from "./heatmap";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { ChartTooltip } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-hiring-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { FunnelChart, type FunnelStage } from "./funnel-chart";
export { Grid } from "./grid";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { RadarArea } from "./radar-area";
export { RadarAxis } from "./radar-axis";
export { RadarChart } from "./radar-chart";
export { type RadarData, type RadarMetric } from "./radar-context";
export { RadarGrid } from "./radar-grid";
export { RadarLabels } from "./radar-labels";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { YAxis } from "./y-axis";`,
  "chart-group-logistics-01": `export { BarChart } from "./bar-chart";
export { BarColumnTrack, BarSquares } from "./bar-squares";
export { BarXAxis } from "./bar-x-axis";
export { ComposedChart } from "./composed-chart";
export { Gauge } from "./gauge";
export { Grid } from "./grid";
export { Line } from "./line";
export { SankeyChart, type SankeyData, SankeyLink, SankeyNode, SankeyTooltip, useSankey } from "./sankey";
export { SeriesBar } from "./series-bar";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-energy-01": `export { Area } from "./area";
export { AreaChart } from "./area-chart";
export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarYAxis } from "./bar-y-axis";
export { useChart } from "./chart-context";
export { Grid } from "./grid";
export { HeatmapCells, HeatmapChart, type HeatmapColumn, HeatmapInteractionProvider, HeatmapLegend, type HeatmapLevelStyles, HeatmapTooltip, HeatmapYAxis } from "./heatmap";
export { LiveLine } from "./live-line";
export { LiveLineChart, type LiveLinePoint } from "./live-line-chart";
export { LiveXAxis } from "./live-x-axis";
export { LiveYAxis } from "./live-y-axis";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { YAxis } from "./y-axis";`,
  "chart-group-markets-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { Candlestick } from "./candlestick";
export { CandlestickChart } from "./candlestick-chart";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { PieCenter } from "./pie-center";
export { PieChart } from "./pie-chart";
export { PieSlice } from "./pie-slice";
export { PROFIT_LOSS_NEGATIVE_COLOR, PROFIT_LOSS_POSITIVE_COLOR, profitLossColor, ProfitLossLine } from "./profit-loss-line";
export { ChartTooltip } from "./tooltip";
export { XAxis } from "./x-axis";
export { YAxis } from "./y-axis";`,
  "chart-group-fitness-01": `export { Bar } from "./bar";
export { BarChart } from "./bar-chart";
export { BarXAxis } from "./bar-x-axis";
export { useChart } from "./chart-context";
export { Grid } from "./grid";
export { Line } from "./line";
export { LineChart } from "./line-chart";
export { RadarArea } from "./radar-area";
export { RadarAxis } from "./radar-axis";
export { RadarChart } from "./radar-chart";
export { RadarGrid } from "./radar-grid";
export { RadarLabels } from "./radar-labels";
export { Ring } from "./ring";
export { RingChart } from "./ring-chart";
export { ChartTooltip, TooltipContent } from "./tooltip";
export { YAxis } from "./y-axis";`,
  "stat-card-choropleth-01": `export { type ChoroplethFeature, ChoroplethChart, ChoroplethFeatureComponent, ChoroplethTooltip, useChoropleth } from "./choropleth";
export { ChartStatFlow } from "./chart-stat-flow";`,
};

/**
 * Set `pro: true` to make a block part of Cortexcn Pro: its item is marked
 * `meta.pro`, and strip-pro-items.mjs keeps it out of the public registry.
 *
 * @type {Record<string, { title: string, description: string, previewMaxWidth: string, registryDependencies: string[], dependencies: string[], files: string[], pro?: boolean, extraFiles?: { path: string, target: string, content?: string }[] }>}
 */
const BLOCKS = {
  "feature-spotlight-grid-01": {
    title: "Feature Spotlight Grid",
    description:
      "Six icon cards under a centered intro, with one soft highlight that glides to the card you point at",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: ["motion"],
    files: ["components/feature-spotlight-grid.tsx"],
  },
  "feature-studio-grid-01": {
    title: "Feature Studio Grid",
    description:
      "Heading and one action over two compact cards and a large feature tile, for posts, case studies, or launches",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: [],
    files: ["components/feature-studio-grid.tsx"],
  },
  "feature-bento-grid-01": {
    title: "Feature Bento Grid",
    description:
      "A bento of photo tiles, logo tiles, and stat cards on a twelve-column grid, with one call to action",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: [],
    files: ["components/feature-bento-grid.tsx"],
  },
  "feature-mixed-bento-01": {
    title: "Feature Mixed Bento",
    description:
      "A mono label over four cards on a five-column grid, each setting its title, copy, and image a different way, over soft blurred glows and a faint plus pattern",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "card"],
    dependencies: [],
    files: ["components/feature-mixed-bento.tsx"],
  },
  "feature-mockup-grid-01": {
    title: "Feature Mockup Grid",
    description:
      "A centered label and heading over five cards, two on top and three below, each with a small product mockup drawn in theme colors",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: [],
    files: ["components/feature-mockup-grid.tsx"],
  },
  "feature-walkthrough-01": {
    title: "Feature Walkthrough",
    description:
      "Three numbered steps beside a painted stage in a ruled frame. Each step plays out in its own window, and the steps move on by themselves",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "@cortexcn/marquee"],
    dependencies: ["motion"],
    files: ["components/feature-walkthrough.tsx"],
  },
  "services-image-grid-01": {
    title: "Services Image Grid",
    description:
      "An intro with a heading, a short pitch, and one outline action beside five image cards that fade when you point at them",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button", "card"],
    dependencies: ["motion"],
    files: ["components/services-image-grid.tsx"],
  },
  "services-preview-list-01": {
    title: "Services Preview List",
    description:
      "A large numbered list of services beside a panel that stays in view and wipes in the image and description of the one you point at",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["motion"],
    files: ["components/services-preview-list.tsx"],
  },
  "gallery-fluted-glass-01": {
    title: "Fluted Glass Slideshow",
    description:
      "A wide slideshow where each new slide arrives through ribbed glass that splits it into bent vertical strips, which line up into a clear picture as it lands, with autoplay, a pause button, arrows, and a bar per slide",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["lucide-react", "motion"],
    files: [
      "components/fluted-glass-slideshow.tsx",
      "components/fluted-glass/fluted-layer.tsx",
      "components/fluted-glass/slide-caption.tsx",
      "components/fluted-glass/slide-controls.tsx",
      "components/fluted-glass/slide-progress.tsx",
      "components/fluted-glass/slides.ts",
      "components/fluted-glass/use-slideshow.ts",
    ],
  },
  "gallery-liquid-seams-01": {
    title: "Liquid Seams",
    description:
      "A centered column of pictures whose joins run together like wet paint while the page scrolls fast, then part into crisp, separate pictures with a clear gap as it slows",
    previewMaxWidth: "max-w-3xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: ["motion"],
    files: [
      "components/liquid-seams-gallery.tsx",
      "components/liquid-seams/gallery-header.tsx",
      "components/liquid-seams/picture-tile.tsx",
      "components/liquid-seams/pictures.ts",
      "components/liquid-seams/seam-band.tsx",
      "components/liquid-seams/seam-filter.tsx",
      "components/liquid-seams/use-seam-flow.ts",
    ],
  },
  "gallery-print-pile-01": {
    title: "Print Pile",
    description:
      "Portrait prints in a loose, tilted pile that one button lays out in a four-column grid with captions, two columns on phones, and gathers back into the pile",
    previewMaxWidth: "max-w-5xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["lucide-react", "motion"],
    files: [
      "components/print-pile-gallery.tsx",
      "components/print-pile/arrange-toggle.tsx",
      "components/print-pile/pile-header.tsx",
      "components/print-pile/pile-layout.ts",
      "components/print-pile/print-card.tsx",
      "components/print-pile/print-stage.tsx",
      "components/print-pile/prints.ts",
    ],
    pro: true,
  },
  "blog-masonry-01": {
    title: "Blog Masonry Grid",
    description:
      "Blog posts in staggered columns with cover pictures of mixed shapes, where pointing at a post or tabbing to it dims the others and slides its summary up over the picture",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "badge", "button", "card"],
    dependencies: ["lucide-react"],
    files: [
      "components/blog-masonry-grid.tsx",
      "components/blog-masonry/blog-header.tsx",
      "components/blog-masonry/post-card.tsx",
      "components/blog-masonry/post-grid.tsx",
      "components/blog-masonry/posts.ts",
    ],
    pro: true,
  },
  "hero-tilted-wall-01": {
    title: "Hero Tilted Wall",
    description:
      "A badge, a headline, a short description, and two buttons in front of a tilted wall of paintings whose columns scroll endlessly in opposite directions",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/utils",
      "@cortexcn/perspective-marquee",
      "badge",
      "button",
    ],
    dependencies: ["lucide-react", "motion"],
    files: [
      "components/hero-tilted-wall.tsx",
      "components/hero-tilted-wall/content.ts",
      "components/hero-tilted-wall/hero-action.tsx",
      "components/hero-tilted-wall/hero-copy.tsx",
      "components/hero-tilted-wall/wall-backdrop.tsx",
      "components/hero-tilted-wall/wall-images.ts",
    ],
    pro: true,
  },
  "hero-dashboard-01": {
    title: "Hero Dashboard Preview",
    description:
      "A serif headline, a short pitch, and one call to action over a framed product dashboard on a soft photo wash",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: [
      "@cortexcn/utils",
      "avatar",
      "badge",
      "button",
      "card",
      "separator",
    ],
    dependencies: ["class-variance-authority", "lucide-react", "motion"],
    files: [
      "components/hero-dashboard.tsx",
      "components/hero-dashboard-demo.tsx",
      "components/hero-cta.tsx",
    ],
  },
  "hero-studio-01": {
    title: "Hero Studio",
    description:
      "A short tagline beside a serif headline and pitch, over a wide landscape photo that fades into the page",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["class-variance-authority", "motion"],
    files: ["components/hero-studio.tsx", "components/hero-cta.tsx"],
  },
  "hero-cover-01": {
    title: "Hero Cover Photo",
    description:
      "A full-bleed photo with the title, a small label, a short description, and one call to action along its bottom edge",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["class-variance-authority", "motion"],
    files: ["components/hero-cover.tsx", "components/hero-cta.tsx"],
  },
  "hero-synapse-01": {
    title: "Hero Synapse",
    description:
      "A two-tone headline, a pitch, and one call to action on a hilltop photo, with a video card and a scrolling logo row under a progressive blur",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: ["motion"],
    files: ["components/hero-synapse.tsx"],
    pro: true,
  },
  "ai-tool-router-01": {
    title: "Tool Router",
    description:
      "An agent works through a task by calling tools, each call a pulse from the agent to the tool and back, with a list that marks each call done and shows what came back",
    previewMaxWidth: "max-w-xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: ["lucide-react"],
    files: [
      "components/tool-router.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/tool-router/call-list.tsx",
      "components/tool-router/router-tasks.tsx",
      "components/tool-router/router-tool.tsx",
      "components/tool-router/use-router-run.ts",
    ],
    pro: true,
  },
  "ai-integration-beam-01": {
    title: "Integration Beam",
    description:
      "Your product between the tools it connects, joined by curved lines that carry pulses in sync cycles. Point at a tool to bring its line forward, or press it to pause it",
    previewMaxWidth: "max-w-2xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: [],
    files: [
      "components/integration-beam.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-beam/beam-hub.tsx",
      "components/integration-beam/beam-tool.tsx",
      "components/integration-beam/beam-tools.tsx",
      "components/integration-beam/use-sync-cycle.ts",
    ],
    pro: true,
  },
  "ai-integration-section-01": {
    title: "Integration Section",
    description:
      "A heading, a short pitch, three points, and one call to action beside the Integration Beam scene, where pulses run from your tools into your product and back out",
    previewMaxWidth: "max-w-6xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["lucide-react"],
    files: [
      "components/integration-section.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-beam.tsx",
      "components/integration-beam/beam-hub.tsx",
      "components/integration-beam/beam-tool.tsx",
      "components/integration-beam/beam-tools.tsx",
      "components/integration-beam/use-sync-cycle.ts",
    ],
    pro: true,
  },
  "ai-integration-orbit-01": {
    title: "Integration Orbit",
    description:
      "Your product at the center of a ring of tools, with waves of pulses sweeping out to each tool and back in. Point at a tool to bring its line forward, or press it to pause it",
    previewMaxWidth: "max-w-lg",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: [],
    files: [
      "components/integration-orbit.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-orbit/orbit-hub.tsx",
      "components/integration-orbit/orbit-tile.tsx",
      "components/integration-orbit/orbit-tools.tsx",
      "components/integration-orbit/use-orbit-waves.ts",
    ],
    pro: true,
  },
  "ai-integration-pipeline-01": {
    title: "Workflow Pipeline",
    description:
      "A workflow drawn as steps joined by lines. Each step runs, finishes with a check, and sends a pulse to the next, and a switch turns the workflow off",
    previewMaxWidth: "max-w-4xl",
    registryDependencies: ["@cortexcn/utils", "switch"],
    dependencies: ["lucide-react"],
    files: [
      "components/integration-pipeline.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-pipeline/pipeline-header.tsx",
      "components/integration-pipeline/pipeline-step.tsx",
      "components/integration-pipeline/pipeline-steps.tsx",
      "components/integration-pipeline/use-pipeline-run.ts",
    ],
    pro: true,
  },
  "ai-integration-events-01": {
    title: "Event Stream",
    description:
      "Events leave your product for the tools that receive them, each riding a pulse along its line, and a log lists every delivery with the time it landed",
    previewMaxWidth: "max-w-4xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: ["lucide-react"],
    files: [
      "components/integration-events.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-events/event-feed.tsx",
      "components/integration-events/event-log.tsx",
      "components/integration-events/event-target.tsx",
      "components/integration-events/use-event-stream.ts",
    ],
    pro: true,
  },
  "ai-integration-sync-status-01": {
    title: "Sync Status",
    description:
      "A card of connected tools that sync in turn along lines from your product, each counting the time since its last sync, with a switch to pause it",
    previewMaxWidth: "max-w-md",
    registryDependencies: ["@cortexcn/utils", "switch"],
    dependencies: [],
    files: [
      "components/integration-sync-status.tsx",
      "components/beam/arrival-ring.tsx",
      "components/beam/beam-engine.ts",
      "components/beam/beam-geometry.ts",
      "components/beam/beam-layer.tsx",
      "components/beam/beam-timeline.ts",
      "components/beam/brand-logos.tsx",
      "components/beam/cortexcn-mark.tsx",
      "components/beam/status-chip.tsx",
      "components/integration-sync-status/sync-row.tsx",
      "components/integration-sync-status/sync-tools.tsx",
      "components/integration-sync-status/use-sync-rounds.ts",
    ],
    pro: true,
  },
  "dashboard-ledger-01": {
    title: "Dashboard Ledger",
    description:
      "A store overview with a sidebar, four key numbers with sparklines, weekly sales as stacked square columns, sales by channel, and a sortable table of recent orders",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/utils",
      "@cortexcn/y-axis",
      "avatar",
      "button",
      "dropdown-menu",
      "input",
      "sheet",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/dashboard-ledger.tsx",
      "components/ledger/sidebar.tsx",
      "components/ledger/header.tsx",
      "components/ledger/panel.tsx",
      "components/ledger/kpi-card.tsx",
      "components/ledger/sales-trend-panel.tsx",
      "components/ledger/sales-trend-chart.tsx",
      "components/ledger/channel-panel.tsx",
      "components/ledger/channel-chart.tsx",
      "components/ledger/orders-table.tsx",
      "components/ledger/orders-list.tsx",
      "components/ledger/status-badge.tsx",
      "components/ledger/orders.ts",
      "components/ledger/format.ts",
      "components/ledger/data.ts",
    ],
    pro: true,
  },
  "dashboard-treasury-01": {
    title: "Dashboard Treasury",
    description:
      "A finance team's vendor payouts: four key numbers with daily bars, a map of the payment rails and their health, a filterable table of payment exceptions, and the active payment policy",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/service-map",
      "@cortexcn/utils",
      "button",
      "dropdown-menu",
      "input",
    ],
    dependencies: ["@hugeicons/core-free-icons", "@hugeicons/react"],
    files: [
      "components/dashboard-treasury.tsx",
      "components/treasury/top-bar.tsx",
      "components/treasury/rail.tsx",
      "components/treasury/view-bar.tsx",
      "components/treasury/panel.tsx",
      "components/treasury/kpi-card.tsx",
      "components/treasury/rails-panel.tsx",
      "components/treasury/exceptions-table.tsx",
      "components/treasury/policy-panel.tsx",
      "components/treasury/control-card.tsx",
      "components/treasury/route-rule.tsx",
      "components/treasury/value-chip.tsx",
      "components/treasury/format.ts",
      "components/treasury/data.ts",
    ],
    pro: true,
  },
  "dashboard-patron-01": {
    title: "Dashboard Patron",
    description:
      "A fundraising team's overview: appeal progress, last month's donations, top prospects, a day of donor meetings, campaign gaps, gift channels, daily gift activity, and the year-end forecast",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/composed-chart",
      "@cortexcn/utils",
      "avatar",
      "badge",
      "button",
      "dropdown-menu",
      "input",
      "sheet",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/dashboard-patron.tsx",
      "components/patron/rail.tsx",
      "components/patron/sidebar.tsx",
      "components/patron/header.tsx",
      "components/patron/card.tsx",
      "components/patron/insight-card.tsx",
      "components/patron/donations-card.tsx",
      "components/patron/donations-chart.tsx",
      "components/patron/prospects-card.tsx",
      "components/patron/schedule-card.tsx",
      "components/patron/schedule-timeline.tsx",
      "components/patron/campaign-gaps-card.tsx",
      "components/patron/channels-card.tsx",
      "components/patron/activity-card.tsx",
      "components/patron/activity-chart.tsx",
      "components/patron/forecast-card.tsx",
      "components/patron/goal-orb.tsx",
      "components/patron/format.ts",
      "components/patron/data.ts",
    ],
    pro: true,
  },
  "dashboard-muster-01": {
    title: "Dashboard Muster",
    description:
      "A people dashboard for startup teams: check-ins and attendance, who is away or out, onboarding checklists, a time tracker, the employee spotlight, notes, requests, and the current project, with create, edit, and delete wired to an optional API",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/ring-chart",
      "@cortexcn/utils",
      "avatar",
      "button",
      "dropdown-menu",
      "input",
      "label",
      "popover",
      "select",
      "sheet",
      "tabs",
      "textarea",
    ],
    dependencies: ["@hugeicons/core-free-icons", "@hugeicons/react"],
    files: [
      "components/dashboard-muster.tsx",
      "components/muster/index.ts",
      "components/muster/layout/index.ts",
      "components/muster/layout/header.tsx",
      "components/muster/layout/logo.tsx",
      "components/muster/layout/meeting-card.tsx",
      "components/muster/layout/nav.tsx",
      "components/muster/layout/profile-card.tsx",
      "components/muster/layout/requests-popover.tsx",
      "components/muster/layout/schedule-popover.tsx",
      "components/muster/layout/search-popover.tsx",
      "components/muster/layout/sidebar.tsx",
      "components/muster/cards/index.ts",
      "components/muster/cards/attendance-card.tsx",
      "components/muster/cards/attendance-chart.tsx",
      "components/muster/cards/checklist-popover.tsx",
      "components/muster/cards/note-row.tsx",
      "components/muster/cards/notes-card.tsx",
      "components/muster/cards/onboarding-card.tsx",
      "components/muster/cards/progress-ring.tsx",
      "components/muster/cards/project-card.tsx",
      "components/muster/cards/project-picker.tsx",
      "components/muster/cards/spotlight-card.tsx",
      "components/muster/cards/spotlight-comments.tsx",
      "components/muster/cards/spotlight-overview.tsx",
      "components/muster/cards/spotlight-rewards.tsx",
      "components/muster/cards/status-card.tsx",
      "components/muster/cards/team-sheet.tsx",
      "components/muster/cards/time-entry-row.tsx",
      "components/muster/cards/time-history-sheet.tsx",
      "components/muster/cards/time-tracker-card.tsx",
      "components/muster/forms/index.ts",
      "components/muster/forms/note-sheet.tsx",
      "components/muster/forms/request-sheet.tsx",
      "components/muster/ui/index.ts",
      "components/muster/ui/avatar-stack.tsx",
      "components/muster/ui/card.tsx",
      "components/muster/ui/eyebrow.tsx",
      "components/muster/ui/field.tsx",
      "components/muster/ui/form-sheet.tsx",
      "components/muster/ui/person-avatar.tsx",
      "components/muster/ui/project-mark.tsx",
      "components/muster/ui/tag.tsx",
      "components/muster/lib/index.ts",
      "components/muster/lib/data.ts",
      "components/muster/lib/format.ts",
      "components/muster/lib/store.tsx",
      "components/muster/lib/theme.ts",
      "components/muster/lib/types.ts",
      "components/muster/lib/use-collection.ts",
      "components/muster/lib/use-stopwatch.ts",
    ],
    pro: true,
  },
  "bento-grid-insights-01": {
    title: "Bento Grid Insights",
    description:
      "A bento of metric tiles: a photo highlight, recurring revenue with a weekly gauge, live net revenue, a product table with CSV export, active users with a bar trend, and small wallet, key, and team tiles",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/live-line-chart",
      "@cortexcn/utils",
      "button",
      "switch",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/bento-grid-insights.tsx",
      "components/bento-insights/tile.tsx",
      "components/bento-insights/change-pill.tsx",
      "components/bento-insights/highlight-tile.tsx",
      "components/bento-insights/recurring-revenue-tile.tsx",
      "components/bento-insights/revenue-meter.tsx",
      "components/bento-insights/wallet-tile.tsx",
      "components/bento-insights/growth-tile.tsx",
      "components/bento-insights/growth-chart.tsx",
      "components/bento-insights/use-live-revenue.ts",
      "components/bento-insights/pass-tile.tsx",
      "components/bento-insights/activation-tile.tsx",
      "components/bento-insights/overview-tile.tsx",
      "components/bento-insights/digest-tile.tsx",
      "components/bento-insights/team-tile.tsx",
      "components/bento-insights/active-users-tile.tsx",
      "components/bento-insights/users-chart.tsx",
      "components/bento-insights/format.ts",
      "components/bento-insights/data.ts",
    ],
    pro: true,
  },
  "chart-group-business-01": {
    title: "Chart Group Business Analytics",
    description:
      "Five key numbers and four charts for a 30-day range, with arrows to step through earlier ranges: performance, devices, customer types, and hourly traffic",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/composed-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "button",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-business.tsx",
      "components/chart-group-business/cards.tsx",
      "components/chart-group-business/customer-types-chart.tsx",
      "components/chart-group-business/device-breakdown.tsx",
      "components/chart-group-business/header.tsx",
      "components/chart-group-business/hourly-traffic-chart.tsx",
      "components/chart-group-business/performance-chart.tsx",
      "components/chart-group-business/data.ts",
      "components/chart-group-business/format.ts",
    ],
    pro: true,
  },
  "chart-group-saas-01": {
    title: "Chart Group SaaS Metrics",
    description:
      "Five key numbers and five charts for a subscription app, with a 3, 6, or 12 month switch: stacked MRR, churn, plan mix, signups against cancellations, and net revenue retention",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/gauge-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/ring-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "button",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-saas.tsx",
      "components/chart-group-saas/cards.tsx",
      "components/chart-group-saas/churn-chart.tsx",
      "components/chart-group-saas/header.tsx",
      "components/chart-group-saas/mrr-chart.tsx",
      "components/chart-group-saas/plan-mix.tsx",
      "components/chart-group-saas/retention-gauge.tsx",
      "components/chart-group-saas/signups-chart.tsx",
      "components/chart-group-saas/data.ts",
      "components/chart-group-saas/format.ts",
    ],
    pro: true,
  },
  "chart-group-marketing-01": {
    title: "Chart Group Marketing Campaigns",
    description:
      "A campaign funnel, spend against conversions, return on ad spend by channel, and click-through rate over time",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/chart-context",
      "@cortexcn/chart-tooltip",
      "@cortexcn/composed-chart",
      "@cortexcn/funnel-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-marketing.tsx",
      "components/chart-group-marketing/campaign-funnel.tsx",
      "components/chart-group-marketing/cards.tsx",
      "components/chart-group-marketing/ctr-chart.tsx",
      "components/chart-group-marketing/header.tsx",
      "components/chart-group-marketing/roas-channel-chart.tsx",
      "components/chart-group-marketing/spend-conversions-chart.tsx",
      "components/chart-group-marketing/data.ts",
      "components/chart-group-marketing/format.ts",
    ],
    pro: true,
  },
  "chart-group-ecommerce-01": {
    title: "Chart Group Online Store",
    description:
      "Orders over time, sales by category, average order value, and returns for an online shop",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/sunburst-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-ecommerce.tsx",
      "components/chart-group-ecommerce/cards.tsx",
      "components/chart-group-ecommerce/category-sunburst.tsx",
      "components/chart-group-ecommerce/header.tsx",
      "components/chart-group-ecommerce/order-value-chart.tsx",
      "components/chart-group-ecommerce/orders-chart.tsx",
      "components/chart-group-ecommerce/returns-chart.tsx",
      "components/chart-group-ecommerce/data.ts",
      "components/chart-group-ecommerce/format.ts",
    ],
    pro: true,
  },
  "chart-group-traffic-01": {
    title: "Chart Group Website Traffic",
    description:
      "Sessions over time, traffic sources, the paths visitors take through the site, and top pages",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/chart-context",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/sankey-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-traffic.tsx",
      "components/chart-group-traffic/cards.tsx",
      "components/chart-group-traffic/header.tsx",
      "components/chart-group-traffic/sessions-chart.tsx",
      "components/chart-group-traffic/sources-chart.tsx",
      "components/chart-group-traffic/top-pages-chart.tsx",
      "components/chart-group-traffic/visitor-paths-chart.tsx",
      "components/chart-group-traffic/data.ts",
      "components/chart-group-traffic/format.ts",
    ],
    pro: true,
  },
  "chart-group-finance-01": {
    title: "Chart Group Cash Flow",
    description:
      "Five key numbers and four charts for one month, with arrows to step back through earlier months: daily profit and loss, months of runway, spending by category, and money in and out by week",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/chart-context",
      "@cortexcn/chart-tooltip",
      "@cortexcn/composed-chart",
      "@cortexcn/gauge-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/profit-loss-line",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "button",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-finance.tsx",
      "components/chart-group-finance/cards.tsx",
      "components/chart-group-finance/header.tsx",
      "components/chart-group-finance/money-flow-chart.tsx",
      "components/chart-group-finance/profit-loss-chart.tsx",
      "components/chart-group-finance/runway-gauge.tsx",
      "components/chart-group-finance/spend-breakdown.tsx",
      "components/chart-group-finance/data.ts",
      "components/chart-group-finance/format.ts",
    ],
    pro: true,
  },
  "chart-group-product-01": {
    title: "Chart Group Product Usage",
    description:
      "Five key numbers and four charts for the last 30 days, with a switch for all platforms, web, iOS, and Android: active users, feature adoption, retention by cohort, and sessions",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/heatmap-chart",
      "@cortexcn/scatter-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-product.tsx",
      "components/chart-group-product/active-users-chart.tsx",
      "components/chart-group-product/cards.tsx",
      "components/chart-group-product/feature-adoption-chart.tsx",
      "components/chart-group-product/header.tsx",
      "components/chart-group-product/retention-heatmap.tsx",
      "components/chart-group-product/session-scatter.tsx",
      "components/chart-group-product/data.ts",
      "components/chart-group-product/format.ts",
    ],
    pro: true,
  },
  "chart-group-support-01": {
    title: "Chart Group Support Desk",
    description:
      "Tickets by priority, first response time, customer satisfaction, and tickets by channel",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/gauge-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "button",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-support.tsx",
      "components/chart-group-support/cards.tsx",
      "components/chart-group-support/channel-breakdown.tsx",
      "components/chart-group-support/csat-gauge.tsx",
      "components/chart-group-support/header.tsx",
      "components/chart-group-support/response-chart.tsx",
      "components/chart-group-support/tickets-chart.tsx",
      "components/chart-group-support/data.ts",
      "components/chart-group-support/format.ts",
    ],
    pro: true,
  },
  "chart-group-sales-01": {
    title: "Chart Group Sales Pipeline",
    description:
      "Deals by pipeline stage, revenue won over time, a team leaderboard, and the win rate against target",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/funnel-chart",
      "@cortexcn/gauge-chart",
      "@cortexcn/grid",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "button",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-sales.tsx",
      "components/chart-group-sales/cards.tsx",
      "components/chart-group-sales/header.tsx",
      "components/chart-group-sales/leaderboard-chart.tsx",
      "components/chart-group-sales/pipeline-funnel.tsx",
      "components/chart-group-sales/revenue-chart.tsx",
      "components/chart-group-sales/win-rate-gauge.tsx",
      "components/chart-group-sales/data.ts",
      "components/chart-group-sales/format.ts",
    ],
    pro: true,
  },
  "chart-group-social-01": {
    title: "Chart Group Social Media",
    description:
      "Five key numbers and four charts for one brand's accounts on three networks, with a 7, 30, or 90 day switch: follower growth, posts by format, engagement by format, and the best time to post",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/heatmap-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-social.tsx",
      "components/chart-group-social/cards.tsx",
      "components/chart-group-social/follower-growth-chart.tsx",
      "components/chart-group-social/format-engagement-chart.tsx",
      "components/chart-group-social/header.tsx",
      "components/chart-group-social/posting-times-heatmap.tsx",
      "components/chart-group-social/posts-by-format.tsx",
      "components/chart-group-social/data.ts",
      "components/chart-group-social/format.ts",
    ],
    pro: true,
  },
  "chart-group-hiring-01": {
    title: "Chart Group Hiring and Team",
    description:
      "Five key numbers and four charts with a department filter: headcount against the hiring plan, people by department or team, skills coverage against a target, and the hiring funnel",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/funnel-chart",
      "@cortexcn/grid",
      "@cortexcn/pie-chart",
      "@cortexcn/radar-chart",
      "@cortexcn/utils",
      "@cortexcn/y-axis",
      "button",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-hiring.tsx",
      "components/chart-group-hiring/cards.tsx",
      "components/chart-group-hiring/headcount-breakdown.tsx",
      "components/chart-group-hiring/headcount-chart.tsx",
      "components/chart-group-hiring/header.tsx",
      "components/chart-group-hiring/hiring-funnel.tsx",
      "components/chart-group-hiring/skills-radar.tsx",
      "components/chart-group-hiring/data.ts",
      "components/chart-group-hiring/format.ts",
    ],
    pro: true,
  },
  "chart-group-logistics-01": {
    title: "Chart Group Shipping and Inventory",
    description:
      "Shipments against returns, on-time delivery, warehouse capacity, and how stock flows between sites",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/composed-chart",
      "@cortexcn/gauge-chart",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/sankey-chart",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-logistics.tsx",
      "components/chart-group-logistics/capacity-chart.tsx",
      "components/chart-group-logistics/cards.tsx",
      "components/chart-group-logistics/header.tsx",
      "components/chart-group-logistics/on-time-gauge.tsx",
      "components/chart-group-logistics/shipments-chart.tsx",
      "components/chart-group-logistics/stock-flow-chart.tsx",
      "components/chart-group-logistics/data.ts",
      "components/chart-group-logistics/format.ts",
    ],
    pro: true,
  },
  "chart-group-energy-01": {
    title: "Chart Group Energy Monitor",
    description:
      "Five key numbers and four charts for a home or a small studio with solar panels, with tabs to switch sites: live power, use by room, solar against grid, and busy hours",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/bar-chart",
      "@cortexcn/chart-context",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/heatmap-chart",
      "@cortexcn/live-line-chart",
      "@cortexcn/utils",
      "@cortexcn/y-axis",
      "button",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-energy.tsx",
      "components/chart-group-energy/cards.tsx",
      "components/chart-group-energy/header.tsx",
      "components/chart-group-energy/live-power-chart.tsx",
      "components/chart-group-energy/room-use-chart.tsx",
      "components/chart-group-energy/supply-chart.tsx",
      "components/chart-group-energy/week-heatmap.tsx",
      "components/chart-group-energy/data.ts",
      "components/chart-group-energy/format.ts",
      "components/chart-group-energy/use-live-power.ts",
    ],
    pro: true,
  },
  "chart-group-markets-01": {
    title: "Chart Group Market Watch",
    description:
      "Daily price candles, trading volume, portfolio allocation, and profit and loss by day",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/candlestick-chart",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/pie-chart",
      "@cortexcn/profit-loss-line",
      "@cortexcn/utils",
      "@cortexcn/x-axis",
      "@cortexcn/y-axis",
      "badge",
      "tabs",
    ],
    dependencies: ["@visx/curve@4.0.1-alpha.0", "lucide-react"],
    files: [
      "components/chart-group-markets.tsx",
      "components/chart-group-markets/allocation-chart.tsx",
      "components/chart-group-markets/cards.tsx",
      "components/chart-group-markets/header.tsx",
      "components/chart-group-markets/price-chart.tsx",
      "components/chart-group-markets/profit-loss-chart.tsx",
      "components/chart-group-markets/session-axis.tsx",
      "components/chart-group-markets/volume-chart.tsx",
      "components/chart-group-markets/data.ts",
      "components/chart-group-markets/format.ts",
    ],
    pro: true,
  },
  "chart-group-fitness-01": {
    title: "Chart Group Fitness Tracker",
    description:
      "Five key numbers and four charts for one person's training week, with tabs for the day and arrows to step through weeks: activity rings, steps, heart rate, and training balance",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/bar-chart",
      "@cortexcn/chart-context",
      "@cortexcn/chart-tooltip",
      "@cortexcn/grid",
      "@cortexcn/line-chart",
      "@cortexcn/radar-chart",
      "@cortexcn/ring-chart",
      "@cortexcn/utils",
      "@cortexcn/y-axis",
      "button",
      "tabs",
    ],
    dependencies: ["lucide-react"],
    files: [
      "components/chart-group-fitness.tsx",
      "components/chart-group-fitness/activity-rings.tsx",
      "components/chart-group-fitness/cards.tsx",
      "components/chart-group-fitness/header.tsx",
      "components/chart-group-fitness/heart-rate-chart.tsx",
      "components/chart-group-fitness/steps-chart.tsx",
      "components/chart-group-fitness/training-balance-chart.tsx",
      "components/chart-group-fitness/data.ts",
      "components/chart-group-fitness/format.ts",
    ],
    pro: true,
  },
  "dashboard-harbor-01": {
    title: "Dashboard Harbor",
    description:
      "A hotel front desk for one evening: tonight's numbers, a room board by floor that filters by status, a 14-night occupancy chart, and the day's schedule",
    previewMaxWidth: "max-w-7xl",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/utils",
      "avatar",
      "badge",
      "button",
      "card",
      "dropdown-menu",
    ],
    dependencies: [
      "@visx/curve@4.0.1-alpha.0",
      "@visx/gradient@4.0.1-alpha.0",
      "lucide-react",
    ],
    files: [
      "components/dashboard-harbor.tsx",
      "components/harbor/top-bar.tsx",
      "components/harbor/page-heading.tsx",
      "components/harbor/kpi-card.tsx",
      "components/harbor/room-board.tsx",
      "components/harbor/forecast-panel.tsx",
      "components/harbor/occupancy-forecast.tsx",
      "components/harbor/schedule-panel.tsx",
      "components/harbor/format.ts",
      "components/harbor/data.ts",
    ],
    pro: true,
  },
  "loader-dot-matrix-01": {
    title: "Loader Dot Matrix",
    description:
      "A grid of dots that pulses in a ripple, wave, or rain pattern, shown four ways including inside a button",
    previewMaxWidth: "max-w-3xl",
    registryDependencies: ["@cortexcn/utils", "button"],
    dependencies: [],
    files: [
      "components/loader-dot-matrix-demo.tsx",
      "components/loader-dot-matrix.tsx",
    ],
  },
  "loader-glitch-text-01": {
    title: "Loader Glitch Text",
    description:
      "Loading text that scrambles and splits into color channels, at three intensities and as a heading",
    previewMaxWidth: "max-w-3xl",
    registryDependencies: ["@cortexcn/utils"],
    dependencies: [],
    files: [
      "components/loader-glitch-text-demo.tsx",
      "components/loader-glitch-text.tsx",
    ],
  },
  "ai-reasoning-01": {
    title: "AI Reasoning Panel",
    description:
      "A reasoning panel that streams a model's thinking as markdown, folds away when it finishes, and can replay",
    previewMaxWidth: "max-w-xl",
    registryDependencies: ["@cortexcn/reasoning", "button"],
    dependencies: ["lucide-react"],
    files: ["components/reasoning-panel.tsx"],
  },
  "ai-chain-of-thought-01": {
    title: "AI Agent Steps",
    description:
      "An agent's progress one step at a time, with sources, a live current step, and a summary when the run ends",
    previewMaxWidth: "max-w-md",
    registryDependencies: ["@cortexcn/chain-of-thought", "button"],
    dependencies: ["lucide-react"],
    files: ["components/agent-steps.tsx"],
  },
  "ai-shimmer-01": {
    title: "AI Thinking Message",
    description:
      "A chat turn where the assistant's reply is a shimmering status line while it works",
    previewMaxWidth: "max-w-sm",
    registryDependencies: ["@cortexcn/shimmer", "@cortexcn/utils"],
    dependencies: [],
    files: ["components/thinking-message.tsx"],
  },
  "ai-queue-01": {
    title: "AI Agent Queue",
    description:
      "What an agent has lined up: queued messages with attachments and a remove action, above the run's todo list",
    previewMaxWidth: "max-w-md",
    registryDependencies: ["@cortexcn/queue"],
    dependencies: ["lucide-react"],
    files: ["components/agent-queue.tsx"],
  },
  "stat-card-area-01": {
    title: "Stat Card Area",
    description:
      "Revenue stat card with gradient area sparkline, NumberFlow, and trend badge",
    previewMaxWidth: "max-w-md",
    registryDependencies: [
      "@cortexcn/area-chart",
      "@cortexcn/chart-stat-flow",
      "card",
      "badge",
    ],
    dependencies: [
      "@visx/curve@4.0.1-alpha.0",
      "@visx/gradient@4.0.1-alpha.0",
      "@number-flow/react",
      "lucide-react",
    ],
    files: [
      "components/stat-card-area.tsx",
      "components/stat-card-chart.tsx",
      "components/stat-card-hover-bridge.tsx",
      "components/trend-badge.tsx",
      "data/revenue-series.ts",
    ],
  },
  "stat-card-line-01": {
    title: "Stat Card Line",
    description:
      "Sessions stat card with line sparkline, overlaid NumberFlow, and trend badge",
    previewMaxWidth: "max-w-md",
    registryDependencies: [
      "@cortexcn/line-chart",
      "@cortexcn/chart-stat-flow",
      "card",
      "badge",
    ],
    dependencies: [
      "@visx/curve@4.0.1-alpha.0",
      "@number-flow/react",
      "lucide-react",
    ],
    files: [
      "components/stat-card-line.tsx",
      "components/stat-card-chart.tsx",
      "components/stat-card-hover-bridge.tsx",
      "components/trend-badge.tsx",
      "data/sessions-series.ts",
    ],
  },
  "stat-card-choropleth-01": {
    title: "Stat Card Choropleth",
    description:
      "Visitor map stat card with choropleth sparkline, NumberFlow, and trend badge",
    previewMaxWidth: "max-w-3xl",
    registryDependencies: [
      "@cortexcn/choropleth-chart",
      "@cortexcn/chart-stat-flow",
      "card",
      "badge",
    ],
    dependencies: [
      "@number-flow/react",
      "@types/geojson",
      "@types/topojson-specification",
      "lucide-react",
      "topojson-client",
    ],
    files: [
      "components/stat-card-choropleth.tsx",
      "components/stat-card-choropleth-hover-bridge.tsx",
      "components/stat-card-chart.tsx",
      "components/trend-badge.tsx",
      "data/visitors.ts",
      "lib/use-world-data.tsx",
    ],
  },
};

const COMPONENT_EXPORTS = {
  "feature-spotlight-grid-01": "FeatureSpotlightGrid",
  "feature-studio-grid-01": "FeatureStudioGrid",
  "feature-bento-grid-01": "FeatureBentoGrid",
  "feature-mixed-bento-01": "FeatureMixedBento",
  "feature-mockup-grid-01": "FeatureMockupGrid",
  "feature-walkthrough-01": "FeatureWalkthrough",
  "services-image-grid-01": "ServicesImageGrid",
  "services-preview-list-01": "ServicesPreviewList",
  "gallery-fluted-glass-01": "FlutedGlassSlideshow",
  "gallery-liquid-seams-01": "LiquidSeamsGallery",
  "gallery-print-pile-01": "PrintPileGallery",
  "blog-masonry-01": "BlogMasonryGrid",
  "hero-tilted-wall-01": "HeroTiltedWall",
  "ai-reasoning-01": "ReasoningPanel",
  "ai-chain-of-thought-01": "AgentSteps",
  "ai-shimmer-01": "ThinkingMessage",
  "ai-queue-01": "AgentQueue",
  "hero-dashboard-01": "HeroDashboard",
  "hero-studio-01": "HeroStudio",
  "hero-cover-01": "HeroCover",
  "hero-synapse-01": "HeroSynapse",
  "ai-tool-router-01": "ToolRouter",
  "ai-integration-beam-01": "IntegrationBeam",
  "ai-integration-section-01": "IntegrationSection",
  "ai-integration-orbit-01": "IntegrationOrbit",
  "ai-integration-pipeline-01": "IntegrationPipeline",
  "ai-integration-events-01": "IntegrationEvents",
  "ai-integration-sync-status-01": "IntegrationSyncStatus",
  "dashboard-harbor-01": "DashboardHarbor",
  "chart-group-business-01": "ChartGroupBusiness",
  "chart-group-saas-01": "ChartGroupSaas",
  "chart-group-marketing-01": "ChartGroupMarketing",
  "chart-group-ecommerce-01": "ChartGroupEcommerce",
  "chart-group-traffic-01": "ChartGroupTraffic",
  "chart-group-finance-01": "ChartGroupFinance",
  "chart-group-product-01": "ChartGroupProduct",
  "chart-group-support-01": "ChartGroupSupport",
  "chart-group-sales-01": "ChartGroupSales",
  "chart-group-social-01": "ChartGroupSocial",
  "chart-group-hiring-01": "ChartGroupHiring",
  "chart-group-logistics-01": "ChartGroupLogistics",
  "chart-group-energy-01": "ChartGroupEnergy",
  "chart-group-markets-01": "ChartGroupMarkets",
  "chart-group-fitness-01": "ChartGroupFitness",
  "dashboard-ledger-01": "DashboardLedger",
  "dashboard-treasury-01": "DashboardTreasury",
  "dashboard-patron-01": "DashboardPatron",
  "dashboard-muster-01": "DashboardMuster",
  "bento-grid-insights-01": "BentoGridInsights",
  "loader-dot-matrix-01": "LoaderDotMatrixDemo",
  "loader-glitch-text-01": "LoaderGlitchTextDemo",
  "stat-card-area-01": "StatCardArea",
  "stat-card-line-01": "StatCardLine",
  "stat-card-choropleth-01": "StatCardChoropleth",
};

function transformForRegistry(content) {
  return content
    .replaceAll("@cortexcn/ui/charts", "@/components/charts")
    .replaceAll("@/components/docs/use-world-data", "@/lib/use-world-data")
    .replaceAll("@cortexcn/ui/components/", "@/components/");
}

/** Where a block file's source lives; one shared file comes from the docs. */
function blockSourcePath(blockId, relativePath) {
  if (relativePath === SHARED_WORLD_DATA) {
    return join(uiRoot, "../../apps/web/components/docs/use-world-data.tsx");
  }
  return join(webBlocksRoot, blockId, "files", relativePath);
}

function copyBlockFile(blockId, relativePath) {
  const sourcePath = blockSourcePath(blockId, relativePath);
  const targetPath = join(registryBlocksRoot, blockId, relativePath);

  if (relativePath === SHARED_WORLD_DATA) {
    mkdirSync(dirname(targetPath), { recursive: true });
    cpSync(sourcePath, targetPath);
    return;
  }

  if (!existsSync(sourcePath)) {
    throw new Error(`Block source not found: ${sourcePath}`);
  }

  mkdirSync(dirname(targetPath), { recursive: true });
  const content = transformForRegistry(readFileSync(sourcePath, "utf8"));
  writeFileSync(targetPath, content);
}

function blockRegistryFiles(blockId, relativePaths) {
  return relativePaths.map((relativePath) => ({
    path: `registry/blocks/${blockId}/${relativePath}`,
    type: relativePath.endsWith(".ts") ? "registry:lib" : "registry:component",
    target: relativePath,
  }));
}

function blockChartIndexFile(blockId) {
  if (!BLOCK_CHART_INDEX[blockId]) {
    return null;
  }

  return {
    path: `registry/examples/${blockId}-index.ts`,
    type: "registry:lib",
    target: "components/charts/index.ts",
  };
}

const chartStatFlowItem = {
  name: "chart-stat-flow",
  type: "registry:component",
  title: "Chart Stat Flow",
  description: "Animated stat value and label for chart overlays",
  registryDependencies: ["@cortexcn/utils"],
  dependencies: ["@number-flow/react", "motion"],
  files: [
    {
      path: "src/charts/chart-stat-flow.tsx",
      type: "registry:component",
      target: "components/charts/chart-stat-flow.tsx",
    },
  ],
};

// The public repository holds the source of the free blocks only, so skip any
// block whose files are not all in this checkout. In the main repository every
// block's files are here.
for (const [blockId, spec] of Object.entries(BLOCKS)) {
  const present = spec.files.every((file) =>
    existsSync(blockSourcePath(blockId, file)),
  );
  if (!present) {
    console.warn(`Skipping ${blockId}: its source is not in this checkout.`);
    delete BLOCKS[blockId];
  }
}

mkdirSync(examplesDir, { recursive: true });
mkdirSync(registryBlocksRoot, { recursive: true });

for (const [blockId, spec] of Object.entries(BLOCKS)) {
  for (const relativePath of spec.files) {
    copyBlockFile(blockId, relativePath);
  }

  const exportName = COMPONENT_EXPORTS[blockId];
  // The first component listed is the block entry point.
  const mainComponentPath = spec.files.find((file) =>
    file.startsWith("components/"),
  );
  const importPath = `@/components/${mainComponentPath
    ?.replace("components/", "")
    .replace(".tsx", "")}`;

  const exampleContent = `"use client";

import { ${exportName} } from "${importPath}";

export default function Component() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full ${spec.previewMaxWidth}">
        <${exportName} />
      </div>
    </main>
  );
}
`;

  writeFileSync(join(examplesDir, `${blockId}.tsx`), exampleContent);

  const chartIndex = BLOCK_CHART_INDEX[blockId];
  if (chartIndex) {
    writeFileSync(
      join(examplesDir, `${blockId}-index.ts`),
      `/** biome-ignore-all lint/performance/noBarrelFile: v0 registry example barrel for shadcn install */\n${chartIndex}\n`,
    );
  }
}

const registry = JSON.parse(readFileSync(registryPath, "utf8"));

const blockItemNames = new Set(
  Object.keys(BLOCKS).flatMap((blockId) => [blockId, `${blockId}-example`]),
);

registry.items = registry.items.filter(
  (item) => item.name !== "chart-stat-flow" && !blockItemNames.has(item.name),
);

// A chart helper, so the public repository (which has no charts) skips it.
if (existsSync(join(uiRoot, chartStatFlowItem.files[0].path))) {
  registry.items.push(chartStatFlowItem);
}

for (const [blockId, spec] of Object.entries(BLOCKS)) {
  const blockFiles = blockRegistryFiles(blockId, spec.files);
  const chartIndexFile = blockChartIndexFile(blockId);
  if (chartIndexFile) {
    blockFiles.push(chartIndexFile);
  }

  registry.items.push({
    name: blockId,
    type: "registry:block",
    title: spec.title,
    description: spec.description,
    registryDependencies: spec.registryDependencies,
    dependencies: spec.dependencies,
    files: blockFiles,
    ...(spec.pro ? { meta: { pro: true } } : {}),
  });

  const exampleFiles = [
    {
      path: `registry/examples/${blockId}.tsx`,
      type: "registry:page",
      target: "app/page.tsx",
    },
  ];

  if (chartIndexFile) {
    exampleFiles.push(chartIndexFile);
  }

  registry.items.push({
    name: `${blockId}-example`,
    type: "registry:example",
    title: `${spec.title} Example`,
    description: `${spec.description} — demo for Open in v0`,
    registryDependencies: [`@cortexcn/${blockId}`],
    dependencies: spec.dependencies,
    files: exampleFiles,
  });
}

writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log(
  `Synced ${Object.keys(BLOCKS).length} blocks into registry (${Object.keys(BLOCKS).length * 2 + 1} items).`,
);
