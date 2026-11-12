import { cn } from "@/lib/utils";

/** The Cortexcn launch on Product Hunt, 2026-11-12. */
const PRODUCT_HUNT_POST_ID = "1312794";

const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/posts/cortexcn?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-cortexcn";

const ALT =
  "Cortexcn - Unique shadcn/ui components for landing pages and dashboards | Product Hunt";

function badgeSrc(theme: "light" | "dark") {
  return `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${PRODUCT_HUNT_POST_ID}&theme=${theme}`;
}

/**
 * Product Hunt's "Find us on Product Hunt" badge, with the live upvote count.
 * The light badge shows in light mode and the dark one in dark mode.
 */
export function ProductHuntBadge({ className }: { className?: string }) {
  return (
    <a
      className={cn(
        "inline-flex rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      href={PRODUCT_HUNT_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* biome-ignore lint/performance/noImgElement: Product Hunt serves the badge as a live SVG, so it stays a plain img */}
      <img
        alt={ALT}
        className="h-[54px] w-[250px] dark:hidden"
        height={54}
        src={badgeSrc("light")}
        width={250}
      />
      {/* biome-ignore lint/performance/noImgElement: Product Hunt serves the badge as a live SVG, so it stays a plain img */}
      <img
        alt={ALT}
        className="hidden h-[54px] w-[250px] dark:block"
        height={54}
        src={badgeSrc("dark")}
        width={250}
      />
    </a>
  );
}
