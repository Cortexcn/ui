import { BLOCK_CATEGORIES } from "@/blocks/categories";
import type { BlockSlug } from "@/blocks/manifest";
import { BLOCK_METAS } from "@/blocks/metas";
import { isProItem } from "@/lib/pro";

export interface GalleryBlock {
  slug: BlockSlug;
  /** The name without its category prefix, e.g. "Spotlight Grid". */
  title: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  /** Its place in its category, two digits: "01", "02", and so on. */
  number: string;
  /** The block's own page, with its preview, code, and install command. */
  href: string;
  /** Part of Cortexcn Pro, so its code is not public. */
  pro: boolean;
}

/** Which blocks to show: every one, only the free ones, or only Pro. */
export type GalleryAccess = "" | "free" | "pro";

/**
 * What ends the category prefix of a block name, as in "Feature: Studio
 * Grid": a colon, or a hyphen or em dash between spaces.
 */
const CATEGORY_PREFIX = /\s+[\u2014-]\s+|:\s+/;

export interface GalleryCategory {
  slug: string;
  name: string;
  count: number;
}

/** Drops the category prefix, so "Feature: Studio Grid" reads "Studio Grid". */
function shortTitle(name: string) {
  return name.split(CATEGORY_PREFIX).at(-1) ?? name;
}

/** One block's page: its preview, code, and install command. */
export function blockPagePath(categorySlug: string, slug: string) {
  return `/blocks/${categorySlug}/${slug}`;
}

/** Every block, in category order, as a card for the /blocks gallery. */
export function getGalleryBlocks(): GalleryBlock[] {
  return BLOCK_CATEGORIES.flatMap((category) =>
    category.blocks.map((slug, index) => {
      const title = shortTitle(BLOCK_METAS[slug].name);
      return {
        slug,
        title,
        description: BLOCK_METAS[slug].description,
        categorySlug: category.slug,
        categoryName: category.name,
        number: String(index + 1).padStart(2, "0"),
        href: blockPagePath(category.slug, slug),
        pro: isProItem(slug),
      };
    }),
  );
}

/** Blocks sorted by title, A to Z. */
export function sortBlocksByTitle(blocks: GalleryBlock[]) {
  return [...blocks].sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" }),
  );
}

/**
 * The blocks before and after one in A to Z order, wrapping at the ends, for
 * the previous and next links on a block's page.
 */
export function getAdjacentBlocks(slug: string) {
  const sorted = sortBlocksByTitle(getGalleryBlocks());
  const index = sorted.findIndex((block) => block.slug === slug);
  if (index === -1 || sorted.length < 2) {
    return { previous: undefined, next: undefined };
  }
  return {
    previous: sorted[(index - 1 + sorted.length) % sorted.length],
    next: sorted[(index + 1) % sorted.length],
  };
}

export function getGalleryBlock(slug: string) {
  return getGalleryBlocks().find((block) => block.slug === slug);
}

export function getGalleryCategories(): GalleryCategory[] {
  return BLOCK_CATEGORIES.map((category) => ({
    slug: category.slug,
    name: category.name,
    count: category.blocks.length,
  }));
}

const normalize = (text: string) => text.toLowerCase().replaceAll(" ", "");

export function filterGalleryBlocks(
  blocks: GalleryBlock[],
  {
    category,
    query,
    access = "",
  }: { category: string; query: string; access?: GalleryAccess },
) {
  const inCategory = blocks.filter(
    (block) =>
      (!category || block.categorySlug === category) &&
      (!access || block.pro === (access === "pro")),
  );

  if (!query) {
    return inCategory;
  }

  const normalizedQuery = normalize(query);
  return inCategory.filter((block) =>
    [block.title, block.description, block.categoryName].some((text) =>
      normalize(text).includes(normalizedQuery),
    ),
  );
}
