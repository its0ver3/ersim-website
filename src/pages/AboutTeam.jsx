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
    role: 'CTO & Co-Founder',
    bio: 'Drawing from deep roots in both tech and healthcare, Dean is reshaping how innovative tools reach the frontline workers who need them most.',
    image: `${import.meta.env.BASE_URL}Headshot2 - DEAN.png`,
  },
  {
    name: 'Reid Betts',
    role: 'CEO & Co-Founder',
    bio: 'With years on the headset and over a decade in the classroom, Reid understands what it takes to build call takers who perform at the highest level.',
    image: `${import.meta.env.BASE_URL}Headshot2 - REID.png`,
  },
  {
    name: 'Brianna Girdler',
    role: 'Director of Operations',
    bio: 'After a decade leading operations in the non-profit world, Brianna now helps modernize industries that have been slow to evolve past legacy systems.',
    image: `${import.meta.env.BASE_URL}Headshot2 - BRIANNA.png`,
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
            <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-normal text-charcoal mt-4">
              How it started.
              <img src={`${import.meta.env.BASE_URL}960px-Maple_Leaf.svg.png`} alt="" className="inline-block h-7 md:h-10 w-auto ml-2 -mt-1" />
            </h1>
            <p className="text-charcoal/50 text-base md:text-lg font-heading max-w-2xl mx-auto leading-relaxed mt-6">
              ERSIM started in early 2025. It was just a "what if" that quickly turned into a "what's next." People were blown away by our earliest demos and we realized this thing had legs. That got us excited about the potential to have real impact, which led us to our mission: create high performing call takers in less time. We believe with better training, everyone wins.
            </p>

            <div className="max-w-2xl mx-auto mt-6 space-y-6 text-charcoal/50 text-base md:text-lg font-heading leading-relaxed">
              <p>
                The emergency services industry has long relied on classroom lectures, paper-based scenarios, and ride-along hours to prepare call takers for the realities of 911. We saw firsthand how this approach left new hires underprepared for the intensity of live calls, and how the consequences fell on both the call takers and the communities they serve.
              </p>
              <p>
                ERSIM was founded to build the training platform that should have existed years ago, one that puts call takers into realistic, high-pressure simulations before they ever pick up a live line. Simulated callers adapt in real time, performance analytics pinpoint exactly where someone needs to improve, and agencies get measurable outcomes instead of guesswork.
              </p>
              <p>
                What started as a shared frustration grew into a desire: to make sure every person who answers a 911 call has been trained for the moment, not just told about it.
              </p>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
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


        {/* Values */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-moss/[0.03]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16 md:mb-20">
              <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
                What Drives Us
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tighter-custom text-charcoal mt-4">
                Our values
              </h2>
            </div>

            <ol className="border-t border-charcoal/10">
              {[
                {
                  n: '01',
                  title: 'Realism First',
                  body: 'Training should feel like the real thing. We build simulations that mirror the chaos, emotion, and urgency of actual emergency calls.',
                },
                {
                  n: '02',
                  title: 'Measurable Impact',
                  body: 'Every session generates data. We give agencies the tools to track progress, spot weaknesses, and prove that training works.',
                },
                {
                  n: '03',
                  title: 'People Over Process',
                  body: "At the end of the day, it's a real person picking up that phone. We build for them, so they feel ready and confident when it matters most.",
                },
              ].map((v) => (
                <li
                  key={v.n}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-charcoal/10"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-5xl md:text-6xl text-clay/70 tracking-tight block leading-none transition-colors duration-500 group-hover:text-clay">
                      {v.n}
                    </span>
                  </div>
                  <div className="md:col-span-9 md:pl-4">
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-charcoal tracking-tight-custom">
                      {v.title}
                    </h3>
                    <p className="text-charcoal/55 text-base md:text-lg leading-relaxed mt-4 max-w-2xl">
                      {v.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
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
