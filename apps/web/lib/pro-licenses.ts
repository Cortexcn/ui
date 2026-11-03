import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { contactHref } from "@/lib/contact/prefill";
import { isProItem } from "@/lib/pro";
import {
  formatUsd,
  type PlanAction,
  PRO_LICENSE_PRICES,
  PRO_LICENSE_REGULAR_PRICES,
  PRO_TEAM_SEATS,
} from "@/lib/service-pricing";
import { PRO_LICENSE_CHECKOUT_URLS } from "@/lib/site-config";
import { isFreeTemplate, SITE_TEMPLATES } from "@/lib/site-templates";

/*
 * The Cortexcn Pro licenses shown on /pro/pricing, and the counts the Pro
 * pages quote. Every count comes from the docs sidebar, the block
 * categories, and the template list, so the copy stays true as they grow.
 */

const CHART_SLUGS =
  COMPONENT_GROUPS.find((group) => group.category === "charts")?.slugs ?? [];

const BLOCK_SLUGS: string[] = BLOCK_CATEGORIES.flatMap(
  (category) => category.blocks,
);

/** The paid website templates, which every paid license includes. */
export const PRO_TEMPLATES = SITE_TEMPLATES.filter(
  (template) => !isFreeTemplate(template),
);

/** The four landing page templates the Pro page shows, in its order. */
const FEATURED_TEMPLATE_SLUGS = [
  "data-checks",
  "team-workspace",
  "simplistic-saas",
  "ai-travel-app",
];

export const PRO_FEATURED_TEMPLATES = FEATURED_TEMPLATE_SLUGS.flatMap(
  (slug) => PRO_TEMPLATES.find((template) => template.slug === slug) ?? [],
);

export const PRO_COUNTS = {
  charts: CHART_SLUGS.length,
  blocks: BLOCK_SLUGS.filter((slug) => isProItem(slug)).length,
  templates: PRO_TEMPLATES.length,
};

/**
 * Free components and blocks, rounded down to a ten, so "80+" stays true as
 * the library grows.
 */
const FREE_ITEM_COUNT =
  Math.floor(
    [
      ...COMPONENT_GROUPS.flatMap((group) => group.slugs),
      ...BLOCK_SLUGS,
    ].filter((slug) => !isProItem(slug)).length / 10,
  ) * 10;

const FREE_TEMPLATES = SITE_TEMPLATES.filter(isFreeTemplate);

/** The Cortex family: motion components such as Gooey Nav and Number Ticker. */
const MOTION_COUNT =
  COMPONENT_GROUPS.find((group) => group.category === "cortex")?.slugs.length ??
  0;

export type ProLicenseId = "free" | "year" | "lifetime" | "team";

export interface ProLicense {
  id: ProLicenseId;
  name: string;
  summary: string;
  /** In US dollars, paid once. */
  price: number;
  /** Shown struck through beside the price, when set. */
  regularPrice?: number;
  /** The line under the price. */
  priceNote: string;
  /** The line above the feature list. */
  featuresHeading: string;
  features: string[];
  action: PlanAction;
  /** Only the highlighted card has one. */
  badge?: string;
}

/**
 * Goes to the license's checkout link in `lib/site-config.ts`, or, until that
 * is set, to the contact form with the order written out.
 */
function buyAction(
  id: Exclude<ProLicenseId, "free">,
  name: string,
): PlanAction {
  const price = formatUsd(PRO_LICENSE_PRICES[id]);
  return {
    label: `Buy ${name.toLowerCase()}: ${price}`,
    href:
      PRO_LICENSE_CHECKOUT_URLS[id] ||
      contactHref(
        "question",
        `Hi, I would like to buy the Cortexcn Pro ${name} license (${price}). Please send me a payment link.`,
      ),
  };
}

/** What every paid license covers, in the order the cards list it. */
const PRO_CONTENT = [
  `${PRO_COUNTS.charts} premium charts and ${PRO_COUNTS.blocks} premium blocks`,
  `${PRO_COUNTS.templates} ready-to-use website templates`,
  `${PRO_FEATURED_TEMPLATES.length} complete landing pages, ready to launch`,
  `${MOTION_COUNT} motion components for micro-interactions`,
];

