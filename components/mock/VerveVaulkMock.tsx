'use client'

import { useEffect, useRef, useState } from 'react'
import NavVerve from '@/components/verve/NavVerve'
import FooterVerve from '@/components/verve/FooterVerve'

/* ============================================================
   Verve MD — cinematic clone of vaulk.com/en-gb
   Same layout, dimensions and motion; Verve MD content + brand.
   ============================================================ */

type Part = { t: string; accent?: boolean }

/** Split text into per-character spans for the wipe-in reveal.
 *  Words stay unbreakable; spaces animate too. Accent segments tint. */
function Chars({ parts }: { parts: Part[] }) {
  let i = 0
  return (
    <>
      {parts.map((part, pi) => {
        const tokens = part.t.split(/(\s+)/)
        return (
          <span key={pi}>
            {tokens.map((tok, ti) => {
              if (tok === '') return null
              if (/^\s+$/.test(tok)) {
                const idx = i++
                return (
                  <span key={ti} className="vk-ch" style={{ transitionDelay: `${idx * 15}ms` }}>
                    {' '}
                  </span>
                )
              }
              return (
                <span className="vk-word" key={ti}>
                  {Array.from(tok).map((c, ci) => {
                    const idx = i++
                    return (
                      <span
                        key={ci}
                        className={'vk-ch' + (part.accent ? ' vk-accent' : '')}
                        style={{ transitionDelay: `${idx * 15}ms` }}
                      >
                        {c}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </span>
        )
      })}
    </>
  )
}

/* ---------- minimal geometric icons (stroke = currentColor) ---------- */
const Ico = {
  search: (
    <svg className="vk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10.5" cy="10.5" r="6.5" /><path d="M16 16l5 5" />
      <path d="M10.5 6.5l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="currentColor" stroke="none" />
    </svg>
  ),
  target: (
    <svg className="vk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  bolt: (
    <svg className="vk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 4h6l-1 6h4l-7 10 2-8H5z" strokeLinejoin="round" />
    </svg>
  ),
  star: (
    <svg className="vk-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.9 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" strokeLinejoin="round" />
    </svg>
  ),
  arrowDR: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4l8 8M12 5v7H5" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 3v10M3 8h10" />
    </svg>
  ),
  chevDown: (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6l5 5 5-5" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 12V4M4 8l4-4 4 4" />
    </svg>
  ),
  down: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 4v8M4 8l4 4 4-4" />
    </svg>
  ),
}

/* ---------- content (Verve MD, mapped onto Vaulk's structure) ---------- */
const TRIAD = [
  { ico: Ico.search, h: 'AI Search', p: 'Named when homeowners ask ChatGPT, Perplexity, and Google AI for the best in your trade.' },
  { ico: Ico.target, h: 'Paid Media', p: 'Google and Meta managed by home-service specialists. Every dollar traced to a booked job.' },
  { ico: Ico.bolt, h: 'Lead Capture', p: 'Calls, chats, forms and DMs answered in under 60 seconds, day or night.' },
]

const FEATURES = [
  'Found in ChatGPT, Perplexity and Google AI Overviews',
  'Every ad dollar traced to a booked job, not a click',
  'Inbound answered in under 60 seconds, around the clock',
  'Reviews and reactivation that compound month over month',
]

const STATS = [
  { num: [{ t: '60' }, { t: '%', accent: true }], label: 'of home-service searches now start with an AI tool, not a search engine.' },
  { num: [{ t: '3' }], label: 'companies get named in an AI answer per city and trade. Be one of them.' },
  { num: [{ t: '80' }, { t: '%', accent: true }], label: 'of after-hours calls go to whoever answers first, not who they meant to call.' },
]

const PROCESS = [
  {
    no: '001',
    tag: 'Day 0: Free audit',
    body:
      'We audit your AI-search visibility, paid spend, and site conversion. Delivered within 48 hours, no sales call required.',
  },
  {
    no: '002',
    tag: 'Day 1 to 7: Build',
    body:
      'We build your AI-optimized site, lead-capture systems, and campaigns. Branded, tracked, and ready to launch. No long onboarding.',
  },
  {
    no: '003',
    tag: 'Day 7 to 14: Launch',
    body:
      'Campaigns go live, AI agents start answering, follow-up sequences fire. You start booking jobs while we tune for cost-per-job.',
  },
]

const MATRIX = [
  { ico: Ico.search, h: 'AI Search & AEO', p: 'Be the answer when homeowners ask an AI engine for the best plumber, HVAC, electrician, or roofer in your city.' },
  { ico: Ico.target, h: 'Paid Media', p: 'Google and Meta campaigns, AI ad creative, landing pages and CRO, with every dollar attributed to a booked job.' },
  { ico: Ico.bolt, h: 'Lead Capture & AI Agents', p: 'A 24/7 AI agent answers calls, chat and text, recovers missed calls, and books estimates straight to your calendar.' },
  { ico: Ico.star, h: 'Reputation & Reactivation', p: 'Automated five-star review requests after every job, plus win-back campaigns that bring past customers back.' },
]

const VERTICALS = [
  {
    no: '001',
    name: 'Plumbing companies',
    body:
      'Residential and commercial. Emergency calls, service work, new construction. We know exactly how homeowners search for a plumber, and we make sure you are the name that comes up.',
    cta: 'Book your free audit',
  },
  {
    no: '002',
    name: 'HVAC contractors',
    body:
      'Furnace replacements, AC installs, seasonal maintenance. After-hours calls are where revenue leaks fastest. We plug the gap with instant capture and follow-up.',
    cta: 'Book your free audit',
  },
  {
    no: '003',
    name: 'Electrical contractors',
    body:
      'Residential service, panel upgrades, new builds. Speed wins in your trade. We make sure you answer first, every time, on every channel.',
    cta: 'Book your free audit',
  },
  {
    no: '004',
    name: 'Roofing companies',
    body:
      'Storm response, inspections, replacements. When every roofer in the county is chasing the same homeowners, capture beats hustle. We build the capture.',
    cta: 'Book your free audit',
  },
  {
    no: '005',
    name: 'Multi-trade & new construction',
    body:
      'Running several trades or builder relationships under one roof? One unified growth platform covers every line of business and every lead source.',
    cta: 'Book your free audit',
  },
]

const FAQS = [
  {
    q: 'What makes Verve MD different from a typical agency?',
    a: 'Most agencies optimize for clicks and impressions. We optimize for booked jobs. You get AI-search visibility, paid media, and 24/7 lead capture as one connected system, with every dollar traced back to revenue, not vanity metrics.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Your free audit lands within 48 hours. A full system is typically live within 14 days. AI lead-capture and missed-call recovery start producing booked estimates almost immediately; paid media and AI-search gains compound over the following weeks.',
  },
  {
    q: 'What is Answer Engine Optimization (AEO)?',
    a: 'AEO is the practice of getting your business named when someone asks an AI engine like ChatGPT, Claude, Perplexity, or Google AI Overviews for a recommendation. Roughly 60% of home-service searches now begin there, and only a handful of companies get named per city and trade.',
  },
  {
    q: 'Do I need to already be running ads?',
    a: 'No. We meet you where you are. Many clients start with the free audit and an AI-search foundation, then layer paid media once capture and follow-up are solid so no spend is wasted on leads that fall through the cracks.',
  },
  {
    q: 'What does it cost?',
    a: 'Packages run from a foundational visibility plan to a complete outsourced marketing department with paid media and full AI automation. The free 48-hour audit tells you exactly which package fits before you commit to anything.',
  },
  {
    q: 'Which trades do you work with?',
    a: 'Plumbing, HVAC, electrical, and roofing are our core, plus multi-trade and new-construction operators. If homeowners find you by searching and call you to book, the system fits.',
  },
]

/* ---------- rail sections (dark sections only, like Vaulk) ---------- */
const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'approach', label: 'Approach' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'verticals', label: 'Verticals' },
]

/* ---------- self-hosted photos (public/verve) ---------- */
const PROCESS_PHOTOS = ['/verve/process-audit.jpg', '/verve/process-build.jpg', '/verve/process-launch.jpg']
const VERTICAL_PHOTOS = [
  '/verve/vertical-plumbing.jpg',
  '/verve/vertical-hvac.jpg',
  '/verve/vertical-electrical.jpg',
  '/verve/vertical-roofing.jpg',
  '/verve/vertical-multitrade.jpg',
]
// teal/charcoal duotone overlay over a photo so it sits in the palette
const duoDark = (img: string) => ({
  background: `linear-gradient(155deg, rgba(31,158,147,0.20), rgba(15,19,18,0.66)), url(${img}) center/cover no-repeat`,
})
const duoLight = (img: string) => ({
  background: `linear-gradient(160deg, rgba(31,158,147,0.10), rgba(15,19,18,0.20)), url(${img}) center/cover no-repeat`,
})

export default function VerveVaulkMock() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [railActive, setRailActive] = useState<string>('overview')
  const [railVisible, setRailVisible] = useState(false)

  // pinned process
  const trackRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  // use-case carousel
  const [uc, setUc] = useState(0)

  // faq
  const [openFaq, setOpenFaq] = useState<number>(0)

  // contact toggle
  const [audience, setAudience] = useState<'pro' | 'private'>('pro')

  /* nav stuck + pinned-process step + rail scrollspy (one scroll pass) */
  useEffect(() => {
    const root = rootRef.current
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0

        // pinned process step
        const track = trackRef.current
        if (track && window.innerWidth > 980) {
          const rect = track.getBoundingClientRect()
          const total = track.offsetHeight - window.innerHeight
          const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
          const next = Math.min(PROCESS.length - 1, Math.floor(progress * PROCESS.length))
          setStep(next)
        }

        // rail scrollspy — pick the last section whose top has crossed 45% line.
        // Position-based (not center-based) so the 300vh pinned section is handled.
        if (root) {
          const sections = Array.from(root.querySelectorAll('[data-rail]')) as HTMLElement[]
          const line = window.scrollY + window.innerHeight * 0.45
          let current: HTMLElement | null = null
          for (const s of sections) {
            if (s.offsetTop <= line) current = s
          }
          if (current) {
            if (current.id) setRailActive(current.id)
            setRailVisible(current.dataset.theme === 'dark')
          } else {
            setRailVisible(false)
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  /* scroll reveal (chars + fades) */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = root.querySelectorAll('.vk-chars, .vk-fade')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="vk" ref={rootRef}>
      {/* ===================== NAV (shared, sitewide) ===================== */}
      <NavVerve />

      {/* ===================== HERO ===================== */}
      <header className="vk-hero" id="top">
        <div className="vk-hero-bg" style={{ backgroundImage: 'url(/verve/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="vk-grid" />
        <div className="vk-noise" />
        <div className="vk-hero-content">
          <p className="vk-mono vk-hero-eyebrow vk-fade">The marketing department for home service businesses</p>
          <h1 className="vk-display vk-chars">
            <Chars
              parts={[
                { t: 'AI-ready marketing systems, deployed in ' },
                { t: '14 days', accent: true },
                { t: '.' },
              ]}
            />
          </h1>
          <p className="vk-hero-sub vk-fade">
            Get found in AI search, answer every call day or night, and turn more inquiries into booked jobs. Free audit in 48 hours.
          </p>
        </div>
        <div className="vk-scroll-cue">
          <i />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </header>

      {/* sticky section rail */}
      <div className={'vk-rail' + (railVisible ? ' is-visible' : '')}>
        {RAIL.map((r) => (
          <button
            key={r.id}
            className={railActive === r.id ? 'is-active' : ''}
            onClick={() => scrollTo(r.id)}
          >
            <i />
            <span className="vk-rail-label">{r.label}</span>
          </button>
        ))}
      </div>

      {/* ===================== CORE STATEMENT + TRIAD ===================== */}
      <section className="vk-section is-dark" id="overview" data-rail data-theme="dark">
        <div className="vk-bloom tl" />
        <div className="vk-container">
          <div className="vk-core">
            <h2 className="vk-statement vk-chars">
              <Chars
                parts={[
                  { t: 'AI-search-optimized sites with integrated paid media and 24/7 lead capture, engineered to ' },
                  { t: 'own your local pipeline', accent: true },
                  { t: '.' },
                ]}
              />
            </h2>
            <div className="vk-triad">
              {TRIAD.map((t, i) => (
                <div className="vk-triad-item vk-fade" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
                  {t.ico}
                  <h3>{t.h}</h3>
                  <p>{t.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== APPROACH: media + features + stats ===================== */}
      <section className="vk-section is-dark" id="approach" data-rail data-theme="dark">
        <div className="vk-bloom br" />
        <div className="vk-container">
          <div className="vk-tagbar"><span className="vk-mono">Approach · how homeowners search now</span></div>
          <div className="vk-split" style={{ marginTop: '3.5rem' }}>
            <div className="vk-media vk-media-corners vk-fade" style={duoDark('/verve/approach.jpg')}>
              <div className="vk-crop" />
              <i />
              <div className="vk-tag"><b /><span className="vk-mono" style={{ color: '#fff' }}>SIGNAL · AI SEARCH</span></div>
            </div>
            <div>
              <h2 className="vk-h2 vk-chars" style={{ color: 'var(--vk-light)' }}>
                <Chars parts={[{ t: 'Built on how homeowners ' }, { t: 'actually', accent: true }, { t: ' search now.' }]} />
              </h2>
              <ul className="vk-feature-list">
                {FEATURES.map((f, i) => (
                  <li className="vk-fade" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                    <span className="vk-arrow">↘</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="vk-stats-row">
                {STATS.map((s, i) => (
                  <div className="vk-stat vk-fade" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
                    <div className="vk-stat-num"><Chars parts={s.num} /></div>
                    <div className="vk-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COVERAGE: secondary statement + blueprint ===================== */}
      <section className="vk-section is-dark" id="coverage" data-rail data-theme="dark">
        <div className="vk-container">
          <div className="vk-statement-block">
            <h2 className="vk-statement vk-chars">
              <Chars
                parts={[
                  { t: 'Systems engineered to ' },
                  { t: 'capture demand and convert it', accent: true },
                  { t: ', across every channel a homeowner uses.' },
                ]}
              />
            </h2>
            <div className="vk-blueprint vk-fade">
              <span className="vk-bp-box" style={{ left: '6%', top: '18%', width: '28%', height: '52%' }} />
              <span className="vk-bp-box" style={{ left: '38%', top: '30%', width: '22%', height: '40%' }} />
              <span className="vk-bp-box" style={{ left: '64%', top: '12%', width: '30%', height: '66%' }} />
              <div className="vk-tag" style={{ position: 'absolute', left: '1rem', bottom: '1rem' }}>
                <b style={{ width: 12, height: 12, background: 'var(--vk-accent)', display: 'inline-block' }} />
                <span className="vk-mono" style={{ color: '#fff' }}>UNIFIED PIPELINE · SCHEMATIC</span>
              </div>
            </div>
            <p className="vk-fade" style={{ marginTop: '2.5rem', maxWidth: '52ch', color: 'var(--vk-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              Verve MD builds on the same AI-search stack that is reshaping how every local search begins, the way Switzerland&apos;s civil-defense network set the standard for protection. Reference-grade infrastructure, applied to your pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== PROCESS: pinned scroll story (light) ===================== */}
      <section className="vk-logistics" id="process" data-rail data-theme="light">
        <div className="vk-container">
          <div className="vk-tagbar is-light"><span className="vk-mono">Onboarding · controlled launch</span></div>
          <div className="vk-logistics-head">
            <h2 className="vk-h2 vk-chars">
              <Chars parts={[{ t: 'A controlled launch process, from audit to a live pipeline in ' }, { t: '14 days', accent: true }, { t: '.' }]} />
            </h2>
          </div>
        </div>
        <div className="vk-pin">
          <div className="vk-pin-track" ref={trackRef} style={{ height: `${PROCESS.length * 100}vh` }}>
            <div className="vk-pin-sticky vk-container">
              <div className="vk-pin-media vk-media-corners">
                <i />
                {PROCESS.map((_, i) => (
                  <div key={i} className={`vk-pin-img v${i + 1}` + (step === i ? ' is-active' : '')} style={duoLight(PROCESS_PHOTOS[i])}>
                    <div className="vk-crop" />
                  </div>
                ))}
                <div className="vk-tag"><b /><span className="vk-mono" style={{ color: '#fff' }}>PHASE 00{step + 1} / 003</span></div>
              </div>
              <div className="vk-pin-steps">
                {PROCESS.map((p, i) => (
                  <div key={i} className={'vk-pin-step' + (step === i ? ' is-active' : '')}>
                    <span className="vk-step-no">{p.no}</span>
                    <h3>{p.tag}</h3>
                    <p>{p.body}</p>
                    <div className="vk-pin-progress">
                      {PROCESS.map((_, j) => (
                        <span key={j} className={step === j ? 'is-active' : ''} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GROWTH MATRIX (gray 2x2) ===================== */}
      <section className="vk-section vk-matrix" id="matrix" data-rail data-theme="light">
        <div className="vk-container">
          <div className="vk-tagbar is-light"><span className="vk-mono">Capability coverage</span></div>
          <div className="vk-matrix-grid" style={{ marginTop: '4rem' }}>
            <div className="vk-matrix-intro">
              <h2 className="vk-h2 vk-chars">
                <Chars parts={[{ t: 'Your complete ' }, { t: 'growth matrix', accent: true }, { t: '.' }]} />
              </h2>
              <p>
                Comprehensive coverage across AI search, paid media, lead capture, and reputation, run as one connected department and aligned to a single number: booked jobs.
              </p>
              <a className="vk-btn" href="/audit" style={{ background: 'var(--vk-ink)', color: 'var(--vk-light)' }}>
                Book your free audit <span className="vk-btn-icon">{Ico.plus}</span>
              </a>
            </div>
            <div className="vk-cards2">
              {MATRIX.map((m, i) => (
                <div className="vk-card vk-fade" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                  {m.ico}
                  <h3>{m.h}</h3>
                  <p>{m.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VERTICALS (dark carousel) ===================== */}
      <section className="vk-section vk-usecases" id="verticals" data-rail data-theme="dark">
        <div className="vk-bloom tl" />
        <div className="vk-container">
          <div className="vk-tagbar"><span className="vk-mono">Who it&apos;s for · 005 verticals</span></div>
          <div className="vk-uc-head" style={{ marginTop: '2.5rem' }}>
            <h2 className="vk-h2 vk-chars">
              <Chars parts={[{ t: 'Five trades, one ' }, { t: 'unified growth platform', accent: true }, { t: '.' }]} />
            </h2>
          </div>

          <div className="vk-uc-tabs">
            {VERTICALS.map((v, i) => (
              <button key={i} className={'vk-uc-tab' + (uc === i ? ' is-active' : '')} onClick={() => setUc(i)}>
                <span className="vk-uc-no">{v.no}</span>
                <span className="vk-uc-name">{v.name}</span>
              </button>
            ))}
          </div>

          <div className="vk-uc-stage">
            <div className="vk-uc-arrows">
              <button aria-label="Previous" onClick={() => setUc((uc - 1 + VERTICALS.length) % VERTICALS.length)}>{Ico.up}</button>
              <button aria-label="Next" onClick={() => setUc((uc + 1) % VERTICALS.length)}>{Ico.down}</button>
            </div>
            {VERTICALS.map((v, i) => (
              <div key={i} className={'vk-uc-panel' + (uc === i ? ' is-active' : '')}>
                <div className="vk-uc-img" style={duoDark(VERTICAL_PHOTOS[i])}>
                  <div className="vk-crop" />
                  <div className="vk-bloom2" />
                </div>
                <div className="vk-uc-body">
                  <span className="vk-mono">operational vertical_ {v.no}/005</span>
                  <h3>{v.name}</h3>
                  <p>{v.body}</p>
                  <div className="vk-uc-cta">
                    <a className="vk-btn" href="/audit">
                      {v.cta} <span className="vk-btn-icon">{Ico.arrowDR}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ (light + orb) ===================== */}
      <section className="vk-section vk-faq" id="faq" data-rail data-theme="light">
        <div className="vk-orb" />
        <div className="vk-container">
          <div className="vk-faq-grid">
            <div className="vk-faq-intro">
              <h2 className="vk-h2 vk-chars">
                <Chars parts={[{ t: 'Key questions before you ' }, { t: 'hire a partner', accent: true }, { t: '.' }]} />
              </h2>
              <a className="vk-btn is-light" href="/audit">
                Book your free audit <span className="vk-btn-icon">{Ico.plus}</span>
              </a>
            </div>
            <div className="vk-faq-list">
              {FAQS.map((f, i) => (
                <div className={'vk-faq-item' + (openFaq === i ? ' is-open' : '')} key={i}>
                  <button className="vk-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="vk-arrow">↘</span>
                    <span className="vk-faq-text">{f.q}</span>
                    <span className="vk-faq-toggle">{Ico.chevDown}</span>
                  </button>
                  <div className="vk-faq-a" style={{ maxHeight: openFaq === i ? '320px' : '0px' }}>
                    <div className="vk-faq-a-inner">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CONTACT (light) ===================== */}
      <section className="vk-section vk-contact" id="contact" data-rail data-theme="light">
        <div className="vk-container">
          <div className="vk-tagbar is-light"><span className="vk-mono">Contact us</span></div>
          <h2 className="vk-statement vk-chars" style={{ marginTop: '3rem' }}>
            <Chars parts={[{ t: 'Book your ' }, { t: 'free 48-hour audit', accent: true }, { t: ', or reach us directly.' }]} />
          </h2>
          <div className="vk-contact-grid">
            <form className="vk-form" onSubmit={(e) => e.preventDefault()}>
              <div className="vk-toggle-row full" style={{ gridColumn: '1 / -1' }}>
                <button type="button" className={'vk-toggle' + (audience === 'pro' ? ' is-active' : '')} onClick={() => setAudience('pro')}>
                  <i />Business owner
                </button>
                <button type="button" className={'vk-toggle' + (audience === 'private' ? ' is-active' : '')} onClick={() => setAudience('private')}>
                  <i />Just exploring
                </button>
              </div>
              <div className="vk-field"><label>Name*</label><input type="text" placeholder="Your name" /></div>
              <div className="vk-field"><label>Business name*</label><input type="text" placeholder="Company" /></div>
              <div className="vk-field"><label>E-mail*</label><input type="email" placeholder="you@company.com" /></div>
              <div className="vk-field"><label>Phone*</label><input type="tel" placeholder="(555) 000-0000" /></div>
              <div className="vk-field full"><label>What do you want to grow?*</label><textarea placeholder="Tell us about your trade, service area, and goals (350 characters max)." maxLength={350} /></div>
              <p className="vk-form-note">By submitting this form, you agree to the processing of your data in accordance with our Privacy Policy.</p>
              <button type="submit" className="vk-btn vk-submit">
                Send <span className="vk-btn-icon">{Ico.arrowDR}</span>
              </button>
            </form>
            <aside className="vk-contact-side">
              <div className="vk-ci-label">Free audits and partnership enquiries:</div>
              <span className="vk-arrow">↘</span>
              <div className="vk-ci-value">hello@vervemd.com</div>
              <hr />
              <div className="vk-ci-label">Office:</div>
              <span className="vk-arrow">↘</span>
              <address>
                Verve MD<br />
                Marketing for the trades<br />
                United States
              </address>
            </aside>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER (shared, sitewide) ===================== */}
      <FooterVerve />
    </div>
  )
}
