import type { StaticImageData } from "next/image";
import infraCardDark from "@/assets/templates/ai-infra/card-dark.webp";
import infraCardLight from "@/assets/templates/ai-infra/card-light.webp";
import infraDesktopDark from "@/assets/templates/ai-infra/desktop-dark.webp";
import infraDesktopLight from "@/assets/templates/ai-infra/desktop-light.webp";
import infraMobileDark from "@/assets/templates/ai-infra/mobile-dark.webp";
import infraMobileLight from "@/assets/templates/ai-infra/mobile-light.webp";
import infraContactDark from "@/assets/templates/ai-infra/page-contact-dark.webp";
import infraContactLight from "@/assets/templates/ai-infra/page-contact-light.webp";
import checksCardDark from "@/assets/templates/data-checks/card-dark.webp";
import checksCardLight from "@/assets/templates/data-checks/card-light.webp";
import checksDesktopDark from "@/assets/templates/data-checks/desktop-dark.webp";
import checksDesktopLight from "@/assets/templates/data-checks/desktop-light.webp";
import checksMobileDark from "@/assets/templates/data-checks/mobile-dark.webp";
import checksMobileLight from "@/assets/templates/data-checks/mobile-light.webp";
import florinCardDark from "@/assets/templates/florin/card-dark.webp";
import florinCardLight from "@/assets/templates/florin/card-light.webp";
import florinDesktopDark from "@/assets/templates/florin/desktop-dark.webp";
import florinDesktopLight from "@/assets/templates/florin/desktop-light.webp";
import florinMobileDark from "@/assets/templates/florin/mobile-dark.webp";
import florinMobileLight from "@/assets/templates/florin/mobile-light.webp";
import florinCheckoutsDark from "@/assets/templates/florin/page-checkouts-dark.webp";
import florinCheckoutsLight from "@/assets/templates/florin/page-checkouts-light.webp";
import florinPaymentsDark from "@/assets/templates/florin/page-payments-dark.webp";
import florinPaymentsLight from "@/assets/templates/florin/page-payments-light.webp";
import florinPayoutsDark from "@/assets/templates/florin/page-payouts-dark.webp";
import florinPayoutsLight from "@/assets/templates/florin/page-payouts-light.webp";
import florinRecurringDark from "@/assets/templates/florin/page-recurring-dark.webp";
import florinRecurringLight from "@/assets/templates/florin/page-recurring-light.webp";
import florinReportsDark from "@/assets/templates/florin/page-reports-dark.webp";
import florinReportsLight from "@/assets/templates/florin/page-reports-light.webp";
import heardlineCardDark from "@/assets/templates/heardline/card-dark.webp";
import heardlineCardLight from "@/assets/templates/heardline/card-light.webp";
import heardlineDesktopDark from "@/assets/templates/heardline/desktop-dark.webp";
import heardlineDesktopLight from "@/assets/templates/heardline/desktop-light.webp";
import heardlineMobileDark from "@/assets/templates/heardline/mobile-dark.webp";
import heardlineMobileLight from "@/assets/templates/heardline/mobile-light.webp";
import heardlineAnalyticsDark from "@/assets/templates/heardline/page-analytics-dark.webp";
import heardlineAnalyticsLight from "@/assets/templates/heardline/page-analytics-light.webp";
import heardlineCheckInsDark from "@/assets/templates/heardline/page-check-ins-dark.webp";
import heardlineCheckInsLight from "@/assets/templates/heardline/page-check-ins-light.webp";
import heardlineFollowUpsDark from "@/assets/templates/heardline/page-follow-ups-dark.webp";
import heardlineFollowUpsLight from "@/assets/templates/heardline/page-follow-ups-light.webp";
import heardlineSettingsDark from "@/assets/templates/heardline/page-settings-dark.webp";
import heardlineSettingsLight from "@/assets/templates/heardline/page-settings-light.webp";
import heardlineTherapistsDark from "@/assets/templates/heardline/page-therapists-dark.webp";
import heardlineTherapistsLight from "@/assets/templates/heardline/page-therapists-light.webp";
import miradorCardDark from "@/assets/templates/mirador/card-dark.webp";
import miradorCardLight from "@/assets/templates/mirador/card-light.webp";
import miradorDesktopDark from "@/assets/templates/mirador/desktop-dark.webp";
import miradorDesktopLight from "@/assets/templates/mirador/desktop-light.webp";
import miradorMobileDark from "@/assets/templates/mirador/mobile-dark.webp";
import miradorMobileLight from "@/assets/templates/mirador/mobile-light.webp";
import miradorAlarmsDark from "@/assets/templates/mirador/page-alarms-dark.webp";
import miradorAlarmsLight from "@/assets/templates/mirador/page-alarms-light.webp";
import miradorCorvoDark from "@/assets/templates/mirador/page-assistant-dark.webp";
import miradorCorvoLight from "@/assets/templates/mirador/page-assistant-light.webp";
import miradorComputeDark from "@/assets/templates/mirador/page-compute-dark.webp";
import miradorComputeLight from "@/assets/templates/mirador/page-compute-light.webp";
import miradorCostsDark from "@/assets/templates/mirador/page-costs-dark.webp";
import miradorCostsLight from "@/assets/templates/mirador/page-costs-light.webp";
import miradorLogsDark from "@/assets/templates/mirador/page-logs-dark.webp";
import miradorLogsLight from "@/assets/templates/mirador/page-logs-light.webp";
import peopleKitCardDark from "@/assets/templates/people-dashboard-kit/card-dark.webp";
import peopleKitCardLight from "@/assets/templates/people-dashboard-kit/card-light.webp";
import peopleKitDesktopDark from "@/assets/templates/people-dashboard-kit/desktop-dark.webp";
import peopleKitDesktopLight from "@/assets/templates/people-dashboard-kit/desktop-light.webp";
import peopleKitMobileDark from "@/assets/templates/people-dashboard-kit/mobile-dark.webp";
import peopleKitMobileLight from "@/assets/templates/people-dashboard-kit/mobile-light.webp";
import peopleKitAttendanceDark from "@/assets/templates/people-dashboard-kit/page-attendance-dark.webp";
import peopleKitAttendanceLight from "@/assets/templates/people-dashboard-kit/page-attendance-light.webp";
import peopleKitPeopleDark from "@/assets/templates/people-dashboard-kit/page-people-dark.webp";
import peopleKitPeopleLight from "@/assets/templates/people-dashboard-kit/page-people-light.webp";
import peopleKitProjectsDark from "@/assets/templates/people-dashboard-kit/page-projects-dark.webp";
import peopleKitProjectsLight from "@/assets/templates/people-dashboard-kit/page-projects-light.webp";
import peopleKitTimeOffDark from "@/assets/templates/people-dashboard-kit/page-time-off-dark.webp";
import peopleKitTimeOffLight from "@/assets/templates/people-dashboard-kit/page-time-off-light.webp";
import peopleKitTimesheetsDark from "@/assets/templates/people-dashboard-kit/page-timesheets-dark.webp";
import peopleKitTimesheetsLight from "@/assets/templates/people-dashboard-kit/page-timesheets-light.webp";
import portfolioCardDark from "@/assets/templates/portfolio/card-dark.webp";
import portfolioCardLight from "@/assets/templates/portfolio/card-light.webp";
import portfolioDesktopDark from "@/assets/templates/portfolio/desktop-dark.webp";
import portfolioDesktopLight from "@/assets/templates/portfolio/desktop-light.webp";
import portfolioMobileDark from "@/assets/templates/portfolio/mobile-dark.webp";
import portfolioMobileLight from "@/assets/templates/portfolio/mobile-light.webp";
import kitCardDark from "@/assets/templates/project-dashboard-kit/card-dark.webp";
import kitCardLight from "@/assets/templates/project-dashboard-kit/card-light.webp";
import kitDesktopDark from "@/assets/templates/project-dashboard-kit/desktop-dark.webp";
import kitDesktopLight from "@/assets/templates/project-dashboard-kit/desktop-light.webp";
import kitMobileDark from "@/assets/templates/project-dashboard-kit/mobile-dark.webp";
import kitMobileLight from "@/assets/templates/project-dashboard-kit/mobile-light.webp";
import kitBoardDark from "@/assets/templates/project-dashboard-kit/page-board-dark.webp";
import kitBoardLight from "@/assets/templates/project-dashboard-kit/page-board-light.webp";
import kitProjectsDark from "@/assets/templates/project-dashboard-kit/page-projects-dark.webp";
import kitProjectsLight from "@/assets/templates/project-dashboard-kit/page-projects-light.webp";
import kitReportsDark from "@/assets/templates/project-dashboard-kit/page-reports-dark.webp";
import kitReportsLight from "@/assets/templates/project-dashboard-kit/page-reports-light.webp";
import kitTeamDark from "@/assets/templates/project-dashboard-kit/page-team-dark.webp";
import kitTeamLight from "@/assets/templates/project-dashboard-kit/page-team-light.webp";
import kitTimelineDark from "@/assets/templates/project-dashboard-kit/page-timeline-dark.webp";
import kitTimelineLight from "@/assets/templates/project-dashboard-kit/page-timeline-light.webp";
import quireCardDark from "@/assets/templates/quire/card-dark.webp";
import quireCardLight from "@/assets/templates/quire/card-light.webp";
import quireDesktopDark from "@/assets/templates/quire/desktop-dark.webp";
import quireDesktopLight from "@/assets/templates/quire/desktop-light.webp";
import quireMobileDark from "@/assets/templates/quire/mobile-dark.webp";
import quireMobileLight from "@/assets/templates/quire/mobile-light.webp";
import quireCalendarDark from "@/assets/templates/quire/page-calendar-dark.webp";
import quireCalendarLight from "@/assets/templates/quire/page-calendar-light.webp";
import quireHomeDark from "@/assets/templates/quire/page-home-dark.webp";
import quireHomeLight from "@/assets/templates/quire/page-home-light.webp";
import quireReportingDark from "@/assets/templates/quire/page-reporting-dark.webp";
import quireReportingLight from "@/assets/templates/quire/page-reporting-light.webp";
import quireTasksDark from "@/assets/templates/quire/page-tasks-dark.webp";
import quireTasksLight from "@/assets/templates/quire/page-tasks-light.webp";
import quireTeamDark from "@/assets/templates/quire/page-team-dark.webp";
import quireTeamLight from "@/assets/templates/quire/page-team-light.webp";
import ringwiseCardDark from "@/assets/templates/ringwise/card-dark.webp";
import ringwiseCardLight from "@/assets/templates/ringwise/card-light.webp";
import ringwiseDesktopDark from "@/assets/templates/ringwise/desktop-dark.webp";
import ringwiseDesktopLight from "@/assets/templates/ringwise/desktop-light.webp";
import ringwiseMobileDark from "@/assets/templates/ringwise/mobile-dark.webp";
import ringwiseMobileLight from "@/assets/templates/ringwise/mobile-light.webp";
import ringwiseAgentsDark from "@/assets/templates/ringwise/page-agents-dark.webp";
import ringwiseAgentsLight from "@/assets/templates/ringwise/page-agents-light.webp";
import ringwiseAnalyticsDark from "@/assets/templates/ringwise/page-analytics-dark.webp";
import ringwiseAnalyticsLight from "@/assets/templates/ringwise/page-analytics-light.webp";
import ringwiseCallsDark from "@/assets/templates/ringwise/page-calls-dark.webp";
import ringwiseCallsLight from "@/assets/templates/ringwise/page-calls-light.webp";
import ringwiseCampaignsDark from "@/assets/templates/ringwise/page-campaigns-dark.webp";
import ringwiseCampaignsLight from "@/assets/templates/ringwise/page-campaigns-light.webp";
import ringwiseLiveDark from "@/assets/templates/ringwise/page-live-dark.webp";
import ringwiseLiveLight from "@/assets/templates/ringwise/page-live-light.webp";
import shipkinCardDark from "@/assets/templates/shipkin/card-dark.webp";
import shipkinCardLight from "@/assets/templates/shipkin/card-light.webp";
import shipkinDesktopDark from "@/assets/templates/shipkin/desktop-dark.webp";
import shipkinDesktopLight from "@/assets/templates/shipkin/desktop-light.webp";
import shipkinMobileDark from "@/assets/templates/shipkin/mobile-dark.webp";
import shipkinMobileLight from "@/assets/templates/shipkin/mobile-light.webp";
import shipkinAboutDark from "@/assets/templates/shipkin/page-about-dark.webp";
import shipkinAboutLight from "@/assets/templates/shipkin/page-about-light.webp";
import shipkinContactDark from "@/assets/templates/shipkin/page-contact-dark.webp";
import shipkinContactLight from "@/assets/templates/shipkin/page-contact-light.webp";
import shipkinPricingDark from "@/assets/templates/shipkin/page-pricing-dark.webp";
import shipkinPricingLight from "@/assets/templates/shipkin/page-pricing-light.webp";
import shipkinProjectsDark from "@/assets/templates/shipkin/page-projects-dark.webp";
import shipkinProjectsLight from "@/assets/templates/shipkin/page-projects-light.webp";
import shipkinServicesDark from "@/assets/templates/shipkin/page-services-dark.webp";
import shipkinServicesLight from "@/assets/templates/shipkin/page-services-light.webp";
import saasCardDark from "@/assets/templates/simplistic-saas/card-dark.webp";
import saasCardLight from "@/assets/templates/simplistic-saas/card-light.webp";
import saasDesktopDark from "@/assets/templates/simplistic-saas/desktop-dark.webp";
import saasDesktopLight from "@/assets/templates/simplistic-saas/desktop-light.webp";
import saasMobileDark from "@/assets/templates/simplistic-saas/mobile-dark.webp";
import saasMobileLight from "@/assets/templates/simplistic-saas/mobile-light.webp";
import tansyCardDark from "@/assets/templates/tansy/card-dark.webp";
import tansyCardLight from "@/assets/templates/tansy/card-light.webp";
import tansyDesktopDark from "@/assets/templates/tansy/desktop-dark.webp";
import tansyDesktopLight from "@/assets/templates/tansy/desktop-light.webp";
import tansyMobileDark from "@/assets/templates/tansy/mobile-dark.webp";
import tansyMobileLight from "@/assets/templates/tansy/mobile-light.webp";
import tansyAccountsDark from "@/assets/templates/tansy/page-accounts-dark.webp";
import tansyAccountsLight from "@/assets/templates/tansy/page-accounts-light.webp";
import tansyAnalyticsDark from "@/assets/templates/tansy/page-analytics-dark.webp";
import tansyAnalyticsLight from "@/assets/templates/tansy/page-analytics-light.webp";
import tansyBudgetDark from "@/assets/templates/tansy/page-budget-dark.webp";
import tansyBudgetLight from "@/assets/templates/tansy/page-budget-light.webp";
import tansyGoalsDark from "@/assets/templates/tansy/page-goals-dark.webp";
import tansyGoalsLight from "@/assets/templates/tansy/page-goals-light.webp";
import tansyTransactionsDark from "@/assets/templates/tansy/page-transactions-dark.webp";
import tansyTransactionsLight from "@/assets/templates/tansy/page-transactions-light.webp";
import workspaceCardDark from "@/assets/templates/team-workspace/card-dark.webp";
import workspaceCardLight from "@/assets/templates/team-workspace/card-light.webp";
import workspaceDesktopDark from "@/assets/templates/team-workspace/desktop-dark.webp";
import workspaceDesktopLight from "@/assets/templates/team-workspace/desktop-light.webp";
import workspaceMobileDark from "@/assets/templates/team-workspace/mobile-dark.webp";
import workspaceMobileLight from "@/assets/templates/team-workspace/mobile-light.webp";
import tradingKitCardDark from "@/assets/templates/trading-dashboard-kit/card-dark.webp";
import tradingKitCardLight from "@/assets/templates/trading-dashboard-kit/card-light.webp";
import tradingKitDesktopDark from "@/assets/templates/trading-dashboard-kit/desktop-dark.webp";
import tradingKitDesktopLight from "@/assets/templates/trading-dashboard-kit/desktop-light.webp";
import tradingKitMobileDark from "@/assets/templates/trading-dashboard-kit/mobile-dark.webp";
import tradingKitMobileLight from "@/assets/templates/trading-dashboard-kit/mobile-light.webp";
import tradingKitHeatmapDark from "@/assets/templates/trading-dashboard-kit/page-heatmap-dark.webp";
import tradingKitHeatmapLight from "@/assets/templates/trading-dashboard-kit/page-heatmap-light.webp";
import tradingKitMarketsDark from "@/assets/templates/trading-dashboard-kit/page-markets-dark.webp";
import tradingKitMarketsLight from "@/assets/templates/trading-dashboard-kit/page-markets-light.webp";
import tradingKitPortfolioDark from "@/assets/templates/trading-dashboard-kit/page-portfolio-dark.webp";
import tradingKitPortfolioLight from "@/assets/templates/trading-dashboard-kit/page-portfolio-light.webp";
import tradingKitScreenerDark from "@/assets/templates/trading-dashboard-kit/page-screener-dark.webp";
import tradingKitScreenerLight from "@/assets/templates/trading-dashboard-kit/page-screener-light.webp";
import tradingKitTradeDark from "@/assets/templates/trading-dashboard-kit/page-trade-dark.webp";
import tradingKitTradeLight from "@/assets/templates/trading-dashboard-kit/page-trade-light.webp";
import { formatUsd } from "@/lib/service-pricing";
import { kitCheckoutUrl } from "@/lib/site-config";

