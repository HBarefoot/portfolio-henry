"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Open-source card: a pointer-tracking accent glow follows the cursor across the
 * card (via --mx/--my), plus a lift-on-hover. Children stay as plain markup.
 */
export default function SpotlightLink({
  href,
  children,
  dataRd,
}: {
  href: string;
  children: ReactNode;
  dataRd?: "1" | "2";
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <a
      ref={ref}
      data-reveal=""
      data-rd={dataRd}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent, #57b0e8) 50%, transparent)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      style={{
        display: "block",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: 24,
        background:
          "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent, #57b0e8) 16%, transparent), transparent 66%), #0d1014",
        transition: "border-color .2s, transform .2s",
      }}
    >
      {children}
    </a>
  );
}
