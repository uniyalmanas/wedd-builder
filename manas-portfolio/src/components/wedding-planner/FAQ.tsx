'use client'
import { useState } from 'react'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'
import { EditableText } from '@/components/wedding-planner/EditableText'

export default function FAQ() {
  const { data, editMode, updateSection, setAdminOpen } = usePortfolioData();
  const [open, setOpen] = useState<number | null>(0)

  const updateFaqField = (idx: number, field: 'q' | 'a', value: string) => {
    const newItems = data.faq.items.map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('faq', { items: newItems });
  };

  const addFaq = () => {
    const newItems = [
      ...data.faq.items,
      {
        q: 'New FAQ Question',
        a: 'Click here to customize the answer for this question.'
      }
    ];
    updateSection('faq', { items: newItems });
    setOpen(newItems.length - 1);
  };

  const deleteFaq = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this FAQ?')) {
      const newItems = data.faq.items.filter((_, i) => i !== idx);
      updateSection('faq', { items: newItems });
      setOpen(null);
    }
  };

  return (
    <section id="faq" className="py-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4 flex items-center justify-center gap-3">
            <EditableText
              value={data.faq.sectionLabel}
              onChange={(val) => updateSection('faq', { sectionLabel: val })}
              tagName="span"
            />
            {/* Live Editor Activator */}
            <button
              onClick={() => setAdminOpen(true)}
              className="text-gold-500 hover:text-gold-600 transition-colors text-[10px] font-sans tracking-widest uppercase cursor-pointer flex items-center gap-1 bg-cream-100 hover:bg-cream-200 px-2 py-1 border border-gold-500/10 rounded"
              title="Open Website Editor Control Panel"
            >
              ⚙️ Editor
            </button>
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-charcoal-900 text-4xl md:text-5xl font-normal">
            <EditableText
              value={data.faq.titleLine1}
              onChange={(val) => updateSection('faq', { titleLine1: val })}
              tagName="span"
            />
            <br />
            <EditableText
              value={data.faq.titleItalic}
              onChange={(val) => updateSection('faq', { titleItalic: val })}
              tagName="span"
              className="italic text-gold-600"
            />
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-0 divide-y divide-cream-200">
          {data.faq.items.map((faq, i) => (
            <div key={i} className="relative">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-6 flex items-start justify-between gap-6 cursor-pointer group pr-10"
              >
                <span className={`font-body text-xl leading-snug transition-colors duration-300 ${
                  open === i ? 'text-gold-600' : 'text-charcoal-900 group-hover:text-gold-600'
                }`}>
                  <EditableText
                    value={faq.q}
                    onChange={(val) => updateFaqField(i, 'q', val)}
                    tagName="span"
                  />
                </span>
                <span className={`font-sans text-gold-500 text-xl flex-shrink-0 transition-transform duration-300 ${
                  open === i ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>

              {/* Delete FAQ button */}
              {editMode && (
                <button
                  onClick={(e) => deleteFaq(i, e)}
                  className="absolute right-0 top-6 text-red-500 hover:text-red-700 text-sm font-bold font-sans cursor-pointer z-10"
                  title="Delete FAQ"
                >
                  🗑️
                </button>
              )}

              <div
                className={`overflow-hidden transition-all duration-400 ${
                  open === i ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-body text-charcoal-600 text-lg leading-relaxed pr-8">
                  <EditableText
                    value={faq.a}
                    onChange={(val) => updateFaqField(i, 'a', val)}
                    tagName="span"
                  />
                </p>
              </div>
            </div>
          ))}
          
          {/* Add FAQ block */}
          {editMode && (
            <div className="py-4 text-center">
              <button
                onClick={addFaq}
                className="border border-dashed border-gold-500/40 hover:border-gold-500 bg-transparent text-gold-500 hover:text-gold-600 font-sans text-xs tracking-widest uppercase px-6 py-3 rounded cursor-pointer"
              >
                ➕ Add New FAQ
              </button>
            </div>
          )}
        </div>

        {/* More questions CTA */}
        <div className="mt-14 text-center bg-cream-200 p-10">
          <p className="font-display text-charcoal-900 text-2xl mb-3">
            <EditableText
              value={data.faq.ctaTitle}
              onChange={(val) => updateSection('faq', { ctaTitle: val })}
              tagName="span"
            />
          </p>
          <p className="font-body text-charcoal-600 text-lg mb-6">
            <EditableText
              value={data.faq.ctaDesc}
              onChange={(val) => updateSection('faq', { ctaDesc: val })}
              tagName="span"
            />
          </p>
          <a
            href={`https://wa.me/${data.socials.whatsapp}?text=Hi%2C%20I%20have%20a%20question%20about%20your%20wedding%20services`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <EditableText
              value={data.faq.ctaBtnText}
              onChange={(val) => updateSection('faq', { ctaBtnText: val })}
              tagName="span"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
