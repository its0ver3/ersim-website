export const BRAND = {
  name: 'ERSIM',
  tagline: 'Emergency Response Simulator',
  description: 'Train 911 dispatchers with immersive simulation. Faster onboarding. Better outcomes.',
  cta: 'Book a Consultation',
}

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
]

export const HERO = {
  eyebrow: 'Emergency Response Training Platform',
  headingTop: 'ERSIM',
  headingBottom: 'Emergency Response Simulator',
  subline: 'Train 911 dispatchers with immersive simulation. Faster onboarding. Better outcomes. Fewer critical errors.',
}

export const FEATURES = [
  {
    title: 'Reduce Training Time',
    description: 'Compress months of classroom training into weeks of immersive, scenario-based practice.',
    shufflerLabels: ['Scenario Generation', 'Adaptive Difficulty', 'Rapid Onboarding'],
  },
  {
    title: 'Improve Call Outcomes',
    description: 'Build the instincts that separate good dispatchers from great ones through realistic caller interactions.',
    typewriterMessages: [
      '> DISPATCH 911-0247: Caller stabilized. Response time: 42s',
      '> PROTOCOL MATCH: 94.2% accuracy on medical triage',
      '> SCENARIO COMPLETE: Zero critical delays detected',
      '> TRAINEE #118: Confidence index +23% this week',
      '> LIVE DRILL: Multi-vehicle incident — all units dispatched',
      '> ASSESSMENT: De-escalation protocol executed flawlessly',
    ],
  },
  {
    title: 'Structure Actionable Feedback',
    description: 'Every session generates targeted insights — no more guessing what to improve next.',
    schedulerLabel: 'Weekly Review Cadence',
  },
]

export const MISSION = {
  label: 'Our Mission',
  headline: 'Every second counts. Every dispatcher matters.',
  body: 'We believe the people who answer emergency calls deserve training as serious as the situations they face. ERSIM exists to close the gap between the classroom and the crisis — giving dispatchers the reflexes, confidence, and judgment to perform when lives are on the line.',
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
    description: 'Dispatchers practice with AI-powered callers that adapt to their responses — building reflexes, not just knowledge.',
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
  platform: ['Features', 'Protocol', 'Pricing', 'Documentation'],
  company: ['About', 'Careers', 'Contact', 'Press'],
  legal: ['Privacy Policy', 'Terms of Service', 'Security'],
}