export interface ThemedImage {
  light: StaticImageData;
  dark: StaticImageData;
}

/**
 * Full-website templates listed on /templates. Each one is a standalone
 * Next.js project: free ones in templates/<slug> in this repo, paid ones in
 * the private cortexcn-templates repo next to it. Free templates are
 * zipped at build time by the download route next to their page. Paid ones
 * are packed into apps/web/private/templates and handed only to buyers, from
 * their purchases page: website templates come with Cortexcn Pro, and
 * dashboard kits are sold one by one or all together.
 */
/** The filters on /templates. "free" is not listed: it follows the price. */
export type TemplateCategory =
  | "dashboards"
  | "saas"
  | "ai"
  | "agency"
  | "travel"
  | "small-business"
  | "portfolio";

export interface TemplateFilter {
  slug: TemplateCategory | "free";
  name: string;
  /** Shown as coming soon, with no templates yet. */
  soon?: boolean;
}

export const TEMPLATE_FILTERS: TemplateFilter[] = [
  { slug: "saas", name: "SaaS" },
  { slug: "ai", name: "AI" },
  { slug: "agency", name: "Agency" },
  { slug: "travel", name: "Travel" },
  { slug: "small-business", name: "Small business" },
  { slug: "portfolio", name: "Portfolio" },
  { slug: "free", name: "Free" },
  { slug: "dashboards", name: "Dashboards" },
];

