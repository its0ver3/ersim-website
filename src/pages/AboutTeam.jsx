import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NoiseOverlay from '../components/NoiseOverlay'
import Footer from '../components/Footer'
import { BRAND } from '../constants/content'
import { scrollToSection } from '../utils/scroll'

const TEAM = [
  {
    name: 'Dean Disanjh',
    role: 'CEO & Co-Founder',
    bio: 'Passionate about transforming emergency response training through technology. Dedicated to giving call takers the tools they need to save lives.',
    image: `${import.meta.env.BASE_URL}Headshot - DEAN.jpg`,
  },
  {
    name: 'Reid Betts',
    role: 'CEO & Co-Founder',
    bio: 'Brings hands-on experience and a relentless drive to modernize how agencies prepare their teams for the moments that matter most.',
    image: `${import.meta.env.BASE_URL}38984982_10214624819107649_4126351978085220352_n.jpg`,
  },
]

export default function AboutTeam() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NoiseOverlay />

      {/* Nav bar */}
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

      <main>
        {/* Hero */}
        <section className="pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
              Our Story
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tighter-custom text-charcoal mt-4">
              A tale of
              <br />
              <span className="font-drama italic text-clay">curiosity.</span>
            </h1>
            <p className="text-charcoal/50 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed mt-6">
              ERSIM started in early 2025. It was just a "what if" that quickly turned into a "what's next." People were blown away by our earliest demos and we realized this thing had legs. That got us excited about the potential to have real impact, which led us to our mission: improve the capabilities and training of front line call takers. We believe with better training, everyone wins.
            </p>
          </div>
        </section>

        {/* Founders */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-4xl overflow-hidden bg-white/60 border border-charcoal/[0.06] shadow-sm">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-charcoal tracking-tight-custom">
                    {member.name}
                  </h2>
                  <span className="font-mono text-[11px] text-clay uppercase tracking-wider block mt-1">
                    {member.role}
                  </span>
                  <p className="text-charcoal/50 text-sm mt-4 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Origin Story */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal mb-8">
              From frustration to
              <span className="font-drama italic text-clay"> foundation.</span>
            </h2>

            <div className="space-y-6 text-charcoal/55 text-base leading-relaxed">
              <p>
                The emergency services industry has long relied on classroom lectures, paper-based scenarios, and ride-along hours to prepare call takers for the realities of 911. Dean and Reid saw firsthand how this approach left new hires underprepared for the intensity of live calls, and how the consequences fell on both the call takers and the communities they serve.
              </p>
              <p>
                They founded ERSIM to build the training platform that should have existed years ago: one that puts call takers into realistic, high-pressure simulations before they ever pick up a live line. Simulated callers adapt in real time, performance analytics pinpoint exactly where someone needs to improve, and agencies get measurable outcomes instead of guesswork.
              </p>
              <p>
                What started as a shared frustration has grown into a mission: to make sure every person who answers a 911 call has been trained for the moment, not just told about it.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-moss/[0.03]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                What Drives Us
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal mt-4">
                Our values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white/60 border border-charcoal/[0.06]">
                <h3 className="font-heading font-bold text-lg text-charcoal tracking-tight-custom mb-3">
                  Realism First
                </h3>
                <p className="text-charcoal/45 text-sm leading-relaxed">
                  Training should feel like the real thing. We build simulations that mirror the chaos, emotion, and urgency of actual emergency calls.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/60 border border-charcoal/[0.06]">
                <h3 className="font-heading font-bold text-lg text-charcoal tracking-tight-custom mb-3">
                  Measurable Impact
                </h3>
                <p className="text-charcoal/45 text-sm leading-relaxed">
                  Every session generates data. We give agencies the tools to track progress, spot weaknesses, and prove that training works.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/60 border border-charcoal/[0.06]">
                <h3 className="font-heading font-bold text-lg text-charcoal tracking-tight-custom mb-3">
                  People Over Process
                </h3>
                <p className="text-charcoal/45 text-sm leading-relaxed">
                  At the end of the day, it's a real person picking up that phone. We build for them, so they feel ready and confident when it matters most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal">
              Ready to modernize your training?
            </h2>
            <p className="text-charcoal/45 text-base mt-4 max-w-lg mx-auto leading-relaxed">
              Whether you're a small agency or a large department, we'd love to show you what ERSIM can do.
            </p>
            <div className="mt-8">
              <button
                onClick={() => scrollToSection('#contact', navigate, location)}
                className="magnetic-btn px-7 py-3.5 rounded-full font-heading font-semibold text-sm tracking-wide bg-clay text-cream hover:text-cream cursor-pointer"
              >
                <span className="btn-bg rounded-full bg-moss" />
                <span className="relative z-10">Book a Consultation</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
