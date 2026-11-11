import { componentDocsUrl } from "@/lib/component-families";

/**
 * Every Cortexcn release, newest first. The /changelog page on the component
 * library site lists them all. Dates come from the repository history.
 */

export interface ChangelogLink {
  label: string;
  href: string;
}

export type ChangelogKind = "components" | "blocks" | "site";

export interface ChangelogRelease {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  kind: ChangelogKind;
  title: string;
  summary: string;
  /** What shipped, each linking to its page. */
  items: ChangelogLink[];
}

/** Links each slug to its docs page, in whichever family it belongs to. */
function componentLinks(names: [string, string][]): ChangelogLink[] {
  return names.map(([label, slug]) => ({
    label,
    href: componentDocsUrl(slug),
  }));
}

/** The AI Assistant pieces, which now live under Blocks. */
const AI_ASSISTANT_BLOCK_LINKS: ChangelogLink[] = [
  { label: "Reasoning", href: "/blocks/ai-assistant/ai-reasoning-01" },
  {
    label: "Chain of Thought",
    href: "/blocks/ai-assistant/ai-chain-of-thought-01",
  },
  { label: "Shimmer", href: "/blocks/ai-assistant/ai-shimmer-01" },
];

const ASCII_REVEAL_URL = componentDocsUrl("ascii-reveal");

