import { ProBadge } from "@/components/docs/pro-install-panel";
import { cn } from "@/lib/utils";

/**
 * Stands in, in the public repository, for a part of the site built with
 * Cortexcn Pro. Its source is private; the live site shows the real thing.
 */
export function ProPlaceholder({
  label = "This preview is built with Cortexcn Pro",
  className,
}: Readonly<{ label?: string; className?: string }>) {
  return (
    <div
      className={cn(
        "flex min-h-48 w-full flex-col items-center justify-center gap-3 rounded-shell-lg border border-border border-dashed bg-muted/40 p-6 text-center",
        className,
      )}
    >
      <ProBadge />
      <p className="max-w-sm text-muted-foreground text-sm">
        {label}. Its source is private; the live site at ui.cortexcn.dev shows
        it.
      </p>
    </div>
  );
}
