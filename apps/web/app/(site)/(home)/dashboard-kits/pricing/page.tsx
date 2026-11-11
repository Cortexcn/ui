import type { Metadata } from "next";
import Link from "next/link";

import { BlocksPageHeader } from "@/components/blocks/blocks-page-header";
import { KitBuyList } from "@/components/kits/kit-buy-list";
import {
  KitPlanCard,
  type PlanCardData,
} from "@/components/kits/kit-plan-card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DASHBOARD_KITS, KIT_PLANS, KITS_TOTAL_PRICE } from "@/lib/kit-plans";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import {
  formatUsd,
  KIT_BUNDLE_PRICES,
  PLAN_REFUND_DAYS,
  PRO_TEAM_SEATS,
} from "@/lib/service-pricing";
import { CUSTOM_QUOTE_PATH, KIT_PRICING_PATH } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Dashboard kit pricing",
  description: `Buy one Cortexcn dashboard kit, or all ${DASHBOARD_KITS.length} at once from ${formatUsd(KIT_BUNDLE_PRICES.hobby)}, with every future kit included. Paid once, for one developer or a team.`,
  path: KIT_PRICING_PATH,
  image: { title: "Dashboard kit pricing", section: "Dashboard Kits" },
});

const PLANS: PlanCardData[] = [
  ...KIT_PLANS.map((plan) => ({
    id: plan.id,
    name: plan.name,
    summary: plan.summary,
    price: formatUsd(plan.price),
    priceNote: plan.priceNote,
    featuresHeading: plan.featuresHeading,
    features: plan.features,
    action: plan.action,
    badge: plan.badge,
  })),
  {
    id: "custom",
    name: "Custom",
    summary:
      "A dashboard built to your brief, from one of these kits or from scratch.",
    price: "Quote",
    priceNote: "A price range online, then a fixed price in writing",
    featuresHeading: "Custom covers:",
    features: [
      "Your screens, your data model, your brand",
      "Wired to your API, or with demo data",
      "Starting from a kit, which costs less than from scratch",
      "See an estimated range before you send anything",
    ],
    action: { label: "Get an estimate", href: CUSTOM_QUOTE_PATH },
  },
];

const QUESTIONS = [
  {
    question: "What is the difference between Hobby and Business?",
    answer: `Hobby is for one developer, Business for a team of up to ${PRO_TEAM_SEATS}. Both cover personal, commercial, and client projects. With Business you add teammates by email, and you can use the kits in products your company sells, SaaS included.`,
  },
  {
    question: "Do I get the kits that come out later?",
    answer:
      "Yes, with either bundle. New kits appear on your purchases page as they are released, at no extra cost. A single kit gets updates to that kit.",
  },
  {
    question: "Are the kits part of Cortexcn Pro?",
    answer:
      "No. Cortexcn Pro covers the Pro components, charts, blocks, and the website templates. The dashboard kits are sold on their own, here.",
  },
  {
    question: "How do I get a kit after I pay?",
    answer:
      "Checkout signs you in, and Dodo Payments takes the payment. Your purchases page then has each kit as a full Next.js project to download.",
  },
  {
    question: "Can I get a refund?",
    answer: `Yes, in full within ${PLAN_REFUND_DAYS} days of purchase.`,
  },
];

export default function KitPricingPage() {
  return (
    <main className="flex flex-1 flex-col pb-16 md:pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dashboard Kits", path: "/dashboard-kits" },
          { name: "Pricing", path: KIT_PRICING_PATH },
        ])}
      />
      <section className="relative w-full pb-8">
        <div className="container mx-auto flex w-full flex-col gap-6">
          <BlocksPageHeader
            action={
              <p className="max-w-3xl text-foreground/85 text-sm">
                Bought one at a time, the {DASHBOARD_KITS.length} kits cost{" "}
                {formatUsd(KITS_TOTAL_PRICE)}. Every kit, and every kit we
                release later, starts at {formatUsd(KIT_BUNDLE_PRICES.hobby)}.
              </p>
            }
            description="Buy one dashboard kit, or all of them at once. Every price is paid once, with no subscription, and each kit is a full Next.js project you download and own."
            descriptionClassName="text-foreground/90"
            title="Dashboard Kit Pricing"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/dashboard-kits" />}>
                  Dashboard Kits
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pricing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section aria-labelledby="bundles-title" className="border-y bg-muted/30">
        <div className="container mx-auto flex w-full flex-col gap-6 py-10">
          <h2
            className="font-semibold text-xl tracking-tight"
            id="bundles-title"
          >
            Every kit, in one purchase
          </h2>
          <ul className="grid gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <li className="scroll-mt-24" id={plan.id} key={plan.id}>
                <KitPlanCard plan={plan} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="single-title"
        className="container mx-auto flex w-full flex-col gap-6 py-10"
      >
        <h2 className="font-semibold text-xl tracking-tight" id="single-title">
          Or buy one kit
        </h2>
        <KitBuyList kits={DASHBOARD_KITS} />
      </section>

      <section
        aria-labelledby="questions-title"
        className="container mx-auto flex w-full flex-col gap-6 border-t pt-10"
      >
        <h2
          className="font-semibold text-xl tracking-tight"
          id="questions-title"
        >
          Questions
        </h2>
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {QUESTIONS.map((item) => (
            <div className="flex flex-col gap-1.5" key={item.question}>
              <dt className="font-medium">{item.question}</dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-muted-foreground text-sm">
          Read the{" "}
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href="/refunds"
          >
            refund policy
          </Link>{" "}
          and the{" "}
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href="/terms"
          >
            terms
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
