'use client'
import { useEffect, useRef } from 'react'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'
import { EditableText } from '@/components/wedding-planner/EditableText'
import { EditableImage } from '@/components/wedding-planner/EditableImage'

export default function Hero() {
  const { data, updateSection } = usePortfolioData();
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const subtitleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      titleContainerRef.current?.classList.remove('opacity-0-initial')
      titleContainerRef.current?.classList.add('animate-fade-in-up')
    }, 200)
    const timer2 = setTimeout(() => {
      subtitleContainerRef.current?.classList.remove('opacity-0-initial')
      subtitleContainerRef.current?.classList.add('animate-fade-in-up')
    }, 600)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const updateStatValue = (index: number, num: string) => {
    const newStats = [...data.hero.stats];
    newStats[index] = { ...newStats[index], num };
    updateSection('hero', { stats: newStats });
  };

  const updateStatLabel = (index: number, label: string) => {
    const newStats = [...data.hero.stats];
    newStats[index] = { ...newStats[index], label };
    updateSection('hero', { stats: newStats });
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background */}
      <EditableImage
        src={data.hero.bgImage}
        alt="Hero background setup"
        onChange={(newSrc) => updateSection('hero', { bgImage: newSrc })}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Vertical text decoration */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-3">
        <span className="writing-vertical font-sans text-xs tracking-widest uppercase text-gold-400 opacity-70">
          Since 2018 · Dehradun · India
        </span>
        <div className="w-px h-24 bg-gold-500 opacity-40" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-cream-200 opacity-30" />
        <span className="writing-vertical font-sans text-xs tracking-widest uppercase text-cream-200 opacity-50">
          Scroll
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
        <div className="max-w-3xl">
          <p className="section-label text-gold-300 mb-6">
            <EditableText
              value={data.hero.label}
              onChange={(val) => updateSection('hero', { label: val })}
              tagName="span"
            />
          </p>

          <div ref={titleContainerRef} className="opacity-0-initial">
            <h1 className="font-display text-cream-50 text-5xl md:text-7xl lg:text-8xl font-normal leading-none mb-6">
              <EditableText
                value={data.hero.titleLine1}
                onChange={(val) => updateSection('hero', { titleLine1: val })}
                tagName="span"
              />
              <br />
              <EditableText
                value={data.hero.titleItalic}
                onChange={(val) => updateSection('hero', { titleItalic: val })}
                tagName="span"
                className="italic text-gold-300"
              />{' '}
              <EditableText
                value={data.hero.titleLine2}
                onChange={(val) => updateSection('hero', { titleLine2: val })}
                tagName="span"
              />
            </h1>
          </div>

          <div ref={subtitleContainerRef} className="opacity-0-initial">
            <p className="font-body text-cream-200 text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-xl">
              <EditableText
                value={data.hero.subtitle}
                onChange={(val) => updateSection('hero', { subtitle: val })}
                tagName="span"
              />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => handleScroll('#booking')} className="btn-gold">
              <EditableText
                value={data.hero.btnPrimaryText}
                onChange={(val) => updateSection('hero', { btnPrimaryText: val })}
                tagName="span"
              />
            </button>
            <button onClick={() => handleScroll('#portfolio')} className="btn-outline border-cream-200 text-cream-50 hover:bg-cream-50 hover:text-charcoal-900">
              <EditableText
                value={data.hero.btnOutlineText}
                onChange={(val) => updateSection('hero', { btnOutlineText: val })}
                tagName="span"
              />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-16 pt-10 border-t border-cream-200 border-opacity-20">
            {data.hero.stats.map((s, index) => (
              <div key={index}>
                <p className="font-display text-gold-300 text-3xl font-semibold">
                  <EditableText
                    value={s.num}
                    onChange={(val) => updateStatValue(index, val)}
                    tagName="span"
                  />
                </p>
                <p className="font-sans text-cream-200 text-xs tracking-wide uppercase mt-1 opacity-70">
                  <EditableText
                    value={s.label}
                    onChange={(val) => updateStatLabel(index, val)}
                    tagName="span"
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
