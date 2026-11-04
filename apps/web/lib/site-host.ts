import devPorts from "../dev-ports.json";
import {
  DEV_DOCS_HOSTNAME,
  DEV_STUDIO_HOSTNAME,
  DOCS_URL,
  STUDIO_URL,
} from "./site-url";

const DOCS_HOST = new URL(DOCS_URL).host;
const STUDIO_HOST = new URL(STUDIO_URL).host;
const IS_DEV = process.env.NODE_ENV === "development";

/** In dev, `bun run dev` serves each site on its own port (dev-ports.json). */
const DEV_LIBRARY_PORT = String(devPorts.library);
const DEV_COMPONENTS_PORT = String(devPorts.components);
const DEV_STUDIO_PORT = String(devPorts.studio);

/**
 * The three sites one deployment serves: the components home and Pro
 * (product), the free library, and Cortexcn Studio.
 */
export type Site = "product" | "library" | "studio";

/**
 * Which site a host serves. In production that is its domain; in dev, its
 * port or `*.localhost` name. Unknown hosts, such as preview deployments,
 * count as the components home.
 */
export function siteForHost(host: string): Site {
  if (host === DOCS_HOST) {
    return "library";
  }
  if (host === STUDIO_HOST) {
    return "studio";
  }
  if (IS_DEV) {
    const [hostname, port = ""] = host.split(":");
    if (hostname === DEV_STUDIO_HOSTNAME || port === DEV_STUDIO_PORT) {
      return "studio";
    }
    if (
      hostname === DEV_DOCS_HOSTNAME ||
      port === DEV_LIBRARY_PORT ||
      port === DEV_COMPONENTS_PORT
    ) {
      return "library";
    }
  }
  return "product";
}
