import { unstable_cache } from "next/cache";

import {
  INSIGHTS_RANGES,
  type InsightsCountry,
  type InsightsDay,
  type InsightsWindows,
} from "@/lib/insights-shared";

const CLOUDFLARE_GRAPHQL = "https://api.cloudflare.com/client/v4/graphql";
const TOP_COUNTRIES = 5;

interface RumGroup {
  count: number;
  sum?: { visits: number };
  dimensions: { date: string; countryName: string };
}

interface RumResponse {
  errors?: { message?: string }[] | null;
  data?: { viewer?: { accounts?: { rows?: RumGroup[] }[] } };
}

const QUERY = `
  query CortexcnInsights($account: String!, $site: String!, $start: String!, $end: String!) {
    viewer {
      accounts(filter: { accountTag: $account }) {
        rows: rumPageloadEventsAdaptiveGroups(
          filter: { siteTag: $site, date_geq: $start, date_leq: $end, bot: 0 }
          orderBy: [date_ASC]
          limit: 5000
        ) {
          count
          sum { visits }
          dimensions { date countryName }
        }
      }
    }
  }
`;

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** The first day of a window that ends today, counting today as day one. */
function windowStart(end: Date, days: number) {
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return start;
}

/** One entry per day of the window, days without traffic included. */
function dailySeries(rows: RumGroup[], end: Date, days: number) {
  const byDate = new Map<string, { visits: number; pageViews: number }>();
  for (let day = 0; day < days; day++) {
    const date = windowStart(end, days);
    date.setUTCDate(date.getUTCDate() + day);
    byDate.set(toDateOnly(date), { visits: 0, pageViews: 0 });
  }
  for (const row of rows) {
    const entry = byDate.get(row.dimensions.date);
    if (entry) {
      entry.visits += row.sum?.visits ?? 0;
      entry.pageViews += row.count;
    }
  }
  return [...byDate.entries()].map(
    ([date, entry]): InsightsDay => ({
      date: new Date(date).toISOString(),
      ...entry,
    }),
  );
}

function topCountries(rows: RumGroup[]): {
  countries: InsightsCountry[];
  count: number;
} {
  const viewsByCountry = new Map<string, number>();
  for (const row of rows) {
    const code = row.dimensions.countryName;
    if (code) {
      viewsByCountry.set(code, (viewsByCountry.get(code) ?? 0) + row.count);
    }
  }
  const total = [...viewsByCountry.values()].reduce((sum, n) => sum + n, 0);
  const countries = [...viewsByCountry.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_COUNTRIES)
    .map(([code, pageViews]) => ({
      code,
      pageViews,
      share: total > 0 ? pageViews / total : 0,
    }));
  return { countries, count: viewsByCountry.size };
}

/**
 * Cortexcn's traffic from Cloudflare Web Analytics: the beacon on every host
 * (NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN), read back through Cloudflare's
 * GraphQL API. Web Analytics counts visits and page views, with bots left
 * out; it has no unique visitors.
 *
 * Needs CLOUDFLARE_API_TOKEN (with Account Analytics: Read),
 * CLOUDFLARE_ACCOUNT_ID, and CORTEXCN_WEB_ANALYTICS_SITE_TAG. Returns null when
 * one is unset or the request fails, which hides the section.
 */
async function fetchInsights(): Promise<InsightsWindows | null> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const site = process.env.CORTEXCN_WEB_ANALYTICS_SITE_TAG;
  if (!(token && account && site)) {
    return null;
  }

  const ranges = [...INSIGHTS_RANGES].sort((a, b) => a - b);
  const widest = Math.max(...ranges);
  const end = new Date();
  const endDate = toDateOnly(end);

  try {
    const response = await fetch(CLOUDFLARE_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          account,
          site,
          start: toDateOnly(windowStart(end, widest)),
          end: endDate,
        },
      }),
    });
    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as RumResponse;
    // GraphQL reports failures, such as a window past retention, as a 200.
    if (json.errors && json.errors.length > 0) {
      return null;
    }
    const rows = json.data?.viewer?.accounts?.[0]?.rows ?? [];

    const windows: InsightsWindows = {};
    for (const days of ranges) {
      const startDate = toDateOnly(windowStart(end, days));
      const inWindow = rows.filter((row) => row.dimensions.date >= startDate);
      const visits = inWindow.reduce((sum, r) => sum + (r.sum?.visits ?? 0), 0);
      const pageViews = inWindow.reduce((sum, r) => sum + r.count, 0);
      const { countries, count } = topCountries(inWindow);

      windows[days] = {
        metrics: [
          { label: "Visits", value: visits },
          { label: "Page views", value: pageViews },
          { label: "Countries", value: count },
          {
            label: "Pages per visit",
            value: visits > 0 ? pageViews / visits : 0,
            fractionDigits: 1,
          },
        ],
        series: dailySeries(inWindow, end, days),
        countries,
        startDate,
        endDate,
      };
    }
    return windows;
  } catch {
    return null;
  }
}

/** Cached for 30 minutes, the same as the landing page's revalidate. */
export const getInsights = unstable_cache(
  fetchInsights,
  ["cortexcn-insights-v1"],
  {
    revalidate: 1800,
  },
);
