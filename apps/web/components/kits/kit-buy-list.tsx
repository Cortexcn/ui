import Link from "next/link";

import { TemplateScreenshot } from "@/components/templates/template-screenshot";
import { Button } from "@/components/ui/button";
import { kitCheckoutUrl } from "@/lib/site-config";
import {
  type SiteTemplate,
  templatePartsLabel,
  templatePriceLabel,
} from "@/lib/site-templates";

/** Every kit with its own price, to buy one at a time. */
export function KitBuyList({ kits }: { kits: SiteTemplate[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kits.map((kit) => (
        <li
          className="flex flex-col overflow-hidden rounded-xl border bg-card"
          key={kit.slug}
        >
          <Link
            className="block border-b outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={`/templates/${kit.slug}`}
          >
            <span className="sr-only">View {kit.name}</span>
            <TemplateScreenshot
              alt=""
              image={kit.screenshots.card}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold tracking-tight">{kit.name}</h3>
              <span className="shrink-0 font-semibold">
                {templatePriceLabel(kit)}
              </span>
            </div>
            <p className="line-clamp-2 text-muted-foreground text-sm">
              {kit.summary}.
            </p>
            <p className="text-muted-foreground text-xs">
              {templatePartsLabel(kit)}, paid once, with updates
            </p>
            <div className="mt-auto flex gap-2 pt-2">
              <Button
                className="flex-1"
                nativeButton={false}
                render={<Link href={kitCheckoutUrl(kit.slug)} />}
              >
                Buy for {templatePriceLabel(kit)}
              </Button>
              <Button
                nativeButton={false}
                render={<Link href={`/templates/${kit.slug}`} />}
                variant="outline"
              >
                Details
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
