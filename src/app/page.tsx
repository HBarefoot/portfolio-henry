"use client";

import { Fragment, useState, useEffect, useRef } from "react";
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

/* ─────────────────── Scroll Animations Hook ─────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────── Project Card ─────────────────── */
function ProjectCard({
  title,
  description,
  tags,
  link,
  status,
  metrics,
  socialProof,
}: {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  status?: "live" | "dev" | "open-source";
  metrics?: string[];
  socialProof?: string;
}) {
  const { ref, visible } = useInView();
  const base =
    "group relative rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 " +
    (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4");

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
      {metrics && metrics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {metrics.map((m) => (
            <span key={m} className="text-[11px] text-zinc-600">{m}</span>
          ))}
        </div>
      )}
      {socialProof && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500 italic">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{socialProof}</span>
        </div>
      )}
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
      <a ref={ref as any} href={link} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }

  return <div ref={ref} className={base}>{inner}</div>;
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
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#latest", label: "Latest" },
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

        <p className="mb-6 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
          Software engineer focused on infrastructure that compounds. Building the yacht transport logistics platform, plus open-source tools for automation, AI agents, and trading systems.
        </p>

        {/* About/Trajectory Paragraph */}
        <div className="mb-10 max-w-2xl rounded-lg border-l-2 border-zinc-800 bg-zinc-950/30 pl-5 pr-4 py-4">
          <p className="text-xs leading-relaxed text-zinc-600 sm:text-sm">
            Started with CS50 at Miami Dade College, spent years in email development and web dev agencies, 
            then led teams at Vital Pharmaceuticals. Now Director of Technology at Allied Yacht building 
            AI-powered logistics from scratch. Every role taught me what breaks at scale.
          </p>
        </div>

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
            link="/yacht-transport"
            status="live"
            metrics={["15+ ports", "8-month build", "Production"]}
            socialProof="Live production system handling international yacht shipments"
          />
          <ProjectCard
            title="Frutero"
            description="Self-hosted Raspberry Pi appliance for monotub mushroom fruiting chamber automation. WiFi provisioning, sensor telemetry, relay control, and optional multi-chamber fleet management via cloud."
            tags={["TypeScript", "Bun", "Raspberry Pi", "SQLite", "IoT"]}
            link="https://github.com/HBarefoot/frutero"
            status="live"
            metrics={["Open-source", "Fleet ready", "IoT native"]}
            socialProof="Fleet management for mushroom cultivation operations"
          />
          <ProjectCard
            title="Frutero Landing"
            description="Marketing site for Frutero — open-source mushroom farm controller. Product positioning, feature showcase, and call-to-action flows."
            tags={["HTML", "CSS", "Product Marketing"]}
            link="https://frutero-landing.vercel.app/"
            status="live"
            socialProof="Marketing + documentation hub"
          />
          <ProjectCard
            title="Paw"
            description="Personal AI assistant framework built with TypeScript and Bun. Multi-provider LLM routing, tool execution, and persistent memory with zero cloud dependencies."
            tags={["TypeScript", "Bun", "SQLite", "MCP", "Anthropic"]}
            link="https://github.com/HBarefoot/paw"
            status="open-source"
            metrics={["Zero cloud deps", "MCP native", "Local-first"]}
            socialProof="Agent framework powering development workflows"
          />
          <ProjectCard
            title="Engram"
            description="Persistent memory layer for AI agents. SQLite-based state with local embeddings, zero cloud dependencies, and MCP-native integration with Claude Desktop, Cursor, and Windsurf."
            tags={["TypeScript", "SQLite", "MCP", "Embeddings", "Local-First"]}
            link="https://github.com/HBarefoot/engram"
            status="open-source"
            metrics={["npm package", "FTS5 search", "Embeddings"]}
            socialProof="Published to npm, used in production agents"
          />
          <ProjectCard
            title="Forex AI Trading Bot"
            description="Forex and crypto trading bot with advanced technical analysis, machine learning signal generation, and TradingView-style charts. Multi-broker execution with risk management."
            tags={["Python", "TensorFlow", "PineScript", "APIs", "PostgreSQL"]}
            link="https://github.com/HBarefoot/forex-ai-trading-bot"
            status="dev"
            metrics={["ML signals", "Multi-broker", "Risk mgmt"]}
            socialProof="Active development, backtesting in progress"
          />
          <ProjectCard
            title="Performance Service"
            description="SpeedPage tool service. Page speed analysis and performance monitoring with actionable insights."
            tags={["TypeScript", "Node.js", "Web Performance"]}
            link="https://github.com/HBarefoot/performance-service"
            status="live"
            socialProof="Core Pagespeed monitoring API"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Work Experience ─────────────────── */
