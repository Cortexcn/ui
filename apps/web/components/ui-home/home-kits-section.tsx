import { TemplateScreenshotCrop } from "@/components/templates/template-screenshot";
import { CATALOG_COUNTS } from "@/lib/catalog-counts";
import { formatUsd } from "@/lib/service-pricing";
import { getSiteTemplate } from "@/lib/site-templates";

import { ProductShowcase, StageLayout } from "./product-showcase";
import { Safari } from "./safari";

/** The Trading kit, shown by its Trade page. */
const KIT = getSiteTemplate("trading-dashboard-kit");
const TRADE_PAGE = KIT?.pageShots?.find((shot) => shot.name === "Trade");

/** The dashboard kits. */
export function HomeKitsSection() {
  return (
    <ProductShowcase
      art="soft-meadow-grass"
      badge="Dashboard kits"
      description="Invoicing, projects, trading, people, voice AI, and docs. Each kit is a full Next.js app with every page, a typed data model, a demo workspace, and tests. Point it at your API and ship it as your product's dashboard."
      id="dashboard-kits"
      lines={[
        { text: "Complete dashboards," },
        { text: "every page included.", muted: true },
      ]}
      primary={{ label: "Explore dashboard kits", href: "/dashboard-kits" }}
      secondary={
        KIT?.previewUrl
          ? { label: "Live preview", href: KIT.previewUrl, newTab: true }
          : { label: "See kit pricing", href: "/dashboard-kits/pricing" }
      }
      stage={
        KIT ? (
          <StageLayout>
            <Safari url="acme.com/trade">
              <TemplateScreenshotCrop
                image={TRADE_PAGE?.image ?? KIT.screenshots.card}
                position="50% 0%"
                sizes="(min-width: 1024px) 700px, 95vw"
              />
            </Safari>
          </StageLayout>
        ) : null
      }
      stageLabel={`The Trade page of the ${KIT?.name ?? "Trading Dashboard Kit"}.`}
      stats={[
        { value: String(CATALOG_COUNTS.kits), label: "dashboard kits" },
        { value: String(CATALOG_COUNTS.kitPages), label: "pages across them" },
        {
          value: formatUsd(CATALOG_COUNTS.kitFromPrice),
          label: "per kit, paid once",
        },
      ]}
      tag={`From ${formatUsd(CATALOG_COUNTS.kitFromPrice)}`}
    />
  );
}
