'use client'
import { usePortfolioData } from '@/context/PortfolioDataContext'
import { EditableText } from '@/components/EditableText'
import { EditableImage } from '@/components/EditableImage'

export default function About() {
  const { data, updateSection } = usePortfolioData();

  const updateValueTitle = (index: number, title: string) => {
    const newValues = [...data.about.values];
    newValues[index] = { ...newValues[index], title };
    updateSection('about', { values: newValues });
  };

  const updateValueDesc = (index: number, desc: string) => {
    const newValues = [...data.about.values];
    newValues[index] = { ...newValues[index], desc };
    updateSection('about', { values: newValues });
  };

  return (
    <section id="about" className="py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Images */}
          <div className="relative">
            <EditableImage
              src={data.about.imageLarge}
              alt="About large showcase image"
              onChange={(newSrc) => updateSection('about', { imageLarge: newSrc })}
              className="w-full h-[500px] bg-cover bg-center"
            />
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-charcoal-900 text-cream-50 p-8 max-w-[220px] z-10">
              <p className="font-display text-4xl text-gold-400 font-semibold">
                <EditableText
                  value={data.about.experienceYears}
                  onChange={(val) => updateSection('about', { experienceYears: val })}
                  tagName="span"
                />
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream-200 mt-1">
                <EditableText
                  value={data.about.experienceText}
                  onChange={(val) => updateSection('about', { experienceText: val })}
                  tagName="span"
                />
              </p>
              <div className="gold-divider mt-4" />
              <p className="font-body text-cream-200 text-sm mt-4 leading-relaxed">
                <EditableText
                  value={data.about.experienceDesc}
                  onChange={(val) => updateSection('about', { experienceDesc: val })}
                  tagName="span"
                />
              </p>
            </div>
            {/* Small accent image */}
            <EditableImage
              src={data.about.imageSmall}
              alt="About accent small image"
              onChange={(newSrc) => updateSection('about', { imageSmall: newSrc })}
              className="absolute -top-8 -left-8 w-36 h-36 bg-cover bg-center border-4 border-cream-50 hidden lg:block"
            />
          </div>

          {/* Text */}
          <div>
            <p className="section-label mb-4">
              <EditableText
                value={data.about.sectionLabel}
                onChange={(val) => updateSection('about', { sectionLabel: val })}
                tagName="span"
              />
            </p>
            <div className="gold-divider mb-8" />

            <h2 className="font-display text-4xl md:text-5xl text-charcoal-900 font-normal leading-tight mb-8">
              <EditableText
                value={data.about.titleLine1}
                onChange={(val) => updateSection('about', { titleLine1: val })}
                tagName="span"
              />
              <br />
              <EditableText
                value={data.about.titleItalic}
                onChange={(val) => updateSection('about', { titleItalic: val })}
                tagName="span"
                className="italic text-gold-600"
              />
            </h2>

            <p className="font-body text-charcoal-700 text-xl leading-relaxed mb-6">
              <EditableText
                value={data.about.story1}
                onChange={(val) => updateSection('about', { story1: val })}
                tagName="span"
              />
            </p>
            <p className="font-body text-charcoal-700 text-lg leading-relaxed mb-10">
              <EditableText
                value={data.about.story2}
                onChange={(val) => updateSection('about', { story2: val })}
                tagName="span"
              />
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {data.about.values.map((v, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-gold-500 text-sm mt-1">◈</span>
                  <div>
                    <p className="font-sans text-sm font-medium text-charcoal-900">
                      <EditableText
                        value={v.title}
                        onChange={(val) => updateValueTitle(index, val)}
                        tagName="span"
                      />
                    </p>
                    <p className="font-body text-charcoal-600 text-sm mt-0.5">
                      <EditableText
                        value={v.desc}
                        onChange={(val) => updateValueDesc(index, val)}
                        tagName="span"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary">
              Plan With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
