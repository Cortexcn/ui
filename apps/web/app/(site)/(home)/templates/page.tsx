import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateRow } from "@/components/templates/template-row";
import { TemplatesHero } from "@/components/templates/templates-hero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  isDashboardKit,
  SITE_TEMPLATES,
  TEMPLATE_FILTERS,
  templateFilters,
} from "@/lib/site-templates";

const KIT_COUNT = SITE_TEMPLATES.filter(isDashboardKit).length;
const LANDING_COUNT = SITE_TEMPLATES.length - KIT_COUNT;

const DESCRIPTION = `${LANDING_COUNT} one-page sites for SaaS products, AI apps, agencies, travel companies, and portfolios, and ${KIT_COUNT} dashboard kits, ready to ship. Each one adapts to every screen, switches between light and dark, and moves with care, built with Next.js, React, Tailwind CSS, and TypeScript.`;

export const metadata: Metadata = pageMetadata({
  title: "Landing page templates for Next.js",
  description: DESCRIPTION,
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <main className="flex flex-1 flex-col pb-16 md:pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Templates", path: "/templates" },
        ])}
      />
      <TemplatesHero kits={KIT_COUNT} landings={LANDING_COUNT} />

      <section className="relative w-full scroll-mt-28" id="templates">
        <TemplateGallery
          filters={TEMPLATE_FILTERS}
          items={SITE_TEMPLATES.map((template) => ({
            slug: template.slug,
            filters: templateFilters(template),
            row: <TemplateRow template={template} />,
          }))}
        />
      </section>
    </main>
  );
}
