import type { NextConfig } from "next";

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${posthogHost.replace(
          "https://",
          "https://us-assets."
        )}/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `${posthogHost.replace(
          "https://",
          "https://us-assets."
        )}/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
};

export default nextConfig;
