import { CATALOG_COUNTS } from "@/lib/catalog-counts";

import { ComponentsStageLoader } from "./home-stage-loaders";
import { ProductShowcase } from "./product-showcase";

/** The shadcn/ui set and the Cortexcn originals, with two originals running. */
export function HomeComponentsSection() {
  return (
    <ProductShowcase
      art="pastel-meadow-flowers"
      badge="Components"
      description={`All ${CATALOG_COUNTS.components} shadcn/ui components in one theme, plus ${CATALOG_COUNTS.originals} Cortexcn originals for motion, navigation, and theming, such as Command Search, Gooey Nav, and Number Ticker.`}
      id="components"
      lines={[
        { text: "The basics, done right," },
        { text: "and originals of our own.", muted: true },
      ]}
      primary={{ label: "Explore components", href: "/docs/cortex" }}
      secondary={{ label: "Read the docs", href: "/docs/installation" }}
      stage={<ComponentsStageLoader />}
      stageLabel="Command Search typing out a query and filtering its results."
      stats={[
        {
          value: String(CATALOG_COUNTS.components),
          label: "shadcn/ui components",
        },
        {
          value: String(CATALOG_COUNTS.originals),
          label: "Cortexcn originals",
        },
        {
          value: String(CATALOG_COUNTS.backgrounds),
          label:
            CATALOG_COUNTS.backgrounds === 1
              ? "WebGL background"
              : "WebGL backgrounds",
        },
      ]}
      tag="Free and Pro"
    />
  );
}
