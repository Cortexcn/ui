"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

/**
 * Sentient Light, for the blocks pages' headings, as on the library home. Its
 * license allows use on our site but not sharing the font files, so Fontshare
 * serves them.
 */
const SENTIENT_STYLESHEET =
  "https://api.fontshare.com/v2/css?f[]=sentient@300&display=swap";

export default function BlocksLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.style.scrollbarGutter = "stable";
    return () => {
      document.documentElement.style.scrollbarGutter = "";
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col" data-blocks-page="">
      <link href={SENTIENT_STYLESHEET} precedence="default" rel="stylesheet" />
      {children}
    </div>
  );
}
