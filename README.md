# Henry Barefoot — Portfolio

> Senior full-stack engineer. Production AI infrastructure and the systems that ship it.

**Live:** [henrybarefoot.com](https://henrybarefoot.com) · **Resume:** [henrybarefoot.com/resume](https://henrybarefoot.com/resume) · **Email:** [henry@barefoot.digital](mailto:henry@barefoot.digital)

---

## TL;DR

I build production AI systems for logistics and fintech — MCP servers, lead-scoring engines, automation pipelines. I ship working code, not slide decks. Recent results:

- **$500K+** saved on ops at Allied Yacht Transport (Director of Technology)
- **95%** pipeline efficiency via Engram MCP memory layer
- **Days → minutes** on lead scoring with Hunter.io + n8n + Ollama orchestration

## About this repo

This is the source for [henrybarefoot.com](https://henrybarefoot.com) — a personal portfolio and static site. The site itself is in active development; this repo currently contains the project scaffold, tooling, and brand foundation:

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + brand tokens as CSS variables (per `BRAND_GUIDELINES.md`)
- **PostHog** analytics wired via Next.js rewrites in `next.config.ts`
- **Static resume PDF** at `public/Henry-Barefoot-Resume.pdf`
- **Claude Code** workflows installed (`.github/workflows/claude.yml`, `claude-code-review.yml`)

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Modern React, server-first, static export to GitHub Pages |
| Language | TypeScript (strict) | Catches the bugs that cost you weekends |
| Styling | Tailwind CSS v4 | No dead CSS ships, fast cold starts |
| Analytics | PostHog | Privacy-friendly, no cookies by default, owned data |
| Hosting | GitHub Pages | Free, fast, version-controlled, zero config |
| Repo automation | Claude Code (GitHub Action) | AI-assisted PRs against this repo |

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

> Note: a previous version of this README referenced `pnpm`. This project uses **npm** — there is a `package-lock.json` and no `pnpm-lock.yaml`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Var | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | Yes (for analytics) | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No (defaults to `https://us.i.posthog.com`) | PostHog ingest host |
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `https://henrybarefoot.com`) | Canonical origin for SEO / metadata |

## Project layout

```
portfolio-henry/
├── .github/workflows/      # Claude Code actions
├── AGENTS.md               # Notes for AI agents (Next.js 16 breaking changes)
├── BRAND_GUIDELINES.md     # Brand system (colors, fonts, voice, logo)
├── next.config.ts          # Next config + PostHog rewrites
├── package.json
├── tsconfig.json
├── public/                 # Static assets (resume PDF, favicons)
│   ├── Henry-Barefoot-Resume.pdf
│   ├── .gitkeep            # placeholder for og.png (not yet committed)
│   ├── favicon.ico
│   └── ...
└── README.md
```

## Contact

- **Email:** [henry@barefoot.digital](mailto:henry@barefoot.digital)
- **LinkedIn:** [linkedin.com/in/henrybarefoot](https://linkedin.com/in/henrybarefoot)
- **GitHub:** [@HBarefoot](https://github.com/HBarefoot)
- **Location:** Plantation, FL · open to remote and on-site (Miami / NYC / SF)

---

_Built with the Orchestrator Pattern · AI infrastructure that ships._
