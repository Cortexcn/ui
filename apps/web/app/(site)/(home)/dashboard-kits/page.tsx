import { Icon } from "@cortexcn/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { BlocksPageHeader } from "@/components/blocks/blocks-page-header";
import { JsonLd } from "@/components/seo/json-ld";
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
import { isDashboardKit, SITE_TEMPLATES } from "@/lib/site-templates";

const KITS = SITE_TEMPLATES.filter(isDashboardKit);

const DESCRIPTION =
  "Complete dashboards for Next.js, built from Cortexcn components and charts. Each kit has every page, a typed data model, a demo workspace, and tests, so you swap in your data and ship it as your product's dashboard.";

export const metadata: Metadata = pageMetadata({
  title: "Dashboard kits for Next.js",
  description: DESCRIPTION,
  path: "/dashboard-kits",
});

/** What every kit ships with, beside the kit itself. */
const INCLUDED = [
  {
    icon: "IconBlocks",
    title: "Cortexcn components and charts",
    body: "Installed from the Cortexcn registry with the shadcn CLI, so you can update them and add more with one command.",
  },
  {
    icon: "IconCodeLines",
    title: "One place to connect your data",
    body: "Typed records for people, projects, and tasks, read through one provider that you point at your API.",
  },
  {
    icon: "IconFileText",
    title: "Demo data and tests",
    body: "A demo workspace with real problems in it, and Vitest checks for the rules that find them.",
  },
  {
    icon: "IconColorPalette",
    title: "One theme, both modes",
    body: "Colors and corners in one file, light and dark mode, keyboard support, and layouts for phones and tablets.",
  },
] as const;

export default function DashboardKitsPage() {
  return (
    <main className="flex flex-1 flex-col pb-16 md:pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dashboard Kits", path: "/dashboard-kits" },
        ])}
      />
      <section className="relative w-full pb-8">
        <div className="container mx-auto flex w-full flex-col gap-6">
          <BlocksPageHeader
            action={
              <p className="max-w-3xl text-foreground/85 text-sm">
                Pay once per kit, or get every kit and template with{" "}
                <a
                  className="text-foreground underline underline-offset-4 hover:no-underline"
                  href={PRO_PRICING_PATH}
                >
                  Cortexcn Pro
                </a>
                . Looking for a landing page instead? See the{" "}
                <Link
                  className="text-foreground underline underline-offset-4 hover:no-underline"
                  href="/templates"
                >
                  templates
                </Link>
                .
              </p>
            }
            description={DESCRIPTION}
            descriptionClassName="text-foreground/90"
            title="Dashboard Kits"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard Kits</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section
        aria-labelledby="included-title"
        className="border-y bg-muted/30"
      >
        <div className="container mx-auto flex w-full flex-col gap-6 py-10">
          <h2
            className="font-semibold text-xl tracking-tight"
            id="included-title"
          >
            In every kit
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item) => (
              <li className="flex flex-col gap-2" key={item.title}>
                <span className="flex size-9 items-center justify-center rounded-lg border bg-background">
                  <Icon className="size-4" name={item.icon} />
                </span>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Kits" className="container mx-auto w-full divide-y">
        {KITS.map((kit) => (
          <TemplateRow key={kit.slug} template={kit} />
        ))}
      </section>
    </main>
  );
}
