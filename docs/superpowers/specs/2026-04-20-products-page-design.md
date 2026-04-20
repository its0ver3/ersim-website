# Products Page — Design Spec

**Date:** 2026-04-20
**Status:** Approved for implementation
**Owner:** Dean

## Goal

Replace the homepage's `Features` section with a standalone `/products` page that positions Soteria as the flagship product while introducing two upcoming products (Marathon, Apollo) in a subordinated "Coming Soon" treatment. The page must stay on brand, reduce friction for prospective buyers (by surfacing zero-setup / low-IT-burden messaging), and give every product room to pop without diluting Soteria's focus.

## Product lineup

1. **Soteria** — 911 call taker simulator. Flagship. Available now.
2. **Marathon** — dispatch trainer. Coming Soon.
3. **Apollo** — ambulance + fire trainer. Coming Soon.

## Scope & routing

- Add new page at `/products` (HashRouter route in `src/main.jsx`, matches existing `/about` pattern).
- Remove `<Features />` from `src/App.jsx` so the homepage no longer renders the Features section.
- Navbar: replace the "Features" entry with "Products" that routes to `/products` (not an in-page anchor).
- Footer: replace "Features" with "Products" in `FOOTER.platform`.
- Keep the existing three interactive components (`DiagnosticShuffler`, `TelemetryTypewriter`, `SparklineProgress`) in the codebase — the Products page will reuse `DiagnosticShuffler` in Soteria's section.

## Page structure

### Section A — Floating nav + page hero
- Reuse the floating nav pattern from `src/pages/AboutTeam.jsx` (back link + ERSIM wordmark).
- Eyebrow: `OUR PRODUCTS`
- Headline: "Built for every seat in the comms centre."
- Short supporting paragraph introducing the product family.

### Section B — Soteria flagship
- Subtle `clay/5` background wash to distinguish this as the focal block.
- Two-column layout on desktop; stacked on mobile.

**Left column:**
- `AVAILABLE NOW` pill (clay accent: `bg-clay/15 text-clay border-clay/20`).
- Product name `Soteria` rendered at the largest heading scale on the page.
- One-line descriptor: "The 911 call taker simulator."
- Paragraph carrying the months-to-weeks story (adapted from existing site copy).
- Primary CTA: `Book a Consultation` using the existing `magnetic-btn` pattern (clay button with moss slide-in).

**Right column:**
- The live `DiagnosticShuffler` component as the product visual, sized so it feels like a product window rather than a decorative element.

**Below the two columns — 4-up capability grid:**
Each cell: small icon (lucide-react) + short title + one-line body.

1. **Zero IT Setup** — Browser-based. No installs, no infrastructure, no deployment headaches.
2. **Trainer Dashboards** — Monitor live sessions, review recordings, track progress across your cohort.
3. **Scales to 50+ Trainees** — Onboard entire classes without rebuilding anything.
4. **Proprietary Rubric** — Objective scoring against the patterns that separate good call takers from great ones.

### Section C — Coming Soon
- Subtle `moss/3` background wash (mirrors the AboutTeam "Values" section treatment).
- Section eyebrow: `COMING SOON`
- Section headline: "More of the comms centre, on the way."
- 2-column card grid (Marathon | Apollo), stacked on mobile.

**Each card contains:**
- Muted `COMING SOON` pill (`bg-charcoal/10 text-charcoal/60 border-charcoal/15`) — deliberately not clay so Soteria retains the orange ownership.
- Product name in heading font, ~60% the size of Soteria's wordmark.
- One-line descriptor:
  - Marathon → "The dispatch trainer."
  - Apollo → "The EMS + fire trainer."
- 2-sentence blurb tying each product to the Soteria family (same pedagogy, same pedigree, different role).
- Subtle abstract visual motif per card — no fabricated product screenshots.
- No per-card CTA.

### Section D — Closing CTA
- Reuse the AboutTeam closing pattern.
- Headline: "Ready to modernize your training?"
- Supporting line + `Book a Consultation` magnetic button (clay → moss).

### Section E — Footer
- Existing `Footer` component.

## Visual & brand rules

- **Clay is reserved for Soteria** on this page. Marathon and Apollo use charcoal / moss accents so the visual hierarchy reinforces the messaging hierarchy.
- **Type scale:** Soteria's name is the largest heading anywhere on the page; the two coming-soon names sit at ~60% of that scale.
- **Backgrounds:** cream base, `clay/5` wash behind Soteria, `moss/3` wash behind Coming Soon — no harsh section breaks.
- **Motion:** reuse the existing GSAP ScrollTrigger pattern from `Features.jsx` for section-entry reveals.
- **Iconography:** lucide-react (already a dependency, used in `AboutTeam.jsx`).

## Default decisions

- **No "notify me" email capture on Marathon/Apollo.** Would require backend infrastructure that does not exist on this site.
- **No fabricated stats (e.g., "70% faster onboarding").** The 4-pillar capability grid carries the proof.
- **Primary CTA copy:** "Book a Consultation" — matches `BRAND.cta` and existing site voice.

## Content data

A new `PRODUCTS` export will be added to `src/constants/content.js`. Draft copy below — treat as the starting point, subject to user edits during review:

```js
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
        body: 'Built on the same engine as Soteria, tuned for the dispatcher\'s seat. Train unit assignment, radio discipline, and multi-incident awareness under pressure — without tying up a veteran for weeks.',
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
    sub: 'Whether you\'re a small agency or a large department, we\'d love to show you what ERSIM can do.',
    cta: { label: 'Book a Consultation', target: '#contact' },
  },
}
```

Book-a-Consultation CTAs navigate to `/#contact` (using the existing `scrollToSection` helper from `src/utils/scroll.js` — see `AboutTeam.jsx` for reference).

## Files touched

**Create**
- `src/pages/Products.jsx`

**Edit**
- `src/main.jsx` — register `/products` route.
- `src/App.jsx` — remove `<Features />`.
- `src/components/Navbar.jsx` — replace the "Features" link with a "Products" link that routes to `/products`.
- `src/components/Footer.jsx` — swap "Features" → "Products" in the platform column, ensure it links to `/products`.
- `src/constants/content.js` — add `PRODUCTS`; update `NAV_LINKS` and `FOOTER.platform`.

**Leave in place**
- `src/components/Features.jsx` and `src/components/features/*.jsx` — `Products.jsx` reuses `DiagnosticShuffler`. `Features.jsx` itself is no longer rendered but is left on disk for now (can be pruned in a later cleanup pass).

## Acceptance criteria

- Clicking "Products" in the navbar from any route navigates to `/products` and scrolls to top.
- Homepage no longer renders the Features section.
- `/products` renders Soteria hero, 4 capability pillars, Marathon + Apollo coming-soon cards, closing CTA, and footer.
- Soteria's `DiagnosticShuffler` animates on load and cycles scenarios.
- `Book a Consultation` buttons on `/products` route to `/#contact` and scroll to the Contact section.
- Layout is responsive: two-column blocks stack on mobile; coming-soon grid becomes a single column on mobile.
- Page passes visual review against the brand rules above (clay reserved for Soteria; no fabricated stats; no emoji).

## Out of scope

- Email capture / notify-me flow for Marathon / Apollo.
- Individual product subpages (`/products/soteria`, etc.).
- Replacing or restructuring the Pricing section.
- Any backend work.
- Pruning the now-unused `Features.jsx` and its subcomponents beyond what's reused.
