'use client'
import React, { useState, useRef } from 'react';
import { usePortfolioData, Lead, Vendor } from '@/context/wedding-planner/PortfolioDataContext';

type TabType = 'overview' | 'leads' | 'vendors' | 'settings';

export default function AdminPanel() {
  const {
    editMode,
    setEditMode,
    adminOpen,
    setAdminOpen,
    resetToDefault,
    exportConfig,
    importConfig,
    
    leads,
    updateLeadStatus,
    updateLeadNotes,
    deleteLead,
    clearAllLeads,

    vendors,
    addVendor,
    updateVendor,
    deleteVendor
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddVendor, setShowAddVendor] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vendor Form State
  const [newVenName, setNewVenName] = useState('');
  const [newVenCat, setNewVenCat] = useState('Florist');
  const [newVenPerson, setNewVenPerson] = useState('');
  const [newVenPhone, setNewVenPhone] = useState('');
  const [newVenEmail, setNewVenEmail] = useState('');
  const [newVenQuote, setNewVenQuote] = useState('');
  const [newVenNotes, setNewVenNotes] = useState('');

  if (!adminOpen) return null;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const success = importConfig(result);
      if (success) {
        alert('Configuration imported successfully and applied!');
        window.location.reload();
      } else {
        alert('Failed to import configuration. Please make sure the JSON file format is valid.');
      }
    };
    reader.readAsText(file);
  };

  // Stats calculation
  const totalLeads = leads.length;
  const paidLeads = leads.filter(l => l.status === 'Paid');
  const bookedRevenue = paidLeads.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0);
  
  // Pipeline revenue calculation: sums up approx value of bookings / proposal sent
  const pipelineRevenue = leads
    .filter(l => l.status === 'Booked' || l.status === 'Proposal Sent')
    .reduce((acc, curr) => {
      const budgetStr = curr.budget || '';
      const numbers = budgetStr.replace(/[^\d]/g, '');
      // If it is a range, grab a sensible estimate (e.g. ₹5L - ₹12L -> pick ₹8L)
      const parsedVal = parseInt(numbers, 10);
      return acc + (isNaN(parsedVal) ? 100000 : parsedVal);
    }, 0);

  const conversionRate = totalLeads > 0 
    ? Math.round((leads.filter(l => ['Booked', 'Paid'].includes(l.status)).length / totalLeads) * 100) 
    : 0;

  // Add Vendor Handler
  const handleAddVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenName) return;

    addVendor({
      name: newVenName,
      category: newVenCat,
      contactPerson: newVenPerson,
      phone: newVenPhone,
      email: newVenEmail,
      priceQuoted: parseFloat(newVenQuote) || 0,
      paymentStatus: 'Unpaid',
      amountPaid: 0,
      notes: newVenNotes
    });

    // Reset Form
    setNewVenName('');
    setNewVenPerson('');
    setNewVenPhone('');
    setNewVenEmail('');
    setNewVenQuote('');
    setNewVenNotes('');
    setShowAddVendor(false);
  };

  return (
    <div className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 font-sans animate-fade-in text-cream-200">
      <div className="bg-charcoal-900 border border-gold-500/25 rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full h-[90vh] md:h-[80vh] flex flex-col md:flex-row animate-scale-in">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-charcoal-950 border-r border-charcoal-800 p-6 flex flex-col justify-between flex-shrink-0">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-cream-50 text-xl font-bold tracking-wider">WaaS Engine</h2>
                <span className="text-[9px] tracking-widest text-gold-400 font-bold uppercase block mt-1">
                  MANAS PORTFOLIO SAAS
                </span>
              </div>
              <button 
                onClick={() => setAdminOpen(false)}
                className="md:hidden text-cream-300 hover:text-gold-400 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: '📊 Dashboard Overview' },
                { id: 'leads', label: `👥 Leads CRM (${leads.length})` },
                { id: 'vendors', label: `🚚 Vendor Directory (${vendors.length})` },
                { id: 'settings', label: '⚙️ Builder Settings' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    setSelectedLead(null);
                  }}
                  className={`w-full text-left py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gold-500 text-charcoal-950 shadow-md font-bold'
                      : 'hover:bg-charcoal-800 text-cream-200 hover:text-gold-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:block border-t border-charcoal-800 pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xs uppercase tracking-wider opacity-60">Edit Mode Status</span>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                  editMode ? 'bg-gold-400' : 'bg-charcoal-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-charcoal-900 transition-transform duration-300 ${editMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            <button
              onClick={() => setAdminOpen(false)}
              className="w-full bg-charcoal-800 hover:bg-gold-600 hover:text-charcoal-950 text-cream-200 py-2.5 rounded text-center text-xs uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer"
            >
              Exit Dashboard
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-charcoal-900/40 relative">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-charcoal-800 pb-5">
                <h1 className="text-2xl font-display text-cream-50 font-normal">Business Engine Overview</h1>
                <p className="text-xs text-cream-200 opacity-60 mt-1">Live metrics captured from customer bookings, Stripe transactions, and enquiries.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total CRM Leads', val: totalLeads, desc: 'Enquiries & checkouts', color: 'border-blue-500/20' },
                  { label: 'Payments Captured', val: bookedRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), desc: 'Stripe reservation logs', color: 'border-green-500/20' },
                  { label: 'Pipeline Estimate', val: pipelineRevenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }), desc: 'Proposal & Booking value', color: 'border-yellow-500/20' },
                  { label: 'Lead Conversion', val: `${conversionRate}%`, desc: 'Booked / Total leads', color: 'border-purple-500/20' }
                ].map((stat, i) => (
                  <div key={i} className={`bg-charcoal-800 border ${stat.color} p-5 rounded-lg flex flex-col justify-between`}>
                    <span className="text-2xs uppercase tracking-widest text-cream-200 opacity-50 block">{stat.label}</span>
                    <span className="text-2xl md:text-3xl font-display font-semibold text-cream-50 my-2 block">{stat.val}</span>
                    <span className="text-4xs uppercase tracking-wider text-gold-400 font-bold block">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Quick info notes */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="bg-charcoal-800/50 border border-charcoal-850 p-6 rounded-lg space-y-4">
                  <h3 className="font-display text-cream-50 text-base font-semibold">⚡ Simulated SaaS Flow Architecture</h3>
                  <div className="space-y-3 text-xs text-cream-200 opacity-80 leading-relaxed">
                    <p>This template is equipped with a client-side CRM database. When a site visitor:</p>
                    <ul className="list-disc pl-4 space-y-1.5">
                      <li>Submits the <strong>Quick Enquiry</strong>, <strong>Detailed Quote Request</strong>, or <strong>Callback Form</strong></li>
                      <li>Completes the simulated <strong>Stripe Checkout</strong> deposit flow</li>
                    </ul>
                    <p>The system intercepts the event, generates a unique transaction log, writes it to LocalStorage CRM, and triggers reactive state updates.</p>
                  </div>
                </div>

                <div className="bg-charcoal-800/50 border border-charcoal-850 p-6 rounded-lg space-y-4">
                  <h3 className="font-display text-cream-50 text-base font-semibold">✨ AI Assistant Writing Protocol</h3>
                  <div className="space-y-3 text-xs text-cream-200 opacity-80 leading-relaxed">
                    <p>When **Edit Mode** is activated, business owners can click any text element on the page. In addition to direct typing, an AI copywriting button appears.</p>
                    <p>This helper runs context-aware content generators (supporting standard prompts or custom requests), streamlining page copywriting without hiring copywriters.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6 animate-fade-in h-full flex flex-col">
              <div className="border-b border-charcoal-800 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display text-cream-50 font-normal">Customer CRM Leads</h1>
                  <p className="text-xs text-cream-200 opacity-60 mt-1">Track and manage booking schedules, callback times, and client billing logs.</p>
                </div>
                <button
                  onClick={clearAllLeads}
                  className="bg-red-950/40 hover:bg-red-900/60 border border-red-900/35 text-red-200 font-semibold text-2xs uppercase tracking-wider px-3.5 py-2 rounded cursor-pointer self-start sm:self-center transition-all duration-300"
                >
                  🧹 Clear All Leads
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-20 bg-charcoal-800/20 border border-dashed border-charcoal-850 rounded-lg">
                  <p className="text-cream-200 text-sm opacity-60">No CRM leads recorded yet. Try submitting a form on the website or booking a service!</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
                  
                  {/* Table List */}
                  <div className="flex-1 overflow-x-auto bg-charcoal-950/40 border border-charcoal-850 rounded-lg overflow-y-auto max-h-[50vh] lg:max-h-[none]">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-charcoal-800 bg-charcoal-950 text-cream-200 opacity-60 font-semibold tracking-wider uppercase">
                          <th className="p-4">Client</th>
                          <th className="p-4">Event Niche</th>
                          <th className="p-4">Source</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal-800">
                        {leads.map(lead => (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLead(lead)}
                            className={`hover:bg-charcoal-850/40 cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-charcoal-850/60' : ''}`}
                          >
                            <td className="p-4">
                              <span className="font-semibold text-cream-50 block">{lead.name}</span>
                              <span className="text-4xs opacity-60 block mt-0.5">{lead.phone || lead.email}</span>
                            </td>
                            <td className="p-4">
                              <span className="block truncate max-w-[150px]">{lead.service || 'Callback request'}</span>
                              <span className="text-4xs opacity-50 block mt-0.5">{lead.date || 'No date set'}</span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-1.5 py-0.5 rounded text-4xs uppercase font-bold ${
                                lead.source === 'Stripe Checkout' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-charcoal-700 text-cream-200'
                              }`}>{lead.source}</span>
                            </td>
                            <td className="p-4">
                              <span className={`inline-block w-2.5 h-2.5 rounded-full mr-1.5 ${
                                lead.status === 'Paid' ? 'bg-green-500' :
                                lead.status === 'Booked' ? 'bg-blue-500' :
                                lead.status === 'Proposal Sent' ? 'bg-yellow-500' :
                                lead.status === 'Contacted' ? 'bg-purple-500' :
                                lead.status === 'Cancelled' ? 'bg-red-500' : 'bg-cream-400'
                              }`} />
                              <span className="font-semibold text-4xs uppercase tracking-wider">{lead.status}</span>
                            </td>
                            <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                              <button 
                                onClick={() => deleteLead(lead.id)}
                                className="text-red-400 hover:text-red-500 font-bold text-sm px-2 cursor-pointer"
                                title="Delete Lead"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Lead details card */}
                  <div className="w-full lg:w-80 bg-charcoal-950 p-6 border border-charcoal-800 rounded-lg flex flex-col justify-between flex-shrink-0">
                    {selectedLead ? (
                      <div className="space-y-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="border-b border-charcoal-800 pb-3 flex justify-between items-start">
                            <div>
                              <h3 className="font-display text-cream-50 text-base font-bold leading-tight">{selectedLead.name}</h3>
                              <span className="text-5xs opacity-50 block mt-0.5">ID: {selectedLead.id}</span>
                            </div>
                            <span className="text-[10px] text-cream-200 font-mono bg-charcoal-800 px-2 py-0.5 rounded">
                              {new Date(selectedLead.submittedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-2xs leading-normal">
                            <div>
                              <span className="text-cream-200 opacity-50 block">Phone</span>
                              <span className="font-semibold text-cream-100">{selectedLead.phone || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-cream-200 opacity-50 block">Email</span>
                              <span className="font-semibold text-cream-100 truncate block max-w-[120px]" title={selectedLead.email}>{selectedLead.email || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-cream-200 opacity-50 block">City</span>
                              <span className="font-semibold text-cream-100">{selectedLead.city || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-cream-200 opacity-50 block">Budget / Package</span>
                              <span className="font-semibold text-gold-400">{selectedLead.budget || 'N/A'}</span>
                            </div>
                          </div>

                          {selectedLead.paidAmount && (
                            <div className="bg-green-500/10 border border-green-500/25 p-3 rounded text-2xs">
                              <div className="flex justify-between font-semibold text-green-400">
                                <span>Reservation Paid</span>
                                <span>₹{selectedLead.paidAmount.toLocaleString()}</span>
                              </div>
                              <span className="text-[10px] text-green-300 opacity-80 block mt-1 font-mono">
                                Txn: {selectedLead.stripeTxnId}
                              </span>
                            </div>
                          )}

                          <div className="space-y-1">
                            <span className="text-2xs uppercase tracking-wider text-cream-200 opacity-50 block">Lead Status</span>
                            <select
                              value={selectedLead.status}
                              onChange={(e) => {
                                updateLeadStatus(selectedLead.id, e.target.value as Lead['status']);
                                setSelectedLead({ ...selectedLead, status: e.target.value as Lead['status'] });
                              }}
                              className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-2.5 py-1.5 text-xs text-cream-50 focus:outline-none focus:border-gold-500"
                            >
                              <option>New</option>
                              <option>Contacted</option>
                              <option>Proposal Sent</option>
                              <option>Booked</option>
                              <option>Paid</option>
                              <option>Cancelled</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <span className="text-2xs uppercase tracking-wider text-cream-200 opacity-50 block">Internal Notes</span>
                            <textarea
                              value={selectedLead.notes || ''}
                              onChange={(e) => {
                                updateLeadNotes(selectedLead.id, e.target.value);
                                setSelectedLead({ ...selectedLead, notes: e.target.value });
                              }}
                              placeholder="Write notes about custom styling, flower selections, or meeting times..."
                              rows={4}
                              className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-2.5 py-1.5 text-xs text-cream-200 focus:outline-none focus:border-gold-500 resize-none leading-relaxed"
                            />
                          </div>
                        </div>
                        
                        <p className="text-5xs text-cream-200 opacity-40 leading-normal text-center mt-4 border-t border-charcoal-800 pt-3">
                          Changes persist automatically to client's browser local database.
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center p-6 border border-dashed border-charcoal-850 rounded">
                        <p className="text-2xs text-cream-200 opacity-50">Select a lead from the CRM table on the left to review proposal parameters, log payments, or update scheduling notes.</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VENDOR DIRECTORY */}
          {activeTab === 'vendors' && (
            <div className="space-y-6 animate-fade-in flex flex-col h-full">
              <div className="border-b border-charcoal-800 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display text-cream-50 font-normal">Vendor & Supplier Directory</h1>
                  <p className="text-xs text-cream-200 opacity-60 mt-1">Coordinate and balance payments for florists, decorators, photographers, and caterers.</p>
                </div>
                <button
                  onClick={() => setShowAddVendor(!showAddVendor)}
                  className="bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold text-2xs uppercase tracking-wider px-4 py-2.5 rounded cursor-pointer self-start sm:self-center transition-all duration-300"
                >
                  {showAddVendor ? '✕ Cancel Add' : '➕ Register New Vendor'}
                </button>
              </div>

              {/* Add Vendor Form Overlay / Section */}
              {showAddVendor && (
                <form onSubmit={handleAddVendorSubmit} className="bg-charcoal-950 p-6 border border-gold-500/20 rounded-lg space-y-4 grid md:grid-cols-2 gap-4 items-end animate-fade-in">
                  <div className="md:col-span-2 border-b border-charcoal-850 pb-2">
                    <h3 className="text-cream-50 text-xs uppercase font-bold tracking-wider">Register Supplier</h3>
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Company / Vendor Name *</label>
                    <input 
                      required 
                      value={newVenName} 
                      onChange={e => setNewVenName(e.target.value)} 
                      placeholder="e.g. Royal Banquet Florals" 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Category *</label>
                    <select 
                      value={newVenCat} 
                      onChange={e => setNewVenCat(e.target.value)} 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500"
                    >
                      <option>Florist</option>
                      <option>Catering</option>
                      <option>Photography</option>
                      <option>Sound & Light</option>
                      <option>Venue</option>
                      <option>Decor</option>
                      <option>Makeup Artist</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Contact Person</label>
                    <input 
                      value={newVenPerson} 
                      onChange={e => setNewVenPerson(e.target.value)} 
                      placeholder="Rajesh Kumar" 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Phone Number</label>
                    <input 
                      value={newVenPhone} 
                      onChange={e => setNewVenPhone(e.target.value)} 
                      placeholder="+91 94140 12345" 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Email Address</label>
                    <input 
                      value={newVenEmail} 
                      onChange={e => setNewVenEmail(e.target.value)} 
                      placeholder="supplier@email.com" 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Quoted Cost (₹) *</label>
                    <input 
                      type="number" 
                      required
                      value={newVenQuote} 
                      onChange={e => setNewVenQuote(e.target.value)} 
                      placeholder="250000" 
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-4xs uppercase font-semibold text-cream-200 opacity-50 mb-1">Internal Notes</label>
                    <textarea 
                      value={newVenNotes} 
                      onChange={e => setNewVenNotes(e.target.value)} 
                      placeholder="Required ₹50,000 advanced booking fee. Outstanding paid on wedding setup day." 
                      rows={2}
                      className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-3 py-2 text-xs text-cream-100 focus:outline-none focus:border-gold-500 resize-none" 
                    />
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold py-3 text-xs uppercase tracking-wider rounded cursor-pointer"
                    >
                      Save Supplier
                    </button>
                  </div>
                </form>
              )}

              {vendors.length === 0 ? (
                <div className="text-center py-20 bg-charcoal-800/20 border border-dashed border-charcoal-850 rounded-lg">
                  <p className="text-cream-200 text-sm opacity-60">No suppliers registered in this directory. Click "Register New Vendor" to build your budget sheet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-charcoal-950/40 border border-charcoal-850 rounded-lg flex-1">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-charcoal-800 bg-charcoal-950 text-cream-200 opacity-60 font-semibold tracking-wider uppercase">
                        <th className="p-4">Vendor</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4 text-right">Quoted Price</th>
                        <th className="p-4 text-right">Amount Paid</th>
                        <th className="p-4 text-right">Balance Due</th>
                        <th className="p-4">Payment Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-charcoal-800">
                      {vendors.map(vendor => {
                        const balance = vendor.priceQuoted - vendor.amountPaid;
                        return (
                          <tr key={vendor.id} className="hover:bg-charcoal-850/20">
                            <td className="p-4 font-semibold text-cream-50">
                              <span>{vendor.name}</span>
                              {vendor.notes && <span className="text-[10px] opacity-50 block font-normal mt-0.5 italic">{vendor.notes}</span>}
                            </td>
                            <td className="p-4 font-medium text-gold-400">{vendor.category}</td>
                            <td className="p-4">
                              <span className="block font-semibold">{vendor.contactPerson || 'N/A'}</span>
                              <span className="block text-4xs opacity-50 mt-0.5">{vendor.phone || vendor.email}</span>
                            </td>
                            <td className="p-4 text-right font-semibold">₹{vendor.priceQuoted.toLocaleString('en-IN')}</td>
                            <td className="p-4 text-right">
                              <input
                                type="number"
                                value={vendor.amountPaid}
                                onChange={(e) => {
                                  const amt = parseFloat(e.target.value) || 0;
                                  let status: Vendor['paymentStatus'] = 'Unpaid';
                                  if (amt >= vendor.priceQuoted) status = 'Paid';
                                  else if (amt > 0) status = 'Partial';
                                  updateVendor(vendor.id, { amountPaid: amt, paymentStatus: status });
                                }}
                                className="w-20 bg-charcoal-800 border border-charcoal-700 rounded px-1.5 py-1 text-right text-cream-50 focus:outline-none focus:border-gold-500 font-semibold"
                              />
                            </td>
                            <td className={`p-4 text-right font-semibold ${balance > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                              ₹{balance.toLocaleString('en-IN')}
                            </td>
                            <td className="p-4">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                vendor.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                vendor.paymentStatus === 'Partial' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {vendor.paymentStatus}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => deleteVendor(vendor.id)}
                                className="text-red-400 hover:text-red-500 font-semibold cursor-pointer text-sm"
                                title="Delete Vendor"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in">
              <div className="border-b border-charcoal-800 pb-5">
                <h1 className="text-2xl font-display text-cream-50 font-normal">Page Builder & System Settings</h1>
                <p className="text-xs text-cream-200 opacity-60 mt-1">Export code structures, import page blocks, or revert layouts to factory parameters.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Save/Export */}
                <div className="bg-charcoal-800/40 border border-charcoal-850 p-6 rounded-lg space-y-4">
                  <span className="text-2xl">💾</span>
                  <h3 className="font-display text-cream-50 text-base font-semibold">Export Layout JSON</h3>
                  <p className="text-2xs text-cream-200 opacity-70 leading-normal">
                    Download a compiled JSON database of your modified typography, content, images, and services. Perfect for migrating content or locking layouts.
                  </p>
                  <button
                    onClick={exportConfig}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold py-2.5 px-4 rounded text-center text-xs uppercase tracking-widest cursor-pointer transition-colors duration-300"
                  >
                    Export JSON Schema
                  </button>
                </div>

                {/* Import */}
                <div className="bg-charcoal-800/40 border border-charcoal-850 p-6 rounded-lg space-y-4">
                  <span className="text-2xl">📂</span>
                  <h3 className="font-display text-cream-50 text-base font-semibold">Import Layout JSON</h3>
                  <p className="text-2xs text-cream-200 opacity-70 leading-normal">
                    Load a previously exported layout JSON configuration file to instantly restore headers, imagery links, reviews, and package pricing structures.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-charcoal-800 hover:bg-charcoal-700 text-cream-200 font-bold py-2.5 px-4 rounded text-center text-xs uppercase tracking-widest border border-charcoal-700 cursor-pointer transition-colors duration-300"
                  >
                    Import JSON Schema
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    className="hidden"
                  />
                </div>

                {/* Factory Reset */}
                <div className="bg-charcoal-800/40 border border-charcoal-850 p-6 rounded-lg space-y-4">
                  <span className="text-2xl">🔄</span>
                  <h3 className="font-display text-cream-50 text-base font-semibold">Revert to Defaults</h3>
                  <p className="text-2xs text-cream-200 opacity-70 leading-normal">
                    Wipe local changes (stored in client LocalStorage) and restore the default elegant brand copy and default configuration.
                  </p>
                  <button
                    onClick={resetToDefault}
                    className="w-full bg-red-950/45 hover:bg-red-900/60 border border-red-900/30 text-red-200 font-bold py-2.5 px-4 rounded text-center text-xs uppercase tracking-widest cursor-pointer transition-colors duration-300"
                  >
                    Reset System Configuration
                  </button>
                </div>

              </div>

              {/* Developer info */}
              <div className="bg-charcoal-950/80 border border-charcoal-850 p-6 rounded-lg space-y-3">
                <span className="bg-gold-500/10 text-gold-400 border border-gold-500/20 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded font-bold inline-block">
                  Developer Readme Note
                </span>
                <p className="text-xs text-cream-200 opacity-80 leading-relaxed">
                  To lock in your custom website content permanently so that new visitors see your configured layouts by default, replace the default object in <code className="bg-charcoal-800 text-gold-300 px-1 py-0.5 rounded">src/data/wedding-planner/defaultData.ts</code> with the exported JSON payload.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
