"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

function PageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (!pathname || !posthog) return;

    let url = window.origin + pathname;
    const query = searchParams.toString();
    if (query) {
      url += `?${query}`;
    }

    posthog.capture("$pageview", {
      $current_url: url,
      $pathname: pathname,
      $search_params: query,
    });
  }, [pathname, searchParams, posthog]);

  return null;
}

export default function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PageView />
    </Suspense>
  );
}
