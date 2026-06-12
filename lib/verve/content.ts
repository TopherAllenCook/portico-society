export const HERO = {
  pill: 'The marketing department for home service businesses',
  headlineLead: 'Stop renting leads.',
  emphasisLeft: 'Own your',
  emphasisRight: 'pipeline.',
  sub: 'AI search, paid media, and lead capture systems. Free audit in 48 hours.',
  primaryCTA: { label: 'Book your free audit', href: '/audit' },
  secondaryCTA: { label: 'See how it works', href: '#services' },
}

export const PAIN_POINTS = {
  title: 'Your business has a marketing problem. We know which one.',
  items: [
    {
      headline: '"We\'re invisible when people ask AI."',
      body: 'Homeowners ask ChatGPT or Perplexity for the best plumber, electrician, or HVAC company in their area. Your name does not come up. We fix that.',
    },
    {
      headline: '"We spend on ads and do not know what comes back."',
      body: 'Running Google and Meta ads with no clear cost-per-job or attribution. We make every dollar traceable.',
    },
    {
      headline: '"Inquiries come in. Nobody follows up fast enough."',
      body: 'Calls go to voicemail after hours. Web forms sit unread. The company that answers first wins the job. We close that gap.',
    },
  ],
}

export const RESULTS = {
  title: 'The numbers that decide whether the phone rings.',
  items: [
    { metric: '60%', detail: 'of home service searches', context: 'start with an AI tool, not a search engine — BrightLocal 2025' },
    { metric: '3', detail: 'companies get named', context: 'in AI search answers per city and trade. Be one of them.' },
    { metric: '80%', detail: 'of after-hours calls', context: 'go to the company that answers first, not the one they meant to call' },
  ],
}

export type CorePackage = {
  name: string
  price: string
  tagline: string
  features: string[]
  popular?: boolean
  valueNote?: string
}

export const CORE_PACKAGES: CorePackage[] = [
  {
    name: 'Essential',
    price: '$1,500',
    tagline: 'Foundation for visibility',
    features: [
      'Business website design (initial build + ongoing updates)',
      'SEO & AEO: optimized for Google and AI search',
      'Google Business Profile & local citations',
      'Automated review requests after every completed job',
      'Live performance dashboard: rankings and AI search visibility',
    ],
  },
  {
    name: 'Growth',
    price: '$3,500',
    tagline: 'Active lead generation',
    popular: true,
    features: [
      'Everything in Essential',
      'Google & Meta PPC, managed by home service specialists',
      'AI ad creative & A/B testing',
      'Landing pages & CRO',
      'AI Content Engine: blog posts, monthly email & social copy',
      'AI Lead Nurture included: SMS + email follow-up sequences',
    ],
    valueNote: 'Includes AI Lead Nurture automation ($450/mo value)',
  },
  {
    name: 'Full Service',
    price: '$6,500',
    tagline: 'Complete marketing department',
    features: [
      'Everything in Growth',
      'AI Call Agent: phone, chat & text, 24/7',
      'AI Missed-Call Recovery',
      'AI Reactivation campaigns for past customers',
      'Dedicated strategy lead',
    ],
    valueNote: 'Includes $1,450/mo in AI automation systems',
  },
]


export const ALACARTE = [
  { name: 'Website Design', price: 'from $3,500', type: 'one-time' },
  { name: 'PPC Management only', price: 'from $1,200/mo', type: 'monthly' },
  { name: 'SEO + AEO Audit & Strategy', price: '$1,500', type: 'one-time' },
  { name: 'AI Systems Setup & Onboarding', price: 'from $1,500', type: 'one-time' },
  { name: 'Landing Page (single)', price: 'from $800', type: 'one-time' },
  { name: 'Email Sequence Setup', price: 'from $600', type: 'one-time' },
  { name: 'Google Business Profile Setup & Optimization', price: '$400', type: 'one-time' },
]

export const AI_TOOLS_SECTION = {
  title: 'Marketing that runs while you run your crews.',
  sub: 'Three AI systems that respond to leads, follow up automatically, recover missed calls, and grow your reputation around the clock.',
  tools: [
    {
      name: 'AI Call Agent',
      description: 'Answers calls, web chat, SMS, and social DMs 24/7. Qualifies leads, books estimates, escalates to your team when needed.',
    },
    {
      name: 'AI Lead Nurture',
      description: 'Multi-day SMS and email sequences that move unbooked leads toward an estimate. Stops the moment they book.',
    },
    {
      name: 'AI Reputation Manager',
      description: 'Sends review requests after every completed job. Monitors Google and industry directories. Drafts responses for your approval.',
    },
  ],
}

export const AEO_BLOCK = {
  title: 'Is your business showing up when customers ask AI?',
  sub: "When someone asks ChatGPT or Perplexity for the best plumber, electrician, or HVAC company in their city, do you appear? Most businesses do not. Find out where you stand. Free.",
  cta: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
}

// Only real, client-approved testimonials. Adding fabricated testimonials is
// a brand-trust liability. Add new entries only after written client approval.
export const TESTIMONIALS: { quote: string; name: string; title: string; clinicType?: string; businessType?: string }[] = [
  // Awaiting first client testimonial
]

