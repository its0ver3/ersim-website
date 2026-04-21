import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

const PRODUCTS_LIST = [
  {
    name: 'Marathon',
    status: 'Q1 2027',
    tagline: 'The dispatch trainer.',
    body: "Built on the same engine, tuned for the dispatcher's seat. Radio discipline and multi-incident awareness under pressure.",
    headingClass:
      'bg-gradient-to-br from-[#8AB5E6] via-[#4A7FCC] to-[#264F8F] bg-clip-text text-transparent',
    taglineColor: 'text-[#4A7FCC]',
    statusBg: 'bg-[#4A7FCC]/15',
    statusText: 'text-[#4A7FCC]',
    statusBorder: 'border-[#4A7FCC]/25',
    accentBar: 'bg-gradient-to-r from-[#8AB5E6] via-[#4A7FCC] to-[#264F8F]',
  },
  {
    name: 'Soteria',
    status: 'Available Now',
    tagline: 'The 911 call taker simulator.',
    body: 'Compress months of on-the-job training into weeks of immersive practice. Build the reflexes of a veteran before the first live line.',
    headingClass:
      'bg-gradient-to-br from-[#CEB875] via-[#C9A24B] to-[#A07B35] bg-clip-text text-transparent',
    taglineColor: 'text-[#A07B35]',
    statusBg: 'bg-[#3F8A5A]/15',
    statusText: 'text-[#3F8A5A]',
    statusBorder: 'border-[#3F8A5A]/25',
    accentBar: 'bg-gradient-to-r from-[#CEB875] via-[#C9A24B] to-[#A07B35]',
    featured: true,
  },
  {
    name: 'Apollo',
    status: 'Q4 2027',
    tagline: 'The EMS + fire trainer.',
    body: 'The Soteria approach, adapted for paramedics and firefighters. Same proprietary rubric, reshaped for the people who show up on scene.',
    headingClass:
      'bg-gradient-to-br from-[#E69A8A] via-[#CC4A4A] to-[#8F2626] bg-clip-text text-transparent',
    taglineColor: 'text-[#CC4A4A]',
    statusBg: 'bg-[#CC4A4A]/15',
    statusText: 'text-[#CC4A4A]',
    statusBorder: 'border-[#CC4A4A]/25',
    accentBar: 'bg-gradient-to-r from-[#E69A8A] via-[#CC4A4A] to-[#8F2626]',
  },
]

function ProductCard({ product }) {
  return (
    <div
      className={`relative overflow-hidden rounded-4xl bg-white/95 backdrop-blur-sm ${
        product.featured
          ? 'border border-charcoal/10 shadow-2xl shadow-charcoal/20 p-8 md:p-10'
          : 'border border-charcoal/[0.06] shadow-xl shadow-charcoal/10 p-7 md:p-8'
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${product.accentBar}`} />

      <span
        className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono font-medium ${product.statusBg} ${product.statusText} border ${product.statusBorder} uppercase tracking-wider`}
      >
        {product.status}
      </span>

      <h3
        className={`font-heading font-bold tracking-tighter-custom mt-5 ${
          product.featured ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'
        } ${product.headingClass}`}
      >
        {product.name}
      </h3>

      <p
        className={`font-heading mt-1 ${product.taglineColor} ${
          product.featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'
        }`}
      >
        {product.tagline}
      </p>

      <p
        className={`text-charcoal/55 leading-relaxed mt-5 ${
          product.featured ? 'text-sm md:text-base' : 'text-sm'
        }`}
      >
        {product.body}
      </p>

      {product.featured && (
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 mt-7 text-sm font-heading font-semibold text-charcoal hover:gap-2.5 transition-all duration-300 group"
        >
          Explore Soteria
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}

export default function Pricing() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const [marathon, soteria, apollo] = PRODUCTS_LIST

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">
            Our Products
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tighter-custom text-charcoal mt-4">
            Built for the comms centre.
          </h2>
        </div>

        {/* Desktop: fanned, stacked cards */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="product-card w-[340px] -mr-6 rotate-[-7deg] scale-[0.88] relative z-10 origin-bottom-right transition-transform duration-500 ease-out hover:rotate-0 hover:scale-100 hover:-translate-x-10 hover:-translate-y-2 hover:z-30">
            <ProductCard product={marathon} />
          </div>

          <div className="product-card w-[440px] relative z-20 transition-transform duration-500 ease-out hover:scale-[1.03]">
            <ProductCard product={soteria} />
          </div>

          <div className="product-card w-[340px] -ml-6 rotate-[7deg] scale-[0.88] relative z-10 origin-bottom-left transition-transform duration-500 ease-out hover:rotate-0 hover:scale-100 hover:translate-x-10 hover:-translate-y-2 hover:z-30">
            <ProductCard product={apollo} />
          </div>
        </div>

        {/* Mobile: Soteria first, then coming-soon products */}
        <div className="md:hidden space-y-5 max-w-md mx-auto">
          <div className="product-card">
            <ProductCard product={soteria} />
          </div>
          <div className="product-card">
            <ProductCard product={marathon} />
          </div>
          <div className="product-card">
            <ProductCard product={apollo} />
          </div>
        </div>
      </div>
    </section>
  )
}
