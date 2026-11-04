import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { SENTIENT_STYLESHEET } from "@/components/ui-home/fonts";
import { LIBRARY_CTA, libraryNavItems } from "@/lib/nav-menus";

import { NotFoundContent } from "./not-found-content";

/**
 * The 404 page of ui.cortexcn.dev: the library's header, menus, and footer
 * around the shared 404 body.
 */
export function LibraryNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <link href={SENTIENT_STYLESHEET} precedence="default" rel="stylesheet" />
      <SiteHeader
        cta={LIBRARY_CTA}
        items={libraryNavItems()}
        search
        variant="plain"
      />
      <NotFoundContent
        body="Docs pages, blocks, and templates sometimes move to a new address. Search the docs from the header, or start from one of these."
        places={[
          {
            label: "Components",
            description: "The shadcn/ui components on the Cortexcn tokens",
            href: "/docs/components",
          },
          {
            label: "Blocks",
            description: "Page sections you add with one command",
            href: "/blocks",
          },
          {
            label: "Templates",
            description: "Landing sites and dashboard kits",
            href: "/templates",
          },
          {
            label: "Changelog",
            description: "Everything that shipped, newest first",
            href: "/changelog",
          },
        ]}
        primary={{ label: "Open the docs", href: "/docs" }}
        secondary={{ label: "Browse blocks", href: "/blocks" }}
        subtitle="It may have moved."
        title="We couldn't find that page."
      />
      <SiteFooter />
    </div>
  );
}
