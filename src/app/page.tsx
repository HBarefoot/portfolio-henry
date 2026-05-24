"use client";

import { Fragment, useState } from "react";
import Link from "next/link";

/* ─────────────────── Helpers ─────────────────── */
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-100">
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </a>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function Terminal() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
      <path d="M6 8l4 4-4 4" />
      <line x1="12" y1="16" x2="18" y2="16" />
    </svg>
  );
}

function Database() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

function Server() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function Cloud() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19A5.5 5.5 0 1 1 13.5 8h3a5 5 0 1 1 2.8 11" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function Flame() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 14.5A5 5 0 0 1 15 12a5 5 0 0 1-3-4" />
      <path d="M6.92 14.54c.41-.53.75-1.08.75-1.74C7.67 9.85 5.69 7.3 6.84 4.61" />
      <path d="M7.5 19.81C5.11 18.42 3.5 16.16 3.5 13.5 3.5 10.5 5.5 9.5 7.5 7.5c2.5 2.5 5.5 2.5 8.5 0 2 2 4 3 4 6-.01 3.21-2.2 6.06-5 7" />
    </svg>
  );
}

/* ─────────────────── Project Card ─────────────────── */
function ProjectCard({
  title,
  description,
  tags,
  link,
  status,
}: {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status?: "live" | "dev" | "open-source";
}) {
  const base =
    "group relative rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900";

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-2 w-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400" />
          <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
        </div>
        {status && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
              status === "live"
                ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/50"
                : status === "dev"
                ? "bg-amber-950/50 text-amber-400 border border-amber-900/50"
                : "bg-sky-950/50 text-sky-400 border border-sky-900/50"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-500">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] text-zinc-500">
            {t}
          </span>
        ))}
      </div>
      {link && (
        <div className="mt-4 flex items-center gap-1 text-xs text-zinc-600 transition-colors group-hover:text-zinc-400">
          <span>View project</span>
          <ArrowRight />
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }

  return <div className={base}>{inner}</div>;
}

/* ─────────────────── Skill Pill ─────────────────── */
function SkillPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300">
      {label}
    </span>
  );
}

/* ─────────────────── Nav ─────────────────── */
function Nav() {
  const items = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium text-zinc-100">
          hb.
        </Link>
        <div className="flex items-center gap-6">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-200"
            >
              {i.label}
            </a>
          ))}
          <ExternalLink href="https://github.com/hbarefoot">GitHub</ExternalLink>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────── Hero ─────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-start justify-center px-6">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-500">
          <div className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Available for work
        </div>

        <h1 className="mb-6 max-w-lg text-4xl font-medium tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
          Building systems that survive contact with
          <span className="text-zinc-600"> production</span>.
        </h1>

        <p className="mb-10 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
          Software engineer focused on infrastructure that compounds. Building the yacht transport logistics platform, plus open-source tools for automation, AI agents, and trading systems.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/hbarefoot"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-2.5 text-sm text-zinc-300 transition-all hover:border-zinc-600 hover:text-zinc-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-500 transition-colors group-hover:text-zinc-300">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </a>
          <a
            href="mailto:henrybarefoot@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Projects ─────────────────── */
