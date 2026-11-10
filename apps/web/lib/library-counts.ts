import { blockSlugs } from "@/blocks/manifest";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { componentGroupPages } from "@/lib/component-groups";
import { libraryNavLinks } from "@/lib/library-nav-links";
import { SITE_TEMPLATES } from "@/lib/site-templates";

const TEMPLATES_URL = "/templates";

/**
 * What the library holds today, counted from the docs, the block list, and
 * the templates. Templates count once the library nav links to them, so the
 * tile never points at a page that is not live yet.
 */
export function libraryCounts() {
  const families = COMPONENT_GROUPS.map((group) => ({
    label: group.name,
    count: componentGroupPages(group.name).length,
    href: group.href,
  }));
  const libraryPaths: readonly string[] = libraryNavLinks.map(
    (link) => link.url,
  );
  const templatesLive = libraryPaths.includes(TEMPLATES_URL);
  return [
    ...families,
    { label: "Blocks", count: blockSlugs.length, href: "/blocks" },
    ...(templatesLive
      ? [
          {
            label: "Templates",
            count: SITE_TEMPLATES.length,
            href: TEMPLATES_URL,
          },
        ]
      : []),
  ];
}
