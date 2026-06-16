"use client";

import { useEffect } from "react";

/**
 * Page-global pointer interactions, mounted once:
 *  - positions the [data-cursor-glow] element under the pointer (fades in on first move),
 *  - drives the spotlight (--mx/--my) on every [data-spot] surface,
 *  - applies the magnetic pull to every [data-magnetic] button.
 *
 * Renders nothing; it only wires listeners against server-rendered DOM.
 */
export default function PointerEffects() {
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Cursor glow (motion — skipped under reduced-motion).
    if (!reduce) {
      const glow = document.querySelector<HTMLElement>("[data-cursor-glow]");
      if (glow) {
        const onMove = (e: MouseEvent) => {
          glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
          glow.style.opacity = "1";
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("mousemove", onMove));
      }
    }

    // Spotlight surfaces (harmless — runs regardless of reduced-motion).
    document.querySelectorAll<HTMLElement>("[data-spot]").forEach((el) => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      };
      el.addEventListener("pointermove", onMove);
      cleanups.push(() => el.removeEventListener("pointermove", onMove));
    });

    // Magnetic buttons (motion — skipped under reduced-motion).
    if (!reduce) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transition = "transform .08s linear";
          el.style.transform = `translate(${(x * 0.32).toFixed(1)}px,${(y * 0.5).toFixed(1)}px)`;
        };
        const onLeave = () => {
          el.style.transition = "transform .35s cubic-bezier(.22,.61,.36,1)";
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