export interface SiteTemplate {
  slug: string;
  name: string;
  /**
   * A one-page landing site (the default), or a multi-page dashboard kit,
   * whose `sections` are its pages.
   */
  kind?: "landing" | "dashboard";
  /** One line for the listing and the page hero. */
  summary: string;
  /** In US dollars, paid once. 0 makes it a free MIT download. */
  price: number;
  /**
   * A tag beside the name. "unique" marks a template with a look of its
   * own, priced apart from the rest, and shows the purple Unique badge.
   */
  badge?: "unique";
  categories: TemplateCategory[];
  /** ISO dates, YYYY-MM-DD: the first release and the latest change. */
  released: string;
  updated: string;
  stack: string[];
  sections: string[];
  features: string[];
  /** Where to put your own content, for the "Make it yours" step. */
  customize: string;
  /** Captured from the template's production build. */
  screenshots: {
    /** The first screen on a desktop. */
    card: ThemedImage;
    /** The whole page on a desktop. */
    desktop: ThemedImage;
    /** The whole page on a phone. */
    mobile: ThemedImage;
  };
  /**
   * The first screen of other pages, for multi-page templates. The listing
   * shows these instead of crops of the full-page capture.
   */
  pageShots?: { name: string; image: ThemedImage }[];
  /**
   * A live copy of the template. Templates built with
   * scripts/build-template-preview.mjs live at /previews/<slug>.
   */
  previewUrl?: string;
  /** The public source repository, once there is one. */
  repoUrl?: string;
  /**
   * Kept out of every listing, menu, and sitemap, and its page returns 404,
   * until the flag is removed.
   */
  hidden?: boolean;
}

