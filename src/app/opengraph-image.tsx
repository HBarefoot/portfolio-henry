// Removed: this file used next/og's ImageResponse with runtime = "edge",
// which is incompatible with next.config.ts output: "export". Static
// export builds cannot serve edge runtime functions and the build fails
// before producing ./dist.
//
// The Open Graph image is now a static asset at /og.png, referenced from
// src/app/layout.tsx (openGraph.images + twitter.images). This is the
// documented pattern for output: "export" sites.
//
// To re-enable dynamic OG image generation in the future:
//   1. Remove output: "export" from next.config.ts (or scope it to a route group).
//   2. Restore this file from git history.
//   3. Add @vercel/og as a dependency.

export {};
