import type { Metadata } from "next";
import Link from "next/link";
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { ProTemplatesCard } from "@/components/templates/pro-templates-card";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateRow } from "@/components/templates/template-row";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PRO_PRICING_PATH } from "@/lib/pro";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  isDashboardKit,
  SITE_TEMPLATES,
  TEMPLATE_FILTERS,
  templateFilters,
} from "@/lib/site-templates";

const LANDING_COUNT = SITE_TEMPLATES.filter(
  (template) => !isDashboardKit(template),
).length;

const DESCRIPTION = `${LANDING_COUNT} one-page sites for SaaS products, AI apps, agencies, travel companies, and portfolios, ready to ship, and a project management dashboard kit. Each one adapts to every screen, switches between light and dark, and moves with care, built with Next.js, React, Tailwind CSS, and TypeScript.`;

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
      <section className="relative w-full pb-8">
        <div className="container mx-auto grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start xl:gap-16">
          <div className="flex min-w-0 flex-col gap-6">
            <BlocksPageHeader
              action={
                <p className="max-w-3xl text-foreground/85 text-sm">
                  Every template is built with Next.js today, and Astro and
                  Angular versions are coming soon. The first{" "}
                  <Link
                    className="text-foreground underline underline-offset-4 hover:no-underline"
                    href="/dashboard-kits"
                  >
                    dashboard kit
                  </Link>{" "}
                  is out.{" "}
                  <a
                    className="text-foreground underline underline-offset-4 hover:no-underline"
                    href={PRO_PRICING_PATH}
                  >
                    Get every template with Cortexcn Pro
                  </a>
                  .
                </p>
              }
              description={DESCRIPTION}
              descriptionClassName="text-foreground/90"
              title="Landing page templates for Next.js"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Templates</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="lg:pt-16">
            <ProTemplatesCard />
          </div>
        </div>
      </section>

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
