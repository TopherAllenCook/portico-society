'use client'

import { useState, type CSSProperties } from 'react'
import { HONEYPOT_FIELD } from '@/lib/security/honeypot'

const ENDPOINT = '/api/new-audit'

type Status = 'idle' | 'submitting' | 'error'
type ErrorKey = 'clinic_name' | 'website' | 'name' | 'email' | 'specialty' | 'city'

interface Result {
  clinic: string
  email: string
  shareToken: string
  runNow: boolean
}

export default function NewAuditForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({})
  const [result, setResult] = useState<Result | null>(null)

  function validate(data: FormData): Partial<Record<ErrorKey, string>> {
    const errs: Partial<Record<ErrorKey, string>> = {}
    if (!String(data.get('clinic_name') ?? '').trim()) errs.clinic_name = 'Required'
    const website = String(data.get('website') ?? '').trim()
    if (!website) errs.website = 'Required'
    else {
      try { new URL(website.startsWith('http') ? website : `https://${website}`) } catch { errs.website = 'Enter a valid URL' }
    }
    if (!String(data.get('name') ?? '').trim()) errs.name = 'Required'
    const email = String(data.get('email') ?? '').trim()
    if (!email) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email'
    if (!String(data.get('specialty') ?? '')) errs.specialty = 'Pick one'
    if (!String(data.get('city') ?? '').trim()) errs.city = 'Required'
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
    setErrorMsg(null)
    setStatus('submitting')

    const websiteRaw = String(data.get('website') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const clinic = String(data.get('clinic_name') ?? '').trim()
    const runNow = data.get('run_now') === 'on'
    const payload = {
      clinic_name: clinic,
      website_url: websiteRaw.startsWith('http') ? websiteRaw : `https://${websiteRaw}`,
      contact_name: String(data.get('name') ?? '').trim(),
      contact_email: email,
      contact_phone: String(data.get('phone') ?? '').trim() || null,
      specialty: String(data.get('specialty') ?? 'longevity'),
      city: String(data.get('city') ?? '').trim(),
      state: String(data.get('state') ?? '').trim() || null,
      challenge: String(data.get('challenge') ?? '').trim() || null,
      run_now: runNow,
      [HONEYPOT_FIELD]: String(data.get(HONEYPOT_FIELD) ?? ''),
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = (await res.json().catch(() => null)) as { ok?: boolean; share_token?: string } | null
      if (!res.ok || !json?.share_token) {
        setStatus('error')
        setErrorMsg(res.status === 429 ? 'Too many in a short window. Wait a minute and try again.' : 'Could not create the audit. Check the fields and try again.')
        return
      }
      setResult({ clinic, email, shareToken: json.share_token, runNow })
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Try again.')
    }
  }

  const inputStyle: CSSProperties = {
    background: 'var(--color-ivory)',
    border: '1px solid var(--color-ink-subtle)',
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-body)',
    borderRadius: '0.5rem',
    padding: '0.65rem 0.85rem',
    fontSize: '0.9rem',
    width: '100%',
  }

  if (result) {
    const reportUrl = `/audit-report/${result.shareToken}`
    return (
      <div className="rounded-xl border p-6" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-stone)' }}>
        <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-mono)' }}>
          Audit created
        </p>
        <h2 className="mt-2 font-display" style={{ fontSize: '1.5rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>
          {result.clinic} is in the pipeline.
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
          {result.runNow
            ? <>It’s running now. The finished report is emailed to <strong style={{ color: 'var(--color-ink)' }}>{result.email}</strong>, and you can watch it build live:</>
            : <>Saved as a lead. You can run the audit anytime from the admin pipeline.</>}
        </p>
        {result.runNow && (
          <a
            href={reportUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{ background: 'var(--color-ink)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            Open live report ↗
          </a>
        )}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => { setResult(null); setStatus('idle') }}
            className="rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
          >
            Create another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border p-6" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-stone)' }}>
      {/* Honeypot — hidden from real users; bots that fill it are silently dropped. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor={HONEYPOT_FIELD}>Company size</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="clinic_name" label="Clinic name" error={errors.clinic_name}>
          <input id="clinic_name" name="clinic_name" type="text" placeholder="Apex Longevity" style={inputStyle} />
        </Field>
        <Field id="website" label="Website URL" error={errors.website}>
          <input id="website" name="website" type="url" placeholder="https://yourclinic.com" style={inputStyle} />
        </Field>
        <Field id="name" label="Contact name" error={errors.name}>
          <input id="name" name="name" type="text" placeholder="Dr. Sarah Miller" style={inputStyle} />
        </Field>
        <Field id="email" label="Contact email" error={errors.email}>
          <input id="email" name="email" type="email" placeholder="sarah@clinic.com" style={inputStyle} />
        </Field>
        <Field id="city" label="Primary city" error={errors.city}>
          <input id="city" name="city" type="text" placeholder="Austin" style={inputStyle} />
        </Field>
        <Field id="state" label="State (optional)">
          <input id="state" name="state" type="text" placeholder="Texas" style={inputStyle} />
        </Field>
        <Field id="phone" label="Phone (optional)">
          <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
        </Field>
        <Field id="specialty" label="Primary specialty" error={errors.specialty}>
          <select id="specialty" name="specialty" defaultValue="" style={{ ...inputStyle, appearance: 'none' }}>
            <option value="" disabled>Choose one</option>
            <option value="longevity">Longevity</option>
            <option value="concierge">Concierge</option>
            <option value="aesthetic">Aesthetic</option>
            <option value="mixed">Mixed</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <label htmlFor="challenge" className="mb-1.5 block text-xs uppercase" style={{ letterSpacing: '0.12em', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}>
          Biggest marketing challenge (optional)
        </label>
        <textarea id="challenge" name="challenge" rows={3} placeholder="e.g. Not showing up in Google, wasting ad spend, need more new patients…" style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-lg border p-3" style={{ borderColor: 'var(--color-ink-subtle)', background: 'var(--color-ivory)' }}>
        <input type="checkbox" name="run_now" defaultChecked className="mt-0.5" style={{ accentColor: 'var(--color-cinnabar)' }} />
        <span>
          <span className="block text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>Run the full audit now</span>
          <span className="block text-xs" style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}>
            Runs crawl, PageSpeed, AI-visibility, and DataForSEO immediately and emails the prospect. Uncheck to just save the lead and run it later.
          </span>
        </span>
      </label>

      {status === 'error' && errorMsg && (
        <p className="mt-4 text-sm" role="alert" style={{ color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}>{errorMsg}</p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full px-6 py-3 text-sm font-semibold transition-opacity disabled:opacity-60"
          style={{ background: 'var(--color-cinnabar)', color: 'var(--color-ivory)', fontFamily: 'var(--font-body)' }}
        >
          {status === 'submitting' ? 'Creating…' : 'Create audit'}
        </button>
      </div>
    </form>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs uppercase"
        style={{ letterSpacing: '0.12em', color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </label>
      {children}
      {error && <p style={{ marginTop: '0.3rem', fontSize: '0.72rem', color: 'var(--color-cinnabar)', fontFamily: 'var(--font-body)' }}>{error}</p>}
    </div>
  )
}
