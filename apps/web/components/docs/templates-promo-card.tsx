import Link from "next/link";
import type { RailPromo } from "@/lib/nav-menus";
import { FeatureVisual } from "./header-nav";

/**
 * The templates card at the foot of the docs sidebar. It stays compact so the
 * sidebar's links keep their room: the screenshot shows only on tall screens,
 * and the whole card hides on short ones.
 */
export function TemplatesPromoCard({ promo }: { promo: RailPromo }) {
  return (
    <div className="flex shrink-0 flex-col gap-3 rounded-shell-xl border border-border bg-card p-3 shadow-sm [@media(max-height:760px)]:hidden">
      <div className="group/feature hidden overflow-hidden rounded-shell-lg border border-border bg-muted [@media(min-height:1000px)]:block">
        <FeatureVisual feature={promo.feature} />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <p className="m-0 text-muted-foreground text-xs">{promo.eyebrow}</p>
        <p className="m-0 font-semibold text-foreground text-sm leading-snug tracking-tight">
          {promo.feature.title}
        </p>
        <p className="m-0 mt-1 text-muted-foreground text-xs leading-relaxed">
          {promo.note}
        </p>
      </div>
      <Link
        className="flex h-8 items-center justify-center rounded-shell-sm bg-[var(--cta,var(--foreground))] font-medium text-[var(--cta-foreground,var(--background))] text-sm no-underline outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        href={promo.feature.href}
      >
        {promo.cta}
      </Link>
    </div>
  );
}
