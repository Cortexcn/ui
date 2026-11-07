"use client";

import { useCallback, useReducer, useSyncExternalStore } from "react";

/** 1 when the next slide comes in from the right, -1 from the left. */
export type Direction = 1 | -1;

export interface SlideChange {
  /** Counts up, so every change mounts a fresh glass layer. */
  id: number;
  to: number;
  direction: Direction;
}

interface SlideshowState {
  /** The slide the caption and progress show: where the slideshow is going. */
  current: number;
  /** The slide drawn underneath, which the arriving one covers. */
  base: number;
  /** The change in progress, until its glass has cleared. */
  change: SlideChange | null;
  nextId: number;
}

type SlideshowAction =
  | { type: "go"; to: number; direction: Direction }
  | { type: "settle"; id: number };

function reducer(
  state: SlideshowState,
  action: SlideshowAction,
): SlideshowState {
  if (action.type === "settle") {
    if (state.change?.id !== action.id) {
      return state;
    }
    return { ...state, base: state.change.to, change: null };
  }
  if (action.to === state.current) {
    return state;
  }
  return {
    current: action.to,
    // A change made while another is still landing snaps that one into place.
    base: state.change ? state.change.to : state.base,
    change: { id: state.nextId, to: action.to, direction: action.direction },
    nextId: state.nextId + 1,
  };
}

/**
 * Which slide is showing, which one sits underneath, and the change in
 * progress. `settle` is called once the arriving slide's glass has cleared.
 */
export function useSlideshow(count: number) {
  const [state, dispatch] = useReducer(reducer, {
    current: 0,
    base: 0,
    change: null,
    nextId: 0,
  });

  const goTo = useCallback(
    (to: number, direction?: Direction) => {
      const target = ((to % count) + count) % count;
      dispatch({
        type: "go",
        to: target,
        direction: direction ?? (target > state.current ? 1 : -1),
      });
    },
    [count, state.current],
  );

  const next = useCallback(
    () => goTo(state.current + 1, 1),
    [goTo, state.current],
  );
  const previous = useCallback(
    () => goTo(state.current - 1, -1),
    [goTo, state.current],
  );
  const settle = useCallback(
    (id: number) => dispatch({ type: "settle", id }),
    [],
  );

  return { ...state, goTo, next, previous, settle };
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/** True while the tab is in the background, so autoplay can wait. */
export function usePageHidden() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
}
