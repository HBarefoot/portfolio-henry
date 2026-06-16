"use client";

import { useActionState, useEffect, useRef, type CSSProperties } from "react";
import posthog from "posthog-js";
import { submitLead, type LeadResult } from "../actions/submitLead";

const INPUT: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  padding: "11px 14px",
  fontSize: 14.5,
  color: "#e8eaed",
  outline: "none",
  boxSizing: "border-box",
};

const LABEL: CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#5b6571",
  marginBottom: 7,
};

export default function ContactForm() {
  const [state, action, pending] = useActionState<LeadResult | null, FormData>(submitLead, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      posthog.capture("lead_form_submit", { id: state.id, source: state.source });
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div
        style={{
          border: "1px solid rgba(95,208,160,0.35)",
          borderRadius: 12,
          padding: "32px 28px",
          background: "rgba(95,208,160,0.05)",
        }}
      >
        <div
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5fd0a0", marginBottom: 12 }}
        >
          Message received.
        </div>
        <p style={{ margin: 0, fontSize: 15.5, color: "#d6dbe0", lineHeight: 1.6 }}>
          I read every message myself and will reply within 24&nbsp;hours.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input name="website" type="text" tabIndex={-1} aria-hidden="true" style={{ display: "none" }} />

      {state && !state.ok && (
        <div
          role="alert"
          style={{
            background: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,80,80,0.25)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 13.5,
            color: "#ff8080",
          }}
        >
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="font-mono" style={LABEL}>
            Name <span style={{ color: "var(--accent, #57b0e8)" }}>*</span>
          </label>
          <input name="name" type="text" required placeholder="Jane Smith" style={INPUT} className="lead-input" />
        </div>
        <div>
          <label className="font-mono" style={LABEL}>
            Email <span style={{ color: "var(--accent, #57b0e8)" }}>*</span>
          </label>
          <input name="email" type="email" required placeholder="jane@company.com" style={INPUT} className="lead-input" />
        </div>
        <div>
          <label className="font-mono" style={LABEL}>
            Company
          </label>
          <input name="company" type="text" placeholder="Acme Corp" style={INPUT} className="lead-input" />
        </div>
        <div>
          <label className="font-mono" style={LABEL}>
            Role
          </label>
          <input name="role" type="text" placeholder="CTO" style={INPUT} className="lead-input" />
        </div>
      </div>

      <div>
        <label className="font-mono" style={LABEL}>
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell me about the role, the team, and the outcome you're hiring for."
          style={{ ...INPUT, resize: "vertical", minHeight: 100 }}
          className="lead-input"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="btn-accent"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "13px 22px",
          borderRadius: 8,
          fontSize: 14.5,
          fontWeight: 600,
          color: "#0a0c0f",
          background: "var(--accent, #57b0e8)",
          border: "none",
          cursor: pending ? "wait" : "pointer",
          opacity: pending ? 0.75 : 1,
          alignSelf: "flex-start",
        }}
      >
        {pending && (
          <span
            aria-hidden="true"
            className="lead-spinner"
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              border: "2px solid rgba(10,12,15,0.3)",
              borderTopColor: "#0a0c0f",
              display: "inline-block",
            }}
          />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
