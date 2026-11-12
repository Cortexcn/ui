import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { isProItem } from "@/lib/pro";
import {
  isDashboardKit,
  isFreeTemplate,
  SITE_TEMPLATES,
} from "@/lib/site-templates";

/*
 * What the library holds, counted from the docs sidebar, the block
 * categories, and the template list, so the home page's numbers stay true
 * as each product line grows.
 */

function familySlugs(category: string): readonly string[] {
  return (
    COMPONENT_GROUPS.find((group) => group.category === category)?.slugs ?? []
  );
}

function categoryBlocks(slugs: string[]): string[] {
  return BLOCK_CATEGORIES.filter((category) =>
    slugs.includes(category.slug),
  ).flatMap((category) => category.blocks);
}

/** The block categories for building pages, as opposed to app screens. */
const PAGE_BLOCK_CATEGORIES = [
  "hero",
  "features",
  "services",
  "galleries",
  "blog",
  "loaders",
];

/** The block categories built on the charts. */
const CHART_BLOCK_CATEGORIES = [
  "stat-cards",
  "chart-groups",
  "dashboards",
  "bento-grids",
];

const PAGE_BLOCKS = categoryBlocks(PAGE_BLOCK_CATEGORIES);
const AI_BLOCKS = categoryBlocks(["ai-assistant"]);
const KITS = SITE_TEMPLATES.filter(isDashboardKit);
const WEBSITE_TEMPLATES = SITE_TEMPLATES.filter(
  (template) => !isDashboardKit(template),
);

export const CATALOG_COUNTS = {
  /** shadcn/ui components, restyled to the Cortexcn theme. */
  components: familySlugs("components").length,
  /** Cortexcn originals: motion, navigation, and theming. */
  originals: familySlugs("cortex").length,
  backgrounds: familySlugs("backgrounds").length,
  /** Every free component, across the families, that anyone can install. */
  freeComponents: COMPONENT_GROUPS.flatMap((group) => group.slugs).filter(
    (slug) => !isProItem(slug),
  ).length,
  charts: familySlugs("charts").length,
  pageBlocks: PAGE_BLOCKS.length,
  pageBlockCategories: PAGE_BLOCK_CATEGORIES.length,
  freeBlocks: PAGE_BLOCKS.filter((slug) => !isProItem(slug)).length,
  chartGroups: categoryBlocks(["chart-groups"]).length,
  dashboards: categoryBlocks(["dashboards"]).length,
  chartBlocks: categoryBlocks(CHART_BLOCK_CATEGORIES).length,
  aiBlocks: AI_BLOCKS.length,
  aiIntegrationBlocks: AI_BLOCKS.filter((slug) =>
    slug.startsWith("ai-integration-"),
  ).length,
  kits: KITS.length,
  /** Every page across the kits; a kit's `sections` are its pages. */
  kitPages: KITS.reduce((count, kit) => count + kit.sections.length, 0),
  kitFromPrice: Math.min(...KITS.map((kit) => kit.price)),
  templates: WEBSITE_TEMPLATES.length,
  freeTemplates: WEBSITE_TEMPLATES.filter(isFreeTemplate).length,
};