export const CHANGELOG: ChangelogRelease[] = [
  {
    date: "2026-11-11",
    kind: "site",
    title:
      "Hobby and Business licenses, dashboard kit checkout, and custom work",
    summary:
      "Cortexcn Pro now comes as Hobby for one developer or Business for a team of up to 10, both paid once, and every website template comes with it to download from your purchases page. Dashboard kits have their own checkout: buy one, or every kit now and later from one price, on the new kit pricing page. A custom work page has forms for components, dashboards, and websites that show an estimated price range as you fill them in.",
    items: [
      { label: "Pro pricing", href: "/pro/pricing" },
      { label: "Dashboard kit pricing", href: "/dashboard-kits/pricing" },
      { label: "Custom work", href: "/custom" },
    ],
  },
  {
    date: "2026-11-11",
    kind: "site",
    title: "Checkout and a purchases page for Cortexcn Pro",
    summary:
      "The Buy buttons on the Pro pricing page now go to checkout: you sign in, check the order, and pay through Dodo Payments. Your purchases page then shows your license and the source of every Pro chart, component, and block, with a copy button on each file. With a Team license you add teammates there by email, and every Pro docs and block page links license holders straight to its code.",
    items: [
      { label: "Pro pricing", href: "/pro/pricing" },
      { label: "Your purchases", href: "/account/purchases" },
    ],
  },
  {
    date: "2026-11-11",
    kind: "blocks",
    title: "Tool Router and six more AI Assistant blocks, with an AI page",
    summary:
      "Seven Pro blocks join AI Assistant, all built on one engine that joins tiles with curved lines and sends pulses along them: Tool Router shows an agent calling tools, Workflow Pipeline runs steps in turn, Event Stream logs each event as it lands, Sync Status counts the time since each tool last synced, and Integration Beam, Section, and Orbit show a product among the tools it connects. A new AI page lists every AI Assistant block running live. With reduced motion the states still change without anything moving.",
    items: [
      { label: "AI page", href: "/ai" },
      { label: "Tool Router", href: "/blocks/ai-assistant/ai-tool-router-01" },
      {
        label: "Integration Beam",
        href: "/blocks/ai-assistant/ai-integration-beam-01",
      },
      {
        label: "Integration Section",
        href: "/blocks/ai-assistant/ai-integration-section-01",
      },
      {
        label: "Integration Orbit",
        href: "/blocks/ai-assistant/ai-integration-orbit-01",
      },
      {
        label: "Workflow Pipeline",
        href: "/blocks/ai-assistant/ai-integration-pipeline-01",
      },
      {
        label: "Event Stream",
        href: "/blocks/ai-assistant/ai-integration-events-01",
      },
      {
        label: "Sync Status",
        href: "/blocks/ai-assistant/ai-integration-sync-status-01",
      },
    ],
  },
  {
    date: "2026-11-11",
    kind: "blocks",
    title: "Tapestry and Tideline join the Hero blocks",
    summary:
      "Two Pro heroes built around a painted picture. Tapestry redraws a wide landscape as fine needlepoint glyphs on a canvas, resolving from coarse to sharp as it scrolls into view, with a serif headline, two buttons, and a ruled strip of tool names. Tideline is a newsletter hero on a full-bleed watercolor scene with a serif headline, an italic second line, and a frosted email field that turns into a thank-you line after sign-up. Visitors who prefer less motion get both without movement.",
    items: [
      { label: "Tapestry", href: "/blocks/hero/hero-tapestry-01" },
      { label: "Tideline", href: "/blocks/hero/hero-tideline-01" },
    ],
  },
  {
    date: "2026-11-11",
    kind: "site",
    title: "Invoicing Dashboard Kit, Florin",
    summary:
      "A paid fourteen-page invoicing and payments dashboard with a dark navy and lime design of its own, the first template with the purple Unique badge: invoices on a white sheet with their lines beside them, estimates, recurring invoices, payment links, payouts, reports, and the page a client pays from. It works in light and dark mode, on phones and tablets, and ships with a live preview.",
    items: [{ label: "Invoicing Dashboard Kit", href: "/templates/florin" }],
  },
  {
    date: "2026-11-09",
    kind: "site",
    title: "AI Agents Website, Shipkin",
    summary:
      "A paid 41-page website for an AI agents product and the studio behind it: home, about, services, case studies, a gallery, a blog, careers, pricing with a plan comparison, contact, legal pages, and a custom 404. Every service, project, album, post, and role is a page generated from a content file, and every picture is an original 3D render or drawing made for it. It ships with a live preview.",
    items: [{ label: "Shipkin", href: "/templates/shipkin" }],
  },
  {
    date: "2026-11-08",
    kind: "blocks",
    title: "Tilted Wall joins the Hero blocks",
    summary:
      "Hero: Tilted Wall is a Pro hero with a badge, a headline, a short description, and two buttons in front of a tilted wall of paintings whose columns scroll endlessly in opposite directions. It is built on Perspective Marquee, so pointing at a column pauses it, and on small screens the wall sits below the copy. Visitors who prefer less motion see the wall still.",
    items: [{ label: "Tilted Wall", href: "/blocks/hero/hero-tilted-wall-01" }],
  },
  {
    date: "2026-11-08",
    kind: "blocks",
    title: "Blog blocks, starting with Masonry Grid",
    summary:
      "A new Blog category opens with Masonry Grid, a Pro grid of posts in staggered columns with cover pictures of mixed shapes. Pointing at a post, or tabbing to it, dims the others and slides its summary up over the picture, and screen readers get the summary with each post.",
    items: [
      { label: "Blog", href: "/blocks?category=blog" },
      { label: "Masonry Grid", href: "/blocks/blog/blog-masonry-01" },
    ],
  },
  {
    date: "2026-11-08",
    kind: "blocks",
    title: "Liquid Seams and Print Pile join the Galleries blocks",
    summary:
      "Liquid Seams is a free column of paintings whose joins run together like wet paint while the page scrolls fast, then part into crisp pictures with a clear gap as it slows. Print Pile, a Pro block, lays a loose, tilted pile of portrait prints out into a captioned grid with one button and gathers it back. Both stay still for visitors who prefer less motion.",
    items: [
      {
        label: "Liquid Seams",
        href: "/blocks/galleries/gallery-liquid-seams-01",
      },
      {
        label: "Print Pile",
        href: "/blocks/galleries/gallery-print-pile-01",
      },
    ],
  },
  {
    date: "2026-11-08",
    kind: "blocks",
    title: "Galleries blocks, starting with Fluted Glass Slideshow",
    summary:
      "A new Galleries category opens with Fluted Glass Slideshow, a free wide slideshow. Each new slide arrives through ribbed glass that splits it into bent vertical strips, and the strips line up into a clear picture as it lands. It plays on its own and holds while you point at it, with a pause button, arrow keys, previous and next buttons, and a bar per slide; visitors who prefer less motion get a fade.",
    items: [
      { label: "Galleries", href: "/blocks?category=galleries" },
      {
        label: "Fluted Glass Slideshow",
        href: "/blocks/galleries/gallery-fluted-glass-01",
      },
    ],
  },
  {
    date: "2026-11-07",
    kind: "site",
    title: "What's new, a daily feed of everything that ships",
    summary:
      "A new page lists every component, block, and template on the day it shipped, newest first, with a count for each day, a live preview or screenshot on each card, and an Updated tag when a later release changes it. The header now starts with a New link that shows the week's count and cycles through the latest names.",
    items: [{ label: "What's new", href: "/new" }],
  },
  {
    date: "2026-11-07",
    kind: "site",
    title: "Voice AI Agent Dashboard Kit, Ringwise",
    summary:
      "A paid thirteen-page dashboard kit for voice AI agent products: KPIs and call outcomes, live calls with transcripts and take-over, call history, agents, knowledge sources, campaigns, leads on a table or board, workflows, integrations, team, and settings with billing. It works in light and dark mode, on phones and tablets, and ships with a live preview.",
    items: [
      { label: "Voice AI Agent Dashboard Kit", href: "/templates/ringwise" },
    ],
  },
  {
    date: "2026-11-06",
    kind: "site",
    title: "Docs Dashboard Kit, Quire",
    summary:
      "A paid twelve-page dashboard kit for a product team's docs: collections with shortcut folders and a file panel, review dates and stale docs, doc tasks on a board, a release calendar, automations, and reporting on what people read and could not find. It works in light and dark mode, on phones and tablets, and ships with a live preview.",
    items: [{ label: "Docs Dashboard Kit", href: "/templates/quire" }],
  },
  {
    date: "2026-11-04",
    kind: "site",
    title: "Cortexcn joins the shadcn registry directory",
    summary:
      "Cortexcn is listed in the shadcn registry directory, so npx shadcn@latest add @cortexcn/<name> works in any shadcn project with no registry setup. The installation docs, the home page, and the agent files now show free items you can install today.",
    items: [
      { label: "Installation", href: "/docs/installation" },
      {
        label: "shadcn registry directory",
        href: "https://ui.shadcn.com/docs/directory",
      },
    ],
  },
  {
    date: "2026-11-04",
    kind: "site",
    title: "AI Infra template, Sirvich",
    summary:
      "A paid two-page Next.js launch site for an AI inference platform: a home page with scaling, control plane, rollout, GPU fleet, and budget mockups on a landscape image, an integrations panel with working switches, and four pricing plans, plus a contact page with a checked form and an FAQ. It works in light and dark mode, on phones and tablets, and ships with a live preview.",
    items: [{ label: "AI Infra", href: "/templates/ai-infra" }],
  },
  {
    date: "2026-11-03",
    kind: "site",
    title: "Trading Dashboard Kit, Bourse",
    summary:
      "A paid Next.js trading dashboard with 12 pages: candlesticks with volume, a live order book and depth chart, an order ticket, portfolio P&L, a market heatmap, a screener, watchlists, alerts, orders, and an activity ledger. It runs on a simulated feed for 47 fictional instruments that you swap for your own WebSocket in one file, and ships with a Ctrl K command bar, DESIGN.md and Claude Code skills for coding agents, 123 Vitest checks, and a live preview.",
    items: [
      {
        label: "Trading Dashboard Kit",
        href: "/templates/trading-dashboard-kit",
      },
      { label: "Dashboard Kits", href: "/dashboard-kits" },
    ],
  },
  {
    date: "2026-11-03",
    kind: "site",
    title: "People Dashboard Kit, the full Muster product",
    summary:
      "The Muster block grows into a paid Next.js dashboard for startup people teams with ten pages: an overview, attendance, time off with approvals and a calendar, people, onboarding checklists, projects, timesheets, integrations, settings, and the kit catalog. Every create, edit, and delete runs through one provider you point at your API, and it ships with demo data, 108 Vitest checks, and a live preview.",
    items: [
      {
        label: "People Dashboard Kit",
        href: "/templates/people-dashboard-kit",
      },
      { label: "Muster block", href: "/blocks/dashboards/dashboard-muster-01" },
      { label: "Dashboard Kits", href: "/dashboard-kits" },
    ],
  },
  {
    date: "2026-11-03",
    kind: "blocks",
    title: "Muster, a people dashboard for startup teams",
    summary:
      "Muster is a Pro dashboard that shows a startup team's day: who checked in and when, who is away or out, new hires' onboarding checklists, a stopwatch for project time, the employee spotlight, notes, and the current project. Notes, tracked time, comments, and time off requests can be created, edited, and deleted, and an optional `api` prop sends each change to your own backend; Cortexcn Studio can also wire it up for you. It uses Hugeicons and Inter, works in light and dark mode, and moves from one column on phones to two on tablets and three with a sidebar on desktops.",
    items: [
      { label: "Muster", href: "/blocks/dashboards/dashboard-muster-01" },
      { label: "Dashboards", href: "/blocks?category=dashboards" },
    ],
  },
  {
    date: "2026-11-03",
    kind: "site",
    title: "The docs website, components, and blocks are open source",
    summary:
      "The public Cortexcn/ui repository on GitHub now holds the docs website and every free component and block, under the MIT license, and updates with each release. Clone it and run `bun dev` to work on the site locally. Free component pages and blocks link to their source, and the component overviews tag each card Free or Pro.",
    items: [
      {
        label: "Cortexcn/ui on GitHub",
        href: "https://github.com/Cortexcn/ui",
      },
      { label: "Components", href: "/docs/cortex" },
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Bento Grids, starting with Insights",
    summary:
      "A new Bento Grids category opens with Insights, a Pro grid of metric tiles on glassy cards. Net revenue streams in on the Live Line Chart with a pulsing tip, active users show as a bar trend, recurring revenue fills a weekly gauge, and the product table exports to CSV. It uses three columns on wide screens, two on tablets, and one on phones.",
    items: [
      { label: "Bento Grids", href: "/blocks?category=bento-grids" },
      { label: "Insights", href: "/blocks/bento-grids/bento-grid-insights-01" },
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Patron joins the dashboards, and every dashboard fits a phone",
    summary:
      "Patron is a Pro dashboard that helps a fundraising team turn its data into decisions: how the current appeal is tracking, last month's donations, prospects ready for a major gift, a day of donor meetings on a timeline, campaigns that are behind, the top gift channels, daily gift activity, and the year-end forecast. Patron, Ledger, Harbor, and Treasury now follow their own width instead of the window's, so they stack cleanly on a phone, use two columns on a tablet, and fit next to your app's sidebar.",
    items: [
      { label: "Patron", href: "/blocks/dashboards/dashboard-patron-01" },
      { label: "Ledger", href: "/blocks/dashboards/dashboard-ledger-01" },
      { label: "Harbor", href: "/blocks/dashboards/dashboard-harbor-01" },
      { label: "Treasury", href: "/blocks/dashboards/dashboard-treasury-01" },
    ],
  },
  {
    date: "2026-11-02",
    kind: "site",
    title: "Project Dashboard Kit, the first dashboard kit",
    summary:
      "A paid Next.js dashboard for project management with seven pages: an overview, projects with finish date forecasts, a kanban board, a timeline with deadline collisions, team workload, reports, and settings. It is built from Cortexcn components and Pro charts with Hugeicons, and ships with demo data, Vitest checks, and a live preview. Dashboard kits have their own page, and the Dashboards filter on the templates page now lists them.",
    items: [
      {
        label: "Project Dashboard Kit",
        href: "/templates/project-dashboard-kit",
      },
      { label: "Dashboard Kits", href: "/dashboard-kits" },
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Chart Groups: 15 Pro bentos, starting with Business Analytics",
    summary:
      "A new Chart Groups category holds 15 Pro blocks. Each one has a header with working navigation, a row of key numbers, and three or four charts for one subject, from business analytics and SaaS metrics to energy and fitness. Together they use most of the Cortexcn Pro charts, including the candlestick, funnel, heatmap, radar, sankey, and live line charts.",
    items: [
      { label: "Chart Groups", href: "/blocks?category=chart-groups" },
      {
        label: "Business Analytics",
        href: "/blocks/chart-groups/chart-group-business-01",
      },
      {
        label: "SaaS Metrics",
        href: "/blocks/chart-groups/chart-group-saas-01",
      },
      {
        label: "Marketing Campaigns",
        href: "/blocks/chart-groups/chart-group-marketing-01",
      },
      {
        label: "Online Store",
        href: "/blocks/chart-groups/chart-group-ecommerce-01",
      },
      {
        label: "Website Traffic",
        href: "/blocks/chart-groups/chart-group-traffic-01",
      },
      {
        label: "Cash Flow",
        href: "/blocks/chart-groups/chart-group-finance-01",
      },
      {
        label: "Product Usage",
        href: "/blocks/chart-groups/chart-group-product-01",
      },
      {
        label: "Support Desk",
        href: "/blocks/chart-groups/chart-group-support-01",
      },
      {
        label: "Sales Pipeline",
        href: "/blocks/chart-groups/chart-group-sales-01",
      },
      {
        label: "Social Media",
        href: "/blocks/chart-groups/chart-group-social-01",
      },
      {
        label: "Hiring and Team",
        href: "/blocks/chart-groups/chart-group-hiring-01",
      },
      {
        label: "Shipping and Inventory",
        href: "/blocks/chart-groups/chart-group-logistics-01",
      },
      {
        label: "Energy Monitor",
        href: "/blocks/chart-groups/chart-group-energy-01",
      },
      {
        label: "Market Watch",
        href: "/blocks/chart-groups/chart-group-markets-01",
      },
      {
        label: "Fitness Tracker",
        href: "/blocks/chart-groups/chart-group-fitness-01",
      },
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Treasury dashboard and the Service Map component",
    summary:
      "Treasury is a Pro dashboard for a finance team's vendor payouts: four key numbers with daily bars, the payment rails and their health, a payment exceptions table you can sort and filter, and the active payment policy with its controls and routing rules. Its rail map is the new Pro Service Map component, which joins status cards with right-angle lines and sends a beam of light down each one.",
    items: [
      { label: "Treasury", href: "/blocks/dashboards/dashboard-treasury-01" },
      ...componentLinks([["Service Map", "service-map"]]),
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Dashboard blocks: Ledger and Harbor",
    summary:
      "A new Dashboards category opens with two Pro blocks. Ledger is a store overview with four key numbers, weekly sales as stacked square columns, sales by channel, and a sortable, searchable orders table. Harbor is a hotel front desk with a room board by floor and a 14-night occupancy chart. The Bar Chart's BarSquares can now stack series in one column, and BarColumnTrack can fill each column with empty squares.",
    items: [
      { label: "Dashboard blocks", href: "/blocks?category=dashboards" },
      { label: "Ledger", href: "/blocks/dashboards/dashboard-ledger-01" },
      { label: "Harbor", href: "/blocks/dashboards/dashboard-harbor-01" },
      ...componentLinks([["Bar Chart", "bar-chart"]]),
    ],
  },
  {
    date: "2026-11-02",
    kind: "blocks",
    title: "Synapse, a Pro Hero block",
    summary:
      "Synapse sets a two-tone headline, a short pitch, and one call to action on the sky of a hilltop photo, with a looping video card beside them. A white proof line and a scrolling logo row sit along the bottom under a progressive blur. It is part of Cortexcn Pro, so its Code tab lists the licenses that include the source.",
    items: [{ label: "Synapse", href: "/blocks/hero/hero-synapse-01" }],
  },
  {
    date: "2026-11-01",
    kind: "site",
    title: "Data Checks and Team Workspace templates",
    summary:
      "Marketing Ops and Marketing AI have new content and new names. Data Checks is a launch site for a data pipeline checks product, with data health dashboards on halftone art, and Team Workspace is a launch site for a shared workspace where teams keep plans, tasks, and handoffs in one place. Both keep their design, motion, and light and dark mode, and their old links redirect to the new pages.",
    items: [
      { label: "Data Checks", href: "/templates/data-checks" },
      { label: "Team Workspace", href: "/templates/team-workspace" },
    ],
  },
  {
    date: "2026-11-01",
    kind: "site",
    title: "Cortexcn Pro licenses, with the website templates included",
    summary:
      "Pro now comes as a 1-year, lifetime, or team license, each paid once, and every paid license includes the charts, the blocks built on them, and the website templates. The Pro page shows each landing page template with its live preview, and the pricing page compares the licenses.",
    items: [
      { label: "Cortexcn Pro", href: "/pro" },
      { label: "Pro pricing", href: "/pro/pricing" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    date: "2026-11-01",
    kind: "components",
    title: "The charts move to Cortexcn Pro",
    summary:
      "Every chart, the parts they share, and the stat card blocks built on them are now part of Cortexcn Pro. Their docs and live previews stay open, and the source comes with Pro instead of the public registry, so `npx shadcn add @cortexcn/<chart>` no longer installs them.",
    items: [
      { label: "Cortexcn Pro", href: "/pro" },
      { label: "Charts", href: "/docs/charts" },
    ],
  },
  {
    date: "2026-10-31",
    kind: "site",
    title: "Live previews on the components overview",
    summary:
      "Each card on the components overview now shows the component itself, rendered live and scaled to fit, instead of a drawing. Menus, dialogs, and toasts are shown open in place, and the cards no longer zoom on hover.",
    items: [{ label: "Components", href: "/docs/components" }],
  },
  {
    date: "2026-10-29",
    kind: "components",
    title: "ASCII Reveal, a loader drawn in glyphs",
    summary:
      "AsciiReveal decodes text, images, and cards into place through a character grid when `loading` turns false, and AsciiSkeleton holds the space in dither, scan, braille, or terminal glyphs while data loads. Wrapped around a page, it reveals each section as it scrolls into view. It installs with the ascii-reveal package.",
    items: [
      { label: "ASCII Reveal", href: ASCII_REVEAL_URL },
      {
        label: "Profile card loader",
        href: `${ASCII_REVEAL_URL}#profile-card`,
      },
      { label: "Live stats loader", href: `${ASCII_REVEAL_URL}#live-stats` },
      { label: "Article loader", href: `${ASCII_REVEAL_URL}#article` },
      {
        label: "Command output loader",
        href: `${ASCII_REVEAL_URL}#command-output`,
      },
      { label: "Mascot loader", href: `${ASCII_REVEAL_URL}#mascot` },
      {
        label: "Page sections loader",
        href: `${ASCII_REVEAL_URL}#page-sections`,
      },
    ],
  },
  {
    date: "2026-10-29",
    kind: "site",
    title: "Chart loading states as live previews",
    summary:
      "The area, bar, line, and heatmap charts' loading states each have a page at /embed/<chart>-loading, so the allowed sites can frame them like any other preview.",
    items: componentLinks([
      ["Area Chart", "area-chart"],
      ["Bar Chart", "bar-chart"],
      ["Line Chart", "line-chart"],
      ["Heatmap Chart", "heatmap-chart"],
    ]),
  },
  {
    date: "2026-10-27",
    kind: "site",
    title: "Live component previews for other sites",
    summary:
      "Every chart and several Cortex components now have a page at /embed/<name> that shows just its live demo, sized to fit any frame and themed from ?theme=dark or ?theme=light. Only the allowed sites can frame it, starting with syedmoinuddin.com, and the pages stay out of search results.",
    items: [
      { label: "Charts", href: "/docs/charts" },
      { label: "Cortex", href: "/docs/cortex" },
    ],
  },
  {
    date: "2026-10-27",
    kind: "site",
    title: "The library home leads with the MCP server",
    summary:
      "The hero's main button now opens the MCP server setup, with Browse components beside it, and the one-line Claude Code command sits below with a copy button. The copy counts the components, charts, and blocks from the docs, so it stays current.",
    items: [{ label: "MCP Server", href: "/docs/integration/mcp" }],
  },
  {
    date: "2026-10-27",
    kind: "site",
    title: "A sponsor card in the docs",
    summary:
      "The right rail on every docs page now has a card under the templates card that opens Cortexcn's GitHub Sponsors page.",
    items: [{ label: "Components docs", href: "/docs/components" }],
  },
  {
    date: "2026-10-27",
    kind: "site",
    title: "A live component wall in the library hero",
    summary:
      "The library home's hero now shows 41 live components, charts, and shadcn/ui examples in place of the painting, on a wall that fades into the page beside the text. A camera rests on one card while the others dim, then pulls back and zooms in to the next. It stays still for visitors who prefer less motion.",
    items: [
      { label: "Command Search", href: "/docs/cortex/command-search" },
      { label: "Number Ticker", href: "/docs/cortex/number-ticker" },
      { label: "FAQ Tabs Card", href: "/docs/cortex/faq-tabs-card" },
      { label: "Line Nav", href: "/docs/cortex/line-nav" },
      { label: "Gooey Nav", href: "/docs/cortex/gooey-nav" },
    ],
  },
  {
    date: "2026-10-27",
    kind: "site",
    title: "A new docs layout and header menus",
    summary:
      "The header on both sites now opens menus with a grid of links and a featured card: Components, Blocks, Charts, and Resources on the library, and Services and Library on the services site. The docs have a sidebar of collapsible sections, a title band with a breadcrumb, and a right rail with the page's headings. Each component overview shows a card with a line drawing for every component.",
    items: [
      { label: "Components", href: "/docs/components" },
      { label: "Cortex", href: "/docs/cortex" },
      { label: "Backgrounds", href: "/docs/backgrounds" },
      { label: "Charts", href: "/docs/charts" },
    ],
  },
  {
    date: "2026-10-10",
    kind: "blocks",
    title: "Feature Mockup Grid block",
    summary:
      "Five feature cards under a centered label and heading, two on top and three below. Each card draws a small product mockup in your theme colors: a prompt with three section drafts, a stack of templates, a page views chart, apps around a lock, and one page on a laptop and a phone. It needs no dependencies beyond the utils file.",
    items: [
      {
        label: "Mockup Grid",
        href: "/blocks/features/feature-mockup-grid-01",
      },
    ],
  },
  {
    date: "2026-10-10",
    kind: "site",
    title: "Marketing Ops template",
    summary:
      "A new paid template for a marketing platform, with a live preview. Dark campaign dashboards sit on halftone landscapes drawn in SVG, the feature tabs advance on their own and pause on hover or focus, and pricing has a monthly and yearly toggle. It has a comparison table, twelve testimonials, and light and dark mode.",
    items: [{ label: "Marketing Ops", href: "/templates/marketing-ops" }],
  },
  {
    date: "2026-10-10",
    kind: "site",
    title: "Legal AI template",
    summary:
      "A new paid template for an AI platform for law firms, with a live preview. In its research card, each numbered citation in an answer brings its highlighted passage forward in the source document. It has watercolor panels painted in code, tabs for law firms, in-house teams, and small practices, customer stories that stack as you scroll, and light and dark mode.",
    items: [{ label: "Legal AI", href: "/templates/legal-ai" }],
  },
  {
    date: "2026-10-10",
    kind: "components",
    title: "Design systems for every component",
    summary:
      "The new Design Systems page restyles every component on it in one of 25 design systems, in light and dark mode: each sets its own colors, fonts, corners, sizes, shadows, and motion, and the component code stays the same. The systems come from community DESIGN.md files, unofficial descriptions inspired by public websites such as Linear, Stripe, and Airbnb, with open-licensed fonts standing in for proprietary ones. Installed components accept the same themes through the new design-system-recipes registry item.",
    items: [{ label: "Design systems", href: "/design-systems" }],
  },
  {
    date: "2026-10-10",
    kind: "site",
    title: "AI Travel App, Growth Agency, and Trek Agency templates",
    summary:
      "Three new paid templates, each a complete Next.js site with a live preview. AI Travel App is a launch site for a trip planner, with a prompt bar that types out trips. Growth Agency is a studio site with giant condensed type and case studies that stack as you scroll. Trek Agency is a guided hiking site with terrain buttons that change the hero landscape. Every picture is drawn in SVG or CSS, and every word lives in one config file.",
    items: [
      { label: "AI Travel App", href: "/templates/ai-travel-app" },
      { label: "Growth Agency", href: "/templates/growth-agency" },
      { label: "Trek Agency", href: "/templates/trek-agency" },
    ],
  },
  {
    date: "2026-10-03",
    kind: "blocks",
    title: "Feature Walkthrough block",
    summary:
      "Three numbered steps sit beside a painted stage in a ruled frame. Each painting wipes in over the last, and a window springs up to play its step: the install command typing out in a terminal, a one-line edit to the Marquee source, then the Marquee running until a pointer rests on it. The window tilts toward your mouse, the steps move on by themselves and hold while you point at or focus them, and the arrow keys move between them.",
    items: [
      {
        label: "Walkthrough",
        href: "/blocks/features/feature-walkthrough-01",
      },
    ],
  },
  {
    date: "2026-10-03",
    kind: "blocks",
    title: "Feature Mixed Bento block",
    summary:
      "Four cards on a five-column grid under a small mono label, each setting its title, copy, and painting a different way: beside, below, above, and rising from the bottom edge. Soft blurred glows and a faint plus pattern sit behind them.",
    items: [
      {
        label: "Mixed Bento",
        href: "/blocks/features/feature-mixed-bento-01",
      },
    ],
  },
  {
    date: "2026-10-03",
    kind: "blocks",
    title: "Services blocks: Image Grid and Preview List",
    summary:
      "A new Services category opens with two sections painted with the flowers from this site. Image Grid sets a heading, a short pitch, and one action beside five cards that fade when you point at them. Preview List sets the services large in a numbered list, and the one you point at wipes its image and description into a panel that stays in view.",
    items: [
      { label: "Services blocks", href: "/blocks?category=services" },
      { label: "Image Grid", href: "/blocks/services/services-image-grid-01" },
      {
        label: "Preview List",
        href: "/blocks/services/services-preview-list-01",
      },
    ],
  },
  {
    date: "2026-10-03",
    kind: "site",
    title: "The Cortexcn MCP server, agent skills, and DESIGN.md",
    summary:
      "Connect your AI assistant to https://ui.cortexcn.dev/mcp and it can search every component, block, and chart, read the docs and props, and get the install command. Two agent skills and a DESIGN.md generated from the theme tokens install with one command, so new UI follows the Cortexcn look. Every install box now has an MCP tab.",
    items: [
      { label: "MCP Server", href: "/docs/integration/mcp" },
      { label: "Skills", href: "/docs/integration/skills" },
      { label: "DESIGN.md", href: "/docs/integration/design-md" },
    ],
  },
  {
    date: "2026-10-02",
    kind: "components",
    title: "Lanyard 3D",
    summary:
      "A 3D ID badge on a strap, drawn with three.js. Drag it, throw it, and watch the strap twist as the card turns, then click it to flip it over. The badge is drawn from props with your logo, name, and colors, and the physics is written in the component, so the only dependency is three.",
    items: componentLinks([["Lanyard 3D", "lanyard-3d"]]),
  },
  {
    date: "2026-10-02",
    kind: "components",
    title: "Lanyard Badge, Gooey Nav, and Sphere Menu",
    summary:
      "Three playful components with no extra dependencies. Lanyard Badge hangs an ID card from a simulated strap that you can drag, throw, and flip. Gooey Nav stretches a liquid pill between links. Sphere Menu spins a ball of image tiles and turns the nearest one to face you with its link.",
    items: componentLinks([
      ["Lanyard Badge", "lanyard-badge"],
      ["Gooey Nav", "gooey-nav"],
      ["Sphere Menu", "sphere-menu"],
    ]),
  },
  {
    date: "2026-10-02",
    kind: "blocks",
    title: "Queue joins the AI Assistant blocks",
    summary:
      "Queue shows what an agent has lined up: the messages waiting their turn, with their images and files and a way to drop one, above the run's todo list. Each section folds away.",
    items: [{ label: "Queue", href: "/blocks/ai-assistant/ai-queue-01" }],
  },
  {
    date: "2026-10-02",
    kind: "blocks",
    title: "Loaders: Dot Matrix and Glitch Text",
    summary:
      "A new Loaders category opens with two loading indicators, each shown four ways. Dot Matrix pulses a grid of dots in a ripple, wave, or rain pattern, and Glitch Text scrambles its letters and splits them into color channels.",
    items: [
      { label: "Dot Matrix", href: "/blocks/loaders/loader-dot-matrix-01" },
      { label: "Glitch Text", href: "/blocks/loaders/loader-glitch-text-01" },
      { label: "Loader blocks", href: "/blocks?category=loaders" },
    ],
  },
  {
    date: "2026-10-02",
    kind: "site",
    title: "A page for every block, and a live preview",
    summary:
      "Each block now opens on its own page with its preview, code, and install command. The eye button opens it full screen in a new tab, with a bar to switch the theme or jump to the code.",
    items: [{ label: "Blocks", href: "/blocks" }],
  },
  {
    date: "2026-10-02",
    kind: "blocks",
    title: "Two more Hero blocks: Studio and Cover Photo",
    summary:
      "Studio sets a short tagline beside a serif headline over a wide landscape that fades into the page. Cover Photo lays the title, a small label, and one light call to action along the bottom of a full-bleed photo.",
    items: [
      { label: "Studio", href: "/blocks/hero/hero-studio-01" },
      { label: "Cover Photo", href: "/blocks/hero/hero-cover-01" },
    ],
  },
  {
    date: "2026-10-02",
    kind: "blocks",
    title: "Hero blocks, starting with Dashboard Preview",
    summary:
      "A new Hero category opens with a serif headline, a short pitch, and one call to action over a framed product dashboard on a soft photo wash. It animates in on scroll and stays still for visitors who ask for reduced motion.",
    items: [
      { label: "Hero blocks", href: "/blocks?category=hero" },
      { label: "Dashboard Preview", href: "/blocks/hero/hero-dashboard-01" },
    ],
  },
  {
    date: "2026-10-02",
    kind: "blocks",
    title: "Feature Bento Grid block",
    summary:
      "Photo tiles, logo tiles, and stat cards on a twelve-column bento grid, with one call to action. Every image, figure, and caption is a prop.",
    items: [
      {
        label: "Feature blocks",
        href: "/blocks/features/feature-bento-grid-01",
      },
    ],
  },
  {
    date: "2026-10-01",
    kind: "components",
    title: "AI Assistant components",
    summary:
      "A new family for chat and agent interfaces. Reasoning streams a model's thinking as markdown and folds away when it finishes, Chain of Thought lays out an agent's steps with sources and status, and Shimmer marks the moments in between.",
    items: AI_ASSISTANT_BLOCK_LINKS,
  },
  {
    date: "2026-10-01",
    kind: "components",
    title: "Fan-Out Diagram",
    summary:
      "An animated architecture diagram for landing pages: one source feeds a hub that fans out to a row per sandbox, worker, or agent, each with a live status. It draws in on scroll and sends packets along the lines while it is on screen.",
    items: [{ label: "Fan-Out Diagram", href: "/docs/cortex/fan-out-diagram" }],
  },
  {
    date: "2026-09-29",
    kind: "components",
    title: "Every shadcn/ui component",
    summary:
      "51 components from shadcn/ui join the registry, from Button and Dialog to Combobox, Calendar, and Sidebar. Each page carries the examples from the shadcn docs, ready to copy, and the family formerly called Neurons is now simply Components.",
    items: [
      ...componentLinks([
        ["Button", "button"],
        ["Dialog", "dialog"],
        ["Dropdown Menu", "dropdown-menu"],
        ["Combobox", "combobox"],
        ["Calendar", "calendar"],
        ["Sonner", "sonner"],
        ["Kbd", "kbd"],
        ["Sidebar", "sidebar"],
      ]),
      { label: "All components", href: "/docs/components" },
    ],
  },
  {
    date: "2026-09-29",
    kind: "blocks",
    title: "Feature Studio Grid block",
    summary:
      "Two compact cards and a large photo tile for posts, case studies, or launches. Every image, title, and link is a prop.",
    items: [{ label: "Feature blocks", href: "/blocks?category=features" }],
  },
  {
    date: "2026-09-28",
    kind: "components",
    title: "Command Search, Number Ticker, and FAQ Tabs Card",
    summary:
      "A command palette that types its own queries, a rolling digit ticker, and a tabbed FAQ card join the Cortex family.",
    items: componentLinks([
      ["Command Search", "command-search"],
      ["Number Ticker", "number-ticker"],
      ["FAQ Tabs Card", "faq-tabs-card"],
    ]),
  },
  {
    date: "2026-09-27",
    kind: "components",
    title: "Backgrounds, starting with Light Speed",
    summary:
      "A new family for animated, full-bleed backgrounds. Light Speed draws a tunnel of light streaks with WebGL.",
    items: componentLinks([["Light Speed", "light-speed"]]),
  },
  {
    date: "2026-09-26",
    kind: "components",
    title: "Six new UI components",
    summary:
      "Marquee, Line Nav, Logos Carousel, Theme Toggle Effect, Work Experience, and Perspective Marquee, each with CLI and manual install steps.",
    items: componentLinks([
      ["Marquee", "marquee"],
      ["Line Nav", "line-nav"],
      ["Logos Carousel", "logos-carousel"],
      ["Theme Toggle Effect", "theme-toggle-effect"],
      ["Work Experience", "work-experience"],
      ["Perspective Marquee", "perspective-marquee"],
    ]),
  },
  {
    date: "2026-09-20",
    kind: "site",
    title: "The @cortexcn registry",
    summary:
      "Every chart moved to the @cortexcn namespace. Install any of them from ui.cortexcn.dev with the shadcn CLI.",
    items: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Charts", href: "/charts/area-chart" },
    ],
  },
];

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "Sep 29, 2026", the same for every visitor. */
export function formatChangelogDate(iso: string) {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

export interface ChangelogDay {
  /** `YYYY-MM-DD`. */
  date: string;
  /** That day's releases, in the order they are listed above. */
  releases: ChangelogRelease[];
}

/** Releases grouped by the day they shipped, newest day first. */
export function groupChangelogByDay(
  releases: ChangelogRelease[] = CHANGELOG,
): ChangelogDay[] {
  const days = new Map<string, ChangelogRelease[]>();

  for (const release of releases) {
    const day = days.get(release.date);
    if (day) {
      day.push(release);
    } else {
      days.set(release.date, [release]);
    }
  }

  return Array.from(days, ([date, dayReleases]) => ({
    date,
    releases: dayReleases,
  })).sort((a, b) => b.date.localeCompare(a.date));
}
