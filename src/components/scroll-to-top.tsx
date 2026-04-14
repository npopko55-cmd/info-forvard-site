"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Prevent browser auto-restoring scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // If URL has a hash, browser handles anchor scroll; otherwise force top
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return null;
}
