"use client";

import { useEffect } from "react";
import { ymGoal } from "@/lib/metrika";
import { captureUtm } from "@/lib/utm";

export function AnalyticsTracker() {
  useEffect(() => {
    captureUtm();

    // Phone clicks
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (link) {
        ymGoal("phone_click", { phone: link.getAttribute("href") });
      }
    };
    document.addEventListener("click", onClick);

    // Scroll to form (#contact in viewport)
    const contact = document.getElementById("contact");
    let fired = false;
    let observer: IntersectionObserver | null = null;
    if (contact) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting && !fired) {
              fired = true;
              ymGoal("scroll_to_form");
              observer?.disconnect();
            }
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(contact);
    }

    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, []);

  return null;
}
