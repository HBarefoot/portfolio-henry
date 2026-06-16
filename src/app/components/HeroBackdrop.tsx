"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative hero layers: an accent glow and a dot-grid that drift with the
 * cursor (and with scroll on the live site) for depth. Transform-only and
 * gated behind prefers-reduced-motion, so it can never hide content.
 */
export default function HeroBackdrop() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bg = gridRef.current;
    const glow = glowRef.current;
    if (!bg && !glow) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tmx = 0,
      tmy = 0,
      mx = 0,
      my = 0,
      sy = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      sy = window.scrollY || (document.scrollingElement ? document.scrollingElement.scrollTop : 0) || 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () => {
      mx += (tmx - mx) * 0.07;
      my += (tmy - my) * 0.07;
      if (bg) bg.style.transform = `translate3d(${(-mx * 24).toFixed(2)}px,${(-my * 22 - sy * 0.14).toFixed(2)}px,0)`;
      if (glow) glow.style.transform = `translate3d(${(mx * 54).toFixed(2)}px,${(my * 48 - sy * 0.06).toFixed(2)}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -140,
          left: "4%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent, #57b0e8) 24%, transparent), transparent 62%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          opacity: 0.7,
          willChange: "transform",
        }}
      />
      <div
        ref={gridRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: -110,
          bottom: -110,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "-1px -1px",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </>
  );
}
