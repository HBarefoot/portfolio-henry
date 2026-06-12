// This file is intentionally a no-op. With `output: "export"`, Next.js
// cannot generate an OG image at build time via this route. The static
// fallback image is served from /public/og.png and referenced directly
// in src/app/layout.tsx metadata.openGraph.images.
export default function Noop() {
  return null;
}