const MCP_LINE =
  "MCP access for Claude Code, Codex, Cursor, Devin, and other agents";
const PROMPTS_LINE =
  "Ready-made AI prompts for Claude Code, Codex, Cursor, Lovable, and v0";
const COMMUNITY_LINE = "A private Discord community for license holders";
const SUPPORT_LINE = "Support replies within 48 hours";
const COPY_LINE = "Copy and paste, or install with one command";
const STACK_LINE = "Made with Next.js, React, Tailwind CSS, and Motion";
const RESPONSIVE_LINE = "Responsive on every screen, and yours to restyle";
const LIFETIME_UPDATES_LINE = "Updates to everything, for life";
const FUTURE_LINE = "Every future release, at no extra cost";

const FREE_TEMPLATE_LINE =
  FREE_TEMPLATES.length === 1
    ? `The ${FREE_TEMPLATES[0]?.name} template`
    : `${FREE_TEMPLATES.length} free website templates`;

export const PRO_LICENSES: ProLicense[] = [
  {
    id: "free",
    name: "Free",
    summary: "For side projects, and for trying the library.",
    price: 0,
    priceNote: "Free for good, no account needed",
    featuresHeading: "Free includes:",
    features: [
      `${FREE_ITEM_COUNT}+ free components and blocks, with full source`,
      FREE_TEMPLATE_LINE,
      "The Cortexcn MCP server, for Claude Code, Codex, Cursor, Devin, and other agents",
      COPY_LINE,
      STACK_LINE,
      RESPONSIVE_LINE,
      "Docs and live examples for each one",
    ],
    action: { label: "Browse free components", href: "/docs/components" },
  },
  {
    id: "year",
    name: "1-year",
    summary: "For a year of every block, template, and update.",
    price: PRO_LICENSE_PRICES.year,
    regularPrice: PRO_LICENSE_REGULAR_PRICES.year,
    priceNote: "Paid once, 1-year license",
    featuresHeading: "1-year license includes:",
    features: [
      ...PRO_CONTENT,
      "A year of updates and new releases",
      MCP_LINE,
      PROMPTS_LINE,
      COMMUNITY_LINE,
      SUPPORT_LINE,
      "Use in unlimited personal and client projects",
      COPY_LINE,
      STACK_LINE,
      RESPONSIVE_LINE,
      "Paid once, no subscription. Renew after a year if you want",
    ],
    action: buyAction("year", "1-year"),
  },
  {
    id: "lifetime",
    name: "Lifetime",
    summary: "For developers who want all of it, for good.",
    price: PRO_LICENSE_PRICES.lifetime,
    regularPrice: PRO_LICENSE_REGULAR_PRICES.lifetime,
    priceNote: "Paid once, lifetime access",
    featuresHeading: "Everything in 1-year, plus:",
    features: [LIFETIME_UPDATES_LINE, FUTURE_LINE],
    action: buyAction("lifetime", "Lifetime"),
    badge: "Recommended",
  },
  {
    id: "team",
    name: "Team",
    summary: `For studios and product teams of up to ${PRO_TEAM_SEATS} people.`,
    price: PRO_LICENSE_PRICES.team,
    regularPrice: PRO_LICENSE_REGULAR_PRICES.team,
    priceNote: "Paid once, lifetime access",
    featuresHeading: "Team license includes:",
    features: [
      `Seats for ${PRO_TEAM_SEATS} people on your team`,
      ...PRO_CONTENT,
      LIFETIME_UPDATES_LINE,
      FUTURE_LINE,
      COMMUNITY_LINE,
      SUPPORT_LINE,
      MCP_LINE,
      PROMPTS_LINE,
      COPY_LINE,
      STACK_LINE,
    ],
    action: buyAction("team", "Team"),
  },
];

/** The paid licenses, cheapest first, for the Pro page's structured data. */
export const PAID_PRO_LICENSES = PRO_LICENSES.filter(
  (license) => license.price > 0,
);
