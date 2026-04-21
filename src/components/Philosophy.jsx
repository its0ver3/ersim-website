import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MISSION } from '../constants/content'

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.reveal-word')
      gsap.from(words, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })

      gsap.to('.philosophy-texture', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal py-32 md:py-48 overflow-hidden"
    >
      {/* Parallax texture */}
      <div
        className="philosophy-texture absolute inset-0 opacity-[0.1] bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Gemini_Generated_Image_8unuyt8unuyt8unu.png)` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-[10px] text-clay uppercase tracking-[0.2em] font-medium">
          {MISSION.label}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-drama italic leading-[1.15] tracking-tight-custom mt-6 mb-10">
          {MISSION.headline.split('. ').map((sentence, si, arr) => (
            <span key={si} className="block md:inline">
              {(si < arr.length - 1 ? sentence + '.' : sentence)
                .split(' ')
                .map((word, wi) => (
                  <span
                    key={wi}
                    className="reveal-word inline-block mr-[0.3em] text-cream"
                  >
                    {word}
                  </span>
                ))}
            </span>
          ))}
        </h2>

        <p className="text-cream/45 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed">
          {MISSION.body}
        </p>
      </div>
    </section>
  )
}
