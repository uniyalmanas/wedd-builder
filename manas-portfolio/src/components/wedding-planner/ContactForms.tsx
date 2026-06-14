'use client'
import { useState } from 'react'
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext'

type FormType = 'inquiry' | 'booking' | 'callback'

// ─── Quick Inquiry Form ───────────────────────────────────────────────────────
function QuickInquiryForm() {
  const { addLead } = usePortfolioData()
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', city: '', service: '', budget: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    
    addLead({
      name: form.name,
      phone: form.phone,
      email: form.email,
      date: form.date,
      city: form.city,
      service: form.service,
      budget: form.budget,
      source: 'Quick Enquiry',
      notes: `Requested service: ${form.service}. Event Date: ${form.date}. City: ${form.city}. Budget: ${form.budget}.`
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <div className="form-success text-center py-12">
      <div className="text-5xl mb-4 text-gold-600">✓</div>
      <h3 className="font-display text-2xl text-charcoal-900 mb-3">Enquiry Received!</h3>
      <p className="font-body text-charcoal-600 text-lg">We'll call you within 24 hours. Check your WhatsApp too.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="section-label block mb-2">Full Name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Phone Number *</label>
          <input name="phone" value={form.phone} onChange={handle} required placeholder="+91 98765 43210" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Event Date *</label>
          <input name="date" type="date" value={form.date} onChange={handle} required className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Event City *</label>
          <input name="city" value={form.city} onChange={handle} required placeholder="e.g. Dehradun, Jaipur" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Service Needed *</label>
          <select name="service" value={form.service} onChange={handle} required className="input-field bg-transparent text-charcoal-900">
            <option value="" className="text-charcoal-900">Select a service</option>
            <option className="text-charcoal-900">Full-Service Planning</option>
            <option className="text-charcoal-900">Theme & Floral Decor</option>
            <option className="text-charcoal-900">Month-of Coordination</option>
            <option className="text-charcoal-900">Destination & Logistics</option>
            <option className="text-charcoal-900">Entertainment & Artist Booking</option>
            <option className="text-charcoal-900">Catering & Menu Design</option>
            <option className="text-charcoal-900">Not sure yet</option>
          </select>
        </div>
      </div>
      <div>
        <label className="section-label block mb-2">Approximate Budget</label>
        <select name="budget" value={form.budget} onChange={handle} className="input-field bg-transparent text-charcoal-900">
          <option value="" className="text-charcoal-900">Select budget range</option>
          <option className="text-charcoal-900">Under ₹1,00,000</option>
          <option className="text-charcoal-900">₹1,00,000 – ₹3,00,000</option>
          <option className="text-charcoal-900">₹3,00,000 – ₹7,00,000</option>
          <option className="text-charcoal-900">₹7,00,000 – ₹15,00,000</option>
          <option className="text-charcoal-900">Above ₹15,00,000</option>
          <option className="text-charcoal-900">To be discussed</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn-gold w-full text-center cursor-pointer">
        {loading ? 'Sending...' : 'Send Enquiry →'}
      </button>
      <p className="font-sans text-xs text-charcoal-500 text-center">
        We'll call you within 24 hours. Your info is never shared.
      </p>
    </form>
  )
}

// ─── Detailed Booking Form ────────────────────────────────────────────────────
function DetailedBookingForm() {
  const { addLead } = usePortfolioData()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', partnerName: '', eventDate: '',
    eventType: '', venue: '', city: '', guestCount: '', duration: '',
    packages: [] as string[], requirements: '', referral: '', budget: ''
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const togglePackage = (pkg: string) => {
    setForm(prev => ({
      ...prev,
      packages: prev.packages.includes(pkg)
        ? prev.packages.filter(p => p !== pkg)
        : [...prev.packages, pkg]
    }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    
    addLead({
      name: form.name,
      phone: form.phone,
      email: form.email,
      date: form.eventDate,
      city: form.city,
      service: `${form.eventType} Booking ${form.packages.length > 0 ? `(${form.packages.join(', ')})` : ''}`,
      budget: form.budget,
      source: 'Detailed Booking',
      notes: `Partner Name: ${form.partnerName || 'N/A'}. Venue: ${form.venue || 'N/A'}. Guest Count: ${form.guestCount}. Duration: ${form.duration}. Special requirements: ${form.requirements || 'None'}. Referral source: ${form.referral || 'Not specified'}.`
    })

    setLoading(false)
    setSent(true)
  }

  const packageOptions = ['Full Planning Orchestration', 'Decor & Theme Styling', 'Logistics & RSVP Hospitality', 'Catering & Menu Design', 'Entertainment & Artists', 'AV & Sound Truss']

  if (sent) return (
    <div className="form-success text-center py-12">
      <div className="text-5xl mb-4 text-gold-600">✓</div>
      <h3 className="font-display text-2xl text-charcoal-900 mb-3">Booking Request Received!</h3>
      <p className="font-body text-charcoal-600 text-lg">Our team will send you a detailed proposal within 48 hours.</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="section-label block mb-2">Your Full Name *</label>
          <input name="name" value={form.name} onChange={handle} required placeholder="Your name" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Partner's Name</label>
          <input name="partnerName" value={form.partnerName} onChange={handle} placeholder="Partner's name (if wedding)" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Phone *</label>
          <input name="phone" value={form.phone} onChange={handle} required placeholder="+91 98765 43210" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handle} required placeholder="your@email.com" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Event Date *</label>
          <input name="eventDate" type="date" value={form.eventDate} onChange={handle} required className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Event Type *</label>
          <select name="eventType" value={form.eventType} onChange={handle} required className="input-field bg-transparent text-charcoal-900">
            <option value="" className="text-charcoal-900">Select event type</option>
            <option className="text-charcoal-900">Hindu Wedding</option>
            <option className="text-charcoal-900">Muslim Wedding</option>
            <option className="text-charcoal-900">Christian Wedding</option>
            <option className="text-charcoal-900">Sikh Wedding</option>
            <option className="text-charcoal-900">Inter-religion Wedding</option>
            <option className="text-charcoal-900">Corporate Gala</option>
            <option className="text-charcoal-900">Product Launch</option>
            <option className="text-charcoal-900">Birthday / Anniversary</option>
            <option className="text-charcoal-900">Other</option>
          </select>
        </div>
        <div>
          <label className="section-label block mb-2">Venue Name</label>
          <input name="venue" value={form.venue} onChange={handle} placeholder="Venue or hotel name" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Event City *</label>
          <input name="city" value={form.city} onChange={handle} required placeholder="City, State" className="input-field text-charcoal-900" />
        </div>
        <div>
          <label className="section-label block mb-2">Expected Guests</label>
          <select name="guestCount" value={form.guestCount} onChange={handle} className="input-field bg-transparent text-charcoal-900">
            <option value="" className="text-charcoal-900">Select range</option>
            <option className="text-charcoal-900">Under 50</option>
            <option className="text-charcoal-900">50 – 150</option>
            <option className="text-charcoal-900">150 – 300</option>
            <option className="text-charcoal-900">300 – 500</option>
            <option className="text-charcoal-900">500+</option>
          </select>
        </div>
        <div>
          <label className="section-label block mb-2">Coverage Duration</label>
          <select name="duration" value={form.duration} onChange={handle} className="input-field bg-transparent text-charcoal-900">
            <option value="" className="text-charcoal-900">Select duration</option>
            <option className="text-charcoal-900">2–4 Hours</option>
            <option className="text-charcoal-900">4–6 Hours</option>
            <option className="text-charcoal-900">Full Day (8–10 hrs)</option>
            <option className="text-charcoal-900">Multi-Day (2 days)</option>
            <option className="text-charcoal-900">Multi-Day (3+ days)</option>
          </select>
        </div>
      </div>

      {/* Package checkboxes */}
      <div>
        <label className="section-label block mb-4">Services Required (select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {packageOptions.map(pkg => (
            <label key={pkg} className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={form.packages.includes(pkg)}
                onChange={() => togglePackage(pkg)}
                className="w-4 h-4 accent-gold-500 border border-charcoal-300"
              />
              <span className="font-sans text-sm text-charcoal-750">{pkg}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="section-label block mb-2">Budget Range *</label>
        <select name="budget" value={form.budget} onChange={handle} required className="input-field bg-transparent text-charcoal-900">
          <option value="" className="text-charcoal-900">Select budget range</option>
          <option className="text-charcoal-900">Under ₹2,00,000</option>
          <option className="text-charcoal-900">₹2,00,000 – ₹5,00,000</option>
          <option className="text-charcoal-900">₹5,00,000 – ₹12,00,000</option>
          <option className="text-charcoal-900">₹12,00,000 – ₹25,00,000</option>
          <option className="text-charcoal-900">Above ₹25,00,000</option>
        </select>
      </div>

      <div>
        <label className="section-label block mb-2">Special Requirements or Vision</label>
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handle as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder="Tell us about your vision, specific shots you want, themes, any concerns..."
          rows={5}
          className="input-field resize-none text-charcoal-900"
        />
      </div>

      <div>
        <label className="section-label block mb-2">How Did You Hear About Us?</label>
        <select name="referral" value={form.referral} onChange={handle} className="input-field bg-transparent text-charcoal-900">
          <option value="" className="text-charcoal-900">Select source</option>
          <option className="text-charcoal-900">Instagram</option>
          <option className="text-charcoal-900">Google Search</option>
          <option className="text-charcoal-900">Friend / Family Referral</option>
          <option className="text-charcoal-900">JustDial</option>
          <option className="text-charcoal-900">WedMeGood / WeddingWire</option>
          <option className="text-charcoal-900">Previous Client</option>
          <option className="text-charcoal-900">Other</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="btn-gold w-full text-center cursor-pointer">
        {loading ? 'Submitting...' : 'Submit Full Booking Request →'}
      </button>
      <p className="font-sans text-xs text-charcoal-500 text-center">
        We'll review your request and send a custom proposal within 48 hours.
      </p>
    </form>
  )
}

// ─── Callback Request Form ────────────────────────────────────────────────────
function CallbackForm() {
  const { addLead } = usePortfolioData()
  const [form, setForm] = useState({ name: '', phone: '', time: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    
    addLead({
      name: form.name,
      phone: form.phone,
      email: '',
      source: 'Callback Request',
      notes: `Requested preferred callback time: ${form.time}. Quick message: ${form.message || 'No additional details.'}`
    })

    setLoading(false)
    setSent(true)
  }

  if (sent) return (
    <div className="form-success text-center py-12">
      <div className="text-5xl mb-4 text-gold-600">📞</div>
      <h3 className="font-display text-2xl text-charcoal-900 mb-3">Call Scheduled!</h3>
      <p className="font-body text-charcoal-600 text-lg">We'll call you at your preferred time. Talk soon!</p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label className="section-label block mb-2">Your Name *</label>
        <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className="input-field text-charcoal-900" />
      </div>
      <div>
        <label className="section-label block mb-2">Phone Number *</label>
        <input name="phone" value={form.phone} onChange={handle} required placeholder="+91 98765 43210" className="input-field text-charcoal-900" />
      </div>
      <div>
        <label className="section-label block mb-2">Best Time to Call *</label>
        <select name="time" value={form.time} onChange={handle} required className="input-field bg-transparent text-charcoal-900">
          <option value="" className="text-charcoal-900">Select preferred time</option>
          <option className="text-charcoal-900">Morning (9 AM – 12 PM)</option>
          <option className="text-charcoal-900">Afternoon (12 PM – 3 PM)</option>
          <option className="text-charcoal-900">Evening (3 PM – 6 PM)</option>
          <option className="text-charcoal-900">Night (6 PM – 9 PM)</option>
          <option className="text-charcoal-900">Anytime works</option>
        </select>
      </div>
      <div>
        <label className="section-label block mb-2">What's Your Event About? (optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handle as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder="A quick line about your event helps us prepare for the call..."
          rows={4}
          className="input-field resize-none text-charcoal-900"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full text-center cursor-pointer">
        {loading ? 'Requesting...' : 'Request a Callback →'}
      </button>
    </form>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ContactForms() {
  const [activeForm, setActiveForm] = useState<FormType>('inquiry')

  const tabs: { id: FormType; label: string; desc: string }[] = [
    { id: 'inquiry', label: 'Quick Enquiry', desc: '2 minutes · We call you back' },
    { id: 'booking', label: 'Full Booking Request', desc: '5 minutes · Get a custom quote' },
    { id: 'callback', label: 'Schedule a Call', desc: '30 seconds · We call you' },
  ]

  return (
    <section id="contact" className="py-28 bg-cream-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Get in Touch</p>
          <div className="gold-divider mx-auto mb-8" />
          <h2 className="font-display text-charcoal-900 text-4xl md:text-5xl font-normal">
            Let's Start Planning<br />
            <span className="italic text-gold-600">Your Story</span>
          </h2>
          <p className="font-body text-charcoal-600 text-xl mt-6 max-w-2xl mx-auto">
            Choose how you'd like to reach us. Every enquiry gets a personal response — never a template.
          </p>
        </div>

        {/* Form tabs */}
        <div className="grid md:grid-cols-3 gap-3 mb-12">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveForm(tab.id)}
              className={`text-left p-5 border-2 transition-all duration-300 cursor-pointer ${
                activeForm === tab.id
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-cream-200 hover:border-gold-300'
              }`}
            >
              <p className={`font-sans text-sm font-medium tracking-wide mb-1 ${
                activeForm === tab.id ? 'text-gold-700' : 'text-charcoal-900'
              }`}>{tab.label}</p>
              <p className="font-body text-charcoal-500 text-sm">{tab.desc}</p>
            </button>
          ))}
        </div>

        {/* Active form */}
        <div className="bg-cream-50 border border-cream-200 p-8 md:p-12">
          {activeForm === 'inquiry' && <QuickInquiryForm />}
          {activeForm === 'booking' && <DetailedBookingForm />}
          {activeForm === 'callback' && <CallbackForm />}
        </div>
      </div>
    </section>
  )
}
