import { NextResponse } from "next/server";

// `output: "export"` cannot serve a dynamic ImageResponse, so this route
// just forwards social-media crawlers to the static /og.png asset.
// The static asset is the source of truth — the meta tag in layout.tsx
// also points directly at /og.png so most crawlers skip this redirect
// entirely.
export const dynamic = "force-static";

export default function handler() {
  return NextResponse.redirect(new URL("/og.png", "https://henrybarefoot.com"));
}
