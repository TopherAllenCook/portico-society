'use client'

import { useState } from 'react'

// Replace with your Formspree form ID from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const REQUIRED_FIELDS = ['clinic_name', 'website', 'name', 'email'] as const

export default function AuditFormVerve() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<typeof REQUIRED_FIELDS[number], string>>>({})

  function validate(data: FormData): typeof errors {
    const errs: typeof errors = {}
    if (!data.get('clinic_name')) errs.clinic_name = 'Required'
    if (!data.get('website')) errs.website = 'Required'
    if (!data.get('name')) errs.name = 'Required'
    const email = String(data.get('email') ?? '')
    if (!email) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
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

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--color-cta-surface)',
    border: '1px solid var(--color-ivory-muted)',
    color: 'var(--color-ivory)',
    fontFamily: 'var(--font-body)',
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-label-text-on-dark)',
    fontFamily: 'var(--font-body)',
  }

  const inputCls = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-cinnabar-on-dark)]'

  if (status === 'success') {
    return (
      <div
        className="mx-auto max-w-xl rounded-2xl p-10 text-center"
        style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
      >
        <p className="font-display text-2xl font-semibold" style={{ color: 'var(--color-ivory)' }}>
          You&rsquo;re in.
        </p>
        <p className="mt-3 text-sm" style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}>
          We&rsquo;ll have your AEO + marketing audit in your inbox within 48 hours.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-2xl p-8"
      style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="clinic_name" style={labelStyle}>Clinic Name</label>
          <input id="clinic_name" name="clinic_name" type="text" style={inputStyle} placeholder="Apex Longevity" className={inputCls} aria-describedby={errors.clinic_name ? 'err-clinic_name' : undefined} />
          {errors.clinic_name && <p id="err-clinic_name" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.clinic_name}</p>}
        </div>
        <div>
          <label htmlFor="website" style={labelStyle}>Website URL</label>
          <input id="website" name="website" type="url" style={inputStyle} placeholder="https://yourclinic.com" className={inputCls} aria-describedby={errors.website ? 'err-website' : undefined} />
          {errors.website && <p id="err-website" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.website}</p>}
        </div>
        <div>
          <label htmlFor="name" style={labelStyle}>Your Name</label>
          <input id="name" name="name" type="text" style={inputStyle} placeholder="Dr. Sarah M." className={inputCls} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p id="err-name" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input id="email" name="email" type="email" style={inputStyle} placeholder="you@clinic.com" className={inputCls} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && <p id="err-email" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="phone" style={labelStyle}>Phone (optional)</label>
        <input id="phone" name="phone" type="tel" style={inputStyle} placeholder="+1 (555) 000-0000" className={inputCls} />
      </div>

      <div className="mt-5">
        <p style={{ ...labelStyle, marginBottom: '0.6rem' }}>Primary Services</p>
        <div className="flex gap-5">
          {['Longevity', 'Aesthetics', 'Both'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="services" value={opt} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cinnabar-on-dark)]" />
              <span className="text-sm" style={{ color: 'var(--color-body-text-on-dark)', fontFamily: 'var(--font-body)' }}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="challenge" style={labelStyle}>Biggest Marketing Challenge Right Now</label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. Not showing up in Google, wasting money on ads, need more new patients..."
          className={inputCls}
        />
      </div>

      {status === 'error' && (
        <p className="mt-3 text-sm" role="alert" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 w-full rounded-full py-4 text-sm font-semibold transition-opacity disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory-glow)]"
        style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Free AEO + Marketing Audit'}
      </button>

      <p
        className="mt-3 text-center text-xs"
        style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
      >
        Free. No call required. Delivered within 48 hours.
      </p>
    </form>
  )
}
