"use client";

import {
  AnimatePresence,
  animate,
  motion,
  usePresence,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import type { TickerMessage } from "@/lib/whats-new";

/** How long each line stays once it is in. */
const HOLD_MS = 2600;

const TYPE_MS = 55;
const DELETE_MS = 24;

/** Frames of the scramble, and how long each one shows. */
const SCRAMBLE_FRAMES = 16;
const SCRAMBLE_MS = 38;
const GLYPHS = "!<>-_\\/[]{}=+*^?#%&01";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/** True while the tab is in the background, so the ticker can rest. */
function useDocumentHidden() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
}

/** A callback that always calls the latest version of `fn`. */
function useLatest<T extends () => void>(fn: T) {
  const ref = useRef(fn);
  ref.current = fn;
  return ref;
}

interface LineProps {
  text: string;
  /** False for the line drawn on the server, which starts in place. */
  enter: boolean;
  onEntered: () => void;
}

/** Typed out a letter at a time behind a caret, then deleted the same way. */
function TypedLine({ text, enter, onEntered }: LineProps) {
  const [isPresent, safeToRemove] = usePresence();
  const [length, setLength] = useState(enter ? 0 : text.length);
  const entered = useLatest(onEntered);

  useEffect(() => {
    if (isPresent) {
      if (length < text.length) {
        const timer = setTimeout(() => setLength(length + 1), TYPE_MS);
        return () => clearTimeout(timer);
      }
      entered.current();
      return;
    }
    if (length > 0) {
      const timer = setTimeout(() => setLength(length - 1), DELETE_MS);
      return () => clearTimeout(timer);
    }
    safeToRemove?.();
  }, [isPresent, length, text.length, safeToRemove, entered]);

  return (
    <span className="whitespace-pre">
      {text.slice(0, length)}
      <span className="ml-px inline-block h-[1.05em] w-[1.5px] translate-y-[0.18em] animate-caret bg-violet-300 motion-reduce:animate-none" />
    </span>
  );
}

/** A stand-in glyph for letter `index` on `frame`, the same on every render. */
function glyph(index: number, frame: number) {
  return GLYPHS[(index * 7 + frame * 13) % GLYPHS.length] ?? "#";
}

/** Decoded from scrambled glyphs, left to right, while the line flickers on. */
function FlickerLine({ text, enter, onEntered }: LineProps) {
  const [frame, setFrame] = useState(enter ? 0 : SCRAMBLE_FRAMES);
  const entered = useLatest(onEntered);

  useEffect(() => {
    if (frame < SCRAMBLE_FRAMES) {
      const timer = setTimeout(() => setFrame(frame + 1), SCRAMBLE_MS);
      return () => clearTimeout(timer);
    }
    entered.current();
  }, [frame, entered]);

  const letters = [...text];
  return (
    <motion.span
      animate={enter ? { opacity: [0, 1, 0.3, 1, 0.55, 1] } : undefined}
      className="whitespace-pre"
      exit={{
        opacity: [1, 0.25, 0.9, 0],
        transition: { duration: 0.32, times: [0, 0.35, 0.6, 1] },
      }}
      initial={false}
      transition={{ duration: 0.5, times: [0, 0.2, 0.35, 0.5, 0.7, 1] }}
    >
      {letters.map((letter, index) => {
        const settleAt =
          3 + Math.round((index / letters.length) * (SCRAMBLE_FRAMES - 4));
        const settled = letter === " " || frame >= settleAt;
        return (
          <span
            className={settled ? undefined : "text-violet-300/80"}
            // biome-ignore lint/suspicious/noArrayIndexKey: letters repeat, and their order never changes.
            key={index}
          >
            {settled ? letter : glyph(index, frame)}
          </span>
        );
      })}
    </motion.span>
  );
}

const DROP_STAGGER = 0.032;

