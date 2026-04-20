# Products Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/products` page that positions Soteria as the flagship product, introduces Marathon and Apollo as coming-soon products, and removes the now-redundant `Features` section from the homepage.

**Architecture:** A new route-based page mirroring the existing `AboutTeam.jsx` pattern (floating nav, NoiseOverlay, Footer, scroll-triggered GSAP reveals). Content lives in `src/constants/content.js` as a new `PRODUCTS` export. Nav/footer links gain the ability to distinguish route links (e.g., `/products`) from section anchors (`#features`). The existing `DiagnosticShuffler` component is reused inside Soteria's flagship section as its product visual.

**Tech Stack:** React 19, React Router 7 (HashRouter), Tailwind CSS, GSAP + ScrollTrigger, lucide-react, Vite.

**Testing strategy:** This codebase has no unit-test harness and the change is a marketing page with no business logic. Verification is done via `npm run lint`, `npm run build`, and manual smoke checks with the dev server. Each task ends with a concrete verification step.

**Source spec:** `docs/superpowers/specs/2026-04-20-products-page-design.md`

---

## Task 1: Add PRODUCTS content to constants

**Files:**
- Modify: `src/constants/content.js`

- [ ] **Step 1: Append the `PRODUCTS` export to `src/constants/content.js`**

Add at the end of the file (after the existing `FOOTER` export):

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
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors related to `content.js`.

- [ ] **Step 3: Commit**

```bash
git add src/constants/content.js
git commit -m "Add PRODUCTS content constants for products page"
```

---

## Task 2: Create the Products page component

**Files:**
- Create: `src/pages/Products.jsx`

- [ ] **Step 1: Create `src/pages/Products.jsx` with the following contents**

```jsx
import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ServerOff, LayoutGrid, Users, ClipboardCheck } from 'lucide-react'
import gsap from 'gsap'
import NoiseOverlay from '../components/NoiseOverlay'
import Footer from '../components/Footer'
import DiagnosticShuffler from '../components/features/DiagnosticShuffler'
import { BRAND, PRODUCTS } from '../constants/content'
import { scrollToSection } from '../utils/scroll'

const PILLAR_ICONS = {
  ServerOff,
  LayoutGrid,
  Users,
  ClipboardCheck,
}

export default function Products() {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal-section').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const goToContact = () => scrollToSection('#contact', navigate, location)

  return (
    <>
      <NoiseOverlay />

      {/* Floating nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-cream/70 backdrop-blur-xl border border-charcoal/10 shadow-lg shadow-charcoal/5">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <Link
          to="/"
          className="font-heading font-bold text-sm tracking-tight-custom px-4 text-moss"
        >
          {BRAND.name}
        </Link>
      </nav>

      <main ref={containerRef}>
        {/* Page hero */}
        <section className="reveal-section pt-36 pb-16 md:pt-44 md:pb-20 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
              {PRODUCTS.header.eyebrow}
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tighter-custom text-charcoal mt-4">
              {PRODUCTS.header.headline}
            </h1>
            <p className="text-charcoal/50 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed mt-6">
              {PRODUCTS.header.sub}
            </p>
          </div>
        </section>

        {/* Soteria flagship */}
        <section className="reveal-section relative py-16 md:py-24 px-6 md:px-12 bg-clay/[0.04]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-clay/15 text-clay border border-clay/20 uppercase tracking-wider">
                  {PRODUCTS.soteria.status}
                </span>
                <h2 className="font-heading font-bold text-6xl md:text-7xl tracking-tighter-custom text-charcoal mt-5">
                  {PRODUCTS.soteria.name}
                </h2>
                <p className="font-heading text-lg md:text-xl text-clay mt-2">
                  {PRODUCTS.soteria.tagline}
                </p>
                <p className="text-charcoal/60 text-base leading-relaxed mt-6 max-w-xl">
                  {PRODUCTS.soteria.body}
                </p>
                <button
                  onClick={goToContact}
                  className="magnetic-btn mt-8 px-7 py-3.5 rounded-full font-heading font-semibold text-sm tracking-wide bg-clay text-cream hover:text-cream cursor-pointer"
                >
                  <span className="btn-bg rounded-full bg-moss" />
                  <span className="relative z-10">{PRODUCTS.soteria.cta.label}</span>
                </button>
              </div>

              {/* Right column — product visual */}
              <div className="bg-white/60 border border-charcoal/[0.08] rounded-4xl p-6 shadow-md shadow-charcoal/[0.04]">
                <DiagnosticShuffler />
              </div>
            </div>

            {/* Capability pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
              {PRODUCTS.soteria.pillars.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.icon]
                return (
                  <div
                    key={pillar.title}
                    className="bg-white/70 border border-charcoal/[0.08] rounded-3xl p-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-clay/10 text-clay flex items-center justify-center">
                      {Icon ? <Icon size={18} /> : null}
                    </div>
                    <h3 className="font-heading font-bold text-base text-charcoal tracking-tight-custom mt-4">
                      {pillar.title}
                    </h3>
                    <p className="text-charcoal/55 text-sm mt-1.5 leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="reveal-section py-20 md:py-28 px-6 md:px-12 bg-moss/[0.03]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                {PRODUCTS.upcoming.eyebrow}
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tighter-custom text-charcoal mt-4">
                {PRODUCTS.upcoming.headline}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRODUCTS.upcoming.products.map((p) => (
                <div
                  key={p.name}
                  className="relative overflow-hidden bg-white/60 border border-charcoal/[0.08] rounded-4xl p-8 md:p-10"
                >
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-charcoal/10 text-charcoal/60 border border-charcoal/15 uppercase tracking-wider">
                    Coming Soon
                  </span>
                  <h3 className="font-heading font-bold text-4xl md:text-5xl tracking-tighter-custom text-charcoal mt-5">
                    {p.name}
                  </h3>
                  <p className="font-heading text-base md:text-lg text-moss mt-1.5">
                    {p.tagline}
                  </p>
                  <p className="text-charcoal/55 text-sm md:text-base leading-relaxed mt-5 max-w-md">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="reveal-section py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal">
              {PRODUCTS.closing.headline}
            </h2>
            <p className="text-charcoal/45 text-base mt-4 max-w-lg mx-auto leading-relaxed">
              {PRODUCTS.closing.sub}
            </p>
            <div className="mt-8">
              <button
                onClick={goToContact}
                className="magnetic-btn px-7 py-3.5 rounded-full font-heading font-semibold text-sm tracking-wide bg-clay text-cream hover:text-cream cursor-pointer"
              >
                <span className="btn-bg rounded-full bg-moss" />
                <span className="relative z-10">{PRODUCTS.closing.cta.label}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors in `src/pages/Products.jsx`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Products.jsx
git commit -m "Add Products page with Soteria flagship and coming-soon cards"
```

