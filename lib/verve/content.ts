export const HERO = {
  eyebrow: 'Longevity & Aesthetics Marketing',
  headline: 'We help longevity & aesthetics clinics make more money.',
  sub: 'SEO, PPC, AI tools, and web design built exclusively for longevity and aesthetics practices.',
  primaryCTA: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
  secondaryCTA: { label: 'See our results', href: '#results' },
  stats: [
    { value: '$47k', label: 'avg. new monthly revenue added within 90 days' },
    { value: '3.5×', label: 'avg. return on ad spend' },
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
    { metric: '+312%', detail: 'new patient consults', context: 'Dallas longevity clinic, 6 months' },
    { metric: '$22', detail: 'avg. cost-per-lead', context: 'Manhattan med spa, Google + Meta' },
    { metric: '91%', detail: 'membership retention rate', context: 'Multi-location aesthetics practice' },
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
      'Clinic website design (initial build + ongoing updates)',
      'SEO & AEO: optimized for Google and AI search',
      'Google Business & local citations',
      'Automated review requests after every visit',
      'Live performance dashboard: rankings and AI search visibility',
    ],
  },
  {
    name: 'Growth',
    price: '$3,500',
    tagline: 'Active patient acquisition',
    popular: true,
    features: [
      'Everything in Essential',
      'Google & Meta PPC, managed by med spa specialists',
      'AI ad creative & A/B testing',
      'Landing pages & CRO',
      'AI Content Engine: 4 blog posts, monthly email & social copy',
      'AI Lead Nurture included: Day 1, 3, 7 & 14 follow-up sequences',
    ],
    valueNote: 'Includes AI Lead Nurture automation ($450/mo value)',
  },
  {
    name: 'Full Service',
    price: '$6,500',
    tagline: 'Complete marketing department',
    features: [
      'Everything in Growth',
      'AI Patient Agent: voice, web chat, WhatsApp & Instagram, 24/7',
      'AI No-Show Recovery + Retention Engine',
      'AI social animations & short-form video reels',
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
  { name: 'Google Business Setup & Optimization', price: '$400', type: 'one-time' },
]

export const AI_TOOLS_SECTION = {
  title: 'Marketing that runs while you treat patients.',
  sub: 'Five AI systems that respond to leads, follow up automatically, recover no-shows, and grow your reputation around the clock.',
  tools: [
    {
      name: 'AI Patient Agent',
      description: 'Answers calls, web chat, WhatsApp, and Instagram DMs 24/7. Qualifies leads, books consults, escalates to staff when needed.',
    },
    {
      name: 'AI Lead Nurture',
      description: 'Day 1, 3, 7, and 14 SMS and email sequences that move unbooked leads toward their first consult. Stops the moment they book.',
    },
    {
      name: 'AI Reputation Manager',
      description: 'Sends review requests 6 hours after every visit. Monitors Google, Yelp, and Healthgrades. Drafts responses for staff approval.',
    },
  ],
}

export const AEO_BLOCK = {
  title: 'Is your clinic showing up when patients ask AI?',
  sub: "When someone asks ChatGPT or Perplexity for the best longevity clinic in their city, do you appear? Most clinics don't. Find out where you stand. Free.",
  cta: { label: 'Get Your Free AEO + Marketing Audit', href: '/audit' },
}

export const TESTIMONIALS = [
  {
    quote: "Within 90 days we had more inbound consults than we'd seen all of last year. The team actually understands what we offer. They don't need a glossary for peptide protocols.",
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
    id: 'patient-agent',
    name: 'AI Patient Agent',
    tagline: 'Never miss a lead again',
    description: '24/7 voice and chat agent that qualifies inbound leads, answers clinic questions, and books consults before a human ever steps in.',
    features: [
      'Answers calls and web chat around the clock',
      'Qualifies leads by service interest',
      'Books consults directly to your calendar',
      'Trained on longevity & aesthetics vocabulary',
      'Hands off to your team when a question needs a human touch',
    ],
    price: '$600/mo',
  },
  {
    id: 'lead-nurture',
    name: 'AI Lead Nurture Engine',
    tagline: 'Turn cold leads warm, automatically',
    description: 'Automated Day 1, 3, 7, and 14 SMS and email sequences that move unbooked leads toward their first consult, personalized by service interest.',
    features: [
      'Personalized SMS + email sequences',
      'Separate sequences for each service you offer',
      'Includes patient testimonials, common questions, and gentle booking prompts',
      'Stops automatically when the lead books',
      'Works with any booking system you already use',
    ],
    price: '$450/mo',
  },
  {
    id: 'reputation',
    name: 'AI Reputation Manager',
    tagline: 'Steady five-star reviews without asking',
    description: 'Monitors your review profiles, sends review requests 6 hours after each appointment, and drafts responses to new reviews for staff approval.',
    features: [
      'Automated review requests after every visit',
      'Google, Yelp, and Healthgrades integrations',
      'AI-drafted response suggestions for every review',
      'Sentiment alerts for negative reviews before they spread',
      'Monthly reputation report included',
    ],
    price: '$450/mo',
  },
  {
    id: 'no-show',
    name: 'AI No-Show Recovery',
    tagline: 'Recapture 30%+ of missed appointments',
    description: 'Sends a personalized "we missed you" text within hours of a no-show and follows up automatically over the next 7 days until they rebook.',
    features: [
      'Same-day no-show SMS with rebooking link',
      'Follow-ups on day 3 and day 7',
      'Direct calendar link in every message',
      'Optional small incentive for rebooking',
      'Monthly recovery rate reporting',
    ],
    price: '$350/mo',
  },
  {
    id: 'retention',
    name: 'AI Retention Engine',
    tagline: 'Bring back patients before they drift',
    description: 'Flags at-risk patients based on visit frequency and triggers personalized reactivation campaigns timed to their specific service cycle.',
    features: [
      'Identifies patients who haven\'t been in a while before they go elsewhere',
      'Timed to each patient\'s treatment cycle: IV drip, Botox, memberships',
      'Seasonal re-engagement campaigns',
      'Personalized offers for patients who\'ve gone quiet',
      'Reactivates 15-25% of dormant patients',
    ],
    price: '$500/mo',
  },
]

export const AI_PAGE = {
  eyebrow: 'AI Infrastructure',
  headline: 'Your clinic should be running while you sleep.',
  sub: 'Five AI systems that respond to leads across every channel, nurture patients, recover no-shows, and grow your reputation. Automatically, around the clock.',
  stats: [
    { value: '< 60s', label: 'avg. lead response time with AI Patient Agent' },
    { value: '32%', label: 'of no-shows rebook with automated follow-up' },
    { value: '4.8★', label: 'avg. review rating maintained with reputation automation' },
  ],
  workflow: {
    eyebrow: 'How it works',
    title: 'One missed call. Six automated actions.',
    sub: 'Every inbound lead triggers a chain of AI-powered steps. Nothing falls through the cracks.',
    steps: [
      {
        label: 'Lead arrives',
        description: 'Call, web form, DM, or chat widget: any channel, any hour.',
      },
      {
        label: 'AI responds in 60s',
        description: 'Clinic-branded message sent instantly. No hold time. No missed calls.',
      },
      {
        label: 'Lead captured',
        description: 'Contact logged with service interest noted. Nothing slips through.',
      },
      {
        label: 'Follow-ups begin',
        description: 'Day 1, 3, 7, 14: personalized SMS and email follow-ups start automatically.',
      },
      {
        label: 'Review requested',
        description: '6 hours after each visit, a review request goes out while the experience is fresh.',
      },
      {
        label: 'Win-back campaign starts',
        description: 'At 90 days of silence, a personalized campaign goes out to bring them back.',
      },
    ],
  },
}

export const AUDIT_PAGE = {
  headline: 'Find out if AI recommends your clinic.',
  sub: "We'll audit your clinic's visibility in ChatGPT, Perplexity, and Google AI Overviews, plus your SEO, Google Ads, and website conversion rate. Free. No pitch.",
  deliverables: [
    { title: 'AEO Visibility Score', description: 'Are you showing up in AI search when patients ask about longevity or aesthetics care?' },
    { title: 'SEO Health Check', description: 'Technical issues, keyword gaps, and quick wins.' },
    { title: 'Paid Ads Assessment', description: 'If you\'re running ads, we\'ll tell you what\'s working and what\'s wasted spend.' },
    { title: 'Website Conversion Audit', description: 'Are visitors booking? We\'ll identify the friction points.' },
  ],
  deliveryNote: 'Delivered within 48 hours via email. No call required.',
}
