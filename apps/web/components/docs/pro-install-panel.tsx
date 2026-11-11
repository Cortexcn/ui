import { Button } from "@/components/ui/button";
import { PRO_BUY_HREF, PRO_PATH, proSourceHref } from "@/lib/pro";

/** A small "Pro" tag, for items whose code comes with Cortexcn Pro. */
export function ProBadge() {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-muted px-1.5 py-0.5 font-medium font-mono text-[0.625rem] text-foreground uppercase leading-none tracking-[0.06em]">
      Pro
    </span>
  );
}

/**
 * Shown instead of the install steps for a Pro item: its source is not in the
 * public registry, so there is no command or code to copy here.
 */
export function ProInstallPanel({ name }: { name: string }) {
  return (
    <div className="not-prose my-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <ProBadge />
        <span className="font-medium text-foreground text-sm">
          Part of Cortexcn Pro
        </span>
      </div>
      <p className="max-w-prose text-muted-foreground text-sm leading-relaxed">
        The source for <code className="font-mono text-foreground">{name}</code>{" "}
        comes with a Cortexcn Pro license, along with every other chart and the
        website templates. Pick a license on the pricing page.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          nativeButton={false}
          render={
            // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
            <a href={PRO_BUY_HREF} />
          }
        >
          Buy Pro
        </Button>
        <Button
          nativeButton={false}
          render={
            // biome-ignore lint/a11y/useAnchorContent: Base UI merges Button children into this anchor
            <a href={PRO_PATH} />
          }
          variant="outline"
        >
          See what is in Pro
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">
        Already have a license?{" "}
        <a
          className="underline underline-offset-4 transition-colors hover:text-foreground"
          href={proSourceHref(name)}
        >
          Open the code
        </a>
      </p>
    </div>
  );
}
