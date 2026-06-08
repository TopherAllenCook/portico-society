'use client'

import { useState, type CSSProperties } from 'react'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'

const ENDPOINT = '/api/inquiry/submit'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export default function InquiryFormVerve() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {}
    if (!String(data.get('name') ?? '').trim()) errs.name = 'Required'
    const email = String(data.get('email') ?? '').trim()
    if (!email) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    if (!String(data.get('message') ?? '').trim()) errs.message = 'Required'
    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('submitting')

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      practice: String(data.get('practice') ?? '').trim() || null,
      message: String(data.get('message') ?? '').trim(),
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ''),
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const labelStyle: CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.7rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    color: 'var(--color-label-text)',
    fontFamily: 'var(--font-body)',
  }

  const inputStyle: CSSProperties = {
    background: 'var(--color-card)',
    border: '1px solid var(--color-ink-rule)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-body)',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    width: '100%',
  }

  const errorStyle: CSSProperties = {
    marginTop: '0.4rem',
    fontSize: '0.75rem',
    color: 'var(--color-cinnabar-dark)',
    fontFamily: 'var(--font-body)',
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-2xl p-8"
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-ink-rule)',
        }}
      >
        <p
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-cinnabar-dark)', fontFamily: 'var(--font-body)' }}
        >
          Message received
        </p>
        <p
          className="mt-3 font-display"
          style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', color: 'var(--color-ink)', letterSpacing: '-0.015em' }}
        >
          Got it. The founder reads every one and replies within one business day.
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          If it's urgent, you can also book a 25-minute discovery call directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor={HONEYPOT_FIELD}>Company size</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="contact-name" style={labelStyle}>Your name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required style={inputStyle} aria-invalid={!!errors.name} />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required style={inputStyle} aria-invalid={!!errors.email} />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-practice" style={labelStyle}>Business name (optional)</label>
        <input id="contact-practice" name="practice" type="text" autoComplete="organization" style={inputStyle} />
      </div>

      <div>
        <label htmlFor="contact-message" style={labelStyle}>What can we help with?</label>
        <textarea id="contact-message" name="message" rows={5} required style={{ ...inputStyle, resize: 'vertical', minHeight: '8rem' }} aria-invalid={!!errors.message} />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-60"
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-ivory)',
            fontFamily: 'var(--font-body)',
            outlineColor: 'var(--color-cinnabar)',
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
          <span aria-hidden="true">↗</span>
        </button>
        <a
          href="mailto:hello@vervemd.com?subject=Hello%20from%20vervemd.com"
          className="text-sm underline-offset-4 hover:underline"
          style={{ color: 'var(--color-body-text)', fontFamily: 'var(--font-body)' }}
        >
          Or email hello@vervemd.com
        </a>
      </div>

      {status === 'error' && (
        <p style={errorStyle} role="alert">
          Something went wrong sending that. Try again, or email hello@vervemd.com directly.
        </p>
      )}
    </form>
  )
}
