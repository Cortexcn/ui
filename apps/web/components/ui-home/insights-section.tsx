import { getInsights } from "@/lib/insights";

import { InsightsPanel } from "./insights-panel";
import { Container } from "./primitives";
import { SectionHeader } from "./section-header";

/**
 * Cortexcn's real traffic, as the portfolio's Insights shows it. Hidden when
 * the Cloudflare analytics variables are unset or the request fails, so the
 * page never shows made-up numbers.
 */
export async function InsightsSection() {
  const windows = await getInsights();
  if (!windows) {
    return null;
  }

  return (
    <section className="py-20 md:py-28" id="insights">
      <Container>
        <SectionHeader
          badge="Insights"
          lines={[
            { text: "Built in public." },
            {
              text: "Our real traffic, updated every 30 minutes.",
              muted: true,
            },
          ]}
        />
        <InsightsPanel windows={windows} />
      </Container>
    </section>
  );
}
