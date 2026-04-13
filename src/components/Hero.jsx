import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MagneticButton from './MagneticButton'
import { HERO, BRAND } from '../constants/content'

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          '.hero-heading-top',
          { y: 40, opacity: 0, duration: 0.8 },
          '-=0.5'
        )
        .from(
          '.hero-heading-bottom',
          { y: 60, opacity: 0, duration: 1 },
          '-=0.5'
        )
        .from(
          '.hero-subline',
          { y: 30, opacity: 0, duration: 0.8 },
          '-=0.4'
        )
        .from(
          '.hero-cta',
          { y: 30, opacity: 0, duration: 0.8 },
          '-=0.4'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Gemini_Generated_Image_v6hnwnv6hnwnv6hn.png)',
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" />

      {/* Content — pushed to bottom-left */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-16 md:px-12 lg:px-20 lg:pb-24 max-w-5xl">
        <h1 className="mb-6">
          <span className="hero-heading-top block font-heading font-bold text-cream text-4xl md:text-6xl lg:text-7xl tracking-tighter-custom leading-[0.95]">
            {HERO.headingTop}
          </span>
          <span className="hero-heading-bottom block font-drama italic text-clay text-xl md:text-2xl lg:text-3xl tracking-tight-custom leading-[1.1] mt-2">
            {HERO.headingBottom}
          </span>
        </h1>

        <p className="hero-subline text-cream/60 font-heading text-base md:text-lg max-w-xl leading-relaxed mb-8">
          {HERO.subline}
        </p>

        <div className="hero-cta">
          <MagneticButton variant="filled" className="!text-base">
            {BRAND.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
