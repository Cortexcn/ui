import { ProBadge } from "@/components/docs/pro-install-panel";
import { Button } from "@/components/ui/button";
import { PRO_PRICING_PATH, proSourceHref } from "@/lib/pro";
import { PAID_PRO_LICENSES } from "@/lib/pro-licenses";
import { formatUsd } from "@/lib/service-pricing";
import { cn } from "@/lib/utils";

/**
 * Shown in a Pro block's Code tab instead of its source: the paid licenses,
 * each with its price and buy link, since every one of them includes the code.
 * License holders get a link to the block in their purchases.
 */
export function BlockProPanel({
  name,
  item,
  height,
}: {
  name: string;
  /** The registry name of the block, such as "hero-synapse-01". */
  item: string;
  height: number;
}) {
  return (
    <div
      className="flex flex-col items-center overflow-auto border-t px-4 py-10 sm:px-6"
      style={{ height }}
    >
      <div className="my-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <ProBadge />
          <h3 className="text-balance font-semibold text-2xl tracking-tight">
            The code for {name} comes with Cortexcn Pro
          </h3>
          <p className="max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed">
            Pay once for the source of every Pro block, chart, and website
            template. Every license below includes this block.
          </p>
        </div>

        <ul className="grid gap-3 md:grid-cols-3">
          {PAID_PRO_LICENSES.map((license) => (
            <li
              className={cn(
                "flex flex-col gap-4 rounded-xl border border-border bg-card p-5",
                license.badge &&
                  "border-foreground/25 ring-1 ring-foreground/10",
              )}
              key={license.id}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium">{license.name}</h4>
                {license.badge ? (
                  <span className="rounded-full bg-primary px-2 py-1 font-medium text-[10px] text-primary-foreground uppercase leading-none tracking-wide">
                    {license.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex items-baseline gap-2">
                  <span className="font-semibold text-3xl tracking-tight">
                    {formatUsd(license.price)}
                  </span>
                  {license.regularPrice ? (
                    <s className="text-muted-foreground text-sm">
                      <span className="sr-only">Regular price </span>
                      {formatUsd(license.regularPrice)}
                    </s>
                  ) : null}
                </p>
                <p className="text-muted-foreground text-xs">
                  {license.priceNote}
                </p>
              </div>
              <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
                {license.summary}
              </p>
              <Button
                className="mt-auto w-full"
                nativeButton={false}
                render={
                  // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
                  <a href={license.action.href} />
                }
                variant={license.badge ? "default" : "outline"}
              >
                {license.action.label}
              </Button>
            </li>
          ))}
        </ul>

        <p className="text-center text-muted-foreground text-sm">
          <a
            className="underline underline-offset-4 transition-colors hover:text-foreground"
            href={PRO_PRICING_PATH}
          >
            Compare everything in each license
          </a>
          <span aria-hidden="true"> / </span>
          <a
            className="underline underline-offset-4 transition-colors hover:text-foreground"
            href={proSourceHref(item)}
          >
            Already have a license? Open the code
          </a>
        </p>
      </div>
    </div>
  );
}
