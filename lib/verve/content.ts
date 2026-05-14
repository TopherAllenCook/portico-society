export const HERO = {
  eyebrow: 'Longevity & Aesthetics Marketing',
  headline: 'We help longevity & aesthetics clinics make more money.',
  sub: 'SEO, PPC, AI tools, and web design — built exclusively for longevity and aesthetics practices.',
  primaryCTA: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
  secondaryCTA: { label: 'See our results', href: '#results' },
  stats: [
    { value: '$47k', label: 'avg. new monthly revenue added within 90 days' },
    { value: '6.2×', label: 'avg. return on marketing spend' },
    { value: '83%', label: 'of clients renew after year one' },
  ],
}

export const PAIN_POINTS = {
  title: 'Your clinic has a marketing problem. We know which one.',
  items: [
    {
      headline: '"We\'re invisible in AI search."',
      body: 'Patients ask ChatGPT for the best longevity clinic in their city. Your name doesn\'t come up. We fix that.',
    },
    {
      headline: '"We\'re running ads with no idea if they work."',
      body: 'Spending on Google and Meta with no clear cost-per-consult or attribution. We make every dollar traceable.',
    },
    {
      headline: '"We have a great clinic and an empty calendar."',
      body: 'The practice is excellent. The marketing infrastructure doesn\'t match. That\'s a solvable problem.',
    },
  ],
}

export const RESULTS = {
  title: 'What we\'ve done for clinics like yours.',
  items: [
    { metric: '+312%', detail: 'new patient consults', context: 'Dallas longevity clinic — 6 months' },
    { metric: '$22', detail: 'avg. cost-per-lead', context: 'Manhattan med spa — Google + Meta' },
    { metric: '91%', detail: 'membership retention rate', context: 'Multi-location aesthetics practice' },
  ],
}

export type CorePackage = {
  name: string
  price: string
  tagline: string
  features: string[]
  popular?: boolean
}

export const CORE_PACKAGES: CorePackage[] = [
  {
    name: 'Essential',
    price: '$1,500',
    tagline: 'Foundation for visibility',
    features: [
      'Clinic website design (initial build + ongoing updates)',
      'SEO & technical setup',
      'Google Business & local search',
      'Review generation',
      'Monthly analytics report',
    ],
  },
  {
    name: 'Growth',
    price: '$3,500',
    tagline: 'Active patient acquisition',
    popular: true,
    features: [
      'Everything in Essential',
      'Google & Meta PPC',
      'AI ad creative & testing',
      'Landing pages & CRO',
      'AI content engine (blog, email, social)',
      'Patient nurture automation',
    ],
  },
  {
    name: 'Full Service',
    price: '$6,500',
    tagline: 'Complete marketing department',
    features: [
      'Everything in Growth',
      'AI patient agent (24/7 lead qualification)',
      'AI motion & social animations',
      'Short-form video & reels',
      'Membership retention campaigns',
      'Dedicated strategy lead',
    ],
  },
]

export type AIPackage = {
  name: string
  price: string
  features: string[]
}

export const AI_PACKAGES: AIPackage[] = [
  {
    name: 'AI Agent',
    price: '$500',
    features: [
      '24/7 lead qualification chatbot',
      'Answers service & pricing questions',
      'Books consults automatically',
      'Speaks longevity + aesthetics fluently',
    ],
  },
  {
    name: 'AI Creative',
    price: '$750',
    features: [
      '8 AI-generated social animations/mo',
      '4 short-form video reels/mo',
      'Clinic-branded & ready to post',
      'Ad creative variants included',
    ],
  },
  {
    name: 'AI Content Engine',
    price: '$750',
    features: [
      '4 SEO blog posts/mo',
      'Monthly email campaign',
      'Social captions & copy',
      'Written in clinical voice',
    ],
  },
]

export const ALACARTE = [
  { name: 'Website Design', price: 'from $3,500', type: 'one-time' },
  { name: 'PPC Management only', price: 'from $1,000/mo', type: 'monthly' },
  { name: 'SEO Audit & Strategy', price: '$1,200', type: 'one-time' },
  { name: 'Landing Page (single)', price: 'from $800', type: 'one-time' },
  { name: 'Email Sequence Setup', price: 'from $600', type: 'one-time' },
  { name: 'Google Business Setup & Optimization', price: '$400', type: 'one-time' },
]

export const AI_TOOLS_SECTION = {
  title: 'Marketing that runs while you treat patients.',
  sub: "We're not just a marketing agency. We build AI systems that generate and qualify leads around the clock.",
  tools: [
    {
      name: 'AI Patient Agent',
      description: '24/7 chatbot that qualifies leads, answers clinic questions, and books consults — before a human ever steps in.',
    },
    {
      name: 'AI Creative',
      description: 'Social animations, reels, and ad creative generated and branded for your clinic. Ready to post.',
    },
    {
      name: 'AI Content Engine',
      description: 'Blog posts, emails, and social copy written in clinical voice — NAD+, peptide protocols, biomarkers — the vocabulary your patients use.',
    },
  ],
}

export const AEO_BLOCK = {
  title: 'Is your clinic showing up when patients ask AI?',
  sub: "When someone asks ChatGPT or Perplexity for the best longevity clinic in their city, do you appear? Most clinics don't. Find out where you stand — free.",
  cta: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
}

export const TESTIMONIALS = [
  {
    quote: "Within 90 days we had more inbound consults than we'd seen all of last year. The team actually understands what we offer — they don't need a glossary for peptide protocols.",
    name: 'Dr. Sarah M.',
    title: 'Founder',
    clinicType: 'Longevity & Functional Medicine Practice, Texas',
  },
  {
    quote: "We were throwing money at Google Ads with no idea what was working. Verve MD rebuilt our campaigns and cut our cost-per-consult by 60% in the first month.",
    name: 'James K.',
    title: 'Owner',
    clinicType: 'Medical Aesthetics & Wellness, New York',
  },
  {
    quote: "The AI patient agent alone paid for the entire package. It qualifies leads overnight and books consults while we sleep.",
    name: 'Dr. Rachel T.',
    title: 'Medical Director',
    clinicType: 'Multi-Location Aesthetics Practice, California',
  },
]

export const WHO_WE_WORK_WITH = {
  title: 'Built for practices like yours.',
  personas: [
    {
      type: 'Solo practitioners & clinic founders',
      description: 'You built the practice. You shouldn\'t be managing your own marketing. We handle it so you can focus on patients.',
    },
    {
      type: 'Med spa & aesthetics owners',
      description: 'Injectables, body contouring, regenerative aesthetics. We know your service menu and how patients search for it.',
    },
    {
      type: 'Multi-location longevity centers',
      description: 'Scaling from 1 to 3+ locations. Consistent campaigns, local SEO per location, centralized reporting.',
    },
  ],
}

export const AUDIT_PAGE = {
  headline: 'Find out if AI recommends your clinic.',
  sub: "We'll audit your clinic's visibility in ChatGPT, Perplexity, and Google AI Overviews — plus your SEO, Google Ads, and website conversion rate. Free. No pitch.",
  deliverables: [
    { title: 'AEO Visibility Score', description: 'Are you showing up in AI search when patients ask about longevity or aesthetics care?' },
    { title: 'SEO Health Check', description: 'Technical issues, keyword gaps, and quick wins.' },
    { title: 'Paid Ads Assessment', description: 'If you\'re running ads, we\'ll tell you what\'s working and what\'s wasted spend.' },
    { title: 'Website Conversion Audit', description: 'Are visitors booking? We\'ll identify the friction points.' },
  ],
  deliveryNote: 'Delivered within 48 hours via email. No call required.',
}
