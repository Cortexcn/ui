import { CtaSection } from "@/components/ui-home/cta-section";
import { CustomWorkSection } from "@/components/ui-home/custom-work-section";
import { FaqSection } from "@/components/ui-home/faq-section";
import { FeaturesSection } from "@/components/ui-home/features-section";
import { HeroSection } from "@/components/ui-home/hero-section";
import { HomeAiSection } from "@/components/ui-home/home-ai-section";
import { HomeBlocksSection } from "@/components/ui-home/home-blocks-section";
import { HomeChartsSection } from "@/components/ui-home/home-charts-section";
import { HomeComponentsSection } from "@/components/ui-home/home-components-section";
import { HomeKitsSection } from "@/components/ui-home/home-kits-section";
import { HomeMcpSection } from "@/components/ui-home/home-mcp-section";
import { HomeNextSection } from "@/components/ui-home/home-next-section";
import { HomeProductsSection } from "@/components/ui-home/home-products-section";
import { HomeTemplatesSection } from "@/components/ui-home/home-templates-section";
import { InsightsSection } from "@/components/ui-home/insights-section";
import { pageMetadata } from "@/lib/seo";
import { LIBRARY_HOME_ROUTE } from "@/lib/site-url";

/** The Insights section's traffic numbers refresh every 30 minutes. */
export const revalidate = 1800;

export const metadata = pageMetadata({
  title:
    "Cortexcn: components, blocks, charts, and dashboard kits for shadcn/ui",
  description:
    "Ready-made UI for landing pages and dashboards: components, blocks, charts, AI interfaces, dashboard kits, and website templates for shadcn/ui. Install them with the shadcn CLI or your AI agent, and own the code.",
  path: LIBRARY_HOME_ROUTE,
  absoluteTitle: true,
  // The hero's headline, on the library card.
  image: { title: "Landing pages and dashboards, one prompt away." },
});

/**
 * The home page: what Cortexcn makes, then one section per product line,
 * each with live examples, an Explore button, and a Docs button. The use
 * cases and quality sections are kept in their files to bring back.
 */
export default function LibraryHomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <HomeProductsSection />
      <HomeComponentsSection />
      <HomeBlocksSection />
      <HomeChartsSection />
      <HomeAiSection />
      <HomeKitsSection />
      <HomeTemplatesSection />
      <HomeMcpSection />
      <HomeNextSection />
      <FeaturesSection />
      <InsightsSection />
      <CustomWorkSection source="home" />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
