"use client";

import { useActionState, useEffect, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { usePostHog } from "posthog-js/react";
import { submitLead, type LeadResult } from "../actions/submitLead";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  padding: "11px 14px",
  fontSize: 14.5,
  color: "#e8eaed",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#5b6571",
  marginBottom: 7,
  fontFamily: "var(--font-jetbrains-mono)",
};

export default function ContactForm() {
  const posthog = usePostHog();
  const [state, action, isPending] = useActionState<LeadResult | null, FormData>(submitLead, null);
  // Page-load time — the server rejects submissions faster than ~3s (bots).
  // Stamp the uncontrolled hidden input after mount; stays "0" if JS is off,
  // which the server treats as "no timing data" (skips the check).
  const tsInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (tsInputRef.current) tsInputRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state?.ok) {
      posthog?.capture("lead_form_submit", {
        id: state.id,
        source: state.source,
      });
    }
  }, [state, posthog]);

  if (state?.ok) {
    return (
      <div
        style={{
          border: "1px solid color-mix(in oklab, #5fd0a0 40%, transparent)",
          borderRadius: 12,
          padding: "32px 28px",
          background: "color-mix(in oklab, #5fd0a0 6%, transparent)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "color-mix(in oklab, #5fd0a0 18%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            fontSize: 18,
          }}
        >
          ✓
        </div>
        <h3
          className="font-display"
          style={{ fontWeight: 600, fontSize: 20, color: "#f4f6f8", margin: "0 0 10px" }}
        >
          Message received.
        </h3>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#9aa3ad" }}>
          I read every message myself and reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      {/* Honeypot — hidden from real users */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
      />

      {/* Timing field — page-load timestamp, checked server-side */}
      <input type="hidden" name="ts" defaultValue="0" ref={tsInputRef} />

      {state && !state.ok && (
        <div
          role="alert"
          style={{
            marginBottom: 20,
            padding: "11px 14px",
            borderRadius: 8,
            background: "color-mix(in oklab, #e87557 12%, transparent)",
            border: "1px solid color-mix(in oklab, #e87557 35%, transparent)",
            fontSize: 13.5,
            color: "#e8b0a0",
          }}
        >
          {state.error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="cf-name">
              Name <span style={{ color: "#e87557" }}>*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              className="lead-input"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="cf-email">
              Email <span style={{ color: "#e87557" }}>*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="lead-input"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
          <div>
            <label style={labelStyle} htmlFor="cf-company">
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
            <label style={labelStyle} htmlFor="cf-role">
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
          <label style={labelStyle} htmlFor="cf-message">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            placeholder="What are you building? What outcome are you hiring for?"
            className="lead-input"
            style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          />
        </div>

        {/* Cloudflare Turnstile — invisible bot check; injects a hidden
            cf-turnstile-response input the server verifies. Rendered only when
            a site key is configured so local dev without keys still works. */}
        {TURNSTILE_SITE_KEY && (
          <Turnstile siteKey={TURNSTILE_SITE_KEY} options={{ size: "flexible", theme: "dark" }} />
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-accent"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            fontSize: 14,
            fontWeight: 600,
            color: "#0a0c0f",
            background: "var(--accent, #57b0e8)",
            padding: "13px 22px",
            borderRadius: 8,
            border: "none",
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.7 : 1,
            alignSelf: "flex-start",
          }}
        >
          {isPending ? (
            <>
              <span className="lead-spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send message →"
          )}
        </button>
      </div>
    </form>
  );
}
