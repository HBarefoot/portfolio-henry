"use client";

import { useActionState, useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { submitLead, type LeadState } from "../actions/submitLead";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 7,
  padding: "11px 14px",
  fontSize: 14.5,
  color: "#e8eaed",
  outline: "none",
} as const;

const labelStyle = {
  display: "block",
  fontSize: 12,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#7e8893",
  marginBottom: 7,
};

export default function ContactForm() {
  const posthog = usePostHog();
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, null);

  useEffect(() => {
    if (state?.ok) {
      posthog?.capture("lead_form_submit", { id: state.id, source: state.source });
    }
  }, [state, posthog]);

  if (state?.ok) {
    return (
      <div
        style={{
          border: "1px solid color-mix(in oklab, #5fd0a0 45%, transparent)",
          borderRadius: 12,
          padding: "32px 28px",
          background: "rgba(95,208,160,0.06)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5fd0a0",
            marginBottom: 14,
          }}
          className="font-mono"
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#5fd0a0",
              display: "inline-block",
            }}
          />
          Sent
        </div>
        <p className="font-display" style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#f4f6f8" }}>
          Message received.
        </p>
        <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "#9aa3ad" }}>
          I read every message myself and reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      {/* Honeypot — visually hidden, rejected server-side if filled */}
      <div style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
          <div>
            <label htmlFor="cf-name" style={labelStyle} className="font-mono">
              Name <span style={{ color: "var(--accent, #57b0e8)" }}>*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Smith"
              className="lead-input"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="cf-email" style={labelStyle} className="font-mono">
              Email <span style={{ color: "var(--accent, #57b0e8)" }}>*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@company.com"
              className="lead-input"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
          <div>
            <label htmlFor="cf-company" style={labelStyle} className="font-mono">
              Company
            </label>
            <input
              id="cf-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Corp"
              className="lead-input"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="cf-role" style={labelStyle} className="font-mono">
              Role
            </label>
            <input
              id="cf-role"
              name="role"
              type="text"
              autoComplete="organization-title"
              placeholder="CTO"
              className="lead-input"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-message" style={labelStyle} className="font-mono">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            placeholder="Tell me about the role, the team, and the outcome you're hiring for."
            className="lead-input"
            style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          />
        </div>

        {state && !state.ok && (
          <div
            role="alert"
            style={{
              padding: "11px 14px",
              borderRadius: 7,
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              fontSize: 13.5,
              color: "#f87171",
            }}
          >
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-accent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 600,
            color: "#0a0c0f",
            background: pending ? "rgba(87,176,232,0.55)" : "var(--accent, #57b0e8)",
            padding: "13px 22px",
            borderRadius: 8,
            border: "none",
            cursor: pending ? "not-allowed" : "pointer",
            alignSelf: "flex-start",
            transition: "background 0.2s",
          }}
        >
          {pending && (
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "2px solid rgba(10,12,15,0.3)",
                borderTopColor: "#0a0c0f",
                display: "inline-block",
                animation: "spin 0.7s linear infinite",
              }}
            />
          )}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
