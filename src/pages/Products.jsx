import { useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ServerOff, LayoutGrid, ShieldCheck, ClipboardCheck } from 'lucide-react'
import gsap from 'gsap'
import NoiseOverlay from '../components/NoiseOverlay'
import Footer from '../components/Footer'
import MagneticButton from '../components/MagneticButton'
import LiveSimPanel from '../components/features/LiveSimPanel'
import { BRAND, PRODUCTS } from '../constants/content'
import { scrollToSection } from '../utils/scroll'

const PILLAR_ICONS = {
  ServerOff,
  LayoutGrid,
  ShieldCheck,
  ClipboardCheck,
}

export default function Products() {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
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
        <section className="reveal-section relative pt-36 pb-16 md:pt-44 md:pb-24 px-6 md:px-12 bg-clay/[0.04]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#3F8A5A]/15 text-[#3F8A5A] border border-[#3F8A5A]/25 uppercase tracking-wider">
                  {PRODUCTS.soteria.status}
                </span>
                <h2
                  className="font-heading font-bold text-6xl md:text-7xl tracking-tighter-custom mt-5 bg-gradient-to-br from-[#CEB875] via-[#C9A24B] to-[#A07B35] bg-clip-text text-transparent"
                >
                  {PRODUCTS.soteria.name}
                </h2>
                <p className="font-heading text-lg md:text-xl text-clay mt-2">
                  {PRODUCTS.soteria.tagline}
                </p>
                <p className="text-charcoal/60 text-base leading-relaxed mt-6 max-w-xl">
                  {PRODUCTS.soteria.body}
                </p>
                <MagneticButton
                  variant="filled"
                  onClick={goToContact}
                  className="mt-8 cursor-pointer"
                >
                  {PRODUCTS.soteria.cta.label}
                </MagneticButton>
              </div>

              <LiveSimPanel />
            </div>

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

            <div className="mt-24 md:mt-28">
              <div className="text-center max-w-2xl mx-auto">
                <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                  {PRODUCTS.soteria.packages.eyebrow}
                </span>
                <h3 className="font-drama italic text-3xl md:text-4xl text-charcoal mt-4 leading-snug">
                  {PRODUCTS.soteria.packages.headline}
                </h3>
                <p className="text-charcoal/55 text-sm md:text-base mt-4 leading-relaxed">
                  {PRODUCTS.soteria.packages.sub}
                </p>
              </div>

              <div className="relative mt-12 max-w-4xl mx-auto bg-cream rounded-4xl border border-charcoal/[0.12] shadow-md shadow-charcoal/[0.04] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
                  <svg width="100%" height="100%">
                    <filter id="deploymentNoise">
                      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#deploymentNoise)" />
                  </svg>
                </div>

                <div className="relative z-10 divide-y divide-charcoal/[0.08]">
                  {PRODUCTS.soteria.packages.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`p-8 md:p-10 ${tier.emphasized ? 'bg-[#C9A24B]/[0.035]' : ''}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
                        <div className="flex items-baseline gap-5 md:gap-6">
                          <span className="font-heading font-bold text-4xl md:text-5xl tracking-tighter-custom bg-gradient-to-br from-[#CEB875] via-[#C9A24B] to-[#A07B35] bg-clip-text text-transparent tabular-nums leading-none">
                            {tier.numeral}
                          </span>
                          <div>
                            <h4 className="font-heading font-bold text-xl md:text-2xl uppercase tracking-widest text-charcoal">
                              {tier.name}
                            </h4>
                            <p className="text-charcoal/60 text-sm mt-1.5 leading-relaxed">
                              {tier.scope}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-charcoal/45 whitespace-nowrap md:mt-2">
                          Onboarding · {tier.onboarding}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-6 pt-5 border-t border-charcoal/[0.08]">
                        {tier.specs.map((spec) => (
                          <div key={spec.label}>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40">
                              {spec.label}
                            </div>
                            <div className="font-heading text-sm font-medium text-charcoal/85 mt-1.5 leading-snug">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <MagneticButton
                  variant="filled"
                  onClick={goToContact}
                  className="cursor-pointer"
                >
                  {PRODUCTS.soteria.packages.cta.label}
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

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
                    {p.status}
                  </span>
                  <h3
                    className={`font-heading font-bold text-6xl md:text-7xl tracking-tighter-custom mt-5 ${p.headingClass}`}
                  >
                    {p.name}
                  </h3>
                  <p className={`font-heading text-lg md:text-xl mt-2 ${p.taglineColor}`}>
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

        <section className="reveal-section py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal">
              {PRODUCTS.closing.headline}
            </h2>
            <p className="text-charcoal/45 text-base mt-4 max-w-lg mx-auto leading-relaxed">
              {PRODUCTS.closing.sub}
            </p>
            <div className="mt-8">
              <MagneticButton
                variant="filled"
                onClick={goToContact}
                className="cursor-pointer"
              >
                {PRODUCTS.closing.cta.label}
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
