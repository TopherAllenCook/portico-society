'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'

const AUDIT_ENDPOINT = '/api/audit/submit'

type Status = 'idle' | 'submitting' | 'redirecting' | 'error'

type ErrorKey = 'clinic_name' | 'website' | 'name' | 'email' | 'specialty' | 'city'

export default function AuditFormVerve() {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})

  function validate(data: FormData): Partial<Record<ErrorKey, string>> {
    const errs: Partial<Record<ErrorKey, string>> = {}
    if (!data.get('clinic_name')) errs.clinic_name = 'Required'
    const website = String(data.get('website') ?? '')
    if (!website) errs.website = 'Required'
    else {
      try { new URL(website.startsWith('http') ? website : `https://${website}`) } catch { errs.website = 'Enter a valid URL' }
    }
    if (!data.get('name')) errs.name = 'Required'
    const email = String(data.get('email') ?? '')
    if (!email) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    if (!data.get('specialty')) errs.specialty = 'Pick one'
    if (!data.get('city')) errs.city = 'Required'
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

    const websiteRaw = String(data.get('website') ?? '').trim()
    const payload = {
      clinic_name: String(data.get('clinic_name') ?? '').trim(),
      website_url: websiteRaw.startsWith('http') ? websiteRaw : `https://${websiteRaw}`,
      contact_name: String(data.get('name') ?? '').trim(),
      contact_email: String(data.get('email') ?? '').trim(),
      contact_phone: String(data.get('phone') ?? '').trim() || null,
      specialty: String(data.get('specialty') ?? 'plumbing'),
      city: String(data.get('city') ?? '').trim(),
      state: String(data.get('state') ?? '').trim() || null,
      challenge: String(data.get('challenge') ?? '').trim() || null,
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ''),
    }

    try {
      const res = await fetch(AUDIT_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        setStatus('error')
        return
      }
      const data = (await res.json()) as { ok?: boolean; share_token?: string }
      if (!data.share_token) {
        setStatus('error')
        return
      }
      setStatus('redirecting')
      router.push(`/audit-report/${data.share_token}?fresh=1`)
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
    outlineColor: 'transparent',
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-2xl p-8"
      style={{ background: 'var(--color-cta-surface)', border: '1px solid var(--color-ivory-subtle)' }}
      noValidate
    >
      {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor={HONEYPOT_FIELD}>Company size</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="clinic_name" style={labelStyle}>Business Name</label>
          <input id="clinic_name" name="clinic_name" type="text" style={inputStyle} placeholder="Apex Plumbing" className={inputCls} aria-describedby={errors.clinic_name ? 'err-clinic_name' : undefined} />
          {errors.clinic_name && <p id="err-clinic_name" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.clinic_name}</p>}
        </div>
        <div>
          <label htmlFor="website" style={labelStyle}>Website URL</label>
          <input id="website" name="website" type="url" style={inputStyle} placeholder="https://yourcompany.com" className={inputCls} aria-describedby={errors.website ? 'err-website' : undefined} />
          {errors.website && <p id="err-website" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.website}</p>}
        </div>
        <div>
          <label htmlFor="name" style={labelStyle}>Your Name</label>
          <input id="name" name="name" type="text" style={inputStyle} placeholder="Sarah M." className={inputCls} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p id="err-name" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input id="email" name="email" type="email" style={inputStyle} placeholder="you@company.com" className={inputCls} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && <p id="err-email" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="city" style={labelStyle}>Primary City</label>
          <input id="city" name="city" type="text" style={inputStyle} placeholder="Austin" className={inputCls} aria-describedby={errors.city ? 'err-city' : undefined} />
          {errors.city && <p id="err-city" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state" style={labelStyle}>State (optional)</label>
          <input id="state" name="state" type="text" style={inputStyle} placeholder="Texas" className={inputCls} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" style={labelStyle}>Phone (optional)</label>
          <input id="phone" name="phone" type="tel" style={inputStyle} placeholder="+1 (555) 000-0000" className={inputCls} />
        </div>
        <div>
          <label htmlFor="specialty" style={labelStyle}>Trade</label>
          <select
            id="specialty"
            name="specialty"
            defaultValue=""
            style={{ ...inputStyle, appearance: 'none', paddingRight: '2.5rem' }}
            className={inputCls}
            aria-describedby={errors.specialty ? 'err-specialty' : undefined}
          >
            <option value="" disabled>Choose one</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
            <option value="electrical">Electrical</option>
            <option value="roofing">Roofing</option>
            <option value="other">Other home service</option>
          </select>
          {errors.specialty && <p id="err-specialty" className="mt-1 text-xs" style={{ color: 'var(--color-cinnabar-on-dark)', fontFamily: 'var(--font-body)' }}>{errors.specialty}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="challenge" style={labelStyle}>Biggest Marketing Challenge Right Now</label>
        <textarea
          id="challenge"
          name="challenge"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="e.g. Not showing up in Google, wasting money on shared leads, calls going to voicemail..."
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
        className="mt-6 w-full rounded-xl py-4 text-sm font-semibold transition-opacity disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory-glow)]"
        style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
      >
        {status === 'submitting' ? 'Starting your audit…' : status === 'redirecting' ? 'Opening your audit…' : 'Run my audit now'}
      </button>

      <p
        className="mt-3 text-center text-xs"
        style={{ color: 'var(--color-label-text-on-dark)', fontFamily: 'var(--font-body)' }}
      >
        Free. No call required. Live results in about a minute.
      </p>
    </form>
  )
}
