import { Icon } from "@cortexcn/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocsCodeBlock } from "@/components/docs/docs-code-block";
import { JsonLd } from "@/components/seo/json-ld";
import { TemplateBadge } from "@/components/templates/template-badge";
import { TemplateScreenshot } from "@/components/templates/template-screenshot";
import {
  TemplateShotRail,
  TemplateStack,
} from "@/components/templates/template-shots";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatUsd, KIT_BUNDLE_PRICES } from "@/lib/service-pricing";
import { KIT_PRICING_PATH } from "@/lib/site-config";
import {
  formatTemplateDate,
  getSiteTemplate,
  isDashboardKit,
  isFreeTemplate,
  isProTemplate,
  SITE_TEMPLATES,
  type SiteTemplate,
  templateArchiveName,
  templateBuyHref,
  templateBuyLabel,
  templateDownloadPath,
  templateLicenseLabel,
  templatePriceLabel,
} from "@/lib/site-templates";
import { cn } from "@/lib/utils";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_TEMPLATES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const template = getSiteTemplate((await params).slug);
  if (!template) {
    notFound();
  }
  return pageMetadata({
    title: templateTitle(template),
    description: `${template.summary}, built with ${template.stack.slice(0, 3).join(", ")}. ${howToGet(template)}`,
    path: `/templates/${template.slug}`,
  });
}

/** How a template is had: free, with Pro, or bought on its own. */
function howToGet(template: SiteTemplate) {
  if (isFreeTemplate(template)) {
    return "Free to download and use under the MIT license.";
  }
  if (isProTemplate(template)) {
    return "Included with every Cortexcn Pro license, for as many sites as you like.";
  }
  return `${templatePriceLabel(template)} once, for as many sites as you like.`;
}

/** "Data Checks template for Next.js", or "Project Dashboard Kit for Next.js". */
function templateTitle(template: SiteTemplate) {
  return isDashboardKit(template)
    ? `${template.name} for Next.js`
    : `${template.name} template for Next.js`;
}

/** Where a static export of any template can go, besides Vercel. */
const HOSTS = ["Vercel", "Netlify", "Cloudflare Pages", "Any static host"];

function SideSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2.5 border-b pb-5 last:border-b-0">
      <h2 className="font-medium text-sm">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-4 text-muted-foreground text-sm marker:text-foreground/30">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * The same CSS-only entrance as the landing page and /blocks heroes, so the
 * header animates in before hydration and rests for reduced motion.
 */
