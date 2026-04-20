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
