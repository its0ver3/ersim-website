import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import MagneticButton from './MagneticButton'

const INCLUDES = [
  '50+ trainees',
  'Custom scenarios',
  'Instructor Dashboards',
  'Personalize training metrics',
]

export default function Pricing() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-lg mx-auto">
        <div className="pricing-card luminous-border transition-all duration-500 ease-out hover:scale-[1.02]">
        <div className="relative overflow-hidden bg-charcoal rounded-4xl p-10 md:p-14 flex flex-col items-center text-center shadow-[inset_0_1px_1px_rgba(242,240,233,0.05)] hover:ring-1 hover:ring-cream/[0.06]">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
            <svg width="100%" height="100%">
              <filter id="cardNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#cardNoise)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-heading font-bold text-2xl md:text-3xl text-clay tracking-tight-custom">
              Enterprise
            </span>

            <h2 className="font-drama italic text-xl md:text-2xl text-cream/80 mt-2 leading-snug">
              Train with confidence.
            </h2>

            <ul className="mt-6 space-y-2.5 inline-flex flex-col items-start">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check size={14} className="text-clay flex-shrink-0" />
                  <span className="text-cream/55 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <MagneticButton variant="filled" className="justify-center">
                Book a Consultation
              </MagneticButton>
            </div>

            <span className="text-cream/20 text-[11px] font-mono mt-5 block">
              Onboarding in 2 – 4 weeks
            </span>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
