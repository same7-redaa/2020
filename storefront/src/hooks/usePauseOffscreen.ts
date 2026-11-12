"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses all CSS animations inside the referenced element while it is
 * off-screen (sets data-offscreen="true"; see globals.css). Saves GPU/CPU
 * during scrolling on mobile without changing anything the user can see.
 */
export function usePauseOffscreen<T extends HTMLElement>(rootMargin = "150px 0px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry.isIntersecting ? "false" : "true";
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
