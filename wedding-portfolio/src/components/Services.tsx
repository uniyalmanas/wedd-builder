'use client'
import { usePortfolioData } from '@/context/PortfolioDataContext'
import { EditableText } from '@/components/EditableText'
import { EditableImage } from '@/components/EditableImage'

export default function Services() {
  const { data, editMode, updateSection } = usePortfolioData();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const updateServiceField = (id: string, field: string, value: any) => {
    const newItems = data.services.items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateSection('services', { items: newItems });
  };

  const updateTag = (serviceId: string, tagIdx: number, val: string) => {
    const newItems = data.services.items.map(item => {
      if (item.id === serviceId) {
        const newTags = [...item.tags];
        newTags[tagIdx] = val;
        return { ...item, tags: newTags };
      }
      return item;
    });
    updateSection('services', { items: newItems });
  };

  const addTag = (serviceId: string) => {
    const newItems = data.services.items.map(item => {
      if (item.id === serviceId) {
        return { ...item, tags: [...item.tags, 'New Feature'] };
      }
      return item;
    });
    updateSection('services', { items: newItems });
  };

  const removeTag = (serviceId: string, tagIdx: number) => {
    const newItems = data.services.items.map(item => {
      if (item.id === serviceId) {
        return { ...item, tags: item.tags.filter((_, idx) => idx !== tagIdx) };
      }
      return item;
    });
    updateSection('services', { items: newItems });
  };

  const addService = () => {
    const nextId = String(data.services.items.length + 1).padStart(2, '0');
    const newItems = [
      ...data.services.items,
      {
        id: nextId,
        title: 'New Service Package',
        description: 'Edit this description to describe what is included in this custom planning package.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
        tags: ['Feature 1', 'Feature 2'],
        price: 'Starting ₹15,000'
      }
    ];
    updateSection('services', { items: newItems });
  };

  const deleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service package?')) {
      const newItems = data.services.items.filter(item => item.id !== id);
      updateSection('services', { items: newItems });
    }
  };

  return (
    <section id="services" className="py-28 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label text-gold-400 mb-4">
            <EditableText
              value={data.services.sectionLabel}
              onChange={(val) => updateSection('services', { sectionLabel: val })}
              tagName="span"
            />
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-cream-50 text-4xl md:text-5xl font-normal">
            <EditableText
              value={data.services.titleLine1}
              onChange={(val) => updateSection('services', { titleLine1: val })}
              tagName="span"
            />
            <br />
            <EditableText
              value={data.services.titleItalic}
              onChange={(val) => updateSection('services', { titleItalic: val })}
              tagName="span"
              className="italic text-gold-300"
            />
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.items.map((svc) => (
            <div
              key={svc.id}
              className="group bg-charcoal-800 overflow-hidden card-hover relative"
            >
              {/* Delete Button (Edit Mode Only) */}
              {editMode && (
                <button
                  onClick={() => deleteService(svc.id)}
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2.5 z-30 shadow-lg cursor-pointer"
                  title="Delete service package"
                >
                  🗑️
                </button>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <EditableImage
                  src={svc.image}
                  alt={svc.title}
                  onChange={(newSrc) => updateServiceField(svc.id, 'image', newSrc)}
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-900 opacity-20" />
                <span className="absolute top-4 left-4 font-display text-gold-400 text-4xl font-semibold opacity-60">
                  {svc.id}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-cream-50 text-xl mb-3">
                  <EditableText
                    value={svc.title}
                    onChange={(val) => updateServiceField(svc.id, 'title', val)}
                    tagName="span"
                  />
                </h3>
                <p className="font-body text-cream-200 text-base leading-relaxed mb-4 opacity-80">
                  <EditableText
                    value={svc.description}
                    onChange={(val) => updateServiceField(svc.id, 'description', val)}
                    tagName="span"
                  />
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5 items-center">
                  {svc.tags.map((tag, tagIdx) => (
                    <div key={tagIdx} className="flex items-center gap-1 bg-charcoal-700/30 border border-gold-700 px-2 py-1">
                      <EditableText
                        value={tag}
                        onChange={(val) => updateTag(svc.id, tagIdx, val)}
                        tagName="span"
                        className="font-sans text-xs text-gold-400 tracking-wide"
                      />
                      {editMode && (
                        <button
                          onClick={() => removeTag(svc.id, tagIdx)}
                          className="text-red-400 hover:text-red-600 text-2xs font-bold pl-1 cursor-pointer"
                          title="Remove feature"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {editMode && (
                    <button
                      onClick={() => addTag(svc.id)}
                      className="bg-gold-500 hover:bg-gold-600 text-cream-50 text-xs px-2 py-0.5 rounded cursor-pointer"
                      title="Add feature"
                    >
                      + Add
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-charcoal-700 pt-4">
                  <span className="font-body text-gold-300 text-lg">
                    <EditableText
                      value={svc.price}
                      onChange={(val) => updateServiceField(svc.id, 'price', val)}
                      tagName="span"
                    />
                  </span>
                  <button
                    onClick={() => handleScroll('#booking')}
                    className="font-sans text-xs tracking-widest uppercase text-cream-200 hover:text-gold-400 transition-colors"
                  >
                    Book →
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Service Card (Edit Mode Only) */}
          {editMode && (
            <button
              onClick={addService}
              className="border-2 border-dashed border-gold-500/30 hover:border-gold-500/70 bg-charcoal-800/40 text-cream-200 hover:text-gold-400 flex flex-col items-center justify-center p-8 h-[450px] transition-colors duration-300 cursor-pointer"
            >
              <span className="text-4xl mb-4">➕</span>
              <span className="font-sans text-sm tracking-widest uppercase">Add New Service Package</span>
            </button>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-body text-cream-200 text-xl mb-6 opacity-70">
            Not sure which package fits? Let's talk.
          </p>
          <button onClick={() => handleScroll('#contact')} className="btn-gold">
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  )
}
