import type { Metadata } from "next";
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://henrybarefoot.com";
const OG_IMAGE = "/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Henry Barefoot — Senior Full-Stack Engineer · AI Systems · Next.js · Node.js",
    template: "%s · Henry Barefoot",
  },
  description:
    "Senior full-stack engineer, 8+ years. I architect, write, deploy, and operate production AI systems — agentic workflows, RAG pipelines, and the automation that ties a business together. Most recently Director of Technology at Allied Yacht Transport.",
  keywords: [
    "Henry Barefoot",
    "Senior Full-Stack Engineer",
    "AI Systems",
    "Agentic Systems",
    "Next.js",
    "Node.js",
    "TypeScript",
    "RAG",
    "MCP",
    "Engram",
    "Miami FL",
  ],
  authors: [{ name: "Henry Barefoot", url: SITE_URL }],
  creator: "Henry Barefoot",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Henry Barefoot",
    title: "Henry Barefoot — Senior Full-Stack Engineer · AI Systems",
    description:
      "I build production AI systems and own them end to end — agentic workflows, RAG pipelines, and automation. Director of Technology at Allied Yacht Transport; author of the Engram MCP memory layer.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Henry Barefoot — Senior Full-Stack Engineer. Production AI systems, agentic workflows, RAG pipelines. Next.js, Node.js.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henry Barefoot — Senior Full-Stack Engineer",
    description:
      "Production AI systems, owned end to end — agentic workflows, RAG pipelines, automation. Next.js · Node.js · MCP.",
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
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
      <body className="min-h-full bg-[#0a0c0f] text-[#e8eaed]">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
