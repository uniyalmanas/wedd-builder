'use client'
import { useState } from 'react'
import { usePortfolioData } from '@/context/PortfolioDataContext'
import { EditableText } from '@/components/EditableText'
import { EditableImage } from '@/components/EditableImage'

export default function Testimonials() {
  const { data, editMode, updateSection } = usePortfolioData();
  const [active, setActive] = useState(0)

  // Safety check to ensure active index is valid
  const activeIdx = active >= data.testimonials.items.length ? 0 : active;
  const t = data.testimonials.items[activeIdx] || data.testimonials.items[0];

  const updateTestimonialField = (idx: number, field: string, value: any) => {
    const newItems = data.testimonials.items.map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('testimonials', { items: newItems });
  };

  const addTestimonial = () => {
    const newItems = [
      ...data.testimonials.items,
      {
        name: 'New Couple Name',
        event: 'Wedding · City · Year',
        quote: 'Click here to customize the review from this couple.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&q=80'
      }
    ];
    updateSection('testimonials', { items: newItems });
    setActive(newItems.length - 1);
  };

  const deleteTestimonial = (idx: number) => {
    if (data.testimonials.items.length <= 1) {
      alert('You must keep at least one testimonial.');
      return;
    }
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const newItems = data.testimonials.items.filter((_, i) => i !== idx);
      updateSection('testimonials', { items: newItems });
      setActive(0);
    }
  };

  return (
    <section id="testimonials" className="py-28 bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label text-gold-400 mb-4">
            <EditableText
              value={data.testimonials.sectionLabel}
              onChange={(val) => updateSection('testimonials', { sectionLabel: val })}
              tagName="span"
            />
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-cream-50 text-4xl md:text-5xl font-normal">
            <EditableText
              value={data.testimonials.titleLine1}
              onChange={(val) => updateSection('testimonials', { titleLine1: val })}
              tagName="span"
            />
            <br />
            <EditableText
              value={data.testimonials.titleItalic}
              onChange={(val) => updateSection('testimonials', { titleItalic: val })}
              tagName="span"
              className="italic text-gold-300"
            />
          </h2>
        </div>

        {/* Featured testimonial */}
        {t && (
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 relative">
            {/* Delete button for active review */}
            {editMode && (
              <button
                onClick={() => deleteTestimonial(activeIdx)}
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-sans text-xs uppercase px-3 py-1.5 rounded z-30 shadow cursor-pointer"
                title="Delete this testimonial"
              >
                🗑️ Delete Review
              </button>
            )}

            {/* Image */}
            <div className="relative">
              <EditableImage
                src={t.image}
                alt={t.name}
                onChange={(newSrc) => updateTestimonialField(activeIdx, 'image', newSrc)}
                className="w-full h-96 bg-cover bg-center"
              />
              <div className="absolute -bottom-4 -left-4 bg-gold-500 text-white px-6 py-3 z-10">
                <p className="font-sans text-xs tracking-widest uppercase">
                  <EditableText
                    value={t.event}
                    onChange={(val) => updateTestimonialField(activeIdx, 'event', val)}
                    tagName="span"
                  />
                </p>
              </div>
            </div>

            {/* Quote */}
            <div>
              <div className="text-gold-400 text-6xl font-display leading-none mb-6 opacity-40">"</div>
              <p className="font-body text-cream-100 text-2xl leading-relaxed mb-8 italic">
                <EditableText
                  value={t.quote}
                  onChange={(val) => updateTestimonialField(activeIdx, 'quote', val)}
                  tagName="span"
                />
              </p>
              
              {/* Star rating selector */}
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => editMode && updateTestimonialField(activeIdx, 'rating', i + 1)}
                    className={`text-lg transition-colors duration-150 ${
                      i < t.rating ? 'text-gold-400' : 'text-charcoal-600'
                    } ${editMode ? 'cursor-pointer hover:text-gold-300' : ''}`}
                    title={editMode ? `Set to ${i + 1} stars` : ''}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="font-display text-cream-50 text-xl">
                <EditableText
                  value={t.name}
                  onChange={(val) => updateTestimonialField(activeIdx, 'name', val)}
                  tagName="span"
                />
              </p>
            </div>
          </div>
        )}

        {/* Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
          {data.testimonials.items.map((testimonial, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-left p-4 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeIdx === i
                  ? 'border-gold-500 bg-charcoal-700'
                  : 'border-charcoal-600 hover:border-charcoal-500'
              }`}
            >
              <div>
                <p className="font-sans text-xs tracking-wide uppercase text-gold-400 mb-1">
                  {testimonial.event.split('·')[0].trim()}
                </p>
                <p className="font-display text-cream-200 text-sm">
                  {testimonial.name.split('&')[0].trim()}
                </p>
              </div>
            </button>
          ))}
          
          {/* Add testimonial block */}
          {editMode && (
            <button
              onClick={addTestimonial}
              className="border border-dashed border-gold-500/30 hover:border-gold-500/70 bg-transparent text-gold-400 hover:text-gold-300 flex flex-col items-center justify-center p-4 transition-colors duration-200 cursor-pointer min-h-[80px]"
            >
              <span className="text-lg">➕ Add Review</span>
            </button>
          )}
        </div>

        {/* Google reviews note */}
        <div className="text-center mt-14">
          <p className="font-body text-cream-200 text-lg opacity-60">
            4.9 ★ average across 120+ Google Reviews
          </p>
        </div>
      </div>
    </section>
  )
}
