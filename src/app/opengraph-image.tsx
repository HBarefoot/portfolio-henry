import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Henry Barefoot — Senior Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #09090b 0%, #18181b 60%, #1f1f23 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            color: "#a1a1aa",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: "#7c5cff",
            }}
          />
          Barefoot Digital
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Henry Barefoot
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 500,
              lineHeight: 1.2,
              color: "#e4e4e7",
              maxWidth: 900,
            }}
          >
            Senior Full-Stack Engineer
            <span style={{ color: "#a1a1aa" }}> · </span>
            <span style={{ color: "#00ffa3" }}>Next.js · Node.js · AI Infra</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#d4d4d8",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#00ffa3", fontWeight: 700 }}>$500K+</span>
            <span>saved on ops</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#00ffa3", fontWeight: 700 }}>95%</span>
            <span>pipeline efficiency</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#00ffa3", fontWeight: 700 }}>
              Days → Minutes
            </span>
            <span>on lead scoring</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
