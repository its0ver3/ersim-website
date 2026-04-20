export const BRAND = {
  name: 'ERSIM',
  tagline: 'Emergency Response Simulator',
  description: 'Train 911 call takers with immersive simulation. Faster onboarding. Rapid upskilling.',
  cta: 'Book a Consultation',
}

export const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
]

export const HERO = {
  eyebrow: 'Emergency Response Training Platform',
  headingTop: 'ERSIM',
  headingBottom: 'Emergency Response Simulator',
  subline: 'Train 911 call takers with immersive simulation.\nFaster onboarding. Rapid upskilling.',
}

export const FEATURES = [
  {
    title: 'Reduce Training Time',
    description: 'Compress months of classroom training into weeks of immersive, scenario-based practice.',
    shufflerLabels: ['Scenario Generation', 'Adaptive Difficulty', 'Rapid Onboarding'],
  },
  {
    title: 'Improve Call Outcomes',
    description: 'Build the instincts that separate good call takers from great ones through realistic caller interactions.',
    typewriterMessages: [
      '> HELP DISPATCHED: Units en route in 1m 12s (15% faster)',
      '> CALLER REASSURED: Calm tone maintained through duration',
      '> TIME TO ADDRESS: 48s — 50% faster than last session',
      '> TRIAGE CAPTURED: Location, callback, suspect description',
      '> DE-ESCALATION: Caller steadied within 22s of contact',
      '> SESSION REVIEW: Top quartile performance this week',
    ],
  },
  {
    title: 'Actionable Feedback',
    description: 'Every session generates targeted insights — no more guessing what to improve next.',
    schedulerLabel: 'Weekly Review Cadence',
  },
]

export const MISSION = {
  label: 'Our Mission',
  headline: 'Create high performing call takers in less time.',
  body: 'We believe the people who answer emergency calls deserve training as serious as the situations they face. ERSIM exists to close the gap between the classroom and the crisis, giving call takers the reflexes, confidence, and judgment to perform when lives are on the line.',
}

export const PROTOCOL_STEPS = [
  {
    number: '01',
    title: 'Deploy Scenarios',
    description: 'Configure realistic emergency simulations tailored to your agency\'s call volume, geography, and incident types.',
  },
  {
    number: '02',
    title: 'Train in Real-Time',
    description: 'Call takers practice with AI-powered callers that adapt to their responses — building reflexes, not just knowledge.',
  },
  {
    number: '03',
    title: 'Analyze & Improve',
    description: 'Review granular performance data. Identify hesitation patterns. Target weaknesses with precision drill-backs.',
  },
]

export const PRICING_TIERS = [
  {
    name: 'Essential',
    price: '$299',
    period: '/mo',
    description: 'For small agencies getting started with simulation training.',
    features: [
      'Up to 10 trainees',
      '50 scenario templates',
      'Basic performance reports',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Performance',
    price: '$799',
    period: '/mo',
    description: 'For agencies ready to transform their training pipeline.',
    features: [
      'Up to 50 trainees',
      'Unlimited custom scenarios',
      'Advanced analytics dashboard',
      'Live session monitoring',
      'Priority support',
      'API access',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large departments and multi-agency deployments.',
    features: [
      'Unlimited trainees',
      'Custom scenario builder',
      'Dedicated success manager',
      'On-premise deployment option',
      'SSO & compliance tools',
      'SLA guarantee',
    ],
    highlighted: false,
  },
]

export const FOOTER = {
  platform: ['Products', 'Protocol', 'Pricing', 'Documentation'],
  company: ['About', 'Careers', 'Contact', 'Press'],
  legal: ['Privacy Policy', 'Terms of Service', 'Security'],
}

export const PRODUCTS = {
  header: {
    eyebrow: 'Our Products',
    headline: 'Built for every seat in the comms centre.',
    sub: 'One platform, three simulators, each purpose-built for the people who answer, dispatch, and respond.',
  },
  soteria: {
    status: 'Available Now',
    name: 'Soteria',
    tagline: 'The 911 call taker simulator.',
    body: 'Soteria compresses months of on-the-job, one-on-one training into weeks of immersive practice. Trainees take realistic calls, get graded against a proprietary rubric, and build the reflexes of a veteran before they ever pick up a live line.',
    pillars: [
      {
        icon: 'ServerOff',
        title: 'Zero IT Setup',
        body: 'Browser-based. No installs, no infrastructure, no deployment headaches.',
      },
      {
        icon: 'LayoutGrid',
        title: 'Trainer Dashboards',
        body: 'Monitor live sessions, review recordings, and track progress across your cohort.',
      },
      {
        icon: 'Users',
        title: 'Scales to 50+ Trainees',
        body: 'Onboard entire classes without rebuilding anything on your end.',
      },
      {
        icon: 'ClipboardCheck',
        title: 'Proprietary Rubric',
        body: 'Objective scoring against the patterns that separate good call takers from great ones.',
      },
    ],
    cta: { label: 'Book a Consultation', target: '#contact' },
  },
  upcoming: {
    eyebrow: 'Coming Soon',
    headline: 'More of the comms centre, on the way.',
    products: [
      {
        name: 'Marathon',
        tagline: 'The dispatch trainer.',
        body: "Built on the same engine as Soteria, tuned for the dispatcher's seat. Train unit assignment, radio discipline, and multi-incident awareness under pressure — without tying up a veteran for weeks.",
      },
      {
        name: 'Apollo',
        tagline: 'The EMS + fire trainer.',
        body: 'Bringing the Soteria approach to paramedics and firefighters. Realistic scenarios, measurable outcomes, and the same proprietary rubric — adapted for the people who show up on scene.',
      },
    ],
  },
  closing: {
    headline: 'Ready to modernize your training?',
    sub: "Whether you're a small agency or a large department, we'd love to show you what ERSIM can do.",
    cta: { label: 'Book a Consultation', target: '#contact' },
  },
}
