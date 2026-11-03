import Link from "fumadocs-core/link";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import { CortexcnLogo } from "../icons/cortexcn";

const PORTFOLIO_URL = "https://syedmoinuddin.com";

/** One floating badge of the credit row. */
const BADGE =
  "pointer-events-auto inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/90 px-4 text-sm shadow-black/5 shadow-lg backdrop-blur-md";

/**
 * The credit floats at the bottom of the screen as three badges: the company
 * on the left, the live system status in the middle, and the builder on the
 * right. On phones the status sits above the other two. The footer element
 * keeps its height in the page flow, so the last lines of a page can still
 * scroll clear of it.
 */
export function SiteFooter({
  className,
}: {
  /** Matches the page's side columns, so the credit centers on the content. */
  className?: string;
}) {
  return (
    <footer className="h-28 sm:h-24">
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 px-4 sm:px-6 lg:px-8 print:hidden",
          className,
        )}
      >
        <div className="grid grid-cols-[auto_auto] items-center justify-between gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <div className="justify-self-start sm:col-start-1 sm:row-start-1">
            <Link className={cn(BADGE, "font-medium text-foreground")} href="/">
              {/* "auto" also follows the forced-dark landing scope, not just the site theme. */}
              <CortexcnLogo size={16} theme="auto" />
              Cortexcn
            </Link>
          </div>

          <div className="col-span-2 row-start-1 justify-self-center sm:col-span-1 sm:col-start-2">
            <StatusBadge
              className={cn(
                BADGE,
                "text-muted-foreground hover:text-foreground hover:no-underline",
              )}
            />
          </div>

          <div className="justify-self-end sm:col-start-3 sm:row-start-1">
            <span className={cn(BADGE, "text-muted-foreground")}>
              Built by
              <Link
                className="text-foreground underline-offset-4 hover:underline"
                external
                href={PORTFOLIO_URL}
              >
                Syed Moinuddin
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
