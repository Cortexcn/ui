"use client";

import {
  type AnimationPlaybackControls,
  animate,
  cubicBezier,
  useReducedMotion,
} from "motion/react";
import {
  Activity,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePauseWhenOffscreen } from "@/lib/use-pause-when-offscreen";
import { cn } from "@/lib/utils";

/** How long the camera rests on a card. */
const HOLD_MS = 3000;
/** The first move comes soon after the wall appears. */
const FIRST_HOLD_MS = 1200;
/**
 * The wall is revealed once its cards have kept their size this long (or
 * after REVEAL_MAX_MS), so the camera starts settled instead of shifting.
 */
const SETTLE_QUIET_MS = 350;
const REVEAL_MAX_MS = 1200;
/** The pan eases slow, fast, slow; the zoom breathes out and back in. */
const PAN_EASE = cubicBezier(0.65, 0, 0.35, 1);
/** Flight time in seconds for a pan of this many screen pixels. */
const flightSeconds = (distance: number) =>
  Math.min(2.4, Math.max(1.3, 0.95 + distance / 1100));
/** The zoom at mid-flight, as a share of the resting zoom. */
const flightZoom = (distance: number) =>
  Math.min(0.94, Math.max(0.8, 0.94 - distance * 0.000_06));
/** How far through a flight the next card comes forward. */
const HIGHLIGHT_AT = 0.6;
/**
 * Demos within this much of a view (as a share of its size) around the
 * camera's current stop and its way to the next one keep running; the rest
 * pause, since 41 live demos at once cost more than the camera itself.
 */
const AWAKE_MARGIN = 0.3;
/**
 * Demos pause and wake this long after a landing, once the next card has
 * come forward, so that work never lands mid-flight.
 */
const WAKE_DELAY_MS = 900;
/** The canvas zoom at rest, so a few cards show around the focused one. */
const REST_SCALE = 1.05;
/** Panels narrower than this zoom out further, down to MIN_FIT. */
const FIT_WIDTH = 780;
const MIN_FIT = 0.55;
/** How far past the wall's top or bottom the camera may show, of the panel's height. */
const EDGE_SLACK = 0.2;

export interface CanvasCard {
  slug: string;
  title: string;
  /** The tag in the card's corner, such as "Chart" or "Template". */
  kind: string;
  demo: ReactNode;
}

/** A column of the wall: its width, its drop from the top, and its cards. */
export interface CanvasColumn {
  width: string;
  offset: string;
  cards: CanvasCard[];
}

function pick<T>(values: T[], index: number): T {
  return values[index % values.length] as T;
}

interface Point {
  x: number;
  y: number;
}

/** Where the canvas sits: its offset in the panel and its zoom. */
interface Camera {
  x: number;
  y: number;
  scale: number;
}

/** The panel and canvas sizes, read once per move instead of every frame. */
interface Box {
  width: number;
  height: number;
  canvasHeight: number;
}

/** The canvas point under the panel's center for a camera. */
function lookAt(camera: Camera, box: Box): Point {
  return {
    x: (box.width / 2 - camera.x) / camera.scale,
    y: (box.height / 2 - camera.y) / camera.scale,
  };
}

function sameSet(a: ReadonlySet<string>, b: ReadonlySet<string>) {
  return a.size === b.size && [...a].every((item) => b.has(item));
}

/**
 * Keeps a demo's box at its current height, so pausing the demo (which hides
 * it) never moves the wall's layout.
 */
function holdHeight(box: HTMLElement) {
  box.style.minHeight = `${box.offsetHeight}px`;
}

/**
 * A hero canvas: a wall of live cards beside the hero text, dissolving into the page along its left and top edges. A
 * camera rests on one card, which shows in full while the others stay dim,
 * then glides to the next: the pan eases slow, fast, slow while the zoom
 * breathes out and back in, and the next card comes forward as it lands.
 *
 * To stay smooth it reveals the wall only once the demos have settled, never
 * moves at rest when a demo changes size (only flights and panel resizes move
 * it), measures cards with offsets that ignore its own transform, keeps the
 * wall on one GPU layer, and pauses the demos far from the camera.
 * It rests while off screen, while the tab is hidden, and for visitors who
 * prefer less motion. It is decorative, so it is inert and hidden from
 * assistive technology.
 */
