import { BLOCK_CATEGORIES } from "@/blocks/categories";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { isProItem } from "@/lib/pro";
import {
  formatUsd,
  type PlanAction,
  PRO_LICENSE_PRICES,
  PRO_LICENSE_REGULAR_PRICES,
  PRO_TEAM_SEATS,
} from "@/lib/service-pricing";
import {
  CUSTOM_QUOTE_PATH,
  PRO_LICENSE_CHECKOUT_URLS,
} from "@/lib/site-config";
import {
  isFreeTemplate,
  isProTemplate,
  SITE_TEMPLATES,
} from "@/lib/site-templates";

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

/**
 * The paid website templates, which every Pro license includes. Dashboard
 * kits are not among them: they sell on their own (`lib/kit-plans.ts`).
 */
export const PRO_TEMPLATES = SITE_TEMPLATES.filter(isProTemplate);

/** The four landing page templates the Pro page shows, in its order. */
const FEATURED_TEMPLATE_SLUGS = [
  "data-checks",
  "team-workspace",
  "simplistic-saas",
  "ai-infra",
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

export type ProLicenseId = "free" | "hobby" | "business" | "custom";

export interface ProLicense {
  id: ProLicenseId;
  name: string;
  summary: string;
  /** In US dollars, paid once. 0 for Free and for Custom, which is quoted. */
  price: number;
  /** Shown in place of the price, for a card that has none. */
  priceLabel?: string;
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

/** "Buy Hobby: $199", to the license's checkout page. */
function buyAction(id: "hobby" | "business", name: string): PlanAction {
  return {
    label: `Buy ${name}: ${formatUsd(PRO_LICENSE_PRICES[id])}`,
    href: PRO_LICENSE_CHECKOUT_URLS[id],
  };
}

/** What every paid license covers, in the order the cards list it. */
const PRO_CONTENT = [
  `${PRO_COUNTS.charts} premium charts and ${PRO_COUNTS.blocks} premium blocks`,
  `${MOTION_COUNT} motion components for micro-interactions`,
  `${PRO_COUNTS.templates} complete website templates, ready to launch`,
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
    id: "hobby",
    name: "Hobby",
    summary:
      "For one developer: side projects, your own products, and client work.",
    price: PRO_LICENSE_PRICES.hobby,
    regularPrice: PRO_LICENSE_REGULAR_PRICES.hobby,
    priceNote: "Paid once, lifetime access",
    featuresHeading: "Hobby includes:",
    features: [
      ...PRO_CONTENT,
      "One developer",
      "Unlimited personal, commercial, and client projects",
      LIFETIME_UPDATES_LINE,
      FUTURE_LINE,
      MCP_LINE,
      PROMPTS_LINE,
      COMMUNITY_LINE,
      SUPPORT_LINE,
      COPY_LINE,
      STACK_LINE,
    ],
    action: buyAction("hobby", "Hobby"),
    badge: "Recommended",
  },
  {
    id: "business",
    name: "Business",
    summary: `For studios and product teams of up to ${PRO_TEAM_SEATS} developers.`,
    price: PRO_LICENSE_PRICES.business,
    regularPrice: PRO_LICENSE_REGULAR_PRICES.business,
    priceNote: "Paid once, lifetime access",
    featuresHeading: "Everything in Hobby, plus:",
    features: [
      `Seats for ${PRO_TEAM_SEATS} developers on your team`,
      "Add and remove teammates by email, from your purchases page",
      "Use it in the products your company sells, SaaS included",
      "One payment and one invoice for the whole team",
    ],
    action: buyAction("business", "Business"),
  },
  {
    id: "custom",
    name: "Custom",
    summary:
      "For components, dashboards, or pages we build to your brief, on your stack.",
    price: 0,
    priceLabel: "Quote",
    priceNote: "A price range online, then a fixed price in writing",
    featuresHeading: "Custom covers:",
    features: [
      "Custom components and blocks",
      "Dashboards, built screen by screen",
      "Landing pages and full websites",
      "See an estimated range before you send anything",
      "A fixed price and timeline in writing before work starts",
    ],
    action: { label: "Get an estimate", href: CUSTOM_QUOTE_PATH },
  },
];

/** The licenses sold at checkout, cheapest first, for the Pro page's structured data. */
export const PAID_PRO_LICENSES = PRO_LICENSES.filter(
  (license) => license.id === "hobby" || license.id === "business",
);
