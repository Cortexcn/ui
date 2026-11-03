import { z } from "zod";
import { STATUS_PAGE } from "@/lib/site-config";
import { type SystemState, systemState } from "@/lib/system-status-state";

/**
 * Reads the monitors on the Cortexcn status page from Better Stack's Uptime
 * API (https://betterstack.com/docs/uptime/api/getting-started-with-uptime-api/)
 * and works out what the footer badge shows.
 *
 * Needs BETTERSTACK_API_TOKEN. Server-only: the token never reaches the
 * browser, which reads the result from /api/status. Returns null when the
 * token is unset, a request fails, or a response is not the expected shape,
 * so the badge never shows a state nobody verified.
 */

const API = "https://incidents.betterstack.com/api/v2";

/** How long a monitor's status is reused, in seconds. */
export const STATUS_REVALIDATE_SECONDS = 60;
/** Which monitors are on the page changes rarely. */
const RESOURCES_REVALIDATE_SECONDS = 600;
/** A guard against a pagination loop. */
const MAX_PAGES = 10;

const pageSchema = <T extends z.ZodType>(item: T) =>
  z.object({
    data: z.array(item),
    pagination: z.object({ next: z.string().nullable().optional() }).optional(),
  });

const resourcesSchema = pageSchema(
  z.object({
    attributes: z.object({
      resource_type: z.string(),
      resource_id: z.union([z.string(), z.number()]).nullable(),
    }),
  }),
);

const monitorsSchema = pageSchema(
  z.object({
    id: z.union([z.string(), z.number()]),
    attributes: z.object({ status: z.string() }),
  }),
);

async function fetchAllPages<T extends z.ZodType>(
  path: string,
  schema: ReturnType<typeof pageSchema<T>>,
  token: string,
  revalidate: number,
) {
  const items: z.infer<T>[] = [];
  let next: string | null | undefined = `${API}${path}`;
  for (let page = 0; next && page < MAX_PAGES; page += 1) {
    // The token only ever goes to Better Stack's API.
    if (!next.startsWith(`${API}/`)) {
      return null;
    }
    const response: Response = await fetch(next, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate },
    });
    if (!response.ok) {
      return null;
    }
    const parsed = schema.safeParse(await response.json());
    if (!parsed.success) {
      return null;
    }
    items.push(...parsed.data.data);
    next = parsed.data.pagination?.next;
  }
  return next ? null : items;
}

export async function getSystemState(): Promise<SystemState | null> {
  const token = process.env.BETTERSTACK_API_TOKEN;
  if (!token) {
    return null;
  }
  try {
    const resources = await fetchAllPages(
      `/status-pages/${STATUS_PAGE.betterStackId}/resources`,
      resourcesSchema,
      token,
      RESOURCES_REVALIDATE_SECONDS,
    );
    const monitors = await fetchAllPages(
      "/monitors",
      monitorsSchema,
      token,
      STATUS_REVALIDATE_SECONDS,
    );
    if (!(resources && monitors)) {
      return null;
    }

    const onPage = resources
      .filter((resource) => resource.attributes.resource_type === "Monitor")
      .map((resource) => String(resource.attributes.resource_id));
    const statusById = new Map(
      monitors.map((monitor) => [
        String(monitor.id),
        monitor.attributes.status,
      ]),
    );
    // A monitor on the page that the list no longer has is unexpected.
    if (onPage.some((id) => !statusById.has(id))) {
      return null;
    }
    return systemState(onPage.map((id) => statusById.get(id)));
  } catch {
    return null;
  }
}