function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">Selected Work</span>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">Projects</h2>
        </div>

      <div className="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            title="Yacht Transport Platform"
            description="Full-stack logistics platform for global yacht transport. Built over 8 months: vessel tracking, route optimization, broker integrations, and automated quoting."
            tags={["TypeScript", "Next.js", "Bun", "PostgreSQL", "IoT"]}
            link="https://github.com/yachttransport/Yacht-Transport-Ai-v2"
            status="live"
          />
          <ProjectCard
            title="Frutero"
            description="Self-hosted Raspberry Pi appliance for monotub mushroom fruiting chamber automation. WiFi provisioning, sensor telemetry, relay control, and optional multi-chamber fleet management via cloud."
            tags={["TypeScript", "Bun", "Raspberry Pi", "SQLite", "IoT"]}
            link="https://github.com/HBarefoot/frutero"
            status="live"
          />
          <ProjectCard
            title="Frutero Landing"
            description="Marketing site for Frutero — open-source mushroom farm controller. Product positioning, feature showcase, and call-to-action flows."
            tags={["HTML", "CSS", "Product Marketing"]}
            link="https://frutero-landing.vercel.app/"
            status="live"
          />
          <ProjectCard
            title="Paw"
            description="Personal AI assistant framework built with TypeScript and Bun. Multi-provider LLM routing, tool execution, and persistent memory with zero cloud dependencies."
            tags={["TypeScript", "Bun", "SQLite", "MCP", "Anthropic"]}
            link="https://github.com/HBarefoot/paw"
            status="open-source"
          />
          <ProjectCard
            title="Engram"
            description="Persistent memory layer for AI agents. SQLite-based state with local embeddings, zero cloud dependencies, and MCP-native integration with Claude Desktop, Cursor, and Windsurf."
            tags={["TypeScript", "SQLite", "MCP", "Embeddings", "Local-First"]}
            link="https://github.com/HBarefoot/engram"
            status="open-source"
          />
          <ProjectCard
            title="Forex AI Trading Bot"
            description="Forex and crypto trading bot with advanced technical analysis, machine learning signal generation, and TradingView-style charts. Multi-broker execution with risk management."
            tags={["Python", "TensorFlow", "PineScript", "APIs", "PostgreSQL"]}
            link="https://github.com/HBarefoot/forex-ai-trading-bot"
            status="dev"
          />
          <ProjectCard
            title="Performance Service"
            description="SpeedPage tool service. Page speed analysis and performance monitoring with actionable insights."
            tags={["TypeScript", "Node.js", "Web Performance"]}
            link="https://github.com/HBarefoot/performance-service"
            status="live"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Skills ─────────────────── */
function Skills() {
  const categories = [
    {
      label: "Languages",
      icon: <CodeIcon />,
      skills: ["TypeScript", "JavaScript", "Python", "SQL", "Bash"],
    },
    {
      label: "Frameworks",
      icon: <Flame />,
      skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "Express"],
    },
    {
      label: "DB / Storage",
      icon: <Database />,
      skills: ["PostgreSQL", "SQLite (FTS5)", "Prisma", "Redis"],
    },
    {
      label: "Infra / Cloud",
      icon: <Cloud />,
      skills: ["Railway", "Vercel", "Docker", "Cloudflare", "Linux"],
    },
    {
      label: "AI / ML",
      icon: <Server />,
      skills: ["Anthropic API", "MCP Protocol", "DSPy", "Ollama", "vLLM"],
    },
    {
      label: "DevOps",
      icon: <Terminal />,
      skills: ["Git", "GitHub Actions", "Bash scripting", "Systemd", "Nginx"],
    },
  ];

  return (
    <section id="skills" className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">Technology</span>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">Skills</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((c) => (
            <div key={c.label}>
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                {c.icon}
                {c.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.skills.map((s) => (
                  <SkillPill key={s} label={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact ─────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("henrybarefoot@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">Get in Touch</span>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">Contact</h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleCopy}
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4 text-left transition-all hover:border-zinc-700"
          >
            <div>
              <div className="text-xs text-zinc-600">Email</div>
              <div className="text-sm text-zinc-300">henrybarefoot@gmail.com</div>
            </div>
            <div className="text-xs text-zinc-600 transition-colors group-hover:text-zinc-400">
              {copied ? "Copied" : "Copy"}
            </div>
          </button>

          <a
            href="https://github.com/hbarefoot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4 text-left transition-all hover:border-zinc-700"
          >
            <div>
              <div className="text-xs text-zinc-600">GitHub</div>
              <div className="text-sm text-zinc-300">github.com/hbarefoot</div>
            </div>
            <ArrowRight />
          </a>

          <a
            href="https://www.linkedin.com/in/hbarefoot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 px-5 py-4 text-left transition-all hover:border-zinc-700"
          >
            <div>
              <div className="text-xs text-zinc-600">LinkedIn</div>
              <div className="text-sm text-zinc-300">linkedin.com/in/hbarefoot</div>
            </div>
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Footer ─────────────────── */
function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-8">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <span className="text-xs text-zinc-700">Henry Barefoot — 2025</span>
        <span className="text-[11px] text-zinc-800">Built with Next.js · Deployed on Vercel</span>
      </div>
    </footer>
  );
}

/* ─────────────────── Page ─────────────────── */
export default function Home() {
  return (
    <Fragment>
      <Nav />
      <Hero />
      <Projects />
      <Skills />
    </Fragment>
  );
}