export function CardCanvas({
  columns,
  tour,
  className,
}: {
  columns: CanvasColumn[];
  /** Card slugs in the order the camera visits them. */
  tour: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { ref: panelRef, paused: offscreen } = usePauseWhenOffscreen();
  const canvasRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLDivElement>());
  const cameraRef = useRef<Camera>({ x: 0, y: 0, scale: REST_SCALE });
  const flyingRef = useRef(false);
  const flightsRef = useRef(0);
  const focusRef = useRef(0);
  const [focus, setFocus] = useState(0);
  // The card shown in full color, which switches as a flight lands.
  const [highlight, setHighlight] = useState(0);
  const [ready, setReady] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  // Cards far from the camera, whose demos are paused.
  const [asleep, setAsleep] = useState<ReadonlySet<string>>(() => new Set());

  const running = ready && reduceMotion === false && !(offscreen || tabHidden);

  const setCamera = useCallback((camera: Camera) => {
    cameraRef.current = camera;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transform = `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.scale})`;
    }
  }, []);

  const measure = useCallback((): Box | null => {
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    if (!(panel && canvas)) {
      return null;
    }
    return {
      width: panel.clientWidth,
      height: panel.clientHeight,
      canvasHeight: canvas.offsetHeight,
    };
  }, [panelRef]);

  /**
   * A card's center on the canvas. The columns are not positioned, so the
   * offsets are canvas coordinates whatever the camera's transform is.
   */
  const pointOf = useCallback((slug: string): Point | null => {
    const card = cardRefs.current.get(slug);
    if (!card) {
      return null;
    }
    return {
      x: card.offsetLeft + card.offsetWidth / 2,
      y: card.offsetTop + card.offsetHeight / 2,
    };
  }, []);

  /**
   * The resting camera on a canvas point: centered, zoomed for the panel's
   * width, and kept from showing far past the wall's top or bottom edge.
   */
  const restOn = useCallback((point: Point, box: Box): Camera => {
    const zoom =
      REST_SCALE * Math.min(1, Math.max(MIN_FIT, box.width / FIT_WIDTH));
    // A little empty room at either end is fine: the edges fade out there.
    const slack = box.height * EDGE_SLACK;
    const lowest = box.height - box.canvasHeight * zoom - slack;
    const centeredY = box.height / 2 - zoom * point.y;
    return {
      x: box.width / 2 - zoom * point.x,
      y: Math.min(slack, Math.max(lowest, centeredY)),
      scale: zoom,
    };
  }, []);

  /** Puts the camera straight onto the focused card. */
  const placeOnFocus = useCallback(() => {
    const box = measure();
    const point = pointOf(pick(tour, focusRef.current));
    if (!(box && point)) {
      return false;
    }
    setCamera(restOn(point, box));
    return true;
  }, [measure, pointOf, restOn, setCamera, tour]);

  // Some demos scroll their selected item into view, which also scrolls this
  // panel even though it hides its overflow. Undo that before it paints, so
  // the camera stays the only thing that moves the wall.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const unscroll = () => {
      if (panel.scrollTop !== 0 || panel.scrollLeft !== 0) {
        panel.scrollTop = 0;
        panel.scrollLeft = 0;
      }
    };
    unscroll();
    panel.addEventListener("scroll", unscroll, { passive: true });
    return () => panel.removeEventListener("scroll", unscroll);
  }, [panelRef]);

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // While hidden, follow the demos as they mount and size themselves; show
  // the wall once their sizes go quiet, already settled on the first card.
  // After that, only a panel resize moves the camera outside a flight.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    if (!(panel && canvas)) {
      return;
    }
    let revealed = false;
    let quiet: number | undefined;
    let cap: number | undefined;
    const reveal = () => {
      if (revealed || !placeOnFocus()) {
        return;
      }
      revealed = true;
      window.clearTimeout(quiet);
      window.clearTimeout(cap);
      for (const box of canvas.querySelectorAll<HTMLElement>(
        "[data-demo-box]",
      )) {
        holdHeight(box);
      }
      setReady(true);
    };
    const waitForQuiet = () => {
      window.clearTimeout(quiet);
      quiet = window.setTimeout(reveal, SETTLE_QUIET_MS);
    };
    placeOnFocus();
    waitForQuiet();
    cap = window.setTimeout(reveal, REVEAL_MAX_MS);
    const observer = new ResizeObserver((entries) => {
      if (!revealed) {
        placeOnFocus();
        waitForQuiet();
        return;
      }
      if (
        !flyingRef.current &&
        entries.some((entry) => entry.target === panel)
      ) {
        placeOnFocus();
      }
    });
    observer.observe(panel);
    observer.observe(canvas);
    for (const card of cardRefs.current.values()) {
      observer.observe(card);
    }
    return () => {
      observer.disconnect();
      window.clearTimeout(quiet);
      window.clearTimeout(cap);
    };
  }, [panelRef, placeOnFocus]);

  // A moment after each landing, while the camera is still, keep running
  // only the demos near this stop and along the way to the next one, and
  // pause the rest. Nothing starts or stops mid-flight, and paused demos
  // keep their state, so they resume where they were.
  useEffect(() => {
    if (!ready) {
      return;
    }
    const timer = window.setTimeout(() => {
      const box = measure();
      const from = pointOf(pick(tour, focus));
      const to = pointOf(pick(tour, focus + 1));
      if (!(box && from && to)) {
        return;
      }
      const start = restOn(from, box);
      const startLook = lookAt(start, box);
      const endLook = lookAt(restOn(to, box), box);
      const viewWidth = box.width / start.scale;
      const viewHeight = box.height / start.scale;
      // Views along the flight, half a view apart, each widened by the
      // margin to cover the zoom-out.
      const steps = Math.max(
        1,
        Math.ceil(
          Math.hypot(endLook.x - startLook.x, endLook.y - startLook.y) /
            (Math.min(viewWidth, viewHeight) / 2),
        ),
      );
      const halfWidth = viewWidth * (0.5 + AWAKE_MARGIN);
      const halfHeight = viewHeight * (0.5 + AWAKE_MARGIN);
      const views = Array.from({ length: steps + 1 }, (_, step) => ({
        x: startLook.x + ((endLook.x - startLook.x) * step) / steps,
        y: startLook.y + ((endLook.y - startLook.y) * step) / steps,
      }));
      const far = new Set<string>();
      for (const [slug, card] of cardRefs.current) {
        const left = card.offsetLeft;
        const top = card.offsetTop;
        const right = left + card.offsetWidth;
        const bottom = top + card.offsetHeight;
        const near = views.some(
          (view) =>
            right > view.x - halfWidth &&
            left < view.x + halfWidth &&
            bottom > view.y - halfHeight &&
            top < view.y + halfHeight,
        );
        if (!near) {
          far.add(slug);
        }
      }
      setAsleep((current) => (sameSet(current, far) ? current : far));
    }, WAKE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [focus, measure, pointOf, ready, restOn, tour]);

  // Rest on the focused card, then fly to the next one.
  useEffect(() => {
    if (!running) {
      return;
    }
    let flight: AnimationPlaybackControls | undefined;
    let landing: number | undefined;
    const next = (focus + 1) % tour.length;
    const hold = flightsRef.current === 0 ? FIRST_HOLD_MS : HOLD_MS;
    const timer = window.setTimeout(() => {
      const box = measure();
      const end = pointOf(pick(tour, next));
      if (!(box && end)) {
        return;
      }
      // Leave from wherever the camera is now, so nothing jumps.
      const from = cameraRef.current;
      const to = restOn(end, box);
      // The look-at point travels a straight line while the zoom breathes;
      // deriving the offset from both each frame keeps the path from veering.
      const fromLook = lookAt(from, box);
      const toLook = lookAt(to, box);
      const distance = Math.hypot(
        (toLook.x - fromLook.x) * to.scale,
        (toLook.y - fromLook.y) * to.scale,
      );
      const seconds = flightSeconds(distance);
      const dip = to.scale * (1 - flightZoom(distance));
      flyingRef.current = true;
      flightsRef.current += 1;
      flight = animate(0, 1, {
        duration: seconds,
        ease: "linear",
        onUpdate: (t) => {
          const pan = PAN_EASE(t);
          const breath = Math.sin(Math.PI * t) ** 2;
          const zoom =
            from.scale + (to.scale - from.scale) * pan - dip * breath;
          const lookX = fromLook.x + (toLook.x - fromLook.x) * pan;
          const lookY = fromLook.y + (toLook.y - fromLook.y) * pan;
          setCamera({
            x: box.width / 2 - lookX * zoom,
            y: box.height / 2 - lookY * zoom,
            scale: zoom,
          });
        },
        onComplete: () => {
          setCamera(to);
          flyingRef.current = false;
          focusRef.current = next;
          setFocus(next);
        },
      });
      // The next card comes forward as the camera settles onto it.
      landing = window.setTimeout(
        () => setHighlight(next),
        seconds * 1000 * HIGHLIGHT_AT,
      );
    }, hold);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(landing);
      if (flyingRef.current && flight) {
        // Paused mid-flight: stop where it is. The next flight leaves from
        // here, and the focused card comes back forward.
        flight.stop();
        flyingRef.current = false;
        setHighlight(focusRef.current);
      }
    };
  }, [focus, measure, pointOf, restOn, running, setCamera, tour]);

  const focused = pick(tour, highlight);

  return (
    <div
      aria-hidden="true"
      className={cn("hero-wall-mask isolate overflow-hidden", className)}
      inert
      ref={panelRef}
    >
      <div
        className={cn(
          // A lasting GPU layer: the camera moves a cached picture instead of
          // repainting the wall, and the camera always rests at the same
          // zoom, so text stays sharp.
          "absolute top-0 left-0 flex items-start gap-8 p-10 transition-opacity duration-700 will-change-transform motion-reduce:transition-none",
          ready ? "opacity-100" : "opacity-0",
        )}
        ref={canvasRef}
        style={{ transformOrigin: "0 0" }}
      >
        {columns.map((column) => (
          <div
            className={cn(
              "flex shrink-0 flex-col gap-8",
              column.width,
              column.offset,
            )}
            key={column.cards[0]?.slug}
          >
            {column.cards.map((card) => {
              const active = card.slug === focused;
              // Only the planner above pauses or wakes a demo, at rest; the
              // card in focus never pauses.
              const paused = asleep.has(card.slug) && !active;
              return (
                <div
                  className={cn(
                    // The lift shadow sits on its own layer and fades in, so
                    // no frame has to repaint a moving box-shadow.
                    "relative rounded-[22px] border bg-card p-2 transition-[opacity,border-color] duration-700 ease-out before:pointer-events-none before:absolute before:inset-0 before:rounded-[22px] before:opacity-0 before:shadow-[0_40px_80px_-32px_rgb(28_26_21/0.5)] before:transition-opacity before:duration-700 motion-reduce:transition-none dark:before:shadow-[0_40px_80px_-24px_rgb(0_0_0/0.95)]",
                    active
                      ? "border-foreground/15 opacity-100 before:opacity-100"
                      : "border-border opacity-35",
                  )}
                  data-slug={card.slug}
                  key={card.slug}
                  ref={(element) => {
                    if (element) {
                      cardRefs.current.set(card.slug, element);
                    } else {
                      cardRefs.current.delete(card.slug);
                    }
                  }}
                >
                  <div
                    className="flex min-h-24 items-center justify-center overflow-hidden rounded-[14px] border border-border bg-background p-5 text-foreground"
                    data-demo-box=""
                  >
                    <Activity mode={paused ? "hidden" : "visible"}>
                      {card.demo}
                    </Activity>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-1.5">
                    <span className="truncate font-medium text-foreground text-sm">
                      {card.title}
                    </span>
                    <span className="shrink-0 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                      {card.kind}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
