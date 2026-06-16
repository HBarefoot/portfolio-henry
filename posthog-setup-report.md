<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your portfolio site. PostHog was already partially set up (the SDK was installed, the reverse proxy was configured, and `PostHogProvider` was wired into the root layout). This run added `capture_exceptions: true` to the init config for automatic error tracking, created a `TrackedLink` client component for use in server-rendered pages, and instrumented eight high-value user actions across three files.

| Event | Description | File |
|---|---|---|
| `hero_contact_clicked` | User clicks the primary "Get in touch" CTA in the hero | `src/app/page.tsx` |
| `resume_downloaded` | User clicks the Resume (PDF) link | `src/app/page.tsx` |
| `case_study_clicked` | User clicks "Case study →" for Allied Yacht Transport | `src/app/page.tsx` |
| `oss_card_clicked` | User clicks an OSS project card (Engram or Paw) | `src/app/page.tsx` |
| `contact_email_clicked` | User clicks the email address button in the contact section | `src/app/page.tsx` |
| `contact_github_clicked` | User clicks GitHub in the contact section | `src/app/page.tsx` |
| `contact_linkedin_clicked` | User clicks LinkedIn in the contact section | `src/app/page.tsx` |
| `live_site_clicked` | User clicks "Visit yachttransport.ai" on the case study page | `src/app/yacht-transport/page.tsx` |

## Next steps

We've built five insights and a dashboard to monitor visitor behavior:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/470907/dashboard/1718541)
- [Contact actions trend](https://us.posthog.com/project/470907/insights/Kpp6ykMU) — email / GitHub / LinkedIn clicks over time
- [Resume downloads](https://us.posthog.com/project/470907/insights/wZJhTyFl) — bold-number total for the last 30 days
- [OSS card clicks by project](https://us.posthog.com/project/470907/insights/LHuSCE1g) — Engram vs Paw interest breakdown
- [Hero CTA vs case study clicks](https://us.posthog.com/project/470907/insights/6t7f2XhZ) — top-of-funnel engagement trend
- [Total contact conversions](https://us.posthog.com/project/470907/insights/iKH5GoYU) — bold-number count of any contact action

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
