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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─────────────────── Header ─────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-zinc-100">
          Henry Barefoot
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-zinc-400 transition-colors hover:text-zinc-100">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-center p-2 text-zinc-300 sm:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 rounded bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-b border-zinc-900 bg-zinc-950 px-6 pb-4 sm:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-zinc-400 transition-colors hover:text-zinc-100">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

/* ─────────────────── Hero ─────────────────── */
function Hero() {
  return (
    <section className="relative px-6 pb-12 pt-40 sm:pt-52">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm text-zinc-500">Engineer · Founder · Systems Builder</p>
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-zinc-100 sm:text-6xl">
          I build systems that survive contact with production.
        </h1>
        <p className="max-w-xl text-lg text-zinc-400 sm:text-xl">
          Full-stack engineering with a backend bias. Shipping reliable products across AI, logistics, fintech, and IoT.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
          >
            Start a project <ArrowRight />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
          >
            View work
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── About ─────────────────── */
function About() {
  const { ref, visible } = useInView();

  return (
    <section id="about" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-2xl font-semibold text-zinc-100 sm:text-3xl">About</h2>
        <div
          className={`space-y-5 text-zinc-400 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p>
            I&apos;m Henry Barefoot, a software engineer who spends most of my time where product, infrastructure, and data
            overlap. I&apos;ve shipped production systems in logistics, fintech, IoT, and AI infrastructure — usually as the
            person turning ambiguity into working code.
          </p>
          <p>
            My bias is toward backend engineering and infrastructure: resilient APIs, async processing, observability, and
            integrations that don&apos;t fall over when a third party changes their schema. On the frontend I value speed,
            clarity, and accessibility over trend-chasing.
          </p>
          <p>
            I&apos;ve built systems that process millions of events, reduced deployment cycles from days to minutes, and
            helped small teams operate like much larger ones. I care about maintainability, cost discipline, and the
            boring magic of a system that just keeps working.
          </p>
          <p>Currently available for fractional CTO work, architecture consulting, and hands-on product engineering.</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Services ─────────────────── */
function Services() {
  const { ref, visible } = useInView();

  const services = [
    {
      title: "Product engineering",
      icon: <CodeIcon />,
      description:
        "End-to-end product builds in React/Next.js, Node.js, Python, and PostgreSQL. I focus on shipping fast without creating tomorrow's technical debt.",
    },
    {
      title: "Backend & integrations",
      icon: <Server />,
      description:
        "API design, webhook handling, event pipelines, and third-party integrations that handle retries, idempotency, and failure gracefully.",
    },
    {
      title: "Cloud infrastructure",
      icon: <Cloud />,
      description:
        "AWS, GCP, Vercel, Docker, and Kubernetes deployments with CI/CD, IaC, and observability baked in from day one.",
    },
    {
      title: "Data & analytics",
      icon: <Database />,
      description:
        "Data models, ETL pipelines, analytics instrumentation, and dashboards that actually answer business questions.",
    },
    {
      title: "AI & automation",
      icon: <Terminal />,
      description:
        "LLM-powered workflows, agents, and internal tools that automate real work instead of demoing well once.",
    },
    {
      title: "Technical strategy",
      icon: <Flame />,
      description:
        "Architecture reviews, build-vs-buy decisions, and engineering roadmaps for teams moving from prototype to scale.",
    },
  ];

  return (
    <section id="services" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-semibold text-zinc-100 sm:text-3xl">Services</h2>
        <div
          className={`grid gap-4 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-zinc-900 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-800"
            >
              <div className="mb-4 text-zinc-300">{service.icon}</div>
              <h3 className="mb-2 text-lg font-medium text-zinc-100">{service.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Selected Projects ─────────────────── */
function Projects() {
  const { ref, visible } = useInView();

  const projects = [
    {
      name: "Engram",
      role: "Founder / Engineer",
      description:
        "AI-powered knowledge infrastructure. Built LLM pipelines, embedding search, and a real-time collaborative workspace.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "Pinecone"],
      link: "https://engram.app",
    },
    {
      name: "Frutero IoT Core",
      role: "Engineering Lead",
      description:
        "IoT platform connecting refrigerated logistics assets to the cloud. Real-time telemetry, alerts, and fleet analytics.",
      tags: ["MQTT", "TimescaleDB", "AWS", "React", "Node.js"],
      link: "https://frutero.io",
    },
    {
      name: "Barefoot Performance",
      role: "Solo Builder",
      description:
        "Performance and uptime monitoring service for small engineering teams. Lightweight agents, fast dashboards, actionable alerts.",
      tags: ["Go", "PostgreSQL", "Next.js", "WebSockets"],
      link: "https://github.com/HBarefoot/performance-service",
    },
  ];

  return (
    <section id="projects" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-2xl font-semibold text-zinc-100 sm:text-3xl">Selected Projects</h2>
        <div className={`space-y-6 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border border-zinc-900 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-800"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-zinc-100">{project.name}</h3>
                <span className="text-xs text-zinc-500">{project.role}</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-zinc-800 px-2.5 py-1 text-xs text-zinc-500">
                    {tag}
                  </span>
                ))}
              </div>
              <ExternalLink href={project.link}>View project</ExternalLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Contact ─────────────────── */
function Contact() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div
          className={`rounded-2xl border border-zinc-900 bg-zinc-950/50 p-8 transition-all duration-700 sm:p-12 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-2xl font-semibold text-zinc-100 sm:text-3xl">Let&apos;s build something real.</h2>
          <p className="mb-8 max-w-lg text-zinc-400">
            I work with founders and small teams who need senior engineering without the overhead of a full-time hire.
            Tell me what you&apos;re building.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:henrybarefoot@gmail.com"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const posthog = require("posthog-js").default;
                posthog.capture("contact_click", { method: "mailto", location: "contact_section" });
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
            >
              Email me
            </a>
            <ExternalLink href="https://linkedin.com/in/henrybarefoot">LinkedIn</ExternalLink>
            <ExternalLink href="https://github.com/HBarefoot">GitHub</ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Footer ─────────────────── */
function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Henry Barefoot. All rights reserved.</p>
        <div className="flex gap-6">
          <ExternalLink href="https://linkedin.com/in/henrybarefoot">LinkedIn</ExternalLink>
          <ExternalLink href="https://github.com/HBarefoot">GitHub</ExternalLink>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function Home() {
  return (
    <Fragment>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </Fragment>
  );
}