const ALL_TEMPLATES: SiteTemplate[] = [
  {
    slug: "heardline",
    name: "Care Quality Dashboard Kit",
    kind: "dashboard",
    summary:
      "Heardline, a care-quality dashboard for therapy practices: it asks every client after every session whether they felt heard, tracks the answers by therapist and week, and makes sure someone follows up when the answer is anything but yes, in a dark design of its own with a full light theme",
    price: 199,
    badge: "unique",
    categories: ["dashboards", "saas"],
    released: "2026-11-13",
    updated: "2026-11-13",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Dashboard",
      "Check-ins",
      "Follow-ups",
      "Therapists",
      "Analytics",
      "Settings",
    ],
    features: [
      "A dashboard with sessions this week, the felt-heard rate over 30 days, open follow-ups, and the share reached within a day, the felt-heard rate week by week against the same weeks last year, the latest check-ins, and this week's follow-ups as cards.",
      "Check-ins with every answer from the last 60 days, filtered by answer, program, and therapist, with search and CSV export, in a table that scrolls inside its panel with its column names pinned. Each check-in opens in a popup with the client's comment, their last sessions, and the follow-up.",
      "Follow-ups as a board of to reach, in touch, and resolved this week, with the median time to reach a client, Reached on the cards still to reach, and Resolve, with a note on what happened, on the ones in touch.",
      "Therapists with each one's felt-heard rate, change, 12-week trend, and open follow-ups, and a popup with their weekly chart and what their clients wrote. Analytics shows felt heard by session number, by mode, and by language, and the answers short of yes week by week.",
      "Settings for the question, the channel (WhatsApp, SMS, or email), when it is sent, and the follow-up rules, with a live preview of the message the client gets. Clients appear by initials and a code, never by name.",
      "Built from Cortexcn components and Pro charts with Lucide icons and Inter, with two years of sample sessions for a made-up practice of eight therapists and Vitest checks on the figures. Dark first with a full light mode, a sidebar that closes with Ctrl+B, search on the / key, and layouts for phones and tablets.",
    ],
    customize:
      "Rename the practice, the person signed in, the question, and the answer choices in the client's message in config/site.ts, change the colors in app/globals.css, swap the sample data in lib/data.ts and set NOW in lib/dates.ts to the real clock, and turn the actions in components/care/care-provider.tsx into API calls.",
    screenshots: {
      card: { light: heardlineCardLight, dark: heardlineCardDark },
      desktop: { light: heardlineDesktopLight, dark: heardlineDesktopDark },
      mobile: { light: heardlineMobileLight, dark: heardlineMobileDark },
    },
    pageShots: [
      {
        name: "Check-ins",
        image: { light: heardlineCheckInsLight, dark: heardlineCheckInsDark },
      },
      {
        name: "Follow-ups",
        image: { light: heardlineFollowUpsLight, dark: heardlineFollowUpsDark },
      },
      {
        name: "Therapists",
        image: {
          light: heardlineTherapistsLight,
          dark: heardlineTherapistsDark,
        },
      },
      {
        name: "Analytics",
        image: { light: heardlineAnalyticsLight, dark: heardlineAnalyticsDark },
      },
      {
        name: "Settings",
        image: { light: heardlineSettingsLight, dark: heardlineSettingsDark },
      },
    ],
    previewUrl: "/previews/heardline",
  },
  {
    slug: "tansy",
    name: "Personal Finance Dashboard Kit",
    kind: "dashboard",
    summary:
      "Tansy, a personal finance and budgeting dashboard: income, spending, and cash flow, budgets, savings goals, accounts, recurring bills, and an assistant that answers from the numbers, in a light design of its own with black page pills and white panels set in pale cards",
    price: 199,
    badge: "unique",
    categories: ["dashboards", "saas"],
    released: "2026-11-13",
    updated: "2026-11-13",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Dashboard",
      "Transactions",
      "Budget",
      "Goals",
      "Analytics",
      "Accounts",
      "Recurring",
      "Categories",
      "Assistant",
      "Settings",
      "Help",
    ],
    features: [
      "A dashboard with income split by source, net saving with the latest deposits into three goals, expenses over the last seven days, the balance across accounts with six months of bars, six months of cash flow as stacked hatched bars, spending by category as a donut, and recent transactions.",
      "Transactions with search and filters by kind, category, account, and period, a table on wide screens and cards grouped by day on phones, and a detail sheet to change the category, add a note, or delete with Undo.",
      "Budgets by category with what is left and the daily amount that keeps the month on budget, and savings goals with dotted progress, the amount each one needs every month, its projected finish, and every deposit.",
      "Analytics with twelve months of income and spending, top payees, category trends, and any two months side by side, plus accounts with net worth and a 90-day trend, bills and income due in the next 30 days, and categories you pin to the dashboard.",
      "An assistant that answers questions about budgets, categories, income, savings, goals, bills, and balances from the numbers on screen. Its rules run in the browser and call no AI service, so you can keep them or point it at your own model.",
      "Built from Cortexcn components and Pro charts with Hugeicons and Inter, with a year of demo data for one made-up person and 97 Vitest checks. Light first with a full dark mode, the currency set in one line, Undo on deletes, and layouts for phones and tablets.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages and set the currency in config/site.ts, change the colors in app/globals.css, and turn the actions in components/workspace/workspace-provider.tsx into API calls.",
    screenshots: {
      card: { light: tansyCardLight, dark: tansyCardDark },
      desktop: { light: tansyDesktopLight, dark: tansyDesktopDark },
      mobile: { light: tansyMobileLight, dark: tansyMobileDark },
    },
    pageShots: [
      {
        name: "Transactions",
        image: { light: tansyTransactionsLight, dark: tansyTransactionsDark },
      },
      {
        name: "Budget",
        image: { light: tansyBudgetLight, dark: tansyBudgetDark },
      },
      {
        name: "Goals",
        image: { light: tansyGoalsLight, dark: tansyGoalsDark },
      },
      {
        name: "Analytics",
        image: { light: tansyAnalyticsLight, dark: tansyAnalyticsDark },
      },
      {
        name: "Accounts",
        image: { light: tansyAccountsLight, dark: tansyAccountsDark },
      },
    ],
    previewUrl: "/previews/tansy",
  },
  {
    slug: "florin",
    name: "Invoicing Dashboard Kit",
    kind: "dashboard",
    summary:
      "Florin, an invoicing and payments dashboard: invoices on one sheet, estimates, recurring invoices, payment links, payouts, and reports, in a dark navy and lime design of its own",
    price: 199,
    badge: "unique",
    categories: ["dashboards", "saas"],
    released: "2026-11-11",
    updated: "2026-11-11",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Invoices",
      "Estimates",
      "Payments",
      "Recurring Invoices",
      "Checkouts",
      "New invoice",
      "Products",
      "Payouts",
      "Reports",
      "Activity",
      "Customers",
      "Customer",
      "Settings",
      "Pay",
    ],
    features: [
      "An Invoices page with what is overdue, what is due within a month, and how many days clients take to pay, then the unpaid invoices on a white sheet with All, Draft, and Unpaid tabs set into its top edge.",
      "Pick an invoice and its lines open beside the list as tiles you can change or add to, with its totals, attachments, due date, and the next step: send it, remind, or record a part payment.",
      "Estimates that convert into invoices, recurring invoices on a weekly to yearly schedule that can charge a saved card, and payment links that take money with no invoice.",
      "Payments by day, payouts sent instantly or on a schedule, and reports of invoiced and collected by month, money owed by age, top clients, and payment methods.",
      "A Pay page that shows your client the invoice and a way to pay it, without the dashboard around it.",
      "Built from Cortexcn components and Pro charts with Hugeicons and Urbanist, with demo data for a 12-client studio and 137 Vitest checks. Dark first with a full light mode, Undo on deletes, and layouts for phones and tablets.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages in config/site.ts, change the colors in app/globals.css, and turn the actions in components/workspace/workspace-provider.tsx into API calls.",
    screenshots: {
      card: { light: florinCardLight, dark: florinCardDark },
      desktop: { light: florinDesktopLight, dark: florinDesktopDark },
      mobile: { light: florinMobileLight, dark: florinMobileDark },
    },
    pageShots: [
      {
        name: "Payments",
        image: { light: florinPaymentsLight, dark: florinPaymentsDark },
      },
      {
        name: "Recurring Invoices",
        image: { light: florinRecurringLight, dark: florinRecurringDark },
      },
      {
        name: "Checkouts",
        image: { light: florinCheckoutsLight, dark: florinCheckoutsDark },
      },
      {
        name: "Reports",
        image: { light: florinReportsLight, dark: florinReportsDark },
      },
      {
        name: "Payouts",
        image: { light: florinPayoutsLight, dark: florinPayoutsDark },
      },
    ],
    previewUrl: "/previews/florin",
  },
  {
    slug: "shipkin",
    name: "Shipkin",
    summary:
      "A 41-page website for an AI agents product and its studio, with services, case studies, a gallery, a blog, careers, and pricing",
    price: 110,
    categories: ["ai", "saas", "agency"],
    released: "2026-11-09",
    updated: "2026-11-09",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Home",
      "About",
      "Services",
      "Service page",
      "Projects",
      "Case study",
      "Gallery",
      "Album",
      "Blog",
      "Blog post",
      "Pricing",
      "Careers",
      "Contact",
      "Legal",
      "404",
    ],
    features: [
      "41 pages from 15 layouts: 6 services, 7 case studies, 6 gallery albums, 4 blog posts, 7 job pages, and 2 legal pages, each generated from a content file.",
      "70 original 3D renders in ten palettes, five agent characters drawn in SVG, and drawn interface frames, so there are no stock photos to license.",
      "Scroll-driven motion: a statement that lights up word by word, a six-week timeline with a moving playhead, a sideways company history, and numbers that count up.",
      "A hover deck of agents, a team carousel, a gallery deck with album tabs, lightbox frames, and filters on services, projects, albums, and roles.",
      "Pricing with a monthly and annual switch, a 24-line comparison table, a plan finder, add-ons, and a billing FAQ.",
      "A contact form that opens the visitor's email app or posts to any form service, with a sitemap, a robots file, and a title and description on every page. Light mode, with reduced motion respected throughout.",
    ],
    customize:
      "Change the brand and links in content/site.ts, the services, projects, posts, albums, roles, and plans in the other content/ files, and the colors in app/globals.css.",
    screenshots: {
      card: { light: shipkinCardLight, dark: shipkinCardDark },
      desktop: { light: shipkinDesktopLight, dark: shipkinDesktopDark },
      mobile: { light: shipkinMobileLight, dark: shipkinMobileDark },
    },
    pageShots: [
      {
        name: "About",
        image: { light: shipkinAboutLight, dark: shipkinAboutDark },
      },
      {
        name: "Services",
        image: { light: shipkinServicesLight, dark: shipkinServicesDark },
      },
      {
        name: "Projects",
        image: { light: shipkinProjectsLight, dark: shipkinProjectsDark },
      },
      {
        name: "Pricing",
        image: { light: shipkinPricingLight, dark: shipkinPricingDark },
      },
      {
        name: "Contact",
        image: { light: shipkinContactLight, dark: shipkinContactDark },
      },
    ],
    previewUrl: "/previews/shipkin",
  },
  {
    slug: "project-dashboard-kit",
    name: "Project Dashboard Kit",
    kind: "dashboard",
    summary:
      "A project management dashboard with deadline forecasts, a kanban board, a timeline, team workload, and reports, built from Cortexcn components and charts",
    price: 129,
    categories: ["dashboards", "saas"],
    released: "2026-11-02",
    updated: "2026-11-02",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Overview",
      "Projects",
      "Board",
      "Timeline",
      "Team",
      "Reports",
      "Settings",
      "Dashboard Kit",
    ],
    features: [
      "Each project's pace forecasts its finish date, so a project shows as at risk weeks before it is late, with one sentence on why.",
      "A board with drag and drop and a keyboard menu on every card, quick filters for overdue, blocked, quiet, and unowned work, and column limits that warn when work piles up.",
      "A timeline with progress, milestones, a hatched tail where the forecast runs past the due date, and the weeks where one team owes two deadlines.",
      "Workload against capacity for each person, a suggested teammate for anyone booked past their week, and a warning when an owner is away on a deadline.",
      "Quick capture adds tasks to the board from any page, team tabs narrow every page, and search opens with Ctrl K.",
      "Built from Cortexcn components and Pro charts with Hugeicons, with demo data for 13 people and 10 projects and 32 Vitest checks. Light and dark mode throughout.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages in config/site.ts, and change the colors in app/globals.css.",
    screenshots: {
      card: { light: kitCardLight, dark: kitCardDark },
      desktop: { light: kitDesktopLight, dark: kitDesktopDark },
      mobile: { light: kitMobileLight, dark: kitMobileDark },
    },
    pageShots: [
      {
        name: "Projects",
        image: { light: kitProjectsLight, dark: kitProjectsDark },
      },
      { name: "Board", image: { light: kitBoardLight, dark: kitBoardDark } },
      {
        name: "Timeline",
        image: { light: kitTimelineLight, dark: kitTimelineDark },
      },
      { name: "Team", image: { light: kitTeamLight, dark: kitTeamDark } },
      {
        name: "Reports",
        image: { light: kitReportsLight, dark: kitReportsDark },
      },
    ],
    previewUrl: "/previews/project-dashboard-kit",
  },
  {
    slug: "trading-dashboard-kit",
    name: "Trading Dashboard Kit",
    kind: "dashboard",
    summary:
      "Bourse, a trading dashboard with live candlesticks, an order book and depth chart, portfolio P&L, a market heatmap, and a screener, on a simulated feed you swap for your own WebSocket in one file",
    price: 149,
    categories: ["dashboards", "saas"],
    released: "2026-11-03",
    updated: "2026-11-03",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Overview",
      "Trade",
      "Markets",
      "Heatmap",
      "Screener",
      "Watchlists",
      "Portfolio",
      "Orders",
      "Alerts",
      "Activity",
      "Settings",
      "Dashboard Kit",
    ],
    features: [
      "A trade screen with candlesticks and volume on five timeframes, a live order book you click to set a price, a depth chart, the trades tape, and an order ticket with a review step.",
      "A simulated real-time feed for 47 fictional instruments, with stocks on a market clock and crypto around the clock. Point lib/feed/source.ts at your WebSocket and edit one parse function to show your own data.",
      "Portfolio P&L against a benchmark, allocation by sector, a live market heatmap, a screener with saved screens and sparklines, watchlists, price alerts, orders, and an activity ledger with CSV export.",
      "A Ctrl K command bar for symbols, pages, and actions, three switchable accounts, and a live ticker strip.",
      "Ready for coding agents: DESIGN.md and four Claude Code skills (add a screen, add a panel, connect a live feed, connect your backend), so an agent extends it in the kit's style.",
      "Built from Cortexcn components and Pro charts with Hugeicons, Geist, and Geist Mono, with 123 Vitest checks. Dark first with a full light mode, and layouts for phones and tablets. Every price in the demo is simulated.",
    ],
    customize:
      "Swap the instruments and demo accounts in lib/data, point lib/feed/source.ts at your feed, rename the product and pages in config/site.ts, change the colors in app/globals.css, and turn the actions in components/account/account-provider.tsx into API calls.",
    screenshots: {
      card: { light: tradingKitCardLight, dark: tradingKitCardDark },
      desktop: { light: tradingKitDesktopLight, dark: tradingKitDesktopDark },
      mobile: { light: tradingKitMobileLight, dark: tradingKitMobileDark },
    },
    pageShots: [
      {
        name: "Trade",
        image: { light: tradingKitTradeLight, dark: tradingKitTradeDark },
      },
      {
        name: "Markets",
        image: { light: tradingKitMarketsLight, dark: tradingKitMarketsDark },
      },
      {
        name: "Heatmap",
        image: { light: tradingKitHeatmapLight, dark: tradingKitHeatmapDark },
      },
      {
        name: "Screener",
        image: { light: tradingKitScreenerLight, dark: tradingKitScreenerDark },
      },
      {
        name: "Portfolio",
        image: {
          light: tradingKitPortfolioLight,
          dark: tradingKitPortfolioDark,
        },
      },
    ],
    previewUrl: "/previews/trading-dashboard-kit",
  },
  {
    slug: "people-dashboard-kit",
    name: "People Dashboard Kit",
    kind: "dashboard",
    summary:
      "Muster, a people dashboard for startup teams: who checked in and when, time off, onboarding, timesheets, and projects, built from Cortexcn components and charts",
    price: 129,
    categories: ["dashboards", "saas"],
    released: "2026-11-03",
    updated: "2026-11-03",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Overview",
      "Attendance",
      "Time Off",
      "People",
      "Onboarding",
      "Projects",
      "Timesheets",
      "Integrations",
      "Settings",
      "Dashboard Kit",
    ],
    features: [
      "Attendance from check-ins: the on-time rate against your workday start, late arrivals, four weeks of who worked where, and a check-in and check-out button.",
      "Time off with an approvals queue, a month calendar of who is out, balances per person, and a request form that counts workdays and skips weekends and holidays.",
      "Onboarding checklists for new hires, grouped by before day one, first week, and first month, with owners, due dates, and overdue flags.",
      "Timesheets with a stopwatch, a weekly grid by project, hours against each project's budget, and CSV export.",
      "Every create, edit, and delete goes through one provider, with Undo on deletes, so you turn its actions into API calls and nothing else moves.",
      "Built from Cortexcn components and Pro charts with Hugeicons and Inter, with demo data for a 16-person startup and 108 Vitest checks. Light and dark mode, and layouts for phones and tablets.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages in config/site.ts, change the colors in app/globals.css, and turn the actions in components/workspace/workspace-provider.tsx into API calls.",
    screenshots: {
      card: { light: peopleKitCardLight, dark: peopleKitCardDark },
      desktop: { light: peopleKitDesktopLight, dark: peopleKitDesktopDark },
      mobile: { light: peopleKitMobileLight, dark: peopleKitMobileDark },
    },
    pageShots: [
      {
        name: "Attendance",
        image: {
          light: peopleKitAttendanceLight,
          dark: peopleKitAttendanceDark,
        },
      },
      {
        name: "Time Off",
        image: { light: peopleKitTimeOffLight, dark: peopleKitTimeOffDark },
      },
      {
        name: "People",
        image: { light: peopleKitPeopleLight, dark: peopleKitPeopleDark },
      },
      {
        name: "Timesheets",
        image: {
          light: peopleKitTimesheetsLight,
          dark: peopleKitTimesheetsDark,
        },
      },
      {
        name: "Projects",
        image: { light: peopleKitProjectsLight, dark: peopleKitProjectsDark },
      },
    ],
    previewUrl: "/previews/people-dashboard-kit",
  },
  {
    slug: "ringwise",
    name: "Voice AI Agent Dashboard Kit",
    kind: "dashboard",
    summary:
      "Ringwise, a dashboard for voice AI agent products: agents that call and answer, live calls, call history with transcripts, campaigns, leads, and the outcome of every call, built from Cortexcn components and charts",
    price: 129,
    categories: ["dashboards", "saas", "ai"],
    released: "2026-11-07",
    updated: "2026-11-07",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Dashboard",
      "Analytics",
      "Voice Agents",
      "Agent",
      "Knowledge Base",
      "Live Calls",
      "Call History",
      "Campaigns",
      "Leads",
      "Workflows",
      "Integrations",
      "Team",
      "Settings",
    ],
    features: [
      "A dashboard with calls handled, answer rate, leads qualified, appointments booked, and spend against the period before, twelve months of calls by outcome, and each agent's results, calls by channel and by day, the campaign funnel, and calls by language.",
      "Live calls with a running timer, the transcript so far, and a button to take the call over, and a call history where each call opens with its recording player, summary, the details the agent noted, and the transcript.",
      "Voice agents with their greeting, voice, languages, handoff to a person, and knowledge sources, and campaigns with progress, a funnel from dialed to booked, calling hours, and pause and resume.",
      "Leads as a table or a board by stage, follow-up workflows that mix calls, WhatsApp, and waits, integrations and phone numbers, team roles, and settings with billing and usage.",
      "Every create, edit, and delete goes through one provider, with Undo on deletes, so you turn its actions into API calls and nothing else moves.",
      "Built from Cortexcn components and Pro charts with Hugeicons and Inter, with demo data for a made-up home builder and 34 Vitest checks. Light and dark mode, and layouts for phones and tablets.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages in config/site.ts, change the colors in app/globals.css, and turn the actions in components/workspace/workspace-provider.tsx into API calls.",
    screenshots: {
      card: { light: ringwiseCardLight, dark: ringwiseCardDark },
      desktop: { light: ringwiseDesktopLight, dark: ringwiseDesktopDark },
      mobile: { light: ringwiseMobileLight, dark: ringwiseMobileDark },
    },
    pageShots: [
      {
        name: "Analytics",
        image: { light: ringwiseAnalyticsLight, dark: ringwiseAnalyticsDark },
      },
      {
        name: "Voice Agents",
        image: { light: ringwiseAgentsLight, dark: ringwiseAgentsDark },
      },
      {
        name: "Live Calls",
        image: { light: ringwiseLiveLight, dark: ringwiseLiveDark },
      },
      {
        name: "Call History",
        image: { light: ringwiseCallsLight, dark: ringwiseCallsDark },
      },
      {
        name: "Campaigns",
        image: { light: ringwiseCampaignsLight, dark: ringwiseCampaignsDark },
      },
    ],
    previewUrl: "/previews/ringwise",
  },
  {
    slug: "quire",
    name: "Docs Dashboard Kit",
    kind: "dashboard",
    summary:
      "Quire, a docs workspace for product teams: collections, review dates, doc tasks, releases, and what people read, built from Cortexcn components and charts",
    price: 129,
    categories: ["dashboards", "saas"],
    released: "2026-11-06",
    updated: "2026-11-06",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "TypeScript",
    ],
    sections: [
      "Home",
      "Docs",
      "Doc",
      "Collection",
      "Project",
      "Tasks",
      "Calendar",
      "Team",
      "Automations",
      "Reporting",
      "Releases",
      "Settings",
    ],
    features: [
      "A Docs page with six collections, each with a Connect button for the tool it syncs from, shortcut folders, twelve weeks of views against the quarter before, and the open collection's files in a side panel.",
      "Docs that need a check: review dates, published docs untouched past the workspace's stale limit, and a review queue on Home with a button to ask for a review.",
      "Doc work on a board or a list, a month calendar of releases and reviews that moves from the keyboard, and automations that archive, remind, and draft.",
      "Reporting on what people read: views and edits by week, the most read docs, docs by status and by collection, and searches that found nothing.",
      "Every create, edit, and delete goes through one provider, with Undo on deletes, so you turn its actions into API calls and nothing else moves.",
      "Built from Cortexcn components and Pro charts with Hugeicons and Manrope, with demo data for a 12-person company and 101 Vitest checks. Light and dark mode, a sidebar that folds into an icon rail, and layouts for phones and tablets.",
    ],
    customize:
      "Swap the demo data in lib/data, set today's date in lib/dates.ts, rename the product and pages in config/site.ts, change the colors in app/globals.css, and turn the actions in components/workspace/workspace-provider.tsx into API calls.",
    screenshots: {
      card: { light: quireCardLight, dark: quireCardDark },
      desktop: { light: quireDesktopLight, dark: quireDesktopDark },
      mobile: { light: quireMobileLight, dark: quireMobileDark },
    },
    pageShots: [
      {
        name: "Home",
        image: { light: quireHomeLight, dark: quireHomeDark },
      },
      {
        name: "Tasks",
        image: { light: quireTasksLight, dark: quireTasksDark },
      },
      {
        name: "Calendar",
        image: { light: quireCalendarLight, dark: quireCalendarDark },
      },
      {
        name: "Reporting",
        image: { light: quireReportingLight, dark: quireReportingDark },
      },
      {
        name: "Team",
        image: { light: quireTeamLight, dark: quireTeamDark },
      },
    ],
    previewUrl: "/previews/quire",
  },
  {
    slug: "mirador",
    name: "Mirador",
    kind: "dashboard",
    summary:
      "An AWS monitoring dashboard for teams with more than one account: EC2, ECS, S3, RDS, Lambda, alarms, logs, and costs in one view, with Corvo, an agent that answers from your own data",
    price: 499,
    categories: ["dashboards", "saas", "ai"],
    released: "2026-11-04",
    updated: "2026-11-04",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Cortexcn",
      "AWS SDK v3",
      "AI SDK",
      "TypeScript",
    ],
    sections: [
      "Overview",
      "Compute",
      "Containers",
      "Storage",
      "Databases",
      "Functions",
      "Logs",
      "Reports",
      "Corvo",
      "Alarms",
      "Events",
      "Costs",
      "Alerts",
      "Accounts",
      "Team",
      "Billing",
      "Integrations",
      "Help center",
      "Settings",
    ],
    features: [
      "Every AWS account on one screen: switch between all accounts, one account, or two side by side, such as Production and Production EU, with every panel lined up.",
      "Pages for EC2, ECS and Fargate, S3, RDS and Aurora, Lambda, CloudWatch alarms and logs, AWS events, and costs, with detail sheets that link to the right place in the AWS console.",
      "Corvo, an agent that answers questions about the accounts in view through read-only tools. It uses Claude once you add an Anthropic key, and built-in answers on the demo data without one.",
      "Read-only by design: a live AWS data source on the AWS SDK v3 that assumes a role in each account, with the CloudFormation template for that role and a three-step connect flow. It is tested against simulated AWS responses.",
      "Costs with a month-end forecast, spend by service, account, and team tag, and spikes explained in plain words, plus screens for budgets, alert rules, team roles, and settings, ready for your own backend.",
      "The Cortexcn Ledger look in black and white, with Geist and Hugeicons, light and dark mode, and layouts for phones and tablets. Demo data for a made-up company with three accounts, and 124 Vitest checks.",
    ],
    customize:
      "Connect your accounts with MIRADOR_DATA=live and MIRADOR_ACCOUNTS (see lib/data/aws/README.md), add an Anthropic key for Corvo, rename the product in config/site.ts, and change the colors in app/globals.css.",
    screenshots: {
      card: { light: miradorCardLight, dark: miradorCardDark },
      desktop: { light: miradorDesktopLight, dark: miradorDesktopDark },
      mobile: { light: miradorMobileLight, dark: miradorMobileDark },
    },
    pageShots: [
      {
        name: "Compute",
        image: { light: miradorComputeLight, dark: miradorComputeDark },
      },
      {
        name: "Costs",
        image: { light: miradorCostsLight, dark: miradorCostsDark },
      },
      {
        name: "Alarms",
        image: { light: miradorAlarmsLight, dark: miradorAlarmsDark },
      },
      {
        name: "Logs",
        image: { light: miradorLogsLight, dark: miradorLogsDark },
      },
      {
        name: "Corvo",
        image: { light: miradorCorvoLight, dark: miradorCorvoDark },
      },
    ],
    previewUrl: "https://mirador-demo.vercel.app",
    hidden: true,
  },
  {
    slug: "ai-infra",
    name: "AI Infra",
    summary:
      "Sirvich, a two-page launch site for an AI inference platform, with product mockups on a pastel landscape, a ruled frame with hatched dividers, and serif titles",
    price: 99,
    categories: ["saas", "ai"],
    released: "2026-11-04",
    updated: "2026-11-04",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Hero",
      "Audience strip",
      "Problem",
      "Scaling",
      "Control plane",
      "How it works",
      "Features",
      "Cost per request",
      "Integrations",
      "Principles",
      "Pricing",
      "Footer",
      "Contact page",
      "FAQ",
    ],
    features: [
      "Every word, link, number, and plan on both pages comes from one file, config/site.ts.",
      "Product mockups built in HTML and CSS on crops of one landscape image: an alert card, a deployment window with a scaling plan, an orbit of the control plane, autoscaling bars, a canary rollout, GPU capacity by region, and a team budget.",
      "A framed column with hairline rules and hatched bands between sections, Newsreader titles whose words come into focus one by one, and a dark features band whose numbered list follows your scroll.",
      "An integrations panel with filters and working switches, four plans with ruled feature lists, and a contact page with a checked form, addresses, and an FAQ.",
      "Light and dark mode, a mobile menu, layouts for phones and tablets, and reduced motion respected everywhere.",
      "Builds as a Next.js app or a static site for any host, with a share image, sitemap, and robots file.",
    ],
    customize:
      "Replace the product name, copy, plans, and addresses in config/site.ts, swap assets/landscape.jpg for your own image, change the mark in components/logo.tsx, and set the colors in app/globals.css.",
    screenshots: {
      card: { light: infraCardLight, dark: infraCardDark },
      desktop: { light: infraDesktopLight, dark: infraDesktopDark },
      mobile: { light: infraMobileLight, dark: infraMobileDark },
    },
    pageShots: [
      {
        name: "Contact",
        image: { light: infraContactLight, dark: infraContactDark },
      },
    ],
    previewUrl: "/previews/ai-infra",
  },
  {
    slug: "data-checks",
    name: "Data Checks",
    summary:
      "A launch site for a data pipeline checks product, with dark data health dashboards on halftone art, a ruled grid frame, and square mono buttons",
    price: 180,
    categories: ["saas"],
    released: "2026-10-10",
    updated: "2026-11-01",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Hero",
      "Logo grid",
      "Feature cards",
      "Features",
      "Benefits",
      "Comparison",
      "How it works",
      "Customer impact",
      "Testimonials",
      "Pricing",
      "FAQ",
      "Call to action",
      "Footer",
    ],
    features: [
      "Every word, link, plan, and quote comes from one file, config/site.ts.",
      "Dark data health dashboards set on halftone landscapes drawn in SVG, so there are no images to license.",
      "Feature cards that stack as you scroll, and feature tabs that advance on their own and pause on hover or focus.",
      "A comparison table, twelve testimonials in staggered columns, and pricing with a monthly and yearly toggle.",
      "Light and dark mode, a mobile menu, a layout tuned for phones and tablets, and reduced motion respected everywhere.",
      "Builds as a Next.js app or a static site for any host, with a share image, sitemap, and robots file.",
    ],
    customize:
      "Replace the placeholder product name, copy, plans, and quotes in config/site.ts, swap the mark in components/logo.tsx, and change the colors in app/globals.css.",
    screenshots: {
      card: { light: checksCardLight, dark: checksCardDark },
      desktop: { light: checksDesktopLight, dark: checksDesktopDark },
      mobile: { light: checksMobileLight, dark: checksMobileDark },
    },
    previewUrl: "/previews/data-checks",
  },
  {
    slug: "team-workspace",
    name: "Team Workspace",
    summary:
      "A sample launch site for a shared team workspace, with project mockups, watercolor panels painted in code, and a calm off-white and charcoal palette. All content is placeholder",
    price: 99,
    categories: ["saas"],
    released: "2026-10-10",
    updated: "2026-11-01",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Hero",
      "Logo strip",
      "Stats",
      "Platform",
      "How it works",
      "Integrations",
      "Who it's for",
      "Testimonials",
      "Customer stories",
      "Pricing",
      "Security",
      "FAQ",
      "Call to action",
      "Footer",
    ],
    features: [
      "Every word, link, plan, and quote comes from one file, config/site.ts.",
      "A notes card where each numbered action item lights up its line in the meeting notes, above a hero project dashboard.",
      "Watercolor landscapes painted in SVG from seeded scenes, and product mockups built in HTML and CSS: a team board, an automation rule, and a search of past plans.",
      "A floating pill header, a sticky how-it-works list, tabs for operations, product, and small teams, customer stories that stack as you scroll, and pricing with a monthly and annual toggle.",
      "Light and dark mode, a mobile menu, corners set by one radius token, and reduced motion respected everywhere.",
      "Builds as a Next.js app or a static site for any host, with a share image, sitemap, and robots file.",
    ],
    customize:
      "Replace the placeholder product name, copy, plans, and quotes in config/site.ts, swap the mark in components/logo.tsx, and change the colors and radius in app/globals.css.",
    screenshots: {
      card: { light: workspaceCardLight, dark: workspaceCardDark },
      desktop: { light: workspaceDesktopLight, dark: workspaceDesktopDark },
      mobile: { light: workspaceMobileLight, dark: workspaceMobileDark },
    },
    previewUrl: "/previews/team-workspace",
  },
  {
    slug: "simplistic-saas",
    name: "Simplistic SaaS",
    summary:
      "A SaaS landing page for AI and agentic startups, with bento grids, isometric illustrations, and microinteractions",
    price: 130,
    categories: ["saas", "ai"],
    released: "2026-10-02",
    updated: "2026-10-02",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Announcement bar",
      "Hero",
      "Logo wall",
      "Problem",
      "How it works",
      "Features bento",
      "Testimonials",
      "Pricing",
      "FAQ",
      "Call to action",
      "Footer",
    ],
    features: [
      "Every word, link, plan, and quote comes from one file, config/site.ts.",
      "Isometric SVG illustrations that move on their own and react to hover: a work pipeline, a stacking how-it-works, six bento cards, and a tile floor.",
      "A how-it-works section that pins while you scroll through the steps, and two testimonial marquees.",
      "Microinteractions throughout: rolling button text, corner brackets that grow into frames, decoding section labels, and prices that roll when billing changes.",
      "Light and dark mode, a mobile menu, keyboard support, and reduced motion respected everywhere.",
      "Builds as a Next.js app or a static site for any host, with a share image, sitemap, and robots file.",
    ],
    customize:
      "Replace the placeholder product name, copy, plans, and quotes in config/site.ts, swap the brand mark in components/logo.tsx, and change the accent color in app/globals.css.",
    screenshots: {
      card: { light: saasCardLight, dark: saasCardDark },
      desktop: { light: saasDesktopLight, dark: saasDesktopDark },
      mobile: { light: saasMobileLight, dark: saasMobileDark },
    },
    previewUrl: "/previews/simplistic-saas",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    summary: "A one-page portfolio for developers and designers",
    price: 0,
    categories: ["portfolio"],
    released: "2026-09-27",
    updated: "2026-09-27",
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "TypeScript"],
    sections: [
      "Hero",
      "About",
      "Services",
      "Projects",
      "Testimonials",
      "Writing",
      "Contact",
    ],
    features: [
      "Every name, link, project, and quote comes from one file, config/site.ts.",
      "Hero stickers visitors can drag around, and a statement that lights up as you scroll.",
      "A contact form that posts to any form service, or opens the visitor's email app.",
      "Light and dark mode, a mobile menu, and support for reduced motion.",
      "Share image, sitemap, and robots file generated from your details.",
      "Set up for the shadcn CLI, so any Cortexcn component installs in one command.",
    ],
    customize:
      "Put your name, links, projects, and quotes in config/site.ts, then swap the covers in public/projects and public/posts.",
    screenshots: {
      card: { light: portfolioCardLight, dark: portfolioCardDark },
      desktop: { light: portfolioDesktopLight, dark: portfolioDesktopDark },
      mobile: { light: portfolioMobileLight, dark: portfolioMobileDark },
    },
    previewUrl: "/previews/portfolio",
  },
];