function WorkExperience() {
  const experiences = [
    {
      company: "Allied Yacht",
      role: "Director of Technology",
      period: "2025 — Present",
      location: "Remote / Global",
      description: "Led end-to-end architecture of AI-powered yacht transport platform, reducing quote processing from days to minutes.",
      highlights: [
        "Architected pricing/routing engines across 15+ international ports",
        "Established modern stack: Next.js, TypeScript, Tailwind, secure RESTful APIs",
        "Built robust admin dashboard with role-based access controls"
      ],
      tags: ["Next.js", "TypeScript", "AI/LLM", "PostgreSQL"],
    },
    {
      company: "Addigy",
      role: "Web Developer",
      period: "2023 — 2025",
      location: "Miami, FL",
      description: "Built scalable WordPress solutions and data dashboards for IT management platform.",
      highlights: [
        "Developed custom plugins and reusable components for marketing sites",
        "Built data dashboards in Looker Studio integrated with BigQuery",
        "Integrated third-party tools and APIs for lead capture automation"
      ],
      tags: ["WordPress", "PHP", "Looker Studio", "BigQuery"],
    },
    {
      company: "Vital Pharmaceuticals",
      role: "Sr. Web Developer",
      period: "2020 — 2023",
      location: "Miami, FL",
      description: "Led development team and delivered marketing solutions for fast-paced supplement industry.",
      highlights: [
        "Managed workflows through task delegation and ticket creation",
        "Built landing pages using PHP, Node.js, WordPress, and React",
        "Supported cross-functional teams and developer onboarding"
      ],
      tags: ["React", "Node.js", "PHP", "WordPress"],
    },
    {
      company: "AARP",
      role: "Email Developer",
      period: "2022 — 2022",
      location: "Remote",
      description: "Developed email systems and automation workflows in Salesforce Marketing Cloud.",
      highlights: [
        "Designed custom email templates within Salesforce Marketing Cloud",
        "Set up automation workflows and performance metrics",
        "Ensured cross-client compatibility across major email platforms"
      ],
      tags: ["Salesforce", "HTML Email", "Automation"],
    },
    {
      company: "Crystal Cruises",
      role: "Email Developer",
      period: "2018 — 2020",
      location: "Miami, FL",
      description: "Built automation tools and email systems for luxury cruise line.",
      highlights: [
        "Built Node.js tool with Cheerio/MongoDB to automate HTML content creation",
        "Coded responsive HTML emails optimized for all major clients",
        "Collaborated with deployment and QA teams on weekly releases"
      ],
      tags: ["Node.js", "MongoDB", "Cheerio", "Salesforce"],
    },
  ];

  return (
    <section id="experience" className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">Career</span>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">Work Experience</h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="group rounded-lg border border-zinc-800 bg-zinc-950/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900/50"
            >
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-2 w-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400" />
                    <h3 className="text-sm font-medium text-zinc-200">{exp.company}</h3>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">{exp.role}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-zinc-600">{exp.period}</span>
                  <p className="text-[11px] text-zinc-700">{exp.location}</p>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-zinc-500">{exp.description}</p>

              <ul className="mb-4 space-y-1.5">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-700" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Testimonials ─────────────────── */
function Testimonials() {
  return (
    <section className="border-t border-zinc-900 px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <blockquote className="relative rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
          <svg
            className="absolute -top-3 left-6 h-6 w-6 text-zinc-800"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="mb-4 text-sm leading-relaxed text-zinc-400">
            "Henry built our yacht transport platform from scratch. Reduced our quote time from 3 days to 3 minutes. 
            The AI routing has already saved us thousands in operational costs."
          </p>
          <footer className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-zinc-800" />
            <div>
              <div className="text-xs font-medium text-zinc-300">Client, Allied Yacht</div>
              <div className="text-[11px] text-zinc-600">Director of Operations</div>
            </div>
          </footer>
        </blockquote>
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

/* ─────────────────── Latest ─────────────────── */
function Latest() {
  return (
    <section id="latest" className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">Recent</span>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-100">Latest</h2>
        </div>

        <div className="space-y-4">
          <a
            href="/yacht-transport"
            className="group block rounded-lg border border-zinc-800 bg-zinc-950 p-5 transition-all hover:border-zinc-700"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Portfolio · Case Study</span>
              <span className="text-xs text-zinc-600">May 2025</span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-zinc-200 transition-colors group-hover:text-zinc-100">
              Building the Yacht Transport Platform — Architecture, Tradeoffs, Outcomes
            </h3>
            <p className="text-xs leading-relaxed text-zinc-600">
              A deep dive into the logistics platform I built over 8 months: broker integrations, pricing engine, route optimization, and real-world results.
            </p>
          </a>

          <a
            href="https://github.com/HBarefoot/engram"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-zinc-800 bg-zinc-950 p-5 transition-all hover:border-zinc-700"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Open Source</span>
              <span className="text-xs text-zinc-600">Mar 2025</span>
            </div>
            <h3 className="mb-1 text-sm font-medium text-zinc-200 transition-colors group-hover:text-zinc-100">
              Engram — Persistent Memory for AI Agents
            </h3>
            <p className="text-xs leading-relaxed text-zinc-600">
              SQLite-based memory layer with local embeddings, zero cloud dependencies, and MCP-native integration. Published to npm.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Page ─────────────────── */
export default function Home() {
  return (
    <Fragment>
      <Nav />
      <Hero />
      <Projects />
      <WorkExperience />
      <Testimonials />
      <Skills />
      <Latest />
      <Contact />
      <Footer />
    </Fragment>
  );
}
