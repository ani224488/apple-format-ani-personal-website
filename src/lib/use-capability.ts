"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media-query hook that is safe under static export.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: a media query is
 * exactly the external mutable source this hook is designed for, and it gets us
 * the server/client split for free — the server snapshot is always `false`, the
 * client snapshot reads the real value on first render instead of after a
 * second commit.
 *
 * Consumers must stay renderable under either answer. Branch on this to decide
 * *how* something animates, never whether an element exists, or the server and
 * client markup will disagree.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Phone-width screens, where scroll-linked work has to be rationed. */
export function useIsCompact() {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Devices with a real cursor. Pointer-tracked effects are pure cost on touch —
 * there is no hover state to reward the work, and the listeners still fire
 * during a drag.
 */
export function useHasPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
