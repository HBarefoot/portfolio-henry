'use client';

import { useActionState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { submitLead } from '../actions/submitLead';
import type { LeadResult } from '../actions/submitLead';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '11px 14px',
  fontSize: 14.5,
  color: '#e8eaed',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10.5,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#5b6571',
  marginBottom: 7,
};

export default function ContactForm() {
  const [state, action, isPending] = useActionState<LeadResult | null, FormData>(submitLead, null);
  const posthog = usePostHog();

  useEffect(() => {
    if (state?.ok) {
      posthog?.capture('lead_form_submit', { source: state.source });
    }
  }, [state, posthog]);

  if (state?.ok) {
    return (
      <div
        style={{
          border: '1px solid rgba(95,208,160,0.4)',
          borderRadius: 12,
          padding: '32px 28px',
          background: 'rgba(95,208,160,0.06)',
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#5fd0a0',
            marginBottom: 12,
          }}
        >
          Received
        </div>
        <p className="font-display" style={{ fontWeight: 600, fontSize: 20, color: '#f4f6f8', margin: 0 }}>
          Message received.
        </p>
        <p style={{ margin: '10px 0 0', fontSize: 14.5, color: '#9aa3ad', lineHeight: 1.6 }}>
          I read every message myself — I&apos;ll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Honeypot — hidden from real users, bots fill it, server rejects if non-empty */}
      <input
        name="website"
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      {state && !state.ok && (
        <div
          role="alert"
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 8,
            padding: '12px 14px',
            fontSize: 13.5,
            color: '#f87171',
          }}
        >
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <div>
          <label className="font-mono" style={labelStyle}>
            Name <span style={{ color: '#57b0e8' }}>*</span>
          </label>
          <input name="name" type="text" required autoComplete="name" className="lead-input" style={inputStyle} />
        </div>
        <div>
          <label className="font-mono" style={labelStyle}>
            Email <span style={{ color: '#57b0e8' }}>*</span>
          </label>
          <input name="email" type="email" required autoComplete="email" className="lead-input" style={inputStyle} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <div>
          <label className="font-mono" style={labelStyle}>
            Company
          </label>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            className="lead-input"
            style={inputStyle}
          />
        </div>
        <div>
          <label className="font-mono" style={labelStyle}>
            Role
          </label>
          <input
            name="role"
            type="text"
            autoComplete="organization-title"
            className="lead-input"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label className="font-mono" style={labelStyle}>
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          className="lead-input"
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn-accent"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          fontSize: 14,
          fontWeight: 600,
          color: '#0a0c0f',
          background: 'var(--accent, #57b0e8)',
          padding: '13px 22px',
          borderRadius: 8,
          border: 'none',
          cursor: isPending ? 'default' : 'pointer',
          opacity: isPending ? 0.7 : 1,
          alignSelf: 'flex-start',
        }}
      >
        {isPending ? (
          <>
            <span
              className="lead-spinner"
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid rgba(10,12,15,0.3)',
                borderTopColor: '#0a0c0f',
                animation: 'spin 0.7s linear infinite',
              }}
            />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </button>
    </form>
  );
}
