import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henry Barefoot — Engineer",
  description: "Building systems that survive contact with production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth antialiased`}>
      <body className="min-h-full bg-zinc-950 text-zinc-300">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
