import { Button } from "@/components/ui/button";
import { PRO_PRICING_PATH } from "@/lib/pro";
import { PRO_COUNTS, PRO_TEMPLATES } from "@/lib/pro-licenses";
import { PROOF_STATS } from "@/lib/site-config";
import { type DeckSlide, TemplateDeck } from "./template-deck";

/** Sections further down some of the landing pages, after every first screen. */
const SECTION_VIEWS = [
  { slug: "data-checks", position: "50% 45%" },
  { slug: "simplistic-saas", position: "50% 35%" },
  { slug: "ai-travel-app", position: "50% 55%" },
  { slug: "growth-agency", position: "50% 40%" },
];

/** Each Pro template's first screen, then four sections. */
const SLIDES: DeckSlide[] = [
  ...PRO_TEMPLATES.map((template) => ({
    key: `${template.slug}-first-screen`,
    image: template.screenshots.card,
    position: "50% 0%",
  })),
  ...SECTION_VIEWS.flatMap(({ slug, position }) => {
    const template = PRO_TEMPLATES.find((item) => item.slug === slug);
    return template
      ? [
          {
            key: `${template.slug}-${position}`,
            image: template.screenshots.desktop,
            position,
          },
        ]
      : [];
  }),
];

/** The Pro offer beside the /templates heading. */
export function ProTemplatesCard() {
  return (
    <aside className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-3 pb-5 shadow-xs">
        <div className="rounded-xl bg-muted/60 px-6 pt-2 pb-5">
          <TemplateDeck slides={SLIDES} />
        </div>
        <div className="flex flex-col gap-2 px-2">
          <p className="text-foreground/80 text-sm">Cortexcn Pro</p>
          <h2 className="font-semibold text-xl tracking-tight">
            Launch with {PRO_COUNTS.templates} Pro templates
          </h2>
          <p className="text-foreground/85">
            Complete Next.js sites for SaaS products, AI apps, and agencies.
            Swap in your words and go live.
          </p>
        </div>
        <Button
          className="mx-2"
          nativeButton={false}
          render={
            // The pricing page lives on the product site, so a plain anchor.
            // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
            <a href={PRO_PRICING_PATH} />
          }
          size="lg"
        >
          Get all access
        </Button>
      </div>
      <p className="px-1 text-foreground/85 text-sm">
        All access includes all {PRO_COUNTS.templates} templates,{" "}
        {PRO_COUNTS.charts} charts, and {PRO_COUNTS.blocks} blocks. Pay once.
      </p>
      {PROOF_STATS.users ? (
        <p className="px-1 text-foreground/85 text-sm">
          Trusted by{" "}
          <span className="font-semibold text-foreground">
            {PROOF_STATS.users}
          </span>{" "}
          users
        </p>
      ) : null}
    </aside>
  );
}
