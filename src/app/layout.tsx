import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";
import PostHogPageView from "./PostHogPageView";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://henrybarefoot.com";
const OG_IMAGE = "/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Henry Barefoot — Senior Full-Stack Engineer · Next.js · Node.js · AI Infra",
    template: "%s · Henry Barefoot",
  },
  description:
    "Senior full-stack engineer. I build production AI infrastructure and the systems that ship it. Allied Yacht Transport: $500K+ saved on ops. Engram MCP: 95% pipeline efficiency. Days-to-minutes on lead scoring.",
  keywords: [
    "Henry Barefoot",
    "Senior Full-Stack Engineer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Infrastructure",
    "MCP",
    "Engram",
    "Barefoot Digital",
    "Plantation FL",
  ],
  authors: [{ name: "Henry Barefoot", url: SITE_URL }],
  creator: "Henry Barefoot",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Henry Barefoot",
    title: "Henry Barefoot — Senior Full-Stack Engineer · Next.js · Node.js · AI Infra",
    description:
      "Production AI infrastructure and the systems that ship it. Allied Yacht Transport: $500K+ saved. Engram MCP: 95% pipeline efficiency.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Henry Barefoot — Senior Full-Stack Engineer. $500K+ saved on ops. 95% pipeline efficiency. Next.js, Node.js, AI infrastructure.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Barefoot — Senior Full-Stack Engineer",
    description:
      "Production AI infrastructure. $500K+ saved on ops. 95% pipeline efficiency. Next.js · Node.js · MCP.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth antialiased`}>
      <head>
        {/* Plausible analytics — no-op until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </head>
      <body className="min-h-full bg-zinc-950 text-zinc-300">
        <PostHogProvider>
          <PostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
