import Link from "next/link";
import { cn } from "@/lib/utils";
import { VERSION_LABEL } from "@/lib/version";

/**
 * The version in brackets, such as "(v1.52.0)", beside the Cortexcn name. It
 * links to the changelog, where each release that raised it is listed.
 */
export function VersionTag({ className }: { className?: string }) {
  return (
    <Link
      aria-label={`Version ${VERSION_LABEL}, open the changelog`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm font-mono text-[11px] text-muted-foreground tabular-nums outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      href="/changelog"
    >
      ({VERSION_LABEL})
    </Link>
  );
}

/** The same label as plain text, for inside another link. */
export function VersionText({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] text-muted-foreground tabular-nums",
        className,
      )}
    >
      ({VERSION_LABEL})
    </span>
  );
}
