"use client";

import { TemplateScreenshot } from "@/components/templates/template-screenshot";
import {
  type CanvasColumn,
  CardCanvas,
} from "@/components/ui-home/card-canvas";
import { isDashboardKit, SITE_TEMPLATES } from "@/lib/site-templates";

/** Four columns, each dropped a different distance, as on the blocks hero. */
const OFFSETS = ["mt-0", "mt-40", "mt-16", "mt-56"];

/**
 * The templates on the hero wall, dealt across the columns in list order, so
 * the newest dashboard kits sit near the top.
 */
const COLUMNS: CanvasColumn[] = OFFSETS.map((offset, column) => ({
  width: "w-[420px]",
  offset,
  cards: SITE_TEMPLATES.filter(
    (_, index) => index % OFFSETS.length === column,
  ).map((template) => ({
    slug: template.slug,
    title: template.name,
    kind: isDashboardKit(template) ? "Dashboard kit" : "Template",
    demo: (
      <TemplateScreenshot
        alt=""
        image={template.screenshots.card}
        sizes="420px"
      />
    ),
  })),
}));

/** The order the camera visits the cards in, crossing between columns. */
const TOUR = SITE_TEMPLATES.map((template) => template.slug);

/** The landing page's moving wall, filled with the templates' first screens. */
export function TemplatesHeroCanvas({ className }: { className?: string }) {
  return <CardCanvas className={className} columns={COLUMNS} tour={TOUR} />;
}