const ENTER =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/** Buy or download, the live preview, and the Pro offer. */
function ActionBar({ template }: { template: SiteTemplate }) {
  const free = isFreeTemplate(template);
  const buyHref = templateBuyHref(template);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {free ? (
        <Button
          nativeButton={false}
          render={
            // A plain anchor: the zip is a file, not a page to navigate to.
            // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
            <a download href={templateDownloadPath(template)} />
          }
          size="lg"
        >
          <Icon data-icon="inline-start" name="IconFileDownload" />
          Download free
        </Button>
      ) : (
        <Button
          nativeButton={false}
          render={
            buyHref.startsWith("/") ? (
              <Link href={buyHref} />
            ) : (
              // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
              <a href={buyHref} rel="noopener" target="_blank" />
            )
          }
          size="lg"
        >
          <Icon data-icon="inline-start" name="IconShoppingBag1" />
          {templateBuyLabel(template)}
        </Button>
      )}
      {template.previewUrl ? (
        <Button
          nativeButton={false}
          render={
            // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
            <a href={template.previewUrl} rel="noopener" target="_blank" />
          }
          size="lg"
          variant="outline"
        >
          <Icon data-icon="inline-start" name="IconArrowUpRight" />
          Preview demo
        </Button>
      ) : null}
      {isDashboardKit(template) ? (
        <Link
          className="rounded-md border bg-background px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
          href={KIT_PRICING_PATH}
        >
          Get every dashboard kit, from{" "}
          <span className="font-medium underline underline-offset-4">
            {formatUsd(KIT_BUNDLE_PRICES.hobby)}
          </span>
        </Link>
      ) : null}
    </div>
  );
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const template = getSiteTemplate((await params).slug);
  if (!template) {
    notFound();
  }

  const free = isFreeTemplate(template);
  const folder = templateArchiveName(template);
  const steps = [
    free
      ? {
          title: "Download and unzip",
          body: `You get a ${folder} folder with the whole project inside.`,
        }
      : {
          title: "Buy and unzip",
          body: `Pay once and you get a zip with a ${folder} folder and the whole project inside.`,
        },
    {
      title: "Install and run it",
      body: "Use pnpm, npm, or any package manager you like.",
      code: `cd ${folder}\npnpm install\npnpm dev`,
    },
    {
      title: "Make it yours",
      body: template.customize,
    },
    {
      title: "Deploy",
      body: "Push the folder to GitHub and import it on Vercel, or build it as a static site for any host. No environment variables are needed.",
    },
  ];
  const kit = isDashboardKit(template);
  const specs = [
    ["Released", formatTemplateDate(template.released)],
    ["Last updated", formatTemplateDate(template.updated)],
    [kit ? "Pages" : "Sections", String(template.sections.length)],
    ["Layout", kit ? "Dashboard app" : "One page"],
    ["License", templateLicenseLabel(template)],
  ];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Templates", path: "/templates" },
          { name: template.name, path: `/templates/${template.slug}` },
        ])}
      />

      <section className="container mx-auto flex w-full flex-col gap-6 pt-10 pb-6 md:pt-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div
            className={cn(
              "w-40 shrink-0 overflow-hidden rounded-lg border shadow-xs",
              ENTER,
            )}
          >
            <TemplateScreenshot
              alt=""
              image={template.screenshots.card}
              sizes="160px"
            />
          </div>
          <div className="flex min-w-0 flex-col items-start gap-3">
            <TemplateBadge
              className={cn("delay-100", ENTER)}
              template={template}
            />
            <h1
              className={cn(
                "text-balance font-bold text-3xl tracking-tight delay-100 md:text-4xl",
                ENTER,
              )}
            >
              {templateTitle(template)}
            </h1>
            <p
              className={cn(
                "max-w-3xl text-pretty text-lg text-muted-foreground leading-relaxed delay-200",
                ENTER,
              )}
            >
              {template.summary}.
            </p>
          </div>
        </div>
        <Breadcrumb className={cn("delay-300", ENTER)}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/templates" />}>
                Templates
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{template.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div className="border-y bg-muted/30 py-3">
        <div className={cn("container mx-auto delay-300", ENTER)}>
          <ActionBar template={template} />
        </div>
      </div>

      <section className="container mx-auto grid w-full gap-10 py-10 lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)_8.75rem]">
        <aside className="flex flex-col gap-5 lg:self-start">
          <SideSection title="Versions">
            <ul className="flex flex-col gap-1.5 text-sm">
              <li className="flex items-center gap-2">
                <Icon className="size-4" name="IconCheckmark1" />
                Next.js, included
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-4" name="IconClock" />
                Astro and Angular, coming soon
              </li>
            </ul>
          </SideSection>
          <SideSection title="Specs">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              {specs.map(([label, value]) => (
                <div className="contents" key={label}>
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </SideSection>
          <SideSection title="Tech stack">
            <TemplateStack stack={template.stack} />
          </SideSection>
          <SideSection title="Features">
            <BulletList items={template.features} />
          </SideSection>
          <SideSection title={kit ? "Pages" : "Sections"}>
            <BulletList items={template.sections} />
          </SideSection>
          <SideSection title="Deployment">
            <p className="text-muted-foreground text-sm">
              Runs as a Next.js app on Vercel, or builds as a static site for
              any host.
            </p>
            <BulletList items={HOSTS} />
          </SideSection>
        </aside>

        <figure className="min-w-0">
          <div className="overflow-hidden rounded-xl border shadow-sm">
            <TemplateScreenshot
              alt={
                kit
                  ? `The overview page of the ${template.name} on a desktop`
                  : `The whole ${template.name} page on a desktop`
              }
              image={template.screenshots.desktop}
              sizes="(min-width: 1280px) 760px, (min-width: 1024px) 65vw, 100vw"
            />
          </div>
          <figcaption className="mt-3 text-muted-foreground text-sm">
            {kit
              ? "The overview page on a desktop. The live preview has every page."
              : "The whole page on a desktop, from the hero to the footer."}
          </figcaption>
        </figure>

        <div className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
          <TemplateShotRail template={template} />
        </div>
      </section>

      <section className="border-t">
        <div className="container mx-auto grid w-full gap-10 py-12 md:py-16 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-2xl tracking-tight">
              Get started
            </h2>
            {free ? (
              <p className="text-muted-foreground text-sm">
                Free under the MIT license. Use it for yourself or your clients
                and change anything you like.
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                {isProTemplate(template)
                  ? "Included with every Cortexcn Pro license, with updates."
                  : `${templatePriceLabel(template)} once, with updates.`}{" "}
                Use it for as many sites as you like, for yourself or your
                clients, and change anything. Please don't resell or share the
                template itself.
              </p>
            )}
          </div>
          <ol className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <li className="flex gap-4" key={step.title}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs">
                  {index + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-2 pt-0.5">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-muted-foreground">{step.body}</p>
                  {step.code ? (
                    <DocsCodeBlock
                      className="rounded-lg border"
                      code={step.code}
                      lang="bash"
                    />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
