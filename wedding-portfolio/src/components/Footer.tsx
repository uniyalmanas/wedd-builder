'use client'
import { usePortfolioData } from '@/context/PortfolioDataContext'
import { EditableText } from '@/components/EditableText'
import { PortfolioData } from '@/data/defaultData'

export default function Footer() {
  const { data, editMode, updateSection } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const handleEditSocial = (e: React.MouseEvent, platform: keyof PortfolioData['socials']) => {
    if (editMode) {
      e.preventDefault();
      const newVal = prompt(`Enter new link or number for ${platform}:`, data.socials[platform]);
      if (newVal !== null && newVal.trim() !== '') {
        updateSection('socials', { [platform]: newVal.trim() });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!editMode) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal-900 text-cream-200 font-sans">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-cream-50 text-3xl font-normal mb-2">
              <EditableText
                value={data.brandName}
                onChange={(val) => updateSection('brandName', val as any)}
                tagName="span"
              />
            </h3>
            <p className="font-sans text-gold-400 text-xs tracking-widest uppercase mb-6">
              <EditableText
                value={data.brandSubtitle}
                onChange={(val) => updateSection('brandSubtitle', val as any)}
                tagName="span"
              />
            </p>
            <div className="gold-divider mb-6" />
            <p className="font-body text-cream-200 text-lg leading-relaxed mb-6 opacity-80 max-w-sm">
              Based in Dehradun, planning and designing bespoke events across India. We manage the details so you can make the memories.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {(['instagram', 'facebook', 'youtube', 'pinterest'] as const).map(social => (
                <a
                  key={social}
                  href={data.socials[social]}
                  onClick={(e) => handleEditSocial(e, social)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans text-xs tracking-widest uppercase text-cream-200 hover:text-gold-400 transition-colors ${
                    editMode ? 'border border-dashed border-gold-500/40 px-1 rounded cursor-pointer' : ''
                  }`}
                  title={editMode ? `Click to edit ${social} URL` : ''}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold-400 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Our Team', href: '#team' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className="font-body text-base text-cream-200 opacity-70 hover:opacity-100 hover:text-gold-300 transition-all cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold-400 mb-6">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream-200 opacity-50 mb-1">Phone / WhatsApp</p>
                <div className="font-body text-lg text-cream-100 hover:text-gold-300 transition-colors">
                  <EditableText
                    value={data.contactPhone}
                    onChange={(val) => updateSection('contactPhone', val as any)}
                    tagName="span"
                  />
                </div>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream-200 opacity-50 mb-1">Email</p>
                <div className="font-body text-base text-cream-100 hover:text-gold-300 transition-colors">
                  <EditableText
                    value={data.contactEmail}
                    onChange={(val) => updateSection('contactEmail', val as any)}
                    tagName="span"
                  />
                </div>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream-200 opacity-50 mb-1">Studio</p>
                <p className="font-body text-base text-cream-100 opacity-80 whitespace-pre-line leading-normal">
                  <EditableText
                    value={data.contactAddress}
                    onChange={(val) => updateSection('contactAddress', val as any)}
                    tagName="span"
                  />
                </p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-wide text-cream-200 opacity-50 mb-1">Hours</p>
                <p className="font-body text-base text-cream-100 opacity-80">
                  <EditableText
                    value={data.contactHours}
                    onChange={(val) => updateSection('contactHours', val as any)}
                    tagName="span"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream-200 opacity-40">
            © {currentYear} <EditableText
              value={data.brandName}
              onChange={(val) => updateSection('brandName', val as any)}
              tagName="span"
            />. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-cream-200 opacity-40 hover:opacity-80 transition-opacity">Privacy Policy</a>
            <a href="#" className="font-sans text-xs text-cream-200 opacity-40 hover:opacity-80 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${data.socials.whatsapp}?text=Hi%20Vows%20%26%20Vistas%21%20I%27m%20interested%20in%20your%20wedding%20planning%20services.`}
        onClick={(e) => handleEditSocial(e, 'whatsapp')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
        title={editMode ? 'Click to edit WhatsApp phone number' : ''}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  )
}
