import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DiagnosticShuffler from './features/DiagnosticShuffler'
import TelemetryTypewriter from './features/TelemetryTypewriter'
import SparklineProgress from './features/SparklineProgress'
import { FEATURES } from '../constants/content'

const CARDS = [
  { Component: DiagnosticShuffler, ...FEATURES[0] },
  { Component: TelemetryTypewriter, ...FEATURES[1] },
  { Component: SparklineProgress, ...FEATURES[2] },
]

export default function Features() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
          Core Capabilities
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tighter-custom text-charcoal mt-4">
          Built for the moments
          <br />
          <span className="font-drama italic text-clay">that matter most.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {CARDS.map(({ Component, title, description }, i) => (
          <div
            key={title}
            className="feature-card bg-white/60 border border-charcoal/[0.08] rounded-4xl p-6 shadow-md shadow-charcoal/[0.04] flex flex-col"
          >
            <div className="flex-1 mb-5">
              <Component />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal tracking-tight-custom">
                {title}
              </h3>
              <p className="text-charcoal/50 text-sm mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
