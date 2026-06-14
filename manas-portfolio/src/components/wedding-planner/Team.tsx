'use client'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'
import { EditableText } from '@/components/wedding-planner/EditableText'
import { EditableImage } from '@/components/wedding-planner/EditableImage'

export default function Team() {
  const { data, editMode, updateSection } = usePortfolioData();

  const updateMemberField = (idx: number, field: string, value: any) => {
    const newItems = data.team.items.map((member, i) => {
      if (i === idx) {
        return { ...member, [field]: value };
      }
      return member;
    });
    updateSection('team', { items: newItems });
  };

  const addTeamMember = () => {
    const newItems = [
      ...data.team.items,
      {
        name: 'New Orchestrator',
        role: 'Event Assistant',
        bio: 'Click here to customize the biography of this team member.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        instagram: '@vows.member'
      }
    ];
    updateSection('team', { items: newItems });
  };

  const deleteTeamMember = (index: number) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      const newItems = data.team.items.filter((_, idx) => idx !== index);
      updateSection('team', { items: newItems });
    }
  };

  const updateCity = (index: number, val: string) => {
    const newCities = [...data.team.cities];
    newCities[index] = val;
    updateSection('team', { cities: newCities });
  };

  const addCity = () => {
    updateSection('team', { cities: [...data.team.cities, 'New City'] });
  };

  const removeCity = (index: number) => {
    const newCities = data.team.cities.filter((_, idx) => idx !== index);
    updateSection('team', { cities: newCities });
  };

  return (
    <section id="team" className="py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="section-label mb-4">
            <EditableText
              value={data.team.sectionLabel}
              onChange={(val) => updateSection('team', { sectionLabel: val })}
              tagName="span"
            />
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-charcoal-900 text-4xl md:text-5xl font-normal">
            <EditableText
              value={data.team.titleLine1}
              onChange={(val) => updateSection('team', { titleLine1: val })}
              tagName="span"
            />
            <br />
            <EditableText
              value={data.team.titleItalic}
              onChange={(val) => updateSection('team', { titleItalic: val })}
              tagName="span"
              className="italic text-gold-600"
            />
          </h2>
          <p className="font-body text-charcoal-600 text-xl mt-6 max-w-2xl mx-auto">
            <EditableText
              value={data.team.description}
              onChange={(val) => updateSection('team', { description: val })}
              tagName="span"
            />
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.team.items.map((member, idx) => (
            <div key={idx} className="group relative">
              {/* Delete Button (Edit Mode Only) */}
              {editMode && (
                <button
                  onClick={() => deleteTeamMember(idx)}
                  className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 z-30 shadow-lg cursor-pointer"
                  title="Remove team member"
                >
                  🗑️
                </button>
              )}

              {/* Photo */}
              <div className="relative overflow-hidden mb-5">
                <EditableImage
                  src={member.image}
                  alt={member.name}
                  onChange={(newSrc) => updateMemberField(idx, 'image', newSrc)}
                  className="w-full h-80 bg-cover bg-center bg-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gold-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <h3 className="font-display text-charcoal-900 text-xl mb-1">
                <EditableText
                  value={member.name}
                  onChange={(val) => updateMemberField(idx, 'name', val)}
                  tagName="span"
                />
              </h3>
              <p className="font-sans text-xs tracking-widest uppercase text-gold-600 mb-3">
                <EditableText
                  value={member.role}
                  onChange={(val) => updateMemberField(idx, 'role', val)}
                  tagName="span"
                />
              </p>
              <div className="gold-divider mb-4" />
              <p className="font-body text-charcoal-600 text-base leading-relaxed mb-3">
                <EditableText
                  value={member.bio}
                  onChange={(val) => updateMemberField(idx, 'bio', val)}
                  tagName="span"
                />
              </p>
              <p className="font-sans text-xs text-gold-500">
                <EditableText
                  value={member.instagram}
                  onChange={(val) => updateMemberField(idx, 'instagram', val)}
                  tagName="span"
                />
              </p>
            </div>
          ))}

          {/* Add Team Member Card (Edit Mode Only) */}
          {editMode && (
            <button
              onClick={addTeamMember}
              className="border-2 border-dashed border-gold-500/30 hover:border-gold-500/70 bg-cream-50/60 text-charcoal-700 hover:text-gold-500 flex flex-col items-center justify-center p-6 h-80 transition-colors duration-300 cursor-pointer shadow-sm"
            >
              <span className="text-3xl mb-3">➕</span>
              <span className="font-sans text-xs tracking-widest uppercase">Add Team Member</span>
            </button>
          )}
        </div>

        {/* Clients row */}
        <div className="mt-24 pt-16 border-t border-cream-200">
          <p className="text-center section-label mb-12 text-charcoal-500">
            <EditableText
              value={data.team.citiesLabel}
              onChange={(val) => updateSection('team', { citiesLabel: val })}
              tagName="span"
            />
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-70">
            {data.team.cities.map((city, index) => (
              <div key={index} className="flex items-center gap-1.5 group/city bg-cream-100 px-3 py-1.5 rounded-full border border-cream-200">
                <EditableText
                  value={city}
                  onChange={(val) => updateCity(index, val)}
                  tagName="span"
                  className="font-display text-charcoal-700 text-xl italic"
                />
                {editMode && (
                  <button
                    onClick={() => removeCity(index)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold font-sans cursor-pointer pl-1"
                    title="Remove city"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={addCity}
                className="bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs tracking-widest uppercase px-3 py-1.5 rounded cursor-pointer"
                title="Add City tag"
              >
                + Add City
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
