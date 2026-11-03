import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { BLOCK_METAS } from "@/blocks/metas";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { isProItem } from "@/lib/pro";
import { source } from "@/lib/source";

/** A Pro chart or block, as the Pro page's collection and footer list it. */
export interface ProCatalogEntry {
  kind: "Chart" | "Block";
  title: string;
  description: string;
  href: string;
  /** The docs slug or block slug, which picks its live demo. */
  slug: string;
}

/** Every chart in the docs sidebar, named and described as its docs page is. */
const CHARTS: ProCatalogEntry[] = (
  COMPONENT_GROUPS.find((group) => group.category === "charts")?.slugs ?? []
).flatMap((slug) => {
  const page = source.getPage(["charts", slug]);
  const title = page?.data.title;
  return page && title
    ? [
        {
          kind: "Chart" as const,
          title,
          description: page.data.description ?? "",
          href: page.url,
          slug,
        },
      ]
    : [];
});

/** The blocks built on the charts, which come with Pro too. */
const BLOCKS: ProCatalogEntry[] = BLOCK_CATEGORIES.flatMap((category) =>
  category.blocks
    .filter((slug) => isProItem(slug))
    .map((slug) => ({
      kind: "Block" as const,
      // Block names read "Stat Card — Area Chart"; the page copy avoids dashes.
      title: BLOCK_METAS[slug].name.replace(" — ", ": "),
      description: BLOCK_METAS[slug].description,
      href: `/blocks/${category.slug}/${slug}`,
      slug,
    })),
);

/** The charts, then the blocks. */
export const PRO_CATALOG = [...CHARTS, ...BLOCKS];

/** The block gallery, filtered to the category that holds the Pro blocks. */
export const PRO_BLOCKS_HREF = `/blocks?category=${
  BLOCK_CATEGORIES.find((category) => category.blocks.some(isProItem))?.slug ??
  ""
}`;