export const SITE_TEMPLATES: SiteTemplate[] = ALL_TEMPLATES.filter(
  (template) => !template.hidden,
);

export function getSiteTemplate(slug: string) {
  return SITE_TEMPLATES.find((template) => template.slug === slug);
}

export function isDashboardKit(template: SiteTemplate) {
  return template.kind === "dashboard";
}

/** "8 pages" for a dashboard kit, "13 sections" for a landing page. */
export function templatePartsLabel(template: SiteTemplate, count?: number) {
  const total = count ?? template.sections.length;
  const unit = isDashboardKit(template) ? "page" : "section";
  return `${total} ${unit}${total === 1 ? "" : "s"}`;
}

export function isFreeTemplate(template: SiteTemplate) {
  return template.price === 0;
}

/**
 * A paid website template, which comes with every Cortexcn Pro license and is
 * not sold on its own. Dashboard kits are sold one by one, or all together.
 */
export function isProTemplate(template: SiteTemplate) {
  return !(isFreeTemplate(template) || isDashboardKit(template));
}

/** "Free", "With Pro", or a kit's price such as "$129". */
export function templatePriceLabel(template: SiteTemplate) {
  if (isFreeTemplate(template)) {
    return "Free";
  }
  return isProTemplate(template) ? "With Pro" : formatUsd(template.price);
}

