import { JsonLd } from "@/components/seo/json-ld";
import { WhatsNewFeed } from "@/components/whats-new/whats-new-feed";
import { WhatsNewHero } from "@/components/whats-new/whats-new-hero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  shipCalendar,
  WHATS_NEW_URL,
  whatsNewDays,
  whatsNewStats,
} from "@/lib/whats-new";

export const metadata = pageMetadata({
  title: "What's new",
  description:
    "New Cortexcn components, blocks, and templates, grouped by the day they shipped, newest first.",
  path: WHATS_NEW_URL,
});

export default function WhatsNewPage() {
  const days = whatsNewDays();
  const stats = whatsNewStats();
  const calendar = shipCalendar();

  return (
    <main className="flex flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What's new", path: WHATS_NEW_URL },
        ])}
      />
      <WhatsNewHero calendar={calendar} stats={stats} />
      <WhatsNewFeed days={days} />
    </main>
  );
}