/** Dropped in letter by letter like rain, and out the bottom the same way. */
function DrizzleLine({ text, enter, onEntered }: LineProps) {
  const letters = [...text];
  const entered = useLatest(onEntered);

  // The server-drawn line is already in place.
  useEffect(() => {
    if (!enter) {
      entered.current();
    }
  }, [enter, entered]);

  return (
    <span className="whitespace-pre">
      {letters.map((letter, index) => (
        <motion.span
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          className="inline-block"
          exit={{
            y: "120%",
            opacity: 0,
            transition: { duration: 0.28, delay: index * 0.014 },
          }}
          initial={
            enter ? { y: "-120%", opacity: 0, filter: "blur(3px)" } : false
          }
          // biome-ignore lint/suspicious/noArrayIndexKey: letters repeat, and their order never changes.
          key={index}
          onAnimationComplete={() => {
            if (enter && index === letters.length - 1) {
              entered.current();
            }
          }}
          transition={{
            duration: 0.42,
            delay: index * DROP_STAGGER,
            ease: EASE_OUT,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

/** A number counted up from zero, then its words. */
function CountLine({
  text,
  value = 0,
  enter,
  onEntered,
}: LineProps & { value?: number }) {
  const [shown, setShown] = useState(enter ? 0 : value);
  const entered = useLatest(onEntered);

  useEffect(() => {
    if (!enter) {
      entered.current();
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      ease: EASE_OUT,
      onUpdate: (latest) => setShown(Math.round(latest)),
      onComplete: () => entered.current(),
    });
    return () => controls.stop();
  }, [enter, value, entered]);

  return (
    <motion.span
      animate={{ y: "0%", opacity: 1 }}
      className="inline-flex items-baseline gap-1 whitespace-pre"
      exit={{ y: "-110%", opacity: 0, transition: { duration: 0.25 } }}
      initial={enter ? { y: "60%", opacity: 0 } : false}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <span className="font-mono font-semibold text-violet-200 tabular-nums">
        {shown}
      </span>
      {text}
    </motion.span>
  );
}

function TickerLine({
  message,
  ...props
}: Omit<LineProps, "text"> & { message: TickerMessage }) {
  switch (message.effect) {
    case "flicker":
      return <FlickerLine text={message.text} {...props} />;
    case "drizzle":
      return <DrizzleLine text={message.text} {...props} />;
    case "count":
      return <CountLine text={message.text} value={message.value} {...props} />;
    default:
      return <TypedLine text={message.text} {...props} />;
  }
}

/**
 * The moving line in the header's "New" item. Each message enters its own
 * way, holds, and leaves before the next one comes in. The first one is drawn
 * on the server and holds in place. It rests while `paused` (hovered or
 * focused), while the tab is hidden, and for good when the visitor prefers
 * less motion, who see the first message only. Screen readers get the
 * link's label instead, so the moving text is hidden from them.
 */
export function NewsTicker({
  messages,
  paused = false,
  className,
}: {
  messages: TickerMessage[];
  paused?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const hidden = useDocumentHidden();
  const [index, setIndex] = useState(0);
  const [entered, setEntered] = useState(true);
  const [cycled, setCycled] = useState(false);
  const running =
    reduceMotion === false && !paused && !hidden && messages.length > 1;

  useEffect(() => {
    if (!(running && entered)) {
      return;
    }
    const timer = setTimeout(() => {
      setEntered(false);
      setCycled(true);
      setIndex((current) => (current + 1) % messages.length);
    }, HOLD_MS);
    return () => clearTimeout(timer);
  }, [running, entered, messages.length]);

  const message = messages[index];
  if (!message) {
    return null;
  }
  return (
    <span
      aria-hidden="true"
      className={cn("relative flex items-center whitespace-nowrap", className)}
    >
      <AnimatePresence initial={false} mode="wait">
        <TickerLine
          enter={cycled}
          key={index}
          message={message}
          onEntered={() => setEntered(true)}
        />
      </AnimatePresence>
    </span>
  );
}
