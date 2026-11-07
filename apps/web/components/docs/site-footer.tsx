import Link from "fumadocs-core/link";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import { CortexcnLogo } from "../icons/cortexcn";
import { VersionText } from "../version-tag";

/** One floating badge of the credit row. */
const BADGE =
  "pointer-events-auto inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/90 px-4 text-sm shadow-black/5 shadow-lg backdrop-blur-md";

/**
 * The credit floats at the bottom of the screen as two badges: the company on
 * the left and the live system status on the right. The footer element keeps
 * its height in the page flow, so the last lines of a page can still scroll
 * clear of it.
 */
export function SiteFooter({
  className,
}: {
  /** Matches the page's side columns, so the credit centers on the content. */
  className?: string;
}) {
  return (
    <footer className="h-24">
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 px-4 sm:px-6 lg:px-8 print:hidden",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <Link className={cn(BADGE, "font-medium text-foreground")} href="/">
            {/* "auto" also follows the forced-dark landing scope, not just the site theme. */}
            <CortexcnLogo size={16} theme="auto" />
            Cortexcn
            <VersionText />
          </Link>
          <StatusBadge
            className={cn(
              BADGE,
              "text-muted-foreground hover:text-foreground hover:no-underline",
            )}
          />
        </div>
      </div>
    </footer>
  );
}
