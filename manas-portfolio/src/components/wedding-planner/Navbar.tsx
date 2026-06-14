'use client'
import { useState, useEffect } from 'react'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'
import { EditableText } from '@/components/wedding-planner/EditableText'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Team', href: '#team' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { data, updateSection } = usePortfolioData()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled py-3' : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-start cursor-pointer text-left"
          >
            <EditableText
              value={data.brandName}
              onChange={(val) => updateSection('brandName', val as any)}
              tagName="span"
              className="font-display text-cream-50 text-xl font-semibold leading-none tracking-wide block"
            />
            <EditableText
              value={data.brandSubtitle}
              onChange={(val) => updateSection('brandSubtitle', val as any)}
              tagName="span"
              className="font-sans text-gold-400 text-xs tracking-widest uppercase mt-0.5 block"
            />
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="font-sans text-xs tracking-widest uppercase text-cream-200 hover:text-gold-400 transition-colors duration-300"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => handleNav('#booking')}
          className="hidden lg:block btn-gold text-xs py-3 px-6"
        >
          Book Now
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-cream-50 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-cream-50 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-cream-50 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-screen bg-charcoal-900 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 py-6 flex flex-col gap-6 border-t border-charcoal-700">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="font-sans text-xs tracking-widest uppercase text-cream-200 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav('#booking')}
              className="btn-gold text-xs py-3 px-6 w-full text-center"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
