"use client";

import { useEffect, useRef } from "react";

const ACCENT_RGB = "87,176,232"; // #57b0e8

/**
 * Decorative hero layers: an accent glow + dot-grid that drift with the cursor
 * (and scroll), plus a canvas "agent mesh" — drifting nodes that link by
 * proximity, bend toward the cursor, and fire signal pulses along their edges.
 * All transform/canvas driven and gated behind prefers-reduced-motion.
 */
export default function HeroBackdrop() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const meshRef = useRef<HTMLCanvasElement | null>(null);

  // Cursor + scroll parallax on the glow and dot-grid.
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

  // Agent mesh.
  useEffect(() => {
    const canvas = meshRef.current;
    if (!canvas) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    if (!ctx || !hero) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0,
      raf = 0;

    const resize = () => {
      const r = hero.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const N = Math.max(26, Math.min(52, Math.round(w / 26)));
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < N; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      });
    }

    let mxp = -9999,
      myp = -9999;
    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mxp = e.clientX - r.left;
      myp = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const maxD = 132,
      maxD2 = maxD * maxD,
      mouseD = 180,
      mouseD2 = mouseD * mouseD;
    const pulses: { a: (typeof nodes)[number]; b: (typeof nodes)[number]; t: number }[] = [];
    let pt = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = mxp - n.x,
          dy = myp - n.y,
          d2 = dx * dx + dy * dy;
        if (d2 < mouseD2) {
          const f = (1 - Math.sqrt(d2) / mouseD) * 0.018;
          n.x += dx * f;
          n.y += dy * f;
        }
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y,
            d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            ctx.strokeStyle = `rgba(${ACCENT_RGB},${((1 - d2 / maxD2) * 0.42).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        const dx = mxp - n.x,
          dy = myp - n.y,
          d2 = dx * dx + dy * dy;
        if (d2 < mouseD2) {
          ctx.strokeStyle = `rgba(${ACCENT_RGB},${((1 - d2 / mouseD2) * 0.55).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mxp, myp);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
      pt++;
      if (pt > 34) {
        pt = 0;
        const a = nodes[(Math.random() * N) | 0];
        let best: (typeof nodes)[number] | null = null,
          bd = maxD2;
        for (const b of nodes) {
          if (b === a) continue;
          const dx = a.x - b.x,
            dy = a.y - b.y,
            d2 = dx * dx + dy * dy;
          if (d2 < bd) {
            bd = d2;
            best = b;
          }
        }
        if (best) pulses.push({ a, b: best, t: 0 });
      }
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pl = pulses[p];
        pl.t += 0.028;
        if (pl.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }
        const x = pl.a.x + (pl.b.x - pl.a.x) * pl.t,
          y = pl.a.y + (pl.b.y - pl.a.y) * pl.t;
        ctx.fillStyle = `rgba(${ACCENT_RGB},0.22)`;
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT_RGB},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, 6.283);
        ctx.fill();
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${ACCENT_RGB},0.65)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
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
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "-1px -1px",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      <canvas
        ref={meshRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />
    </>
  );
}
