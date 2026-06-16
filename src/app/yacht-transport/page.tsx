"use client";

import { Fragment } from "react";
import Link from "next/link";
import posthog from "posthog-js";

/* ── Helpers ── */
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function External() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

/* ── Nav ── */
function BackNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-200">
          <ArrowLeft /> Back to portfolio
        </Link>
        <a href="https://yachttransport.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-emerald-400">
          Live site <External />
        </a>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-start justify-center px-6 pt-20">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1.5 text-xs text-emerald-400">
          <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live product · 8-month build
        </div>

        <h1 className="mb-6 max-w-2xl text-4xl font-medium tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
          Yacht Transport <span className="text-zinc-600">Platform</span>
        </h1>

        <p className="mb-10 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
          Full-stack logistics platform for global yacht transport. Automated broker integrations,
          real-time vessel tracking, route optimization across 15+ ports, and a quoting engine
          that turned multi-day email chains into 60-second workflows.
        </p>

        <div className="flex flex-wrap gap-2">
          {["TypeScript", "Next.js", "Bun", "PostgreSQL", "IoT", "Tailwind"].map((t) => (
            <span key={t} className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-[11px] text-zinc-500">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section ── */
function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-16 border-t border-zinc-900">
      <div className="mx-auto max-w-4xl">
        <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-600">{label}</span>
        <h2 className="mb-8 text-xl font-medium tracking-tight text-zinc-100">{title}</h2>
        {children}
      </div>
    </section>
  );
}

/* ── Metrics ── */
function Metrics() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <Metric value="15+" label="Ports integrated" detail="Miami, Fort Lauderdale, Antibes, Palma, Newport, and more" />
      <Metric value="8 mo" label="Build timeline" detail="Solo full-stack development from wireframe to production" />
      <Metric value="Sub-60s" label="Quote turnaround" detail="Down from 2-3 days of broker email chains" />
    </div>
  );
}

function Metric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-1 text-2xl font-medium text-zinc-100">{value}</div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</div>
      <p className="text-xs leading-relaxed text-zinc-600">{detail}</p>
    </div>
  );
}

/* ── Architecture ── */
function Architecture() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-zinc-500">
      <p>
        The platform is a monorepo split into three layers: a <strong className="text-zinc-300">Next.js</strong> web
        front-end for brokers and customers, a <strong className="text-zinc-300">Bun</strong> API server handling
        real-time pricing and booking negotiations, and a <strong className="text-zinc-300">PostgreSQL</strong> database
        with Prisma as the schema layer.
      </p>
      <ul className="space-y-3 pl-4">
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Quoting engine</strong> — Dynamic pricing based on vessel dimensions,
          route, seasonality, and carrier availability. Caches computed rates for 24h to reduce repeat calculations.
        </li>
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Broker integrations</strong> — REST API connections to carrier networks
          for live vessel positions and berth availability. Normalizes heterogeneous data into a unified schema.
        </li>
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Route optimization</strong> — Combines geospatial port data with
          carrier schedules to suggest the most cost-efficient or fastest delivery path.
        </li>
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">IoT telemetry</strong> — LoRa sensors on transport cradles stream
          temperature, humidity, and shock data to the platform via MQTT. Alerts fire on threshold breach.
        </li>
      </ul>
    </div>
  );
}

/* ── Challenges ── */
function Challenges() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-zinc-500">
      <p>
        Yacht transport is an analog industry. Every broker runs their own spreadsheets and email templates.
        The hardest problem wasn&apos;t technical — it was designing a system that reduced friction without forcing
        brokers to abandon workflows they&apos;d used for decades.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <ChallengeCard
          title="Data normalization"
          body="Each carrier exposed different fields, units, and rate structures. I built a schema adapter layer in TypeScript with runtime validation (Zod) that normalizes any carrier response into a unified quote format."
        />
        <ChallengeCard
          title="Real-time constraints"
          body="Port schedules change hourly. Instead of polling, I used WebSocket connections for broker dashboards and background workers (Bun cron jobs) for rate recalculation."
        />
        <ChallengeCard
          title="Offline-first broker client"
          body="Many brokers work on boats with intermittent connectivity. The mobile view stores draft quotes in localStorage and syncs when back online."
        />
        <ChallengeCard
          title="Pricing accuracy"
          body="Early models underestimated seasonal surcharge variations by 15-20%. I added a feedback loop where confirmed bookings retroactively adjust the pricing weights."
        />
      </div>
    </div>
  );
}

function ChallengeCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="mb-2 text-sm font-medium text-zinc-300">{title}</h3>
      <p className="text-xs leading-relaxed text-zinc-600">{body}</p>
    </div>
  );
}

/* ── Outcomes ── */
function Outcomes() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-zinc-500">
      <p>
        The platform is now the primary booking tool for the transport operation. Brokers who previously
        managed routes in Excel now log in daily. The quoting engine accuracy improved from rough estimates
        to within 5% of final invoice cost after the feedback-weight adjustment.
      </p>
      <ul className="space-y-3 pl-4">
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Email volume</strong> dropped by an estimated 70% — quotes, scheduling
          confirmations, and tracking updates are now automated notifications.
        </li>
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Customer conversion</strong> improved because prospects could generate
          a binding quote without a 48-hour back-and-forth.
        </li>
        <li className="relative before:absolute before:left-[-1rem] before:top-[0.4rem] before:h-1 before:w-1 before:rounded-full before:bg-zinc-700">
          <strong className="text-zinc-300">Operational visibility</strong> — management now has a single
          dashboard tracking every vessel in transit, delayed, or at berth.
        </li>
      </ul>
    </div>
  );
}

/* ── Footer CTA ── */
function FooterCTA() {
  return (
    <section className="px-6 py-24 border-t border-zinc-900">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-2xl font-medium tracking-tight text-zinc-100">See the live platform</h2>
        <p className="mb-8 text-sm text-zinc-500 max-w-md mx-auto">
          The full product includes additional features not covered here: carrier management, audit logging, multi-language support, and a dedicated customer portal.
        </p>
        <a
          href="https://yachttransport.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100"
          onClick={() => posthog.capture("live_site_clicked", { project: "Allied Yacht Transport" })}
        >
          Visit yachttransport.ai <External />
        </a>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function YachtTransportCaseStudy() {
  return (
    <Fragment>
      <BackNav />
      <Hero />
      <Section label="Overview" title="What we built">
        <Metrics />
      </Section>
      <Section label="Engineering" title="Architecture & Stack">
        <Architecture />
      </Section>
      <Section label="Problems" title="Challenges & Tradeoffs">
        <Challenges />
      </Section>
      <Section label="Results" title="Outcomes">
        <Outcomes />
      </Section>
      <FooterCTA />
    </Fragment>
  );
}
