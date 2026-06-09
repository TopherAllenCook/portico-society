export const HERO = {
  pill: 'The marketing department for home service businesses',
  headlineLead: 'Stop renting leads.',
  // Two italic words flank the inline icon: HeroVerve splits this string into <emphLeft> <icon> <emphRight>
  emphasisLeft: 'Own',
  emphasisRight: 'your pipeline.',
  sub: 'Get found in AI search. Answer every call. Book more jobs. Free audit in 48 hours.',
  primaryCTA: { label: 'Book your free audit', href: '/audit' },
  secondaryCTA: { label: 'See how it works', href: '#services' },
}

export const PAIN_POINTS = {
  title: 'Your business has a marketing problem. We know which one.',
  items: [
    {
      headline: '"We pay for leads that go to four other guys."',
      body: 'Shared leads pit you against your competitors. We build a pipeline you own.',
    },
    {
      headline: '"Half our calls go to voicemail."',
      body: 'Every missed call is a job for the next company. We answer, day or night.',
    },
    {
      headline: '"We\'re invisible when customers ask AI."',
      body: 'Homeowners ask AI who to call. You don\'t come up. We fix that.',
    },
  ],
}

export const RESULTS = {
  title: 'The numbers that decide whether the phone rings.',
  items: [
    { metric: '24/7', detail: 'call answering', context: 'every inquiry captured, even after hours' },
    { metric: '< 60s', detail: 'lead response time', context: 'AI answers before the lead calls a competitor' },
    { metric: '1st', detail: 'name in AI search', context: 'where homeowners now start the search' },
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
      'Website design + ongoing updates',
      'SEO & AEO for Google and AI search',
      'Google Business Profile & local citations',
      'Automated review requests after every job',
      'Live performance dashboard',
    ],
  },
  {
    name: 'Growth',
    price: '$3,500',
    tagline: 'Active lead generation',
    popular: true,
    features: [
      'Everything in Essential',
      'Google, Meta & Local Service Ads, managed',
      'AI ad creative & A/B testing',
      'Landing pages & conversion optimization',
      'AI Content Engine: blog, email & social',
      'AI Lead Nurture: automated follow-ups',
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
      'AI Missed-Call Recovery + Reactivation',
      'AI social + short-form video',
      'Dedicated strategy lead',
    ],
    valueNote: 'Includes $1,450/mo in AI automation systems',
  },
]


export const ALACARTE = [
  { name: 'Website Design', price: 'from $3,500', type: 'one-time' },
  { name: 'PPC + Local Service Ads Management', price: 'from $1,200/mo', type: 'monthly' },
  { name: 'SEO + AEO Audit & Strategy', price: '$1,500', type: 'one-time' },
  { name: 'AI Systems Setup & Onboarding', price: 'from $1,500', type: 'one-time' },
  { name: 'Landing Page (single)', price: 'from $800', type: 'one-time' },
  { name: 'Email & SMS Sequence Setup', price: 'from $600', type: 'one-time' },
  { name: 'Google Business Profile Setup & Optimization', price: '$400', type: 'one-time' },
]

export const AI_TOOLS_SECTION = {
  title: 'Marketing that runs while you\'re on the job.',
  sub: 'AI that answers, follows up, and grows your reputation. Around the clock.',
  tools: [
    {
      name: 'AI Call Agent',
      description: 'Answers calls, chat, and texts 24/7. Books jobs. Escalates when needed.',
    },
    {
      name: 'AI Lead Nurture',
      description: 'Follow-ups that turn unbooked leads into jobs. Stops when they book.',
    },
    {
      name: 'AI Reputation Manager',
      description: 'Review requests after every job. Monitors Google, Yelp, and Angi.',
    },
  ],
}

export const AEO_BLOCK = {
  title: 'Is your business showing up when customers ask AI?',
  sub: "When someone asks ChatGPT or Perplexity for the best plumber, electrician, or roofer in their city, do you appear? Most home service businesses don't. Find out where you stand. Free.",
  cta: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
}

// Only real, client-approved testimonials belong here. Anonymized per client preference.
// Fabricated testimonials are an FTC endorsement-guide violation and a brand-trust liability.
// This venture has no home-service clients yet, so the array is intentionally empty until
// real, written-approved testimonials exist. TestimonialsVerve renders nothing when empty.
export const TESTIMONIALS: { quote: string; name: string; title: string; clinicType: string }[] = []

