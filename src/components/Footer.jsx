import { useNavigate, useLocation } from 'react-router-dom'
import { BRAND } from '../constants/content'
import { handleNavClick } from '../utils/scroll'

const LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <footer className="bg-charcoal rounded-t-[4rem] -mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-heading font-bold text-cream text-xl tracking-tight-custom mb-3">
              {BRAND.name}
              <img src={`${import.meta.env.BASE_URL}960px-Maple_Leaf.svg.png`} alt="" className="inline-block h-4 w-4 ml-1.5 -mt-0.5" />
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
              {BRAND.description}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href, navigate, location)
                }}
                className="text-cream/50 text-sm hover:text-cream transition-all duration-300 hover:translate-y-[-1px] inline-block cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex items-center justify-center">
          <span className="text-cream/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
