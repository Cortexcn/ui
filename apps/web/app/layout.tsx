import "./globals.css";
import { OpenPanelComponent } from "@openpanel/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import { DocsSearchDialog } from "@/components/docs/docs-search-dialog";
import { SiteRootProvider } from "@/components/site-root-provider";
import { PageScrollbar } from "@/components/smooth-scroll/page-scrollbar";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { getOpenPanelClientId } from "@/lib/openpanel-env";
import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  X_HANDLE,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { cn } from "@/lib/utils";

/*
 * Only the Square cut of Geist Pixel is used (landing headlines). Loaded
 * directly because `geist/font/pixel` registers, and preloads, all five cuts.
 */
const geistPixelSquare = localFont({
  src: "../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel-square",
  weight: "500",
  display: "swap",
  fallback: ["Geist Mono", "ui-monospace", "monospace"],
  adjustFontFallback: false,
});

/** Paired serif until `geist/font/serif` ships in the geist package. */
const geistSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

/** High-contrast display serif for large editorial headings (AgentLab-style hero). */
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
/** Cloudflare Web Analytics: visits and page views, read by the portfolio's Insights. */
const cloudflareBeaconToken =
  process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;
const bingVerification = process.env.BING_SITE_VERIFICATION;
/**
 * Plausible: page views on both hosts, without cookies. The domain list is
 * the site names in Plausible, such as "www.cortexcn.dev,ui.cortexcn.dev".
 * Unset, the script stays off, as it does locally.
 */
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Google Tag Manager. One container covers www, ui, and studio, since all
 * three hosts share this layout. Only a well-formed ID is written into the
 * page; unset, the tag stays off, as it does locally.
 */
const GTM_ID_RE = /^GTM-[A-Z0-9]+$/;
const gtmId = GTM_ID_RE.test(process.env.NEXT_PUBLIC_GTM_ID ?? "")
  ? process.env.NEXT_PUBLIC_GTM_ID
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [AUTHOR],
  creator: AUTHOR.name,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    url: `${SITE_URL}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: X_HANDLE,
  },
  // Search Console and Bing Webmaster verification tokens, set per deployment.
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification
      ? { other: { "msvalidate.01": bingVerification } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const openPanelClientId = getOpenPanelClientId();

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        geistSerif.variable,
        instrumentSerif.variable,
        geistPixelSquare.variable,
        GeistSans.className,
      )}
      lang="en"
      // Declares the Open Graph vocabulary, as ogp.me's examples do; some
      // validators look for it before they read the og: tags.
      prefix="og: https://ogp.me/ns#"
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col">
        <SmoothScroll />
        {cloudflareBeaconToken ? (
          <Script
            data-cf-beacon={JSON.stringify({ token: cloudflareBeaconToken })}
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
          />
        ) : null}
        {plausibleDomain ? (
          <Script
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.outbound-links.js"
            strategy="afterInteractive"
          />
        ) : null}
        {gtmId ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            <noscript>
              <iframe
                height="0"
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
                width="0"
              />
            </noscript>
          </>
        ) : null}
        {openPanelClientId ? (
          <OpenPanelComponent
            apiUrl="/api/op"
            clientId={openPanelClientId}
            scriptUrl="/api/op/op1.js"
            trackAttributes
            trackOutgoingLinks
            trackScreenViews
          />
        ) : null}
        <SiteRootProvider
          search={{
            SearchDialog: DocsSearchDialog,
            options: {
              api: "/api/search",
            },
          }}
          theme={{
            attribute: "class",
            defaultTheme: "dark",
            disableTransitionOnChange: true,
            enableSystem: true,
          }}
        >
          {children}
        </SiteRootProvider>
        <PageScrollbar />
        {/* Vercel Web Analytics: page views on all three hosts, without cookies. */}
        <Analytics />
        {/* Vercel Speed Insights: Core Web Vitals from real visits. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
