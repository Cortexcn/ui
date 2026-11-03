"use client";

import { Icon, type IconName } from "@cortexcn/icons";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { playClickSound } from "@/lib/click-sound";
import { cn } from "@/lib/utils";

type ThemeChoice = "light" | "system" | "dark";

const THEME_CHOICES: { value: ThemeChoice; label: string; icon: IconName }[] = [
  { value: "light", label: "Light", icon: "IconSun" },
  { value: "system", label: "System", icon: "IconImac" },
  { value: "dark", label: "Dark", icon: "IconMoon" },
];

/** Set on <html> while a switch animates; see `data-theme-switching` in globals.css. */
const SWITCHING_ATTRIBUTE = "data-theme-switching";

let activeSwitch: ViewTransition | null = null;

function resolveChoice(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") {
    return choice;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

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
 * Light, System, and Dark in one pill. The thumb slides to the choice, a soft
 * click plays, and the new theme spreads out in a circle from the choice.
 * Reduced motion switches at once. D still flips between light and dark.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const name = useId();
  const optionRefs = useRef<Record<ThemeChoice, HTMLLabelElement | null>>({
    light: null,
    system: null,
    dark: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const choose = useCallback(
    (choice: ThemeChoice) => {
      playClickSound();

      const next = resolveChoice(choice);
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

      const rect = optionRefs.current[choice]?.getBoundingClientRect();
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

  const selected = mounted
    ? THEME_CHOICES.findIndex((choice) => choice.value === theme)
    : -1;

  return (
    <div
      aria-keyshortcuts="D"
      aria-label="Theme"
      className={cn(
        "relative flex h-9 shrink-0 items-center rounded-shell-sm border border-border bg-muted/60 p-0.5",
        className,
      )}
      role="radiogroup"
    >
      {/*
        The thumb. `transition-transform!` outlasts the `transition: none`
        next-themes adds while the theme class changes.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-8 rounded-[calc(var(--radius-shell-sm)-2px)] bg-background shadow-sm ring-1 ring-border transition-transform! duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none!",
          selected < 0 && "opacity-0",
        )}
        style={{ transform: `translateX(${Math.max(selected, 0) * 100}%)` }}
      />
      {THEME_CHOICES.map((choice) => {
        const checked = mounted && theme === choice.value;
        return (
          <label
            className={cn(
              "relative inline-flex size-8 cursor-pointer items-center justify-center rounded-[calc(var(--radius-shell-sm)-2px)] text-muted-foreground transition-colors hover:text-foreground has-focus-visible:outline-2 has-focus-visible:outline-ring has-focus-visible:outline-offset-1",
              checked && "text-foreground",
            )}
            key={choice.value}
            ref={(node) => {
              optionRefs.current[choice.value] = node;
            }}
            title={`${choice.label} theme`}
          >
            <input
              checked={checked}
              className="sr-only"
              name={name}
              onChange={() => choose(choice.value)}
              type="radio"
              value={choice.value}
            />
            <Icon aria-hidden="true" className="size-4" name={choice.icon} />
            <span className="sr-only">{choice.label}</span>
          </label>
        );
      })}
    </div>
  );
}
