import type { CSSProperties } from "react";
import AgentConsole from "./components/AgentConsole";
import HeroBackdrop from "./components/HeroBackdrop";
import ExperienceTimeline from "./components/ExperienceTimeline";
import StoryArc from "./components/StoryArc";
import PointerEffects from "./components/PointerEffects";
import TrackedLink from "./components/TrackedLink";
import ContactForm from "./components/ContactForm";

const RESUME = "/Henry_Barefoot_Resume.pdf";
const EMAIL = "henrybarefoot1987@gmail.com";
const GITHUB = "https://github.com/HBarefoot";
const LINKEDIN = "https://www.linkedin.com/in/hbarefoot/";

// Pointer-tracking spotlight gradient for [data-spot] surfaces.
const spot = (px: number, pct: number, fade: number, base?: string) =>
  `radial-gradient(${px}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--accent, #57b0e8) ${pct}%, transparent), transparent ${fade}%)${
    base ? `, ${base}` : ""
  }`;

const chip: CSSProperties = {
  fontSize: 11,
  color: "#9aa3ad",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 5,
  padding: "4px 9px",
};

const stackTag: CSSProperties = {
  fontSize: 13.5,
  color: "#d6dbe0",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 6,
  padding: "5px 11px",
};

const aiTag: CSSProperties = {
  fontSize: 13.5,
  color: "#e8eaed",
  background: "color-mix(in oklab, var(--accent, #57b0e8) 16%, transparent)",
  borderRadius: 6,
  padding: "5px 11px",
};

const kicker: CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--accent, #57b0e8)",
  marginBottom: 16,
};

const sectionTitle: CSSProperties = {
  fontWeight: 600,
  fontSize: "clamp(28px, 3.6vw, 42px)",
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  color: "#f4f6f8",
  margin: 0,
};

