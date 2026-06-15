import { Fragment } from "react";
import Link from "next/link";
import { RevealOnScroll } from "./components/RevealOnScroll";

/* ─────────────────── Inline Icons ─────────────────── */
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.11v3.13c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ─────────────────── Data ─────────────────── */
const STATS = [
  { value: "8+", label: "years shipping production web + AI systems" },
  { value: "15+", label: "ports live on the Allied platform" },
  { value: "Days → minutes", label: "quote turnaround at Allied Yacht Transport" },
  { value: "226", label: "tests behind Engram v1.5.3 (open-source, MIT)" },
];

const PROJECTS = [
  {
    year: "2025",
    role: "Director of Technology",
    title: "Allied — AI-powered yacht transport platform",
    for_: "Allied Yacht Transport · 15+ international ports",
    built:
      "Three Claude-powered agents (visitor/member/admin) with human-in-the-loop approval. Dynamic pricing + routing engine. Secure admin dashboard with RBAC.",
    outcome: "Days → minutes quote turnaround across 15+ international ports. $500K+ saved on ops in year one.",
    links: [
      { label: "Case study", href: "#allied" },
      { label: "Talk", href: "mailto:henrybarefoot1987@gmail.com?subject=Allied%20case%20study" },
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "Claude API", "Tailwind CSS", "Vercel"],
  },
  {
    year: "2024–25",
    role: "Author & maintainer",
    title: "Engram — MCP memory layer for AI agents",
    for_: "AI engineers running multi-agent systems",
    built:
      "Open-source Model Context Protocol server that gives agents persistent, queryable memory across sessions. Single-process Node.js + SQLite + FTS5 + local embeddings — zero Docker, Postgres, or Qdrant dependencies. Works with Claude Desktop, Claude Code, Cursor, n8n, and any MCP client.",
    outcome: "v1.5.3 in production · 226 tests · MIT-licensed · GitHub Sponsors · listed in 6 MCP-server directories.",
    links: [
      { label: "GitHub", href: "https://github.com/HBarefoot/engram" },
      { label: "NPM", href: "https://www.npmjs.com/package/engram-mcp" },
    ],
    stack: ["Node.js", "TypeScript", "SQLite (FTS5)", "MCP", "Xenova"],
  },
  {
    year: "2025–26",
    role: "Founder & builder",
    title: "Paw — personal AI orchestrator",
    for_: "Barefoot Digital",
    built:
      "Bun + TypeScript kernel; multi-provider (Claude, OpenAI, Ollama, Gemini); plugin + MCP system; hybrid vector + FTS memory (SQLite + sqlite-vec); cron, web UI (Hono/JSX), and a Slack orchestrator that routes to specialist sub-agents.",
    outcome: "Runs Henry's pipeline + ops in Slack; white-labeled into ConstructAI.",
    links: [
      { label: "Live", href: "https://paw.henrybarefoot.com" },
    ],
    stack: ["Bun", "TypeScript", "Hono", "SQLite", "MCP", "Claude API"],
  },
];

const STACK = {
  Languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  Frameworks: ["Next.js", "React", "Node.js", "Express", "FastAPI"],
  Data: ["PostgreSQL", "SQLite", "Redis", "Prisma"],
  AI: ["MCP", "OpenAI", "Anthropic", "Ollama", "n8n"],
  Infra: ["Vercel", "GitHub Pages", "Cloudflare", "Docker"],
};

const WORK_STYLE = [
  {
    title: "Senior IC, not a manager",
    body:
      "I architect, write the code, deploy it, and own it in production. When I'm done, the system has a single throat to choke and that throat is me.",
  },
  {
    title: "Outcomes over features",
    body:
      "I don't ship to look busy. Every line is in service of a number on a dashboard — $ saved, hours returned, errors cut, leads closed.",
  },
  {
    title: "Boring tech, sharp execution",
    body:
      "Postgres. TypeScript. A static export. I pick tools that survive on-call at 2am over tools that look good in a blog post.",
  },
  {
    title: "Tell me what's actually broken",
    body:
      "I work best with founders and directors who'll be straight with me about constraints, and with teams that want senior judgment, not junior obedience.",
  },
];

