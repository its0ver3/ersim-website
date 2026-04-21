import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Phone } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.contact-inner', { y: 40, opacity: 0 })
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to('.contact-inner', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12">
      <div className="contact-inner max-w-4xl mx-auto bg-moss/[0.04] border border-moss/10 rounded-4xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — info */}
          <div>
            <span className="font-mono text-[10px] text-moss uppercase tracking-[0.2em] font-medium">
              Contact
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tighter-custom text-charcoal mt-4 leading-snug">
              Let's talk about
              <br />
              <span className="font-drama italic text-clay">your agency.</span>
            </h2>
            <p className="text-charcoal/45 text-sm mt-4 leading-relaxed max-w-sm">
              Book a demo and see how we build bespoke simulations tailored to your agency's protocols, call volume, and training goals.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-moss/50" />
                <span className="text-charcoal/60 text-sm">enterprise@ersim.ca</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-moss/50" />
                <span className="text-charcoal/60 text-sm">604-911-ERSM</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-moss/50" />
                <span className="text-charcoal/60 text-sm">2800 Douglas Rd, Burnaby, BC</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest block mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/70 border border-charcoal/[0.08] rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/25 outline-none focus:border-moss/30 focus:ring-1 focus:ring-moss/10 transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest block mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@agency.gov"
                className="w-full bg-white/70 border border-charcoal/[0.08] rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/25 outline-none focus:border-moss/30 focus:ring-1 focus:ring-moss/10 transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest block mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your agency and training needs..."
                className="w-full bg-white/70 border border-charcoal/[0.08] rounded-xl px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/25 outline-none focus:border-moss/30 focus:ring-1 focus:ring-moss/10 transition-all resize-none"
              />
            </div>
            <div className="mt-2">
              <MagneticButton variant="filled" className="justify-center">
                Send Message
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
