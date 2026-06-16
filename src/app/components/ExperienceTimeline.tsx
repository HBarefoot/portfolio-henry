"use client";

import { useState } from "react";

type Job = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
  stack: string[];
};

const JOBS: Job[] = [
  {
    role: "Director of Technology",
    company: "Allied Yacht Transport",
    dates: "Aug 2025 — Jun 2026",
    bullets: [
      "Led end-to-end architecture and delivery of an AI-powered yacht-transport platform — quote turnaround cut from days to minutes across 15+ international ports.",
      "Shipped three specialized Claude-powered agents (visitor, member, internal admin) with human-in-the-loop approval gates.",
      "Built dynamic pricing and routing engines handling weight, insurance, and compliance logic, with a secure admin dashboard and role-based access.",
      "Authored continuity, admin, and deployment documentation for a clean ownership handoff.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "n8n", "Claude API"],
  },
  {
    role: "Web Developer",
    company: "Addigy",
    dates: "Aug 2023 — Jul 2025",
    bullets: [
      "Built and maintained scalable WordPress sites with 8+ custom plugins, reusable components, and responsive landing pages.",
      "Improved UX and performance with cross-browser and mobile compatibility, partnering with designers and marketers.",
      "Developed Looker Studio + BigQuery dashboards integrating HubSpot and custom APIs to streamline lead capture.",
    ],
    stack: ["WordPress", "PHP", "JavaScript", "Looker Studio", "BigQuery"],
  },
  {
    role: "Sr. Web Developer",
    company: "Vital Pharmaceuticals",
    dates: "Feb 2020 — May 2023",
    bullets: [
      "Led the development team and managed project workflows through task delegation and ticketing.",
      "Built landing pages and marketing features in PHP, Node.js, WordPress, JavaScript, and React.",
      "Integrated third-party platforms, drove best practices for scalable code, and supported developer onboarding.",
    ],
    stack: ["PHP", "Node.js", "React", "WordPress", "JavaScript"],
  },
  {
    role: "Email Developer",
    company: "AARP",
    dates: "Jan 2022 — Jul 2022",
    bullets: [
      "Designed and developed custom email templates from scratch in Salesforce Marketing Cloud.",
      "Imported and segmented customer lists; set up automation workflows and performance metrics.",
      "Ensured cross-client compatibility and responsive rendering across major email platforms.",
    ],
    stack: ["Salesforce MC", "HTML", "CSS"],
  },
  {
    role: "Email Developer",
    company: "Crystal Cruises",
    dates: "2018 — 2020",
    bullets: [
      "Built a custom Node.js automation tool (Cheerio, MongoDB, Axios) to auto-generate HTML content blocks for Salesforce emails.",
      "Designed and coded responsive HTML emails optimized for all major email clients.",
    ],
    stack: ["Node.js", "MongoDB", "Cheerio", "HTML Email"],
  },
];

export default function ExperienceTimeline() {
  const [openJob, setOpenJob] = useState(0);

  return (
    <div data-reveal style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
      {JOBS.map((job, idx) => {
        const open = openJob === idx;
        return (
          <div key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
            <button
              type="button"
              onClick={() => setOpenJob((cur) => (cur === idx ? -1 : idx))}
              className="group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                width: "100%",
                padding: "24px 6px",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                textAlign: "left",
                color: "inherit",
                transition: "padding-left .2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "14px")}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "6px")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                <span
                  className="font-display"
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(18px, 2.1vw, 22px)",
                    letterSpacing: "-0.01em",
                    color: "#f4f6f8",
                  }}
                >
                  {job.company}
                </span>
                <span style={{ fontSize: 14, color: "#9aa3ad" }}>{job.role}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "none" }}>
                <span className="font-mono" style={{ fontSize: 12, color: "#5b6571", whiteSpace: "nowrap" }}>
                  {job.dates}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 19,
                    lineHeight: 1,
                    color: "var(--accent, #57b0e8)",
                    width: 16,
                    textAlign: "center",
                  }}
                >
                  {open ? "–" : "+"}
                </span>
              </div>
            </button>
            {open ? (
              <div style={{ padding: "2px 6px 30px", animation: "hbup .45s cubic-bezier(.22,.61,.36,1) both" }}>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 11,
                    maxWidth: 760,
                  }}
                >
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        position: "relative",
                        paddingLeft: 20,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#9aa3ad",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 9,
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--accent, #57b0e8)",
                          opacity: 0.7,
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                  {job.stack.map((s, si) => (
                    <span
                      key={si}
                      className="font-mono"
                      style={{
                        fontSize: 11,
                        color: "#9aa3ad",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 5,
                        padding: "4px 9px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
