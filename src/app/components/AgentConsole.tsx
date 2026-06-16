"use client";

import { useEffect, useState } from "react";

const ACCENT = "#57b0e8";
const EMERALD = "#5fd0a0";
const TEXT = "#c7ccd2";

type Line = {
  sym: string;
  symColor: string;
  label: string;
  text: string;
  textColor: string;
};

// The Paw run loop the hero console types out, then loops.
const PLAN: Line[] = [
  { sym: "$", symColor: "#7e8893", label: "", text: 'paw run "cut quote turnaround"', textColor: "#e8eaed" },
  { sym: "●", symColor: ACCENT, label: "plan", text: "decompose goal → 4 steps", textColor: TEXT },
  { sym: "●", symColor: ACCENT, label: "recall", text: "engram · 12 memories matched", textColor: TEXT },
  { sym: "→", symColor: EMERALD, label: "tool", text: "query_ports(region=EU) · ok 41ms", textColor: TEXT },
  { sym: "→", symColor: EMERALD, label: "tool", text: "price_engine(weight,ins) · ok 58ms", textColor: TEXT },
  { sym: "●", symColor: ACCENT, label: "verify", text: "tests 226/226 passing", textColor: TEXT },
  { sym: "✓", symColor: EMERALD, label: "done", text: "quote ready · 2.3s", textColor: "#e8eaed" },
];

function Row({ line, cursor }: { line: Line; cursor?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <span style={{ flex: "none", width: 12, textAlign: "center", color: line.symColor }}>{line.sym}</span>
      <span style={{ flex: "none", width: 52, color: "#5b6571" }}>{line.label}</span>
      <span style={{ color: line.textColor }}>
        {line.text}
        {cursor ? (
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 14,
              verticalAlign: -2,
              marginLeft: 3,
              background: "var(--accent, #57b0e8)",
              animation: "hbblink 1.05s steps(1) infinite",
            }}
          />
        ) : null}
      </span>
    </div>
  );
}

export default function AgentConsole() {
  const [shown, setShown] = useState<Line[]>([]);
  const [current, setCurrent] = useState<Line | null>(null);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const next = () => {
      if (!alive) return;
      if (i >= PLAN.length) {
        timer = setTimeout(() => {
          if (!alive) return;
          setShown([]);
          setCurrent(null);
          i = 0;
          timer = setTimeout(next, 600);
        }, 2800);
        return;
      }
      const ev = PLAN[i];
      let c = 0;
      const type = () => {
        if (!alive) return;
        c++;
        setCurrent({ ...ev, text: ev.text.slice(0, c) });
        if (c < ev.text.length) {
          timer = setTimeout(type, 20 + Math.random() * 22);
        } else {
          setShown((s) => s.concat([ev]));
          setCurrent(null);
          i++;
          timer = setTimeout(next, 300);
        }
      };
      type();
    };

    timer = setTimeout(next, 700);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        background: "#0c0f13",
        overflow: "hidden",
        boxShadow: "0 30px 70px -34px rgba(0,0,0,0.85)",
      }}
    >
      {/* title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.018)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ display: "flex", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2a2f37" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2a2f37" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2a2f37" }} />
          </span>
          <span
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: "0.04em", color: "#7e8893", whiteSpace: "nowrap" }}
          >
            paw · run
          </span>
        </div>
        <span
          className="font-mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: EMERALD,
          }}
        >
          <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: EMERALD,
                animation: "hbpulse 2s ease-in-out infinite",
              }}
            />
          </span>
          live
        </span>
      </div>

      {/* console body */}
      <div
        className="font-mono"
        style={{ padding: "16px 18px", fontSize: 12.5, lineHeight: 1.95, minHeight: 232 }}
      >
        {shown.map((line, idx) => (
          <Row key={idx} line={line} />
        ))}
        {current ? <Row line={current} cursor /> : null}
      </div>
    </div>
  );
}