/* ─────────────────── Page ─────────────────── */
export default function Home() {
  return (
    <Fragment>
      {/* ─────────────── NAV ─────────────── */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight text-zinc-100"
          >
            henry<span className="text-violet-400">.</span>barefoot
          </Link>
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <a href="#work" className="hidden hover:text-zinc-100 sm:inline">
              Work
            </a>
            <a href="#stack" className="hidden hover:text-zinc-100 sm:inline">
              Stack
            </a>
            <a href="#approach" className="hidden hover:text-zinc-100 sm:inline">
              Approach
            </a>
            <a
              href="mailto:henrybarefoot1987@gmail.com?subject=Interview%20for%20%5Brole%5D"
              className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 font-medium text-violet-200 transition-colors hover:border-violet-400 hover:bg-violet-500/20 hover:text-white"
            >
              <MailIcon />
              <span>Hire me</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ─────────────── HERO ─────────────── */}
      <header className="relative">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <RevealOnScroll>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to senior contract or W-2 roles · fully remote · Plantation, FL
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
              I build production AI infrastructure
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-emerald-300 bg-clip-text text-transparent">
                and the systems that ship it.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Senior full-stack engineer. 8+ years shipping{" "}
              <span className="text-zinc-200">production web + AI systems</span> — MCP servers,
              agentic orchestration, and ops automation — for logistics and fintech
              teams that needed it yesterday. Most recent role: Director of
              Technology at Allied Yacht Transport.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:henrybarefoot1987@gmail.com?subject=Interview%20for%20%5Brole%5D"
                className="inline-flex items-center gap-2 rounded-md bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-400 hover:shadow-violet-400/30"
              >
                Email me directly
                <ArrowRight />
              </a>
              <a
                href="/Henry_Barefoot_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/50 px-5 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
              >
                <DownloadIcon />
                Resume (PDF)
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100"
              >
                See the work
                <ChevronDown />
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </header>

      {/* ─────────────── STATS BAND ─────────────── */}
      <section className="border-y border-zinc-800/60 bg-zinc-900/30">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px bg-zinc-800/40 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <RevealOnScroll key={s.label} delay={i * 80}>
              <div className="bg-zinc-950 p-8">
                <div className="font-mono text-3xl font-semibold text-emerald-300 sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-zinc-500">
                  {s.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ─────────────── SELECTED WORK ─────────────── */}
      <section id="work" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Selected work
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                What I&apos;ve shipped, and what it produced.
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Every project below has a real number attached. If you want the
                full case study on any of them, my inbox is open.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-6">
            {PROJECTS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 60}>
                <article className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/70 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                        {p.year} · {p.role}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-zinc-50 sm:text-2xl">
                        {p.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-zinc-800 bg-zinc-950/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        For
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {p.for_}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        Built
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {p.built}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                        Outcome
                      </dt>
                      <dd className="mt-1 text-sm font-medium leading-relaxed text-zinc-100">
                        {p.outcome}
                      </dd>
                    </div>
                  </dl>

                  {p.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-zinc-800/60 pt-4">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target={
                            l.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            l.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-emerald-300 hover:underline"
                        >
                          {l.label}
                          <ExternalArrow />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── STACK ─────────────── */}
      <section id="stack" className="border-t border-zinc-800/60 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Stack
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                What I reach for.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(STACK).map(([category, items], i) => (
              <RevealOnScroll key={category} delay={i * 60}>
                <div className="h-full bg-zinc-950 p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {category}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-sm text-zinc-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── APPROACH ─────────────── */}
      <section id="approach" className="border-t border-zinc-800/60 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
                Approach
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                How I work.
              </h2>
              <p className="mt-3 max-w-2xl text-zinc-400">
                If you&apos;re hiring, here&apos;s the working style you&apos;re
                signing up for.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WORK_STYLE.map((w, i) => (
              <RevealOnScroll key={w.title} delay={i * 80}>
                <div className="h-full rounded-lg border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700">
                  <h3 className="text-lg font-semibold text-zinc-50">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {w.body}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section
        id="contact"
        className="border-t border-zinc-800/60 bg-zinc-900/30 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">
              Contact
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
              Let&apos;s talk.
            </h2>
            <p className="mt-4 text-zinc-400">
              I read every message myself. If you&apos;re hiring, include the
              role, the team, and the outcome you&apos;re hiring for. I&apos;ll
              reply within 24 hours.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:henrybarefoot1987@gmail.com?subject=Interview%20for%20%5Brole%5D"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-400 sm:w-auto"
              >
                <MailIcon />
                henrybarefoot1987@gmail.com
              </a>
              <a
                href="https://github.com/HBarefoot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/50 px-6 py-3.5 text-base font-semibold text-zinc-100 transition-colors hover:border-zinc-500 sm:w-auto"
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/hbarefoot/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-950/50 px-6 py-3.5 text-base font-semibold text-zinc-100 transition-colors hover:border-zinc-500 sm:w-auto"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="mt-10 font-mono text-xs uppercase tracking-widest text-zinc-600">
              Plantation, FL · open to senior contract or W-2 roles · fully remote
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="border-t border-zinc-800/60">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-zinc-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Henry Barefoot · Barefoot Digital
          </div>
          <div className="font-mono">
            Built with the Orchestrator Pattern
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
