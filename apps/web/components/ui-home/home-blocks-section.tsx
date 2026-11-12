import { CATALOG_COUNTS } from "@/lib/catalog-counts";

import { BlocksStageLoader } from "./home-stage-loaders";
import { ProductShowcase } from "./product-showcase";

/** The page sections, with a free feature bento and a free loader running. */
export function HomeBlocksSection() {
  return (
    <ProductShowcase
      art="pastel-wildflowers"
      badge="Blocks"
      description="Heroes, feature grids, services, galleries, a blog, and loaders, built from the components. Drop one into a page, swap in your text and images, and ship it."
      id="blocks"
      lines={[
        { text: "Page sections," },
        { text: "ready for your copy.", muted: true },
      ]}
      primary={{ label: "Explore blocks", href: "/blocks" }}
      reverse
      secondary={{ label: "Read the docs", href: "/docs/installation" }}
      stage={<BlocksStageLoader />}
      stageLabel="The Feature Bento Grid block on a landing page."
      stats={[
        { value: String(CATALOG_COUNTS.pageBlocks), label: "page blocks" },
        { value: String(CATALOG_COUNTS.freeBlocks), label: "free to install" },
        {
          value: String(CATALOG_COUNTS.pageBlockCategories),
          label: "kinds of section",
        },
      ]}
      tag={`${CATALOG_COUNTS.freeBlocks} free`}
    />
  );
}
