"use client";

import { type RefObject, useEffect, useState } from "react";

interface HighlightBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * The pill behind the current page's link in the docs sidebar. It slides to
 * the new link when the page changes, and follows it as groups open and
 * close. Place it inside the positioned element that holds the links.
 */
export function SidebarHighlight({
  navRef,
  pathname,
}: {
  navRef: RefObject<HTMLElement | null>;
  pathname: string;
}) {
  const [box, setBox] = useState<HighlightBox | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: measures again on navigation.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    const update = () => {
      const link = nav.querySelector<HTMLElement>('[aria-current="page"]');
      // A link inside a closed group is out of sight, so the pill hides.
      if (!link || link.closest("[inert]")) {
        setBox(null);
        return;
      }
      setBox({
        top: link.offsetTop,
        left: link.offsetLeft,
        width: link.offsetWidth,
        height: link.offsetHeight,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [navRef, pathname]);

  if (!box) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-shell-sm bg-muted ring-1 ring-border transition-[top,left,width,height] duration-300 ease-out motion-reduce:transition-none"
      style={box}
    />
  );
}
