'use client'

import { useActionState, useEffect, type CSSProperties } from 'react'
import posthog from 'posthog-js'
import { submitLead, type LeadFormState } from '../actions/submitLead'

const label: CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-jetbrains-mono)',
  fontSize: 10.5,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: '#5b6571',
  marginBottom: 7,
}

const input: CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 7,
  padding: '11px 13px',
  fontSize: 14,
  color: '#e8eaed',
  outline: 'none',
}

const fieldGroup: CSSProperties = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 4,
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<LeadFormState, FormData>(
    submitLead,
    null,
  )

  useEffect(() => {
    if (state?.ok) {
      posthog.capture('lead_form_submit', { id: state.id, source: 'portfolio_contact' })
    }
  }, [state])

  if (state?.ok) {
    return (
      <div
        style={{
          border: '1px solid rgba(95,208,160,0.25)',
          borderRadius: 12,
          padding: '32px 28px',
          background: 'rgba(95,208,160,0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(95,208,160,0.18)',
              color: '#5fd0a0',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 600,
              fontSize: 16,
              color: '#5fd0a0',
            }}
          >
            Message received.
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#9aa3ad' }}>
          I read every message myself. You&apos;ll hear back within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Honeypot — hidden from real users, filled by bots */}
      <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div style={fieldGroup}>
          <label htmlFor="cf-name" style={label}>
            Name <span style={{ color: 'var(--accent, #57b0e8)' }}>*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className="lead-input"
            style={input}
          />
        </div>
        <div style={fieldGroup}>
          <label htmlFor="cf-email" style={label}>
            Email <span style={{ color: 'var(--accent, #57b0e8)' }}>*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className="lead-input"
            style={input}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div style={fieldGroup}>
          <label htmlFor="cf-company" style={label}>
            Company
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            className="lead-input"
            style={input}
          />
        </div>
        <div style={fieldGroup}>
          <label htmlFor="cf-role" style={label}>
            Role
          </label>
          <input
            id="cf-role"
            name="role"
            type="text"
            autoComplete="organization-title"
            placeholder="CTO, VP Eng, Founder…"
            className="lead-input"
            style={input}
          />
        </div>
      </div>

      <div style={fieldGroup}>
        <label htmlFor="cf-message" style={label}>
          What are you building?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Describe the project, the team, and the outcome you're hiring for."
          className="lead-input"
          style={{
            ...input,
            resize: 'vertical' as const,
            minHeight: 96,
            lineHeight: 1.55,
          }}
        />
      </div>

      {state && !state.ok && (
        <p
          role="alert"
          style={{
            margin: 0,
            fontSize: 13.5,
            color: '#f47a7a',
            background: 'rgba(244,122,122,0.08)',
            border: '1px solid rgba(244,122,122,0.2)',
            borderRadius: 7,
            padding: '10px 13px',
          }}
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-accent"
        style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          color: pending ? 'rgba(10,12,15,0.55)' : '#0a0c0f',
          background: pending
            ? 'color-mix(in oklab, var(--accent, #57b0e8) 55%, transparent)'
            : 'var(--accent, #57b0e8)',
          padding: '12px 20px',
          borderRadius: 8,
          border: 'none',
          cursor: pending ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
      >
        {pending ? (
          <>
            <span
              style={{
                width: 12,
                height: 12,
                border: '2px solid rgba(10,12,15,0.3)',
                borderTopColor: '#0a0c0f',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.7s linear infinite',
              }}
            />
            Sending…
          </>
        ) : (
          'Send message →'
        )}
      </button>
    </form>
  )
}
