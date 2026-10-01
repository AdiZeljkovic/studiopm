"use client";

import { useEffect } from "react";

/**
 * Makes every in-page anchor ("#studio", "/fr#contact", ...) scroll reliably.
 *
 * Browsers and client-side routers skip the scroll when the URL hash is
 * already the same (clicking "Discover the studio" twice), and on mobile the
 * menu's scroll lock can swallow the jump. This handler intercepts same-page
 * hash links, waits a frame for any overlay to close, then scrolls smoothly
 * to the target and updates the URL without adding a history entry.
 */
export function HashLinkHandler() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const id = decodeURIComponent(url.hash.slice(1));
      const target = id === "top" ? document.body : document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Two frames: lets the mobile menu close and release its scroll lock first.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (id === "top") window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
          else {
            target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
            // Content loaded on the way (e.g. the questionnaire) can move the
            // target; settle on it once more after the smooth scroll.
            window.setTimeout(() => {
              const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
              if (Math.abs(target.getBoundingClientRect().top - offset) > 24) {
                target.scrollIntoView({ behavior: "auto", block: "start" });
              }
            }, 1100);
          }
          window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}#${id}`);
        }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
