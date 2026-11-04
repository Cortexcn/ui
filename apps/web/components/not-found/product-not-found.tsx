import { LibraryFooter } from "@/components/ui-home/library-footer";
import { LibraryHomeShell } from "@/components/ui-home/library-home-shell";
import { DOCS_URL } from "@/lib/site-url";

import { NotFoundContent } from "./not-found-content";

/** The 404 page of www.cortexcn.dev, in the components home's frame. */
export function ProductNotFound() {
  return (
    <LibraryHomeShell footer={<LibraryFooter />}>
      <NotFoundContent
        body="The link may be out of date, or the address may have a typo. Start from the home page, or go straight to the components."
        places={[
          {
            label: "Components",
            description: "The shadcn/ui components on the Cortexcn tokens",
            href: `${DOCS_URL}/docs/components`,
          },
          {
            label: "Blocks",
            description: "Page sections you add with one command",
            href: `${DOCS_URL}/blocks`,
          },
          {
            label: "Templates",
            description: "Landing sites and dashboard kits",
            href: `${DOCS_URL}/templates`,
          },
          {
            label: "Cortexcn Pro",
            description: "The charts, Pro blocks, and every template",
            href: "/pro",
          },
        ]}
        primary={{ label: "Back to the home page", href: "/" }}
        secondary={{
          label: "Browse components",
          href: `${DOCS_URL}/docs/components`,
        }}
        subtitle="The rest of Cortexcn is."
        title="This page isn't here."
      />
    </LibraryHomeShell>
  );
}
