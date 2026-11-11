/**
 * Canonical origin of the product site: the Cortexcn components home, Pro,
 * and the legal pages. The apex `cortexcn.dev` 308-redirects here at the
 * Vercel domain level, so it must not be used as a canonical URL.
 */
export const SITE_URL = "https://www.cortexcn.dev";

/**
 * Canonical origin of the free component library: the docs, the blocks and
 * chart galleries, the changelog, the shadcn registry (`/r/*`), and the MCP
 * server. Users' components.json files point here, so it never moves.
 */
export const DOCS_URL = "https://ui.cortexcn.dev";

/** Canonical origin of Cortexcn Studio, the freelance services site. */
export const STUDIO_URL = "https://studio.cortexcn.dev";

/**
 * Local stand-ins for the library and Studio hosts. Browsers resolve every
 * `*.localhost` name to this machine, so `http://ui.localhost:4410` works
 * like ui.cortexcn.dev in dev. `bun run dev` also gives each site its own
 * port (see dev-ports.json and proxy.ts).
 */
export const DEV_DOCS_HOSTNAME = "ui.localhost";
export const DEV_STUDIO_HOSTNAME = "studio.localhost";

/**
 * Internal route of the components home. The proxy rewrites `/` on the
 * product host to it and sends direct visits to that root, so it never shows
 * up in the address bar.
 */
export const LIBRARY_HOME_ROUTE = "/ui-home";

const LIBRARY_PATH_RE =
  /^\/(?:docs|blocks|charts|changelog|new|templates|dashboard-kits|previews|mcp|mcp-server|sign-in|sign-up|account|checkout|admin|design-systems|embed)(?:\/|$)/;

const STUDIO_PATH_RE = /^\/(?:about|contact|pricing|services|work)(?:\/|$)/;

/** Add a path here when a new page goes on www, or the other hosts 404 it. */
const PRODUCT_PATH_RE = /^\/(?:ai|pro|privacy|refunds|terms)(?:\/|$)/;

/**
 * Pages of the component library site: the docs, the two galleries, the
 * changelog and the /new feed, the templates and dashboard kits with their live previews, the
 * MCP server and its page,
 * sign-in and sign-up, each person's account page, checkout, the admin dashboard, the
 * design systems showcase, and the
 * component previews other sites embed.
 */
export function isLibraryPath(pathname: string) {
  return LIBRARY_PATH_RE.test(pathname);
}

/**
 * Pages of Cortexcn Studio: its home (the `/` route), services, client work,
 * project pricing, about, and the contact form.
 */
export function isStudioPath(pathname: string) {
  return pathname === "/" || STUDIO_PATH_RE.test(pathname);
}

/**
 * Pages of the product site besides its home: Pro and the legal pages. The
 * library and Studio hosts send these to www; any other path they do not own
 * stays on them and gets that site's 404 page.
 */
export function isProductPath(pathname: string) {
  return PRODUCT_PATH_RE.test(pathname);
}

/** The origin that owns a path. Everything else, like /pro, is the product site. */
function originFor(pathname: string) {
  if (isLibraryPath(pathname)) {
    return DOCS_URL;
  }
  return isStudioPath(pathname) ? STUDIO_URL : SITE_URL;
}

/** Absolute canonical URL for a path, on whichever domain owns it. */
export function canonicalUrlFor(pathname: string) {
  if (pathname === LIBRARY_HOME_ROUTE) {
    return `${SITE_URL}/`;
  }
  return new URL(pathname, originFor(pathname)).href;
}
