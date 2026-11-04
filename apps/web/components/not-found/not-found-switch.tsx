"use client";

import { type ReactNode, useSyncExternalStore } from "react";

import { type Site, siteForHost } from "@/lib/site-host";

/** The host never changes while the page is open. */
function subscribe() {
  return () => undefined;
}

function siteFromLocation() {
  return siteForHost(window.location.host.toLowerCase());
}

function noSite() {
  return null;
}

/**
 * Shows the 404 page of the site the visitor is on. The 404 page is one
 * static file for all three hosts, because reading the request's host on the
 * server would make every page of the app dynamic. The server sends the plain
 * fallback, and the browser swaps in the right site's page once it loads.
 */
export function NotFoundSwitch({
  fallback,
  ...pages
}: Record<Site, ReactNode> & { fallback: ReactNode }) {
  const site = useSyncExternalStore(subscribe, siteFromLocation, noSite);
  return site === null ? fallback : pages[site];
}
