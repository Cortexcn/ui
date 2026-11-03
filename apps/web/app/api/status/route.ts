import { getSystemState } from "@/lib/system-status";

/**
 * The state the footer status badge shows, as `{ "state": ... }`, with null
 * when it cannot be verified. Cached and refreshed at most once a minute, so
 * page views never reach Better Stack.
 */
export const dynamic = "force-static";
export const revalidate = 60;

export async function GET() {
  return Response.json({ state: await getSystemState() });
}
