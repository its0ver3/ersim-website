import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'
import { BRAND, NAV_LINKS } from '../constants/content'
import { scrollToSection } from '../utils/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (e, href) => {
    e.preventDefault()
    scrollToSection(href, navigate, location)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    const hero = document.getElementById('hero')
    if (hero) observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-cream/70 backdrop-blur-xl border border-charcoal/10 shadow-lg shadow-charcoal/5'
            : 'bg-transparent border border-transparent'
        }`}
      >
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault()
            navigate('/')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`font-heading font-bold text-sm tracking-tight-custom px-4 transition-colors duration-500 cursor-pointer ${
            scrolled ? 'text-moss' : 'text-cream'
          }`}
        >
          {BRAND.name}
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:translate-y-[-1px] ${
                scrolled
                  ? 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                  : 'text-cream/70 hover:text-cream hover:bg-cream/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <MagneticButton
            variant="filled"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="!py-2.5 !px-5 !text-xs cursor-pointer"
          >
            {BRAND.cta}
          </MagneticButton>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-full transition-colors ${
            scrolled ? 'text-charcoal' : 'text-cream'
          }`}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              setMobileOpen(false)
              handleNavClick(e, link.href)
            }}
            className="text-cream text-3xl font-heading font-semibold tracking-tight-custom hover:text-clay transition-colors"
          >
            {link.label}
          </a>
        ))}
        <MagneticButton
          variant="filled"
          className="mt-4 cursor-pointer"
          onClick={(e) => {
            setMobileOpen(false)
            handleNavClick(e, '#contact')
          }}
        >
          {BRAND.cta}
        </MagneticButton>
      </div>
    </>
  )
}
