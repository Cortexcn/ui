/**
 * Shapes and ranges shared by the Insights fetcher (lib/insights.ts, server
 * only) and the panel that draws them, so the panel never imports the fetcher.
 */

/** The windows the range toggle offers, in days. */
export const INSIGHTS_RANGES = [30, 90] as const;

export type InsightsRange = (typeof INSIGHTS_RANGES)[number];

/** One headline number, such as visits or page views. */
export interface InsightsMetric {
  label: string;
  value: number;
  /** Digits after the decimal point; whole numbers when omitted. */
  fractionDigits?: number;
}

/** One day of traffic. `date` is an ISO string, since this crosses to the client. */
export interface InsightsDay {
  date: string;
  visits: number;
  pageViews: number;
}

export interface InsightsCountry {
  /** The country code Cloudflare reports, such as "IN" or "US". */
  code: string;
  pageViews: number;
  /** Share of the window's page views with a known country, 0 to 1. */
  share: number;
}

export interface InsightsWindow {
  /** Four headline numbers, in display order. */
  metrics: InsightsMetric[];
  series: InsightsDay[];
  countries: InsightsCountry[];
  startDate: string;
  endDate: string;
}

/** Only the windows Cloudflare actually returned. */
export type InsightsWindows = Partial<Record<InsightsRange, InsightsWindow>>;
