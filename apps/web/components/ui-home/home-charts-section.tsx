import { CATALOG_COUNTS } from "@/lib/catalog-counts";

import { ChartsStageLoader } from "./home-stage-loaders";
import { ProductShowcase } from "./product-showcase";

/** The charts and the blocks built on them, with a chart group running. */
export function HomeChartsSection() {
  return (
    <ProductShowcase
      art="wildflower-meadow"
      badge="Charts"
      description={`${CATALOG_COUNTS.charts} chart types, from area and bar to candlestick, sankey, and choropleth. Tooltips, legends, and brushes are parts you add like components, and ${CATALOG_COUNTS.chartBlocks} ready-made stat cards, chart groups, and dashboards are built on them.`}
      id="charts"
      lines={[
        { text: "Charts that read" },
        { text: "at a glance.", muted: true },
      ]}
      primary={{ label: "Explore charts", href: "/charts" }}
      secondary={{ label: "Read the docs", href: "/docs/charts" }}
      stage={<ChartsStageLoader />}
      stageLabel="The Live Line Chart drawing new points as they arrive."
      stats={[
        { value: String(CATALOG_COUNTS.charts), label: "chart types" },
        { value: String(CATALOG_COUNTS.chartGroups), label: "chart groups" },
        {
          value: String(CATALOG_COUNTS.dashboards),
          label: "dashboard screens",
        },
      ]}
      tag="Pro"
    />
  );
}
