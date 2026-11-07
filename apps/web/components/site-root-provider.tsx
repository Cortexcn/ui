"use client";

import { RootProvider } from "fumadocs-ui/provider";
import type { ComponentProps } from "react";

/**
 * next-themes renders an inline script that sets the theme class before the
 * page paints. It must run from the server's HTML, but React warns when a
 * client render creates a <script>, since it never runs there. So the server
 * renders it as JavaScript, and the client marks it as data, which React
 * leaves alone. next-themes already suppresses the hydration warning for the
 * changed `type`.
 */
const CLIENT_SCRIPT_PROPS = { type: "application/json" } as const;

/** Fumadocs' RootProvider, with the theme script handled as above. */
export function SiteRootProvider({
  theme,
  ...props
}: ComponentProps<typeof RootProvider>) {
  return (
    <RootProvider
      {...props}
      theme={{
        ...theme,
        scriptProps:
          typeof window === "undefined" ? undefined : CLIENT_SCRIPT_PROPS,
      }}
    />
  );
}