const cellLabel: CSSProperties = {
  fontSize: 10.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#5b6571",
  marginBottom: 14,
};

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div
      style={
        {
          "--accent": "#57b0e8",
          background: "#0a0c0f",
          color: "#e8eaed",
          minHeight: "100vh",
          overflowX: "hidden",
        } as CSSProperties
      }
    >
      {/* page-global pointer interactions (cursor glow + spotlight + magnetic) */}
      <PointerEffects />
      <div
        data-cursor-glow
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 460,
          height: 460,
          margin: "-230px 0 0 -230px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent, #57b0e8) 20%, transparent), transparent 60%)",
          pointerEvents: "none",
          zIndex: 60,
          opacity: 0,
          transition: "opacity .5s ease",
          mixBlendMode: "screen",
          willChange: "transform",
        }}
      />

      {/* ─────────────── NAV ─────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(14px)",
          background: "rgba(10,12,15,0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span
              className="font-display"
              style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", color: "#f4f6f8" }}
            >
              Henry Barefoot
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5b6571" }}
            >
              SR. ENGINEER
            </span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <a href="#work" className="nav-link hidden sm:inline" style={{ fontSize: 13.5 }}>
              Work
            </a>
            <a href="#oss" className="nav-link hidden sm:inline" style={{ fontSize: 13.5 }}>
              Open source
            </a>
            <a href="#stack" className="nav-link hidden sm:inline" style={{ fontSize: 13.5 }}>
              Stack
            </a>
            <a
              href="#contact"
              className="btn-accent"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 500,
                color: "#0a0c0f",
                background: "var(--accent, #57b0e8)",
                padding: "8px 15px",
                borderRadius: 7,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0a0c0f", opacity: 0.55 }} />
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      {/* ─────────────── HERO ─────────────── */}
      <header id="top" style={{ position: "relative", overflow: "hidden" }}>
        <HeroBackdrop />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1120, margin: "0 auto", padding: "96px 32px 80px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-14 items-start">
            {/* left: statement */}
            <div>
              <div
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7e8893",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  padding: "6px 13px",
                  marginBottom: 30,
                  animation: "hbup .75s cubic-bezier(.22,.61,.36,1) both",
                  animationDelay: ".05s",
                }}
              >
                <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "#5fd0a0",
                      animation: "hbpulse 2.4s ease-in-out infinite",
                    }}
                  />
                </span>
                Available · Senior contract / W-2 · Remote
              </div>

              <h1
                className="font-display"
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(40px, 5.4vw, 72px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "#f6f8fa",
                  margin: 0,
                  animation: "hbup .8s cubic-bezier(.22,.61,.36,1) both",
                  animationDelay: ".14s",
                }}
              >
                I build production
                <br />
                AI systems — and
                <br />
                own them <span style={{ color: "var(--accent, #57b0e8)" }}>end&nbsp;to&nbsp;end</span>.
              </h1>

              <p
                style={{
                  maxWidth: 560,
                  margin: "28px 0 0",
                  fontSize: 18,
                  lineHeight: 1.62,
                  color: "#9aa3ad",
                  animation: "hbup .8s cubic-bezier(.22,.61,.36,1) both",
                  animationDelay: ".24s",
                }}
              >
                Senior full-stack engineer, 8+ years. I architect, write, deploy, and operate agentic systems, RAG
                pipelines, and the automation that ties a business together — most recently as{" "}
                <span style={{ color: "#d6dbe0" }}>Director of Technology at Allied Yacht Transport</span>.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 36,
                  animation: "hbup .8s cubic-bezier(.22,.61,.36,1) both",
                  animationDelay: ".34s",
                }}
              >
                <TrackedLink
                  event="hero_contact_clicked"
                  href="#contact"
                  data-magnetic=""
                  className="btn-accent"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#0a0c0f",
                    background: "var(--accent, #57b0e8)",
                    padding: "13px 22px",
                    borderRadius: 8,
                  }}
                >
                  Get in touch
                  <span className="font-mono">→</span>
                </TrackedLink>
                <TrackedLink
                  event="resume_downloaded"
                  href={RESUME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#d6dbe0",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.14)",
                    padding: "13px 22px",
                    borderRadius: 8,
                  }}
                >
                  Resume (PDF)
                </TrackedLink>
                <a
                  href="#work"
                  className="link-soft"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    padding: "13px 8px",
                  }}
                >
                  See the work
                  <span className="font-mono" style={{ fontSize: 12 }}>
                    ↓
                  </span>
                </a>
              </div>
            </div>

            {/* right: live agent console + facts */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                animation: "hbslide .85s cubic-bezier(.22,.61,.36,1) both",
                animationDelay: ".28s",
              }}
            >
              <AgentConsole />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {[
                  ["Recent", "Allied Yacht Transport"],
                  ["Building", "Engram · Paw"],
                  ["Based", "Miami, FL · Remote"],
                  ["Langs", "EN / ES"],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: "#0a0c0f", padding: "12px 14px" }}>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 9.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#5b6571",
                        marginBottom: 5,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: 13, color: "#d6dbe0" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────── SELECTED WORK ─────────────── */}
      <section id="work" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }}>
          <div data-reveal style={{ marginBottom: 56, maxWidth: 640 }}>
            <div className="font-mono" style={kicker}>
              01 — Selected work
            </div>
            <h2 className="font-display" style={sectionTitle}>
              What I&apos;ve shipped, and what it produced.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#9aa3ad" }}>
              Four systems I architected and ran end to end. Every one is in production or open source today.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* 01 Allied */}
            <article
              data-reveal
              data-spot
              className="work-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(0,1fr)",
                gap: 28,
                padding: "36px 0 36px 16px",
                marginLeft: -16,
                borderTop: "1px solid rgba(255,255,255,0.09)",
                background: spot(480, 8, 55),
              }}
            >
              <div className="font-mono" style={{ fontSize: 13, color: "#5b6571", paddingTop: 5 }}>
                01
              </div>
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7e8893",
                    marginBottom: 8,
                  }}
                >
                  2025–26 · Director of Technology
                </div>
                <h3
                  className="font-display"
                  style={{ fontWeight: 600, fontSize: 24, letterSpacing: "-0.01em", color: "#f4f6f8", margin: 0 }}
                >
                  Allied Yacht Transport — AI logistics platform
                </h3>
                <p style={{ margin: "16px 0 0", maxWidth: 720, fontSize: 15.5, lineHeight: 1.62, color: "#9aa3ad" }}>
                  Led the end-to-end architecture and build of an AI-powered yacht-transport platform: three
                  specialized Claude-powered agents (visitor, member, internal admin) with human-in-the-loop approval
                  gates, plus dynamic pricing and routing engines handling weight, insurance, and compliance logic.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "10px 22px",
                    marginTop: 18,
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14, color: "#e8eaed" }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--accent, #57b0e8)",
                      }}
                    >
                      Outcome
                    </span>
                    Quote turnaround cut from <span style={{ color: "#fff", fontWeight: 600 }}>days to minutes</span>{" "}
                    across 15+ international ports.
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
                  {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "Claude API"].map((t) => (
                    <span key={t} className="font-mono" style={chip}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <TrackedLink
                    event="case_study_clicked"
                    properties={{ project: "Allied Yacht Transport" }}
                    href="/yacht-transport"
                    className="link-accent font-mono"
                    style={{ fontSize: 13.5 }}
                  >
                    Case study →
                  </TrackedLink>
                </div>
              </div>
            </article>

            {/* 02 Engram */}
            <article
              data-reveal
              data-spot
              className="work-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(0,1fr)",
                gap: 28,
                padding: "36px 0 36px 16px",
                marginLeft: -16,
                borderTop: "1px solid rgba(255,255,255,0.09)",
                background: spot(480, 8, 55),
              }}
            >
              <div className="font-mono" style={{ fontSize: 13, color: "#5b6571", paddingTop: 5 }}>
                02
              </div>
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7e8893",
                    marginBottom: 8,
                  }}
                >
                  2024– · Author &amp; maintainer
                </div>
                <h3
                  className="font-display"
                  style={{ fontWeight: 600, fontSize: 24, letterSpacing: "-0.01em", color: "#f4f6f8", margin: 0 }}
                >
                  Engram — persistent memory layer for AI agents
                </h3>
                <p style={{ margin: "16px 0 0", maxWidth: 720, fontSize: 15.5, lineHeight: 1.62, color: "#9aa3ad" }}>
                  Open-source MCP server giving agents cross-session memory — for Claude Desktop, Claude Code, Cursor,
                  n8n, and any MCP-compatible client. A single-process Node.js + SQLite (FTS5) + local-embeddings
                  architecture: zero Docker, Postgres, or Qdrant dependencies.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px 22px",
                    marginTop: 18,
                    fontSize: 14,
                    color: "#d6dbe0",
                  }}
                >
                  {["v1.5.3", "226 tests", "MIT", "GitHub Sponsors", "6 MCP directories"].map((t) => (
                    <span key={t} className="font-mono" style={{ fontSize: 12.5, color: "#9aa3ad" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 20 }}>
                  <TrackedLink
                    event="oss_card_clicked"
                    properties={{ project_name: "engram", location: "work_section" }}
                    href={`${GITHUB}/engram`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5 }}
                  >
                    GitHub{" "}
                    <span className="font-mono" style={{ fontSize: 11 }}>
                      ↗
                    </span>
                  </TrackedLink>
                </div>
              </div>
            </article>

            {/* 03 Paw */}
            <article
              data-reveal
              data-spot
              className="work-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(0,1fr)",
                gap: 28,
                padding: "36px 0 36px 16px",
                marginLeft: -16,
                borderTop: "1px solid rgba(255,255,255,0.09)",
                background: spot(480, 8, 55),
              }}
            >
              <div className="font-mono" style={{ fontSize: 13, color: "#5b6571", paddingTop: 5 }}>
                03
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7e8893" }}
                  >
                    2026 · Solo build
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent, #57b0e8)",
                      border: "1px solid color-mix(in oklab, var(--accent, #57b0e8) 45%, transparent)",
                      borderRadius: 999,
                      padding: "2px 8px",
                    }}
                  >
                    New
                  </span>
                </div>
                <h3
                  className="font-display"
                  style={{ fontWeight: 600, fontSize: 24, letterSpacing: "-0.01em", color: "#f4f6f8", margin: 0 }}
                >
                  Paw — autonomous engineering agent
                </h3>
                <p style={{ margin: "16px 0 0", maxWidth: 720, fontSize: 15.5, lineHeight: 1.62, color: "#9aa3ad" }}>
                  A self-directed agent that plans, executes, and verifies multi-step engineering tasks against a real
                  codebase — pairing the Engram memory layer with tool-use and human approval checkpoints. Built to take
                  a goal and drive it to a working, tested result.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
                  {["TypeScript", "MCP", "Claude API", "Engram"].map((t) => (
                    <span key={t} className="font-mono" style={chip}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* 04 Frutero */}
            <article
              data-reveal
              data-spot
              className="work-row"
              style={{
                display: "grid",
                gridTemplateColumns: "64px minmax(0,1fr)",
                gap: 28,
                padding: "36px 0 36px 16px",
                marginLeft: -16,
                borderTop: "1px solid rgba(255,255,255,0.09)",
                borderBottom: "1px solid rgba(255,255,255,0.09)",
                background: spot(480, 8, 55),
              }}
            >
              <div className="font-mono" style={{ fontSize: 13, color: "#5b6571", paddingTop: 5 }}>
                04
              </div>
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#7e8893",
                    marginBottom: 8,
                  }}
                >
                  Solo build · Open source
                </div>
                <h3
                  className="font-display"
                  style={{ fontWeight: 600, fontSize: 24, letterSpacing: "-0.01em", color: "#f4f6f8", margin: 0 }}
                >
                  Frutero — Raspberry Pi controller with AI advisor
                </h3>
                <p style={{ margin: "16px 0 0", maxWidth: 720, fontSize: 15.5, lineHeight: 1.62, color: "#9aa3ad" }}>
                  Local-first controller for monotub fruiting chambers, with a Claude/Ollama-powered advisor that
                  detects contamination from sensor and camera data. GPIO hardware control, live camera streaming,
                  smart-mist safety clamps, multi-channel alerts, and a tiered SaaS dashboard.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
                  {["Raspberry Pi GPIO", "Node.js", "Claude / Ollama", "systemd · TLS"].map((t) => (
                    <span key={t} className="font-mono" style={chip}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────── EXPERIENCE ─────────────── */}
      <section id="experience" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }}>
          <div data-reveal style={{ marginBottom: 40, maxWidth: 680 }}>
            <div className="font-mono" style={kicker}>
              02 — Experience
            </div>
            <h2 className="font-display" style={sectionTitle}>
              How I got here.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#9aa3ad" }}>
              From automating the inbox to architecting autonomous systems — the path in six steps. Press play, or
              scrub the timeline.
            </p>
          </div>

          <div data-reveal style={{ marginBottom: 72 }}>
            <StoryArc />
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#5b6571",
              marginBottom: 16,
            }}
          >
            Full history
          </div>
          <ExperienceTimeline />
        </div>
      </section>

      {/* ─────────────── OPEN SOURCE ─────────────── */}
      <section id="oss" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }}>
          <div data-reveal style={{ marginBottom: 48, maxWidth: 640 }}>
            <div className="font-mono" style={kicker}>
              03 — Open source
            </div>
            <h2 className="font-display" style={sectionTitle}>
              Tools I maintain in public.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#9aa3ad" }}>
              MIT-licensed infrastructure for the agent ecosystem — used by other engineers, not just me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Engram card */}
            <TrackedLink
              event="oss_card_clicked"
              properties={{ project_name: "engram" }}
              data-reveal=""
              data-spot=""
              href={`${GITHUB}/engram`}
              target="_blank"
              rel="noopener noreferrer"
              className="oss-card"
              style={{
                display: "block",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                background: spot(300, 16, 66, "#0d1014"),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="font-mono" style={{ fontSize: 13, color: "#d6dbe0" }}>
                  HBarefoot / engram
                </span>
                <span className="font-mono" style={{ fontSize: 11, color: "#5b6571" }}>
                  ↗
                </span>
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.58, color: "#9aa3ad" }}>
                Persistent MCP memory layer for AI agents. Single-process Node.js + SQLite (FTS5) + local embeddings.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {["● TypeScript", "MIT", "226 tests", "v1.5.3"].map((t) => (
                  <span key={t} className="font-mono" style={{ fontSize: 11.5, color: "#7e8893" }}>
                    {t}
                  </span>
                ))}
              </div>
            </TrackedLink>

            {/* Paw card */}
            <TrackedLink
              event="oss_card_clicked"
              properties={{ project_name: "paw" }}
              data-reveal=""
              data-rd="1"
              data-spot=""
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="oss-card"
              style={{
                display: "block",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                background: spot(300, 16, 66, "#0d1014"),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="font-mono" style={{ fontSize: 13, color: "#d6dbe0" }}>
                  HBarefoot / paw
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent, #57b0e8)",
                    border: "1px solid color-mix(in oklab, var(--accent, #57b0e8) 45%, transparent)",
                    borderRadius: 999,
                    padding: "2px 8px",
                  }}
                >
                  New
                </span>
              </div>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.58, color: "#9aa3ad" }}>
                Autonomous engineering agent — plans, executes, and verifies multi-step tasks with memory and approval
                gates.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginTop: 18,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {["● TypeScript", "MCP", "Claude API"].map((t) => (
                  <span key={t} className="font-mono" style={{ fontSize: 11.5, color: "#7e8893" }}>
                    {t}
                  </span>
                ))}
              </div>
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ─────────────── STACK ─────────────── */}
      <section id="stack" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }}>
          <div data-reveal style={{ marginBottom: 48, maxWidth: 640 }}>
            <div className="font-mono" style={kicker}>
              04 — Capabilities
            </div>
            <h2 className="font-display" style={sectionTitle}>
              What I reach for.
            </h2>
          </div>

          <div
            data-reveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{
              gap: 1,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {[
              { label: "Languages", items: ["TypeScript", "JavaScript", "Node.js", "Python", "PHP", "SQL"] },
              { label: "Frontend", items: ["Next.js", "React", "Tailwind", "shadcn/ui", "Framer Motion"] },
              { label: "Backend", items: ["Express", "REST", "GraphQL", "WebSockets", "OAuth 2.0"] },
              { label: "Data", items: ["PostgreSQL", "MongoDB", "SQLite (FTS5)", "BigQuery"] },
              {
                label: "AI / LLM",
                accent: true,
                items: ["Claude API", "MCP", "RAG pipelines", "LangChain", "Ollama", "Local embeddings"],
              },
              { label: "Automation & DevOps", items: ["n8n", "Stripe", "Docker", "Vercel", "AWS", "GitHub Actions"] },
            ].map((cat) => (
              <div key={cat.label} data-spot style={{ background: spot(300, 10, 60, "#0a0c0f"), padding: 24 }}>
                <div
                  className="font-mono"
                  style={{ ...cellLabel, color: cat.accent ? "var(--accent, #57b0e8)" : "#5b6571" }}
                >
                  {cat.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {cat.items.map((it) => (
                    <span key={it} className="stack-chip" style={cat.accent ? aiTag : stackTag}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── APPROACH ─────────────── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 32px" }}>
          <div data-reveal style={{ marginBottom: 48, maxWidth: 640 }}>
            <div className="font-mono" style={kicker}>
              05 — Approach
            </div>
            <h2 className="font-display" style={sectionTitle}>
              How I work.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                rd: undefined,
                n: "01",
                title: "Senior IC, end to end",
                body:
                  "I architect, write the code, deploy it, and own it in production. The result has a single, clear point of accountability.",
              },
              {
                rd: "1" as const,
                n: "02",
                title: "Outcomes over output",
                body:
                  "Every build maps to a number that matters — turnaround cut, hours returned, tools consolidated, revenue unblocked.",
              },
              {
                rd: "2" as const,
                n: "03",
                title: "Boring tech, sharp execution",
                body:
                  "Postgres, TypeScript, a clean deploy. I pick tools that survive on-call at 2am over tools that look good in a thread.",
              },
            ].map((c) => (
              <div
                key={c.n}
                data-reveal
                data-rd={c.rd}
                data-spot
                className="approach-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 14,
                  background: spot(340, 9, 60),
                  padding: "30px 26px",
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-display"
                  style={{
                    position: "absolute",
                    top: -24,
                    right: 2,
                    fontWeight: 700,
                    fontSize: 120,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.04)",
                    pointerEvents: "none",
                  }}
                >
                  {c.n}
                </span>
                <div
                  className="font-mono"
                  style={{
                    position: "relative",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--accent, #57b0e8)",
                    marginBottom: 16,
                  }}
                >
                  Principle {c.n}
                </div>
                <h3
                  className="font-display"
                  style={{
                    position: "relative",
                    fontWeight: 600,
                    fontSize: 19,
                    letterSpacing: "-0.01em",
                    color: "#f4f6f8",
                    margin: "0 0 10px",
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ position: "relative", margin: 0, fontSize: 14.5, lineHeight: 1.62, color: "#9aa3ad" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section
        id="contact"
        style={{
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 820,
            height: 460,
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--accent, #57b0e8) 14%, transparent), transparent 66%)",
            filter: "blur(54px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "100px 32px" }}>
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]"
            style={{ gap: "64px 80px", alignItems: "start" }}
          >
            {/* Left: heading + direct links */}
            <div data-reveal>
              <div className="font-mono" style={{ ...kicker, marginBottom: 18 }}>
                06 — Contact
              </div>
              <h2
                className="font-display"
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(32px, 4.4vw, 52px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                  color: "#f6f8fa",
                  margin: 0,
                }}
              >
                Let&apos;s build something
                <br />
                that ships.
              </h2>
              <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.6, color: "#9aa3ad" }}>
                I read every message myself. If you&apos;re hiring, include the role, the team, and the outcome you&apos;re
                hiring for — I&apos;ll reply within 24 hours.
              </p>

              {/* Email takes full width so the long address never wraps */}
              <div style={{ marginTop: 36 }}>
                <TrackedLink
                  event="contact_email_clicked"
                  href={`mailto:${EMAIL}`}
                  data-magnetic=""
                  className="btn-accent btn-email"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#0a0c0f",
                    background: "var(--accent, #57b0e8)",
                    padding: "14px 22px",
                    borderRadius: 8,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {EMAIL}
                </TrackedLink>
                {/* GitHub + LinkedIn always side-by-side below the email */}
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <TrackedLink
                    event="contact_github_clicked"
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 9,
                      fontSize: 14.5,
                      fontWeight: 500,
                      color: "#d6dbe0",
                      border: "1px solid rgba(255,255,255,0.14)",
                      padding: "14px 22px",
                      borderRadius: 8,
                      flex: 1,
                    }}
                  >
                    GitHub
                  </TrackedLink>
                  <TrackedLink
                    event="contact_linkedin_clicked"
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 9,
                      fontSize: 14.5,
                      fontWeight: 500,
                      color: "#d6dbe0",
                      border: "1px solid rgba(255,255,255,0.14)",
                      padding: "14px 22px",
                      borderRadius: 8,
                      flex: 1,
                    }}
                  >
                    LinkedIn
                  </TrackedLink>
                </div>
              </div>

              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#5b6571",
                  marginTop: 32,
                }}
              >
                Miami, FL · Remote · Bilingual EN / ES
              </div>
            </div>

            {/* Right: contact form */}
            <div data-reveal data-rd="1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "28px 32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12.5, color: "#5b6571" }}>© {year} Henry Barefoot</span>
          <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.06em", color: "#5b6571" }}>
            henrybarefoot.com
          </span>
        </div>
      </footer>
    </div>
  );
}
