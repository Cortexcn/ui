import type { MetadataRoute } from "next";
import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { validChartSlugs } from "@/components/charts/chart-slugs";
import { SITE_TEMPLATES } from "@/lib/site-templates";
import {
  canonicalUrlFor,
  DOCS_URL,
  SITE_URL,
  STUDIO_URL,
} from "@/lib/site-url";
import { source } from "@/lib/source";
import { WORK } from "@/lib/work";

/*
 * Every indexable page, at its canonical URL: the components home, Pro, and
 * the legal pages on www.cortexcn.dev; the free library (docs, blocks, and
 * charts) on ui.cortexcn.dev; and Cortexcn Studio on studio.cortexcn.dev.
 * All three hosts belong to the same Search Console domain property, and
 * each host's robots.txt names this sitemap, so one sitemap can list them
 * all. Redirects such as /charts, /playground, and ui.cortexcn.dev/ are left
 * out. `lastmod` is omitted rather
 * than guessed, since Google only trusts it when it is accurate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pro`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${SITE_URL}/pro/pricing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${DOCS_URL}/blocks`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${DOCS_URL}/changelog`, changeFrequency: "weekly", priority: 0.6 },
    {
      url: `${DOCS_URL}/mcp-server`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${STUDIO_URL}/`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${STUDIO_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${STUDIO_URL}/pricing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${STUDIO_URL}/work`, changeFrequency: "monthly", priority: 0.7 },
    ...WORK.map((study) => ({
      url: `${STUDIO_URL}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${STUDIO_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${STUDIO_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/refunds`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${DOCS_URL}/templates`, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${DOCS_URL}/dashboard-kits`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${DOCS_URL}/design-systems`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // One page per block; the category pages redirect to the filtered gallery.
  const blockRoutes: MetadataRoute.Sitemap = BLOCK_CATEGORIES.flatMap(
    (category) =>
      category.blocks.map((block) => ({
        url: `${DOCS_URL}/blocks/${category.slug}/${block}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );

  const templateRoutes: MetadataRoute.Sitemap = SITE_TEMPLATES.map(
    (template) => ({
      url: `${DOCS_URL}/templates/${template.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  const chartRoutes: MetadataRoute.Sitemap = validChartSlugs.map((slug) => ({
    url: `${DOCS_URL}/charts/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const docRoutes: MetadataRoute.Sitemap = source
    .getPages()
    .map((page) => ({
      url: canonicalUrlFor(page.url),
      changeFrequency: "weekly" as const,
      priority: page.url === "/docs" ? 0.9 : 0.8,
    }))
    .sort((a, b) => a.url.localeCompare(b.url));

  return [
    ...pages,
    ...blockRoutes,
    ...templateRoutes,
    ...chartRoutes,
    ...docRoutes,
  ];
}