---

## Task 3: Register /products route

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Import the Products page and add the route**

In `src/main.jsx`:

Replace:
```jsx
import AboutTeam from './pages/AboutTeam.jsx'
```

with:
```jsx
import AboutTeam from './pages/AboutTeam.jsx'
import Products from './pages/Products.jsx'
```

And replace:
```jsx
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/about" element={<AboutTeam />} />
</Routes>
```

with:
```jsx
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/about" element={<AboutTeam />} />
  <Route path="/products" element={<Products />} />
</Routes>
```

- [ ] **Step 2: Verify the page renders in the browser**

Run in one terminal: `npm run dev`
Open: `http://localhost:5173/#/products`
Expected:
- Page renders without console errors
- Soteria section shows with DiagnosticShuffler cycling scenarios
- Marathon and Apollo cards render
- Closing CTA button appears

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "Register /products route"
```

---

## Task 4: Update navigation to support route links

**Files:**
- Modify: `src/constants/content.js`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Update `NAV_LINKS` and `FOOTER` in `src/constants/content.js`**

Replace:
```js
export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
]
```

with:
```js
export const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
]
```

And replace:
```js
export const FOOTER = {
  platform: ['Features', 'Protocol', 'Pricing', 'Documentation'],
  company: ['About', 'Careers', 'Contact', 'Press'],
  legal: ['Privacy Policy', 'Terms of Service', 'Security'],
}
```

with:
```js
export const FOOTER = {
  platform: ['Products', 'Protocol', 'Pricing', 'Documentation'],
  company: ['About', 'Careers', 'Contact', 'Press'],
  legal: ['Privacy Policy', 'Terms of Service', 'Security'],
}
```

- [ ] **Step 2: Update the Navbar click handler to handle route links**

In `src/components/Navbar.jsx`, replace:

```jsx
  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToSection(href, navigate, location)
  }