export const WHO_WE_WORK_WITH = {
  title: 'Built for businesses like yours.',
  personas: [
    {
      type: 'Plumbing companies',
      description: 'Residential and commercial. Emergency calls, service work, new construction. We know how homeowners search for you.',
    },
    {
      type: 'HVAC contractors',
      description: 'Furnace replacements, AC installs, seasonal maintenance. After-hours calls are where revenue leaks. We plug it.',
    },
    {
      type: 'Electrical contractors',
      description: 'Residential service, panel upgrades, new builds. Speed wins in your trade. We make sure you answer first.',
    },
    {
      type: 'Roofing companies',
      description: 'Storm response, inspections, replacements. When every roofer in the county is chasing the same homeowners, capture beats hustle.',
    },
  ],
}

export type AIService = {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  price: string
  requiresNote?: string
}

export const AI_SERVICES: AIService[] = [
  {
    id: 'call-agent',
    name: 'AI Call Agent',
    tagline: 'Never miss a call again',
    description: '24/7 voice and chat agent that qualifies inbound leads, answers common questions, and books estimates before a human ever steps in.',
    features: [
      'Answers calls and web chat around the clock',
      'Qualifies leads by trade and job type',
      'Books estimates directly to your calendar',
      'Trained on plumbing, HVAC, electrical, and roofing vocabulary',
      'Hands off to your team when a question needs a human touch',
    ],
    price: '$600/mo',
  },
  {
    id: 'lead-nurture',
    name: 'AI Lead Nurture Engine',
    tagline: 'Turn cold leads warm, automatically',
    description: 'Automated multi-day SMS and email sequences that move unbooked leads toward an estimate, personalized by trade and job type.',
    features: [
      'Personalized SMS + email sequences',
      'Separate sequences for each trade you serve',
      'Includes past job photos, common questions, and gentle booking prompts',
      'Stops automatically when the lead books',
      'Works with any booking system you already use',
    ],
    price: '$450/mo',
  },
  {
    id: 'reputation',
    name: 'AI Reputation Manager',
    tagline: 'Steady five-star reviews without asking',
    description: 'Monitors your review profiles, sends review requests after each completed job, and drafts responses to new reviews for your approval.',
    features: [
      'Automated review requests after every completed job',
      'Google, Yelp, and trade-directory integrations',
      'AI-drafted response suggestions for every review',
      'Sentiment alerts for negative reviews before they spread',
      'Monthly reputation report included',
    ],
    price: '$450/mo',
  },
  {
    id: 'missed-call',
    name: 'AI Missed-Call Recovery',
    tagline: 'Recapture the jobs you would have lost',
    description: 'Sends a personalized follow-up within minutes of a missed call and follows up automatically until they book.',
    features: [
      'Same-minute SMS to missed callers with callback link',
      'Follow-ups over the next 24 hours',
      'Direct booking link in every message',
      'Works for after-hours, weekends, and holidays',
      'Monthly recovery rate reporting',
    ],
    price: '$350/mo',
  },
  {
    id: 'reactivation',
    name: 'AI Reactivation Engine',
    tagline: 'Bring back past customers before they forget you',
    description: 'Flags past customers based on service cycles and triggers personalized reactivation campaigns timed to what they need next.',
    features: [
      'Identifies past customers due for service before they call someone else',
      'Timed to each service cycle: tune-ups, drain cleaning, inspections',
      'Seasonal re-engagement campaigns',
      'Personalized offers for customers who have gone quiet',
      'Reactivates 15-25% of dormant customers',
    ],
    price: '$500/mo',
  },
]

export const AI_PAGE = {
  eyebrow: 'AI Infrastructure',
  headline: 'Your business should be running while you sleep.',
  sub: 'Five AI systems that respond to leads across every channel, nurture prospects, recover missed calls, and grow your reputation. Automatically, around the clock.',
  stats: [
    { value: '< 60s', label: 'avg. lead response time with AI Call Agent' },
    { value: '32%', label: 'of missed calls rebook with automated follow-up' },
    { value: '4.8★', label: 'avg. review rating maintained with reputation automation' },
  ],
  workflow: {
    eyebrow: 'How it works',
    title: 'One missed call. Five automated actions.',
    sub: 'Every inbound lead triggers a chain of AI-powered steps. Nothing falls through the cracks.',
    steps: [
      {
        label: 'Lead arrives',
        description: 'Call, web form, DM, or chat widget: any channel, any hour.',
      },
      {
        label: 'AI responds in 60s',
        description: 'Business-branded message sent instantly. No hold time. No missed calls.',
      },
      {
        label: 'Lead captured',
        description: 'Contact logged with trade and job type noted. Nothing slips through.',
      },
      {
        label: 'Follow-ups begin',
        description: 'Multi-day personalized SMS and email follow-ups start automatically.',
      },
      {
        label: 'Review requested',
        description: 'After each completed job, a review request goes out while the experience is fresh.',
      },
      {
        label: 'Win-back campaign starts',
        description: 'At the right service interval, a personalized campaign goes out to bring past customers back.',
      },
    ],
  },
}

export const AUDIT_PAGE = {
  headline: 'Find out if AI recommends your business.',
  sub: "We'll audit your visibility in ChatGPT, Perplexity, and Google AI Overviews, plus your SEO, Google Ads, and website conversion rate. Free. No pitch.",
  deliverables: [
    { title: 'AEO Visibility Score', description: 'Are you showing up in AI search when homeowners look for plumbing, HVAC, electrical, or roofing?' },
    { title: 'SEO Health Check', description: 'Technical issues, keyword gaps, and quick wins.' },
    { title: 'Paid Ads Assessment', description: "If you're running ads, we'll tell you what's working and what's wasted spend." },
    { title: 'Website Conversion Audit', description: 'Are visitors booking estimates? We will identify the friction points.' },
  ],
  deliveryNote: 'Delivered within 48 hours via email. No call required.',
}
