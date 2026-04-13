import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TEAM = [
  {
    name: 'Marcus Cole',
    role: 'CEO & Co-Founder',
    bio: 'Former 911 dispatch supervisor. 12 years in emergency communications.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Dr. Priya Agarwal',
    role: 'Chief Science Officer',
    bio: 'PhD in cognitive psychology. Specialist in high-stress decision training.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'James Whitfield',
    role: 'CTO',
    bio: 'Previously engineering lead at Palantir. Built simulation systems for DoD.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop&crop=faces',
  },
]

export default function Team() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.team-card')
      if (cards.length) {
        gsap.set(cards, { y: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            })
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="team" ref={containerRef} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
            The Team
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tighter-custom text-charcoal mt-4">
            Built by people who
            <br />
            <span className="font-drama italic text-clay">answered the call.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="team-card group rounded-4xl overflow-hidden bg-white/60 border border-charcoal/[0.06] shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-charcoal/10"
            >
              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-charcoal tracking-tight-custom">
                  {member.name}
                </h3>
                <span className="font-mono text-[11px] text-clay uppercase tracking-wider block mt-1">
                  {member.role}
                </span>
                <p className="text-charcoal/45 text-sm mt-2.5 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
