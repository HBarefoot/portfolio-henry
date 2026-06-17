"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      if (process.env.NODE_ENV !== "production") {
        // Surfaces the most common failure mode: the key must be present at BUILD
        // time (NEXT_PUBLIC vars are inlined). If it's missing in the deployed
        // build, PostHog never initializes and no $pageview is captured.
        console.warn(
          "[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set — analytics are disabled. " +
            "Set it in your environment (and in Vercel Production for the live site) and redeploy."
        );
      }
      return;
    }

    posthog.init(key, {
      api_host: "/ingest",
      // App host for the PostHog Toolbar / "open in PostHog" links. Without it
      // the Toolbar can't resolve the relative reverse-proxy api_host above and
      // rejects it ("Invalid api_host"). Ingestion still flows through /ingest.
      ui_host: "https://us.posthog.com",
      // Automatic pageview capture on history API changes — covers the initial
      // load and Next.js App Router client navigations. Replaces the old manual
      // usePathname() tracker (which wasn't landing $pageview events).
      capture_pageview: "history_change",
      defaults: "2026-01-30",
      capture_exceptions: true,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          posthog.debug();
        }
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
