import { BRAND } from '../constants/content'

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Team', href: '#team' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal rounded-t-[4rem] -mt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-heading font-bold text-cream text-xl tracking-tight-custom mb-3">
              {BRAND.name}
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
                className="text-cream/50 text-sm hover:text-cream transition-all duration-300 hover:translate-y-[-1px] inline-block"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-cream/30 text-xs font-mono">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-cream/40 text-xs font-mono">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
