"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Instant zero-scroll reset function
  const resetImmediateTop = useCallback(() => {
    if (typeof window === "undefined") return;

    // 1. Direct browser standard scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Lenis instance instant reset
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, options?: { immediate?: boolean; force?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, []);

  const scrollToTargetSection = useCallback((targetId: string) => {
    if (typeof window === "undefined") return false;

    const element = document.getElementById(targetId);
    if (!element) return false;

    const headerOffset = 85;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | HTMLElement, options?: { duration?: number; offset?: number; immediate?: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(offsetPosition, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    return true;
  }, []);

  const handleTargetNavigation = useCallback(() => {
    if (typeof window === "undefined") return;

    const storedSection = sessionStorage.getItem("scroll_to_section");
    const hashSection = window.location.hash.replace("#", "");
    const target = storedSection || hashSection;

    if (target && target !== "top") {
      // Retry at increasing intervals until DOM and animations settle
      let attempts = 0;
      const maxAttempts = 15;
      const intervalId = setInterval(() => {
        attempts++;
        const success = scrollToTargetSection(target);
        if (success && attempts > 3) {
          clearInterval(intervalId);
          sessionStorage.removeItem("scroll_to_section");
        }
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          sessionStorage.removeItem("scroll_to_section");
        }
      }, 150);
    } else {
      resetImmediateTop();
    }
  }, [scrollToTargetSection, resetImmediateTop]);

  // 1. On Mount & Page Show
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      handleTargetNavigation();

      const handleSplashDone = () => handleTargetNavigation();
      window.addEventListener("splash-finished", handleSplashDone);
      window.addEventListener("pageshow", handleTargetNavigation);

      return () => {
        window.removeEventListener("splash-finished", handleSplashDone);
        window.removeEventListener("pageshow", handleTargetNavigation);
      };
    }
  }, [handleTargetNavigation]);

  // 2. On Route / Pathname Change
  useEffect(() => {
    handleTargetNavigation();
  }, [pathname, handleTargetNavigation]);

  return null;
}



