'use client'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'
import { EditableText } from '@/components/wedding-planner/EditableText'
import { EditableImage } from '@/components/wedding-planner/EditableImage'

export default function BookingCTA() {
  const { data, editMode, updateSection } = usePortfolioData();

  const updateSignal = (index: number, val: string) => {
    const newSignals = [...data.bookingCta.trustSignals];
    newSignals[index] = val;
    updateSection('bookingCta', { trustSignals: newSignals });
  };

  const addSignal = () => {
    updateSection('bookingCta', { trustSignals: [...data.bookingCta.trustSignals, '✓ New guarantee'] });
  };

  const removeSignal = (index: number) => {
    const newSignals = data.bookingCta.trustSignals.filter((_, idx) => idx !== index);
    updateSection('bookingCta', { trustSignals: newSignals });
  };

  return (
    <section id="booking" className="relative py-32 overflow-hidden">
      {/* Background */}
      <EditableImage
        src={data.bookingCta.bgImage}
        alt="Booking CTA parallax background"
        onChange={(newSrc) => updateSection('bookingCta', { bgImage: newSrc })}
        className="absolute inset-0 bg-cover bg-center bg-fixed"
      />
      <div className="absolute inset-0 bg-charcoal-900 opacity-80" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="section-label text-gold-300 mb-6">
          <EditableText
            value={data.bookingCta.sectionLabel}
            onChange={(val) => updateSection('bookingCta', { sectionLabel: val })}
            tagName="span"
          />
        </p>
        <div className="gold-divider mx-auto mb-10" />

        <h2 className="font-display text-cream-50 text-4xl md:text-6xl font-normal leading-tight mb-8">
          <EditableText
            value={data.bookingCta.titleLine1}
            onChange={(val) => updateSection('bookingCta', { titleLine1: val })}
            tagName="span"
          />
          <br />
          <EditableText
            value={data.bookingCta.titleItalic}
            onChange={(val) => updateSection('bookingCta', { titleItalic: val })}
            tagName="span"
            className="italic text-gold-300"
          />
        </h2>

        <p className="font-body text-cream-200 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          <EditableText
            value={data.bookingCta.description}
            onChange={(val) => updateSection('bookingCta', { description: val })}
            tagName="span"
          />
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-gold"
          >
            <EditableText
              value={data.bookingCta.btnPrimaryText}
              onChange={(val) => updateSection('bookingCta', { btnPrimaryText: val })}
              tagName="span"
            />
          </a>
          <a
            href={`https://wa.me/${data.socials.whatsapp}?text=Hi%20Vows%20%26%20Vistas%21%20I%27d%20like%20to%20check%20availability%20for%20my%20wedding.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-cream-200 text-cream-50 font-sans text-sm tracking-widest uppercase px-8 py-4 hover:bg-cream-50 hover:text-charcoal-900 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <EditableText
              value={data.bookingCta.btnOutlineText}
              onChange={(val) => updateSection('bookingCta', { btnOutlineText: val })}
              tagName="span"
            />
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-cream-200 border-opacity-20 items-center">
          {data.bookingCta.trustSignals.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <EditableText
                value={item}
                onChange={(val) => updateSignal(index, val)}
                tagName="span"
                className="font-sans text-xs tracking-wide text-cream-200 opacity-70"
              />
              {editMode && (
                <button
                  onClick={() => removeSignal(index)}
                  className="text-red-400 hover:text-red-500 text-2xs font-bold font-sans cursor-pointer pl-1"
                  title="Remove guarantee"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {editMode && (
            <button
              onClick={addSignal}
              className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs px-2.5 py-1 rounded cursor-pointer"
              title="Add guarantee"
            >
              + Add Guarantee
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
