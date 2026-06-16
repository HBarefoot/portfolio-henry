import type { NextConfig } from "next";

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

// PostHog serves library/recorder assets from a sibling "<region>-assets" host
// (us.i.posthog.com -> us-assets.i.posthog.com). The naive
// .replace("https://", "https://us-assets.") produced "us-assets.us.i.posthog.com"
// (a non-existent host), which 500'd the /static and /array config requests and
// prevented PostHog from loading. Derive the assets host correctly instead.
const assetHost = posthogHost.replace(/:\/\/(\w+)\./, "://$1-assets.");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${assetHost}/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `${assetHost}/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
};

export default nextConfig;
