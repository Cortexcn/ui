"use client";

import { Icon } from "@cortexcn/icons";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { playClickSound } from "@/lib/click-sound";
import { cn } from "@/lib/utils";

type ThemeChoice = "light" | "dark";

/** Set on <html> while a switch animates; see `data-theme-switching` in globals.css. */
const SWITCHING_ATTRIBUTE = "data-theme-switching";

let activeSwitch: ViewTransition | null = null;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return (
    target.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

/**
 * One button that flips between light and dark mode in a single click. A soft
 * click plays, and the new theme spreads out in a circle from the button.
 * Reduced motion switches at once. D flips it from the keyboard too.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const choose = useCallback(
    (choice: ThemeChoice) => {
      playClickSound();

      const next = choice;
      const root = document.documentElement;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        next === resolvedTheme ||
        reduceMotion ||
        typeof document.startViewTransition !== "function"
      ) {
        setTheme(choice);
        return;
      }

      const rect = buttonRef.current?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      root.setAttribute(SWITCHING_ATTRIBUTE, "");
      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(choice));
        // next-themes sets the class in an effect; set it now so the new
        // snapshot is already in the new theme.
        root.classList.remove("light", "dark");
        root.classList.add(next);
        root.style.colorScheme = next;
      });
      activeSwitch = transition;

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 560,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          // A newer switch skipped this one; it runs its own animation.
        });

      const cleanUp = () => {
        if (activeSwitch === transition) {
          activeSwitch = null;
          root.removeAttribute(SWITCHING_ATTRIBUTE);
        }
      };
      transition.finished.then(cleanUp, cleanUp);
    },
    [resolvedTheme, setTheme],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "d" && event.key !== "D") {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (isTypingTarget(event.target)) {
        return;
      }
      event.preventDefault();
      choose(resolvedTheme === "dark" ? "light" : "dark");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [choose, resolvedTheme]);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} mode`
    : "Switch theme";

  return (
    <button
      aria-keyshortcuts="D"
      aria-label={label}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-shell-sm border border-border bg-muted/60 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      // The theme as it is now, even in the moment before the icon has mounted.
      onClick={() => choose(resolvedTheme === "dark" ? "light" : "dark")}
      ref={buttonRef}
      title={`${label} (D)`}
      type="button"
    >
      {/* Empty until mounted, so the server and the first render match. */}
      {mounted ? (
        <Icon
          aria-hidden="true"
          className="size-4"
          name={isDark ? "IconSun" : "IconMoon"}
        />
      ) : (
        <span aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
