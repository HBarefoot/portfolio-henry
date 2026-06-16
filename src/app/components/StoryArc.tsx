"use client";

import { useEffect, useState } from "react";

type Chapter = { year: string; tag: string; role: string; line: string };

// The arc: from automating the inbox (2018) to architecting autonomous systems (2026).
const ARC: Chapter[] = [
  {
    year: "2018",
    tag: "Where it started",
    role: "Email Developer · Crystal Cruises",
    line: "Automating the inbox — a Node.js tool with Cheerio and MongoDB that generated email content blocks. The first time I made a system do the repetitive work for me.",
  },
  {
    year: "2020",
    tag: "Taking the lead",
    role: "Sr. Web Developer · Vital Pharmaceuticals",
    line: "Leading a dev team and shipping marketing features across PHP, Node, and React — learning to own delivery end to end, not just write code.",
  },
  {
    year: "2022",
    tag: "Enterprise rigor",
    role: "Email Developer · AARP",
    line: "Custom email systems in Salesforce Marketing Cloud — segmentation, automation, and performance metrics at national scale.",
  },
  {
    year: "2023",
    tag: "Data-driven",
    role: "Web Developer · Addigy",
    line: "WordPress at scale with 8+ custom plugins, plus Looker Studio and BigQuery dashboards that turned raw data into decisions.",
  },
  {
    year: "2025",
    tag: "Director of Technology",
    role: "Allied Yacht Transport",
    line: "Architected an AI logistics platform end to end — three Claude agents, dynamic pricing and routing, and quote turnaround cut from days to minutes.",
  },
  {
    year: "2026",
    tag: "Building in public",
    role: "Open source · Engram + Paw",
    line: "Memory and autonomy for the agent ecosystem — MIT-licensed infrastructure that other engineers build on top of.",
  },
];

const TOTAL = ARC.length;

export default function StoryArc() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TOTAL), 3800);
    return () => clearInterval(id);
  }, [playing]);

  const chapter = ARC[active];
  const progress = TOTAL > 1 ? `${((active / (TOTAL - 1)) * 100).toFixed(1)}%` : "0%";
  const counter = `${String(active + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;

  return (
    <>
      {/* scrubber timeline */}
      <div style={{ position: "relative", marginBottom: 38 }}>
        <div style={{ position: "absolute", left: 8, right: 8, top: 7, height: 2, background: "rgba(255,255,255,0.1)" }} />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 7,
            height: 2,
            background: "var(--accent, #57b0e8)",
            width: progress,
            maxWidth: "calc(100% - 16px)",
            transition: "width .55s cubic-bezier(.22,.61,.36,1)",
          }}
        />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between" }}>
          {ARC.map((c, idx) => {
            const isActive = idx === active;
            const done = idx < active;
            return (
              <button
                key={c.year}
                type="button"
                onClick={() => {
                  setActive(idx);
                  setPlaying(false);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 11,
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  padding: 0,
                  flex: "none",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: `2px solid ${isActive || done ? "var(--accent, #57b0e8)" : "rgba(255,255,255,0.25)"}`,
                    background: isActive || done ? "var(--accent, #57b0e8)" : "transparent",
                    transition: "background .3s ease, border-color .3s ease, transform .3s ease",
                    transform: `scale(${isActive ? 1.3 : 1})`,
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: 12,
                    color: isActive ? "#f4f6f8" : done ? "#9aa3ad" : "#5b6571",
                    transition: "color .3s ease",
                  }}
                >
                  {c.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* narrating panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "clamp(20px, 4vw, 44px)",
          alignItems: "center",
          minHeight: 168,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          background: "linear-gradient(180deg, rgba(255,255,255,0.022), rgba(255,255,255,0))",
          padding: "32px clamp(22px, 3vw, 36px)",
        }}
      >
        <div
          className="font-display"
          style={{
            fontWeight: 600,
            fontSize: "clamp(46px, 6.5vw, 82px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--accent, #57b0e8)",
          }}
        >
          {chapter.year}
        </div>
        <div>
          <div
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7e8893", marginBottom: 10 }}
          >
            {chapter.tag}
          </div>
          <div
            className="font-display"
            style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", color: "#f4f6f8", marginBottom: 12 }}
          >
            {chapter.role}
          </div>
          <p style={{ margin: 0, maxWidth: 620, fontSize: 16, lineHeight: 1.62, color: "#9aa3ad" }}>{chapter.line}</p>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 22 }}>
        <button
          type="button"
          aria-label="Previous chapter"
          onClick={() => {
            setActive((a) => (a - 1 + TOTAL) % TOTAL);
            setPlaying(false);
          }}
          className="btn-outline"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 9,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "transparent",
            color: "#d6dbe0",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            height: 40,
            padding: "0 18px",
            borderRadius: 9,
            border: "1px solid color-mix(in oklab, var(--accent, #57b0e8) 45%, transparent)",
            background: "color-mix(in oklab, var(--accent, #57b0e8) 12%, transparent)",
            color: "#e8eaed",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          aria-label="Next chapter"
          onClick={() => {
            setActive((a) => (a + 1) % TOTAL);
            setPlaying(false);
          }}
          className="btn-outline"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 9,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "transparent",
            color: "#d6dbe0",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          →
        </button>
        <span className="font-mono" style={{ fontSize: 12, color: "#5b6571", marginLeft: 6 }}>
          {counter}
        </span>
      </div>
    </>
  );
}