```

with:

```jsx
  const handleNavClick = (e, href) => {
    e.preventDefault()
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      scrollToSection(href, navigate, location)
    }
  }
```

- [ ] **Step 3: Update the Footer links to handle route links and swap Features → Products**

In `src/components/Footer.jsx`, replace:

```jsx
const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]
```

with:

```jsx
const LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]
```

And in the same file, replace:

```jsx
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href, navigate, location)
                }}
                className="text-cream/50 text-sm hover:text-cream transition-all duration-300 hover:translate-y-[-1px] inline-block cursor-pointer"
              >
                {link.label}
              </a>
```

with:

```jsx
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  if (link.href.startsWith('/')) {
                    navigate(link.href)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  } else {
                    scrollToSection(link.href, navigate, location)
                  }
                }}
                className="text-cream/50 text-sm hover:text-cream transition-all duration-300 hover:translate-y-[-1px] inline-block cursor-pointer"
              >
                {link.label}
              </a>
```

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Smoke-test navigation in the browser**

Run: `npm run dev` (if not already running)
Open: `http://localhost:5173/`
Expected:
- Desktop: clicking "Products" in the top navbar navigates to `/#/products`
- Desktop: clicking "Team" or "Pricing" still scrolls within the homepage
- Footer "Products" link navigates to `/#/products`
- Mobile menu (resize to small width): "Products" item also navigates to `/#/products`

- [ ] **Step 6: Commit**

```bash
git add src/constants/content.js src/components/Navbar.jsx src/components/Footer.jsx
git commit -m "Wire Products link into navbar and footer"
```

---

## Task 5: Remove the Features section from the homepage

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Remove the Features import and its render**

In `src/App.jsx`, replace:

```jsx
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Team />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
```

with:

```jsx
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Team />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
```

- [ ] **Step 2: Verify lint passes**

Run: `npm run lint`
Expected: no errors. (The old `Features.jsx` file still exists on disk but is no longer imported; that is intentional — it still imports `DiagnosticShuffler` etc., which are reused on the Products page.)

- [ ] **Step 3: Smoke-test the homepage**

Run: `npm run dev` (if not already running)
Open: `http://localhost:5173/`
Expected:
- Hero → Philosophy → Team → Pricing → Contact scroll order, no Features section in between
- No console errors

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "Remove Features section from homepage in favor of /products"
```

---

## Task 6: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run lint on the full project**

Run: `npm run lint`
Expected: exit code 0, no errors.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: exit code 0, no build errors. Bundle output to `dist/`.

- [ ] **Step 3: Manual smoke check**

Run: `npm run dev`
Perform in a browser at `http://localhost:5173/`:

1. Homepage loads, no `<Features>` section is visible.
2. Navbar click: "Products" → routes to `/#/products`, scrolls to top.
3. `/products` renders:
   - Page hero with eyebrow, headline, sub.
   - Soteria section (clay-washed) with `AVAILABLE NOW` pill, large Soteria wordmark, tagline, body, `Book a Consultation` button, `DiagnosticShuffler` visual.
   - 4-pillar capability grid below the Soteria hero block.
   - Coming Soon section (moss-washed) with Marathon and Apollo cards, each with muted charcoal `COMING SOON` pill.
   - Closing CTA with `Book a Consultation` button.
   - Footer.
4. Clicking `Book a Consultation` on `/products` navigates to `/` and scrolls to the Contact section.
5. Footer `Products` link navigates to `/products`.
6. Footer `Team`, `Pricing`, `Contact` links still scroll the homepage when clicked from the homepage, and navigate-then-scroll from `/products`.
7. Mobile layout (resize to <640px): Soteria two-column stacks; 4-pillar grid becomes single column; coming-soon cards stack.
8. No console errors on any page.

- [ ] **Step 4: Final commit (if any lint/build fixes were needed)**

If steps 1–3 required fixes, commit them here:

```bash
git add -A
git commit -m "Fix products page verification issues"
```

If no fixes were needed, skip this step.

---

## Rollback

If the implementation needs to be undone cleanly:

```bash
git log --oneline  # find the commit just before Task 1
git revert <commit-range>
```

No database, migration, or external-system changes are involved, so revert is safe.
