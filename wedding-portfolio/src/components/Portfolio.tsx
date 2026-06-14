'use client'
import { useState } from 'react'
import { usePortfolioData } from '@/context/PortfolioDataContext'
import { EditableText } from '@/components/EditableText'
import { EditableImage } from '@/components/EditableImage'

export default function Portfolio() {
  const { data, editMode, updateSection } = usePortfolioData();
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = active === 'All' ? data.portfolio.items : data.portfolio.items.filter((p) => p.cat === active)

  const updatePhotoField = (id: number, field: string, value: any) => {
    const newItems = data.portfolio.items.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    updateSection('portfolio', { items: newItems });
  };

  const toggleLayout = (id: number) => {
    const layouts: ('square' | 'wide' | 'tall')[] = ['square', 'wide', 'tall'];
    const newItems = data.portfolio.items.map(p => {
      if (p.id === id) {
        const nextIdx = (layouts.indexOf(p.layout) + 1) % layouts.length;
        return { ...p, layout: layouts[nextIdx] };
      }
      return p;
    });
    updateSection('portfolio', { items: newItems });
  };

  const addPhoto = () => {
    const newItems = [
      ...data.portfolio.items,
      {
        id: Date.now(),
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
        cat: active === 'All' ? (data.portfolio.categories[1] || 'Traditional') : active,
        title: 'New Design Setup',
        layout: 'square' as const
      }
    ];
    updateSection('portfolio', { items: newItems });
  };

  const deletePhoto = (id: number) => {
    if (confirm('Are you sure you want to remove this photo from the gallery?')) {
      const newItems = data.portfolio.items.filter(p => p.id !== id);
      updateSection('portfolio', { items: newItems });
    }
  };

  const renameCategory = (idx: number, newCat: string) => {
    const oldCat = data.portfolio.categories[idx];
    const newCats = [...data.portfolio.categories];
    newCats[idx] = newCat;

    const newItems = data.portfolio.items.map(p => {
      if (p.cat === oldCat) return { ...p, cat: newCat };
      return p;
    });

    updateSection('portfolio', { categories: newCats, items: newItems });
    if (active === oldCat) setActive(newCat);
  };

  const addCategory = () => {
    const newCat = prompt('Enter the name for the new filter category:');
    if (newCat && newCat.trim() !== '') {
      const trimmed = newCat.trim();
      if (data.portfolio.categories.includes(trimmed)) {
        alert('This category already exists.');
        return;
      }
      updateSection('portfolio', { categories: [...data.portfolio.categories, trimmed] });
    }
  };

  const deleteCategory = (idx: number) => {
    const cat = data.portfolio.categories[idx];
    if (cat === 'All') return;
    if (confirm(`Are you sure you want to delete the category "${cat}"? Photos inside will revert to "${data.portfolio.categories[1] || 'Traditional'}".`)) {
      const newCats = data.portfolio.categories.filter((_, i) => i !== idx);
      const fallbackCat = data.portfolio.categories[1] || 'Traditional';
      const newItems = data.portfolio.items.map(p => {
        if (p.cat === cat) return { ...p, cat: fallbackCat };
        return p;
      });
      updateSection('portfolio', { categories: newCats, items: newItems });
      setActive('All');
    }
  };

  return (
    <section id="portfolio" className="py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">
            <EditableText
              value={data.portfolio.sectionLabel}
              onChange={(val) => updateSection('portfolio', { sectionLabel: val })}
              tagName="span"
            />
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-charcoal-900 text-4xl md:text-5xl font-normal">
            <EditableText
              value={data.portfolio.titleLine1}
              onChange={(val) => updateSection('portfolio', { titleLine1: val })}
              tagName="span"
            />
            <br />
            <EditableText
              value={data.portfolio.titleItalic}
              onChange={(val) => updateSection('portfolio', { titleItalic: val })}
              tagName="span"
              className="italic text-gold-600"
            />
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 items-center">
          {data.portfolio.categories.map((cat, idx) => (
            <div key={cat} className="flex items-center gap-1">
              <button
                onClick={() => setActive(cat)}
                className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
                  active === cat
                    ? 'bg-charcoal-900 text-cream-50 border-charcoal-900'
                    : 'bg-transparent text-charcoal-700 border-charcoal-400 hover:border-charcoal-900'
                }`}
              >
                {editMode && cat !== 'All' ? (
                  <EditableText
                    value={cat}
                    onChange={(val) => renameCategory(idx, val)}
                    tagName="span"
                    className="font-sans text-xs tracking-widest uppercase"
                  />
                ) : (
                  cat
                )}
              </button>
              {editMode && cat !== 'All' && (
                <button
                  onClick={() => deleteCategory(idx)}
                  className="bg-red-900 hover:bg-red-800 text-cream-50 text-xs px-2 py-2 rounded-full cursor-pointer shadow"
                  title="Delete Category"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {editMode && (
            <button
              onClick={addCategory}
              className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs tracking-widest uppercase px-4 py-2.5 rounded cursor-pointer"
              title="Add Category"
            >
              + Add Category
            </button>
          )}
        </div>

        {/* Masonry-style grid */}
        <div className="gallery-grid">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden cursor-pointer group ${
                photo.layout === 'tall'
                  ? 'gallery-item-tall'
                  : photo.layout === 'wide'
                  ? 'gallery-item-wide'
                  : 'gallery-item-square'
              }`}
            >
              <EditableImage
                src={photo.src}
                alt={photo.title}
                onChange={(newSrc) => updatePhotoField(photo.id, 'src', newSrc)}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-charcoal-900 opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"
                onClick={() => setLightbox(photo.src)}
              />

              {/* Photo controls in Edit Mode */}
              {editMode && (
                <div className="absolute top-3 right-3 flex gap-2 z-30">
                  <button
                    onClick={() => toggleLayout(photo.id)}
                    className="bg-charcoal-900/90 text-gold-400 hover:bg-gold-500 hover:text-white px-2 py-1.5 text-2xs uppercase tracking-widest font-sans rounded cursor-pointer"
                    title={`Current layout: ${photo.layout}. Click to toggle.`}
                  >
                    📐 {photo.layout}
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded cursor-pointer"
                    title="Delete photo"
                  >
                    🗑️
                  </button>
                </div>
              )}

              {/* Category selector dropdown for photo (Edit Mode Only) */}
              {editMode && (
                <div className="absolute top-3 left-3 z-30">
                  <select
                    value={photo.cat}
                    onChange={(e) => updatePhotoField(photo.id, 'cat', e.target.value)}
                    className="bg-charcoal-900/90 text-cream-100 text-2xs uppercase tracking-wide px-2 py-1.5 rounded border border-charcoal-700 outline-none cursor-pointer"
                  >
                    {data.portfolio.categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Cover title content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                <span className="font-sans text-xs tracking-widest uppercase text-gold-400">{photo.cat}</span>
                <span className="font-display text-cream-50 text-lg mt-1">{photo.title}</span>
              </div>

              {/* Editable title input (Edit Mode overlay block) */}
              {editMode && (
                <div className="absolute bottom-2 left-2 right-2 bg-charcoal-900/95 p-2 border border-charcoal-800 z-30">
                  <EditableText
                    value={photo.title}
                    onChange={(val) => updatePhotoField(photo.id, 'title', val)}
                    tagName="span"
                    className="font-display text-cream-100 text-sm block"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add Photo Block */}
          {editMode && (
            <button
              onClick={addPhoto}
              className="border-2 border-dashed border-charcoal-400 hover:border-gold-500 bg-cream-50/50 text-charcoal-700 hover:text-gold-500 flex flex-col items-center justify-center p-8 h-full min-h-[200px] transition-colors duration-300 cursor-pointer shadow-sm"
            >
              <span className="text-3xl mb-2">➕</span>
              <span className="font-sans text-xs tracking-widest uppercase">Add New Photo</span>
            </button>
          )}
        </div>

        <div className="text-center mt-14">
          <p className="font-body text-charcoal-600 text-lg mb-6">
            These are just highlights — we have designed and executed over 250+ unique setups.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            See More Designs on Instagram
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-900 bg-opacity-95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream-50 font-sans text-xs tracking-widest uppercase hover:text-gold-400 transition-colors"
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
          <img
            src={lightbox}
            alt="Portfolio photo large view"
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
