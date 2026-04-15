import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TEAM = [
  {
    name: 'Dean Disanjh',
    role: 'CTO & Co-Founder',
    bio: 'Drawing from deep roots in both tech and healthcare, Dean is reshaping how innovative tools reach the frontline workers who need them most.',
    image: `${import.meta.env.BASE_URL}Headshot - DEAN.jpg`,
  },
  {
    name: 'Reid Betts',
    role: 'CEO & Co-Founder',
    bio: 'With years on the headset and over a decade in the classroom, Reid understands what it takes to build call takers who perform at the highest level.',
    image: `${import.meta.env.BASE_URL}reid-heashot.jpg`,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

        <div className="text-center mt-10">
          <Link
            to="/about"
            className="magnetic-btn px-7 py-3.5 rounded-full font-heading font-semibold text-sm tracking-wide bg-clay text-cream hover:text-cream transition-all duration-300"
          >
            <span className="relative z-10">Learn more about the team</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