export function templateLicenseLabel(template: SiteTemplate) {
  if (isFreeTemplate(template)) {
    return "MIT licensed";
  }
  return isProTemplate(template)
    ? "Cortexcn Pro license"
    : "Cortexcn template license";
}

/** Folder name inside the zip, and the zip's file name. */
export function templateArchiveName(template: SiteTemplate) {
  return `cortexcn-${template.slug}`;
}

export function templateDownloadPath(template: SiteTemplate) {
  return `/templates/${template.slug}/download`;
}

/** Where Buy goes: a kit's own checkout, or the Pro licenses for a Pro template. */
export function templateBuyHref(template: SiteTemplate) {
  return isProTemplate(template)
    ? "/pro/pricing"
    : kitCheckoutUrl(template.slug);
}

/** "Buy for $129", or "Get it with Pro" for a Pro template. */
export function templateBuyLabel(template: SiteTemplate) {
  return isProTemplate(template)
    ? "Get it with Pro"
    : `Buy for ${templatePriceLabel(template)}`;
}

const RELEASE_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "Oct 10, 2026" */
export function formatTemplateDate(iso: string) {
  return RELEASE_DATE.format(new Date(`${iso}T00:00:00Z`));
}

/** The /templates filters a template matches: its categories, plus "free". */
export function templateFilters(template: SiteTemplate): string[] {
  return isFreeTemplate(template)
    ? [...template.categories, "free"]
    : template.categories;
}
