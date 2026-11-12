import { TemplateScreenshotCrop } from "@/components/templates/template-screenshot";
import { CATALOG_COUNTS } from "@/lib/catalog-counts";
import { getSiteTemplate } from "@/lib/site-templates";

import { ProductShowcase, StageLayout } from "./product-showcase";
import { Safari } from "./safari";

const TEMPLATE = getSiteTemplate("data-checks");

/** The Data Checks template's first screen. */
function TemplatesStage() {
  if (!TEMPLATE) {
    return null;
  }

  return (
    <StageLayout>
      <Safari url="acme.com">
        <TemplateScreenshotCrop
          image={TEMPLATE.screenshots.card}
          position="50% 0%"
          sizes="(min-width: 1024px) 600px, 90vw"
        />
      </Safari>
    </StageLayout>
  );
}

/** The website templates. */
export function HomeTemplatesSection() {
  const paid = CATALOG_COUNTS.templates - CATALOG_COUNTS.freeTemplates;

  return (
    <ProductShowcase
      art="watercolor-wildflowers"
      badge="Templates"
      description="Landing pages for SaaS, AI, and data products, and a free portfolio. Each one is a standalone Next.js project, responsive on every screen, with your content in one place."
      id="templates"
      lines={[
        { text: "Full websites," },
        { text: "ready for your content.", muted: true },
      ]}
      primary={{ label: "Explore templates", href: "/templates" }}
      reverse
      secondary={
        TEMPLATE?.previewUrl
          ? { label: "Live preview", href: TEMPLATE.previewUrl, newTab: true }
          : { label: "Read the docs", href: "/docs/installation" }
      }
      stage={<TemplatesStage />}
      stageLabel={`The first screen of the ${TEMPLATE?.name ?? "Data Checks"} template.`}
      stats={[
        { value: String(CATALOG_COUNTS.templates), label: "website templates" },
        {
          value: String(CATALOG_COUNTS.freeTemplates),
          label: "free to download",
        },
        { value: String(paid), label: "included with Pro" },
      ]}
      tag={`${CATALOG_COUNTS.freeTemplates} free`}
    />
  );
}
