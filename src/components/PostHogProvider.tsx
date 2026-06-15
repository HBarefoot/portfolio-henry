"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, type ReactNode } from "react";

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

    if (!key) {
      if (process.env.NODE_ENV === "development") {
        console.warn("NEXT_PUBLIC_POSTHOG_KEY is not set; PostHog is disabled.");
      }
      return;
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // Next.js route changes are captured by the provider automatically
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
