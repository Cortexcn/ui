import { CtaSection } from "@/components/ui-home/cta-section";
import { FaqSection } from "@/components/ui-home/faq-section";
import { FeaturesSection } from "@/components/ui-home/features-section";
import { HeroSection } from "@/components/ui-home/hero-section";
import { InsightsSection } from "@/components/ui-home/insights-section";
import { QualitySection } from "@/components/ui-home/quality-section";
import { UseCasesSection } from "@/components/ui-home/use-cases-section";
import { pageMetadata } from "@/lib/seo";
import { LIBRARY_HOME_ROUTE } from "@/lib/site-url";

/** The Insights section's traffic numbers refresh every 30 minutes. */
export const revalidate = 1800;

export const metadata = pageMetadata({
  title: "Cortexcn UI: charts, blocks, and motion components for shadcn/ui",
  description:
    "React components for shadcn/ui: charts, blocks, backgrounds, and motion. Install them with the shadcn CLI or your AI agent, and own the code.",
  path: LIBRARY_HOME_ROUTE,
  absoluteTitle: true,
  // The hero's headline, on the library card.
  image: { title: "Charts, blocks, and motion, one prompt away." },
});

export default function LibraryHomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <QualitySection />
      {/*
        "Why Cortexcn" (`StickyFeaturesSection`) and pricing (`PricingSection`)
        are hidden for now; their files are kept to bring back.
      */}
      <InsightsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
