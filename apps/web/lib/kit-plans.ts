import {
  formatUsd,
  KIT_BUNDLE_PRICES,
  type PlanAction,
  PRO_TEAM_SEATS,
} from "@/lib/service-pricing";
import { KIT_BUNDLE_CHECKOUT_URLS } from "@/lib/site-config";
import { isDashboardKit, SITE_TEMPLATES } from "@/lib/site-templates";

/*
 * The dashboard kits for sale, and the two ways to buy all of them at once,
 * for /dashboard-kits/pricing and the checkout. Each kit's own price is in
 * `lib/site-templates.ts`; the bundle prices are in `lib/service-pricing.ts`.
 */

/** Every dashboard kit for sale, in the template list's order. */
export const DASHBOARD_KITS = SITE_TEMPLATES.filter(isDashboardKit);

/** What the kits cost when bought one at a time. */
export const KITS_TOTAL_PRICE = DASHBOARD_KITS.reduce(
  (sum, kit) => sum + kit.price,
  0,
);

/** Pages across every kit. */
export const KIT_PAGE_COUNT = DASHBOARD_KITS.reduce(
  (sum, kit) => sum + kit.sections.length,
  0,
);

export type KitPlanId = "hobby" | "business";

export interface KitPlan {
  id: KitPlanId;
  name: string;
  summary: string;
  price: number;
  priceNote: string;
  featuresHeading: string;
  features: string[];
  action: PlanAction;
  badge?: string;
}

const KITS_LINE = `All ${DASHBOARD_KITS.length} dashboard kits, ${KIT_PAGE_COUNT} pages in all`;
const FUTURE_KITS_LINE = "Every kit we release later, at no extra cost";
const STACK_LINE = "Next.js, React, Tailwind CSS, and shadcn/ui";
const MODES_LINE = "Light and dark mode, on phones, tablets, and desktops";

export const KIT_PLANS: KitPlan[] = [
  {
    id: "hobby",
    name: "Hobby",
    summary: "Every dashboard kit, for one developer.",
    price: KIT_BUNDLE_PRICES.hobby,
    priceNote: "Paid once, every future kit included",
    featuresHeading: "Hobby includes:",
    features: [
      KITS_LINE,
      FUTURE_KITS_LINE,
      "One developer",
      "Unlimited personal, commercial, and client projects",
      "Updates to every kit, for life",
      STACK_LINE,
      MODES_LINE,
    ],
    action: {
      label: `Buy Hobby: ${formatUsd(KIT_BUNDLE_PRICES.hobby)}`,
      href: KIT_BUNDLE_CHECKOUT_URLS.hobby,
    },
    badge: "Recommended",
  },
  {
    id: "business",
    name: "Business",
    summary: `Every dashboard kit, for a team of up to ${PRO_TEAM_SEATS} developers.`,
    price: KIT_BUNDLE_PRICES.business,
    priceNote: "Paid once, every future kit included",
    featuresHeading: "Everything in Hobby, plus:",
    features: [
      `Seats for ${PRO_TEAM_SEATS} developers on your team`,
      "Add and remove teammates by email, from your purchases page",
      "Use the kits in the products your company sells, SaaS included",
      "One payment and one invoice for the whole team",
    ],
    action: {
      label: `Buy Business: ${formatUsd(KIT_BUNDLE_PRICES.business)}`,
      href: KIT_BUNDLE_CHECKOUT_URLS.business,
    },
  },
];
