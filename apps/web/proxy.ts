import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { withAuth } from "@/lib/auth/proxy";
import { siteForHost } from "@/lib/site-host";
import {
  canonicalUrlFor,
  DOCS_URL,
  isProductPath,
  LIBRARY_HOME_ROUTE,
  SITE_URL,
  STUDIO_URL,
} from "@/lib/site-url";
import {
  isUptimeCheck,
  logUsage,
  registryItem,
  requestIp,
} from "@/lib/usage-log";
import devPorts from "./dev-ports.json";

const SITE_HOST = new URL(SITE_URL).host;
const DOCS_HOST = new URL(DOCS_URL).host;
const STUDIO_HOST = new URL(STUDIO_URL).host;
const APEX_HOST = SITE_HOST.replace(/^www\./, "");
const SERVED_HOSTS = new Set([SITE_HOST, DOCS_HOST, STUDIO_HOST]);
const IS_DEV = process.env.NODE_ENV === "development";

/** In dev, the components docs have their own port (dev-ports.json). */
const DEV_COMPONENTS_PORT = String(devPorts.components);

// Read by crawlers, so they answer on whichever host asked. Each host serves
// its own pages' share images from /og.
const HOST_AGNOSTIC_PATH_RE = /^\/(?:robots\.txt|sitemap\.xml|og)$/;

/** Paths that mean the components home, which only ever shows as `/` on its host. */
const LIBRARY_HOME_ALIASES = new Set([LIBRARY_HOME_ROUTE, "/components"]);

/** The components home: www.cortexcn.dev, or the site port in dev. */
function libraryHomeUrl() {
  if (!IS_DEV) {
    return new URL("/", SITE_URL);
  }
  return new URL(`http://localhost:${devPorts.site}/`);
}

/**
 * Where a production request should be sent instead, or null to serve it.
 * One deployment answers on three domains: the components home and Pro on
 * www.cortexcn.dev, the free library (docs, blocks, charts, and registry) on
 * ui.cortexcn.dev, and Cortexcn Studio on studio.cortexcn.dev. Each serves
 * its own pages and sends the rest to the domain that owns them.
 */
function productionRedirectFor(host: string, pathname: string): URL | null {
  if (HOST_AGNOSTIC_PATH_RE.test(pathname)) {
    return null;
  }

  // Vercel already redirects the apex; this covers a missing domain-level rule.
  const isKnownAlias = host === APEX_HOST || host.endsWith(".vercel.app");
  if (!(SERVED_HOSTS.has(host) || isKnownAlias)) {
    return null;
  }

  // Each site has its own home, except the library, whose home is the
  // components home on www.
  if (pathname === "/") {
    if (host === SITE_HOST || host === STUDIO_HOST) {
      return null;
    }
    return new URL("/", SITE_URL);
  }

  const target = new URL(canonicalUrlFor(pathname));
  if (target.host === host) {
    return null;
  }

  // A path no site owns, such as a mistyped address, stays on the library or
  // Studio host that was asked, so that site shows its own 404 page.
  const isOwnSite = host === DOCS_HOST || host === STUDIO_HOST;
  if (isOwnSite && target.host === SITE_HOST && !isProductPath(pathname)) {
    return null;
  }
  return target;
}

function route(request: NextRequest, event: NextFetchEvent) {
  const host = (
    request.headers.get("host") ?? request.nextUrl.host
  ).toLowerCase();
  const { pathname, search } = request.nextUrl;

  // Route handlers only come through here for sign-in (see `config`), and
  // answer on the host that called them.
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Registry files (/r/<name>.json, and pinned revisions under /r/v/) are
  // served as they always were; the request is only logged for /admin/stats,
  // after the response is sent.
  const item = registryItem(pathname);
  if (item !== null) {
    if (!isUptimeCheck(request)) {
      event.waitUntil(
        logUsage([{ kind: "registry", item }], requestIp(request)),
      );
    }
    return NextResponse.next();
  }
  const isProduction = process.env.VERCEL_ENV === "production";

  // Direct visits to the components home's route go to the root of its host.
  // Preview deployments serve the route as is.
  if (LIBRARY_HOME_ALIASES.has(pathname) && (isProduction || IS_DEV)) {
    const target = libraryHomeUrl();
    target.search = search;
    // Temporary in dev, so browsers do not cache it while the setup changes.
    return NextResponse.redirect(target, IS_DEV ? 307 : 308);
  }

  if (isProduction) {
    const target = productionRedirectFor(host, pathname);
    if (target) {
      target.search = search;
      return NextResponse.redirect(target, 308);
    }
  }

  const site = siteForHost(host);

  // In dev, the library ports open on the docs: the components port on the
  // components docs. In production the library host's `/` redirects above.
  if (IS_DEV && pathname === "/" && site === "library") {
    const docs =
      host.split(":")[1] === DEV_COMPONENTS_PORT ? "/docs/components" : "/docs";
    return NextResponse.redirect(new URL(docs, `http://${host}`), 307);
  }

  // The product host opens on the components home. Studio's home is the `/`
  // route itself, so it is served as is below.
  if (pathname === "/" && site === "product") {
    const libraryHome = request.nextUrl.clone();
    libraryHome.pathname = LIBRARY_HOME_ROUTE;
    const response = NextResponse.rewrite(libraryHome);
    response.headers.set(
      "Link",
      `<${canonicalUrlFor(LIBRARY_HOME_ROUTE)}>; rel="canonical"`,
    );
    return response;
  }

  const response = NextResponse.next();
  response.headers.set(
    "Link",
    `<${canonicalUrlFor(pathname)}>; rel="canonical"`,
  );

  return response;
}

/** Clerk reads the session first, so pages and route handlers can use it. */
export const proxy = withAuth(route);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/robots.txt",
    "/sitemap.xml",
    // Route handlers that read the signed-in user.
    "/api/admin/:path*",
    // Registry files, only to log them; see the top of `proxy`.
    "/r/:path*",
  ],
};