export const WHO_WE_WORK_WITH = {
  title: 'Built for businesses like yours.',
  personas: [
    {
      type: 'Owner-operators',
      description: 'In the field all day. We run the marketing so you run the jobs.',
    },
    {
      type: 'Growing trade businesses',
      description: 'Plumbing, HVAC, electrical, roofing. We get you booked.',
    },
    {
      type: 'Multi-crew & multi-location',
      description: 'Consistent campaigns and local SEO for every service area.',
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
    description: '24/7 voice, chat, and text agent that qualifies inbound leads, answers questions, and books jobs before a human ever steps in.',
    features: [
      'Answers calls, web chat, and texts around the clock',
      'Qualifies leads by job type and urgency',
      'Books jobs directly to your calendar',
    ],
    price: '$600/mo',
  },
  {
    id: 'lead-nurture',
    name: 'AI Lead Nurture Engine',
    tagline: 'Turn cold leads warm, automatically',
    description: 'Automated Day 1, 3, 7, and 14 SMS and email sequences that move unbooked leads toward a booked job, personalized by job type.',
    features: [
      'Personalized SMS + email sequences',
      'Separate sequences for each service you offer',
      'Stops automatically when the lead books',
    ],
    price: '$450/mo',
  },
  {
    id: 'reputation',
    name: 'AI Reputation Manager',
    tagline: 'Steady five-star reviews without asking',
    description: 'Monitors your review profiles, sends review requests after each job, and drafts responses to new reviews for your approval.',
    features: [
      'Automated review requests after every job',
      'Google, Yelp, and Angi integrations',
      'AI-drafted responses for every review',
    ],
    price: '$450/mo',
  },
  {
    id: 'missed-call',
    name: 'AI Missed-Call Recovery',
    tagline: 'Recapture the jobs you\'d have lost',
    description: 'Sends a personalized text the moment you miss a call and follows up automatically over the next several days until they book.',
    features: [
      'Instant missed-call text-back with booking link',
      'Follow-ups on day 1 and day 3',
      'Direct scheduling link in every message',
    ],
    price: '$350/mo',
  },
  {
    id: 'reactivation',
    name: 'AI Reactivation Engine',
    tagline: 'Bring back past customers before they forget you',
    description: 'Flags past customers due for service based on their last job and triggers personalized campaigns timed to their service cycle.',
    features: [
      'Identifies customers due for maintenance or follow-up',
      'Timed to each service cycle: tune-ups, drain cleaning, inspections',
      'Reactivates 15-25% of past customers',
    ],
    price: '$500/mo',
  },
]

export const AI_PAGE = {
  eyebrow: 'AI Infrastructure',
  headline: 'Your business should be booking jobs while you sleep.',
  sub: 'AI systems that respond to leads across every channel, nurture them, recover missed calls, and grow your reputation. Automatically, around the clock.',
  stats: [
    { value: '< 60s', label: 'avg. lead response time with AI Call Agent' },
    { value: '32%', label: 'of missed calls recovered with automated text-back' },
    { value: '4.8★', label: 'avg. review rating maintained with reputation automation' },
  ],
  workflow: {
    eyebrow: 'How it works',
    title: 'One missed call. Six automated actions.',
    sub: 'Every inbound lead triggers a chain of AI-powered steps. Nothing falls through the cracks.',
    steps: [
      {
        label: 'Lead arrives',
        description: 'Call, web form, text, or chat widget: any channel, any hour.',
      },
      {
        label: 'AI responds in 60s',
        description: 'Branded message sent instantly. No hold time. No missed calls.',
      },
      {
        label: 'Lead captured',
        description: 'Contact logged with job type and urgency noted. Nothing slips through.',
      },
      {
        label: 'Follow-ups begin',
        description: 'Day 1, 3, 7, 14: personalized SMS and email follow-ups start automatically.',
      },
      {
        label: 'Review requested',
        description: 'After each job, a review request goes out while the work is fresh.',
      },
      {
        label: 'Win-back campaign starts',
        description: 'When a customer is due for service again, a personalized campaign brings them back.',
      },
    ],
  },
}

export const AUDIT_PAGE = {
  headline: 'Find out if AI recommends your business.',
  sub: "We'll audit your visibility in ChatGPT, Perplexity, and Google AI Overviews, plus your SEO, Google Ads, and website conversion rate. Free. No pitch.",
  deliverables: [
    { title: 'AEO Visibility Score', description: 'Are you showing up in AI search when homeowners look for your services?' },
    { title: 'SEO Health Check', description: 'Technical issues, keyword gaps, and quick wins.' },
    { title: 'Paid Ads Assessment', description: 'If you\'re running ads, we\'ll tell you what\'s working and what\'s wasted spend.' },
    { title: 'Website Conversion Audit', description: 'Are visitors calling and booking? We\'ll identify the friction points.' },
  ],
  deliveryNote: 'Delivered within 48 hours via email. No call required.',
}
