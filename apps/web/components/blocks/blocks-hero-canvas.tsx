"use client";

import type { BlockSlug } from "@/blocks/manifest";
import { BLOCK_PREVIEWS } from "@/blocks/previews";
import { FitToFrame } from "@/components/blocks/fit-to-frame";
import {
  type CanvasColumn,
  CardCanvas,
} from "@/components/ui-home/card-canvas";
import { getGalleryBlocks } from "@/lib/blocks/gallery";

/**
 * The blocks on the hero wall, column by column. Wide blocks are drawn at
 * full width and scaled into their card, the same way the gallery shows them.
 */
const WALL: { width: string; offset: string; slugs: BlockSlug[] }[] = [
  {
    width: "w-[420px]",
    offset: "mt-0",
    slugs: [
      "chart-group-business-01",
      "hero-synapse-01",
      "chart-group-fitness-01",
      "stat-card-area-01",
    ],
  },
  {
    width: "w-[420px]",
    offset: "mt-40",
    slugs: [
      "dashboard-ledger-01",
      "chart-group-markets-01",
      "services-image-grid-01",
      "chart-group-energy-01",
    ],
  },
  {
    width: "w-[420px]",
    offset: "mt-16",
    slugs: [
      "chart-group-saas-01",
      "dashboard-harbor-01",
      "chart-group-logistics-01",
      "hero-cover-01",
    ],
  },
  {
    width: "w-[420px]",
    offset: "mt-56",
    slugs: [
      "feature-bento-grid-01",
      "chart-group-social-01",
      "ai-chain-of-thought-01",
      "chart-group-product-01",
    ],
  },
];

/** The order the camera visits the cards in, crossing between columns. */
const TOUR: BlockSlug[] = [
  "chart-group-business-01",
  "dashboard-ledger-01",
  "chart-group-saas-01",
  "chart-group-markets-01",
  "feature-bento-grid-01",
  "dashboard-harbor-01",
  "hero-synapse-01",
  "chart-group-social-01",
  "services-image-grid-01",
  "chart-group-logistics-01",
  "chart-group-fitness-01",
  "ai-chain-of-thought-01",
  "chart-group-energy-01",
  "hero-cover-01",
  "stat-card-area-01",
  "chart-group-product-01",
];

const CATEGORY_OF = new Map(
  getGalleryBlocks().map((block) => [block.slug, block.categoryName]),
);

const SHORT_TITLE = new Map(
  getGalleryBlocks().map((block) => [block.slug, block.title]),
);

const COLUMNS: CanvasColumn[] = WALL.map((column) => ({
  width: column.width,
  offset: column.offset,
  cards: column.slugs.map((slug) => {
    const Preview = BLOCK_PREVIEWS[slug];
    return {
      slug,
      title: SHORT_TITLE.get(slug) ?? slug,
      kind: CATEGORY_OF.get(slug) ?? "Block",
      demo: (
        <div className="w-full">
          <FitToFrame>
            <Preview />
          </FitToFrame>
        </div>
      ),
    };
  }),
}));

/** The landing page's moving wall, filled with live blocks instead of components. */
export function BlocksHeroCanvas({ className }: { className?: string }) {
  return <CardCanvas className={className} columns={COLUMNS} tour={TOUR} />;
}
