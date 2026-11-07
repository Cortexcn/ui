import type { BlockSlug } from "./manifest";

export interface BlockCategory {
  /** URL segment: /blocks/<slug> */
  slug: string;
  name: string;
  description: string;
  /** Blocks in display order. */
  blocks: BlockSlug[];
}

/** Add a category here and it joins the /blocks sidebar and gets its own page. */
export const BLOCK_CATEGORIES: BlockCategory[] = [
  {
    slug: "hero",
    name: "Hero",
    description:
      "Opening sections with a headline, a call to action, and a product preview.",
    blocks: [
      "hero-synapse-01",
      "hero-tilted-wall-01",
      "hero-dashboard-01",
      "hero-studio-01",
      "hero-cover-01",
    ],
  },
  {
    slug: "features",
    name: "Features",
    description:
      "Feature sections that explain what your product does, with icons, images, and motion.",
    blocks: [
      "feature-spotlight-grid-01",
      "feature-studio-grid-01",
      "feature-bento-grid-01",
      "feature-mixed-bento-01",
      "feature-mockup-grid-01",
      "feature-walkthrough-01",
    ],
  },
  {
    slug: "services",
    name: "Services",
    description:
      "Sections that show what you offer, with image cards, a short pitch, and one call to action.",
    blocks: ["services-image-grid-01", "services-preview-list-01"],
  },
  {
    slug: "galleries",
    name: "Galleries",
    description:
      "Image galleries and slideshows with motion, for showing work, products, or places.",
    blocks: [
      "gallery-fluted-glass-01",
      "gallery-liquid-seams-01",
      "gallery-print-pile-01",
    ],
  },
  {
    slug: "blog",
    name: "Blog",
    description:
      "Sections that list blog posts, with covers, categories, dates, and reading times.",
    blocks: ["blog-masonry-01"],
  },
  {
    slug: "ai-assistant",
    name: "AI Assistant",
    description:
      "Pieces for chat and agent interfaces: streaming reasoning, step-by-step agent progress, and thinking states.",
    blocks: [
      "ai-reasoning-01",
      "ai-chain-of-thought-01",
      "ai-shimmer-01",
      "ai-queue-01",
    ],
  },
  {
    slug: "loaders",
    name: "Loaders",
    description:
      "Loading indicators that show something is happening, from pulsing dot grids to glitching text.",
    blocks: ["loader-dot-matrix-01", "loader-glitch-text-01"],
  },
  {
    slug: "stat-cards",
    name: "Stat Cards",
    description:
      "KPI cards with animated numbers, trend badges, and chart sparklines.",
    blocks: [
      "stat-card-area-01",
      "stat-card-line-01",
      "stat-card-choropleth-01",
    ],
  },
  {
    slug: "chart-groups",
    name: "Chart Groups",
    description:
      "Bentos of key numbers and charts for one subject, from business analytics to fitness, built on Cortexcn Pro charts.",
    blocks: [
      "chart-group-business-01",
      "chart-group-saas-01",
      "chart-group-marketing-01",
      "chart-group-ecommerce-01",
      "chart-group-traffic-01",
      "chart-group-finance-01",
      "chart-group-product-01",
      "chart-group-support-01",
      "chart-group-sales-01",
      "chart-group-social-01",
      "chart-group-hiring-01",
      "chart-group-logistics-01",
      "chart-group-energy-01",
      "chart-group-markets-01",
      "chart-group-fitness-01",
    ],
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    description:
      "Full app screens with navigation, key numbers, a chart, and live lists, ready to wire to your own data.",
    blocks: [
      "dashboard-ledger-01",
      "dashboard-harbor-01",
      "dashboard-treasury-01",
      "dashboard-patron-01",
      "dashboard-muster-01",
    ],
  },
  {
    slug: "bento-grids",
    name: "Bento Grids",
    description:
      "Grids of mixed cards for key numbers, live charts, and small product moments, sized to sit together on one screen.",
    blocks: ["bento-grid-insights-01"],
  },
];

export function getBlockCategory(slug: string): BlockCategory | undefined {
  return BLOCK_CATEGORIES.find((category) => category.slug === slug);
}
