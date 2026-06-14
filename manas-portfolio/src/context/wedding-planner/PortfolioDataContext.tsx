'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, defaultPortfolioData } from '@/data/wedding-planner/defaultData';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  date?: string;
  city?: string;
  service?: string;
  budget?: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Booked' | 'Paid' | 'Cancelled';
  submittedAt: string;
  notes?: string;
  source: string; // e.g. "Quick Enquiry", "Detailed Booking", "Callback Request", "Stripe Checkout"
  paidAmount?: number;
  stripeTxnId?: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  priceQuoted: number;
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid';
  amountPaid: number;
  notes?: string;
}

interface PortfolioDataContextType {
  data: PortfolioData;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  adminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  updateSection: <K extends keyof PortfolioData>(section: K, value: Partial<PortfolioData[K]>) => void;
  resetToDefault: () => void;
  exportConfig: () => void;
  importConfig: (jsonString: string) => boolean;
  
  // CRM / Leads Management
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'submittedAt'> & { status?: Lead['status']; submittedAt?: string }) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;

  // Vendor Management
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (id: string, updatedFields: Partial<Omit<Vendor, 'id'>>) => void;
  deleteVendor: (id: string) => void;

  // Checkout Modal State
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  selectedPackage: any; // ServiceItem type
  setSelectedPackage: (pkg: any) => void;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // CRM & Bookings State
  const [leads, setLeads] = useState<Lead[]>([]);
  // Vendor State
  const [vendors, setVendors] = useState<Vendor[]>([]);
  
  // Stripe Checkout simulation state
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vows_vistas_portfolio_data');
      if (saved) {
        setData(JSON.parse(saved));
      }
      
      const savedLeads = localStorage.getItem('vows_vistas_crm_leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      } else {
        // Seed with sample leads to demonstrate CRM immediately
        const sampleLeads: Lead[] = [
          {
            id: 'lead-1',
            name: 'Pooja Sharma',
            phone: '+91 99887 76655',
            email: 'pooja.sharma@example.com',
            date: '2026-11-20',
            city: 'Udaipur',
            service: 'Full-Service Planning',
            budget: '₹12,00,000 – ₹25,00,000',
            status: 'Proposal Sent',
            submittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
            source: 'Detailed Booking',
            notes: 'Client loves royal pastel decorations. Needs month-of coordinating and catering details.'
          },
          {
            id: 'lead-2',
            name: 'Aditya Roy',
            phone: '+91 98123 45678',
            email: 'aditya.roy@example.com',
            date: '2026-12-15',
            city: 'Dehradun',
            service: 'Theme & Floral Decor',
            budget: '₹5,00,000 – ₹12,00,000',
            status: 'Paid',
            submittedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
            source: 'Stripe Checkout',
            notes: 'Paid booking deposit of ₹50,000 via simulated Stripe Checkout. Package: Royal Palace Elegance.',
            paidAmount: 50000,
            stripeTxnId: 'ch_sim_3N4yHk2eSw'
          },
          {
            id: 'lead-3',
            name: 'Kritika Sen',
            phone: '+91 77665 54433',
            email: 'kritika.s@example.com',
            status: 'New',
            submittedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
            source: 'Callback Request',
            notes: 'Requested urgent callback. Prefers evening call.'
          }
        ];
        setLeads(sampleLeads);
        localStorage.setItem('vows_vistas_crm_leads', JSON.stringify(sampleLeads));
      }
      
      const savedVendors = localStorage.getItem('vows_vistas_vendors');
      if (savedVendors) {
        setVendors(JSON.parse(savedVendors));
      } else {
        // Seed with sample vendors
        const sampleVendors: Vendor[] = [
          {
            id: 'ven-1',
            name: 'Udaipur Royal Florals',
            category: 'Florist',
            contactPerson: 'Rajesh Kumar',
            phone: '+91 94140 12345',
            email: 'rajesh@udaipurflorals.com',
            priceQuoted: 250000,
            paymentStatus: 'Partial',
            amountPaid: 100000,
            notes: 'Provides marigolds, imported roses, and stage drape styling.'
          },
          {
            id: 'ven-2',
            name: 'Gourmet Feast Caterers',
            category: 'Catering',
            contactPerson: 'Sanjay Mehta',
            phone: '+91 98290 54321',
            email: 'sanjay@gourmetfeast.com',
            priceQuoted: 600000,
            paymentStatus: 'Unpaid',
            amountPaid: 0,
            notes: 'Multi-cuisine menu. Draft menu sent for approval.'
          },
          {
            id: 'ven-3',
            name: 'Epic Stories Photography',
            category: 'Photography',
            contactPerson: 'Manish Dev',
            phone: '+91 99100 98765',
            email: 'manish@epicstories.in',
            priceQuoted: 180000,
            paymentStatus: 'Paid',
            amountPaid: 180000,
            notes: 'Includes pre-wedding shoot and cinematic wedding teaser.'
          }
        ];
        setVendors(sampleVendors);
        localStorage.setItem('vows_vistas_vendors', JSON.stringify(sampleVendors));
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when data changes
  const updateSection = <K extends keyof PortfolioData>(section: K, value: Partial<PortfolioData[K]>) => {
    setData((prev) => {
      const updated = {
        ...prev,
        [section]: typeof value === 'object' && !Array.isArray(value)
          ? { ...prev[section] as object, ...value }
          : value
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('vows_vistas_portfolio_data', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset all custom modifications and restore default template settings?')) {
      setData(defaultPortfolioData);
      localStorage.removeItem('vows_vistas_portfolio_data');
      alert('Template data reset successfully.');
    }
  };

  const exportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'portfolioData.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.brandName && parsed.hero && parsed.services) {
        setData(parsed);
        localStorage.setItem('vows_vistas_portfolio_data', JSON.stringify(parsed));
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // CRM / Leads Actions
  const addLead = (lead: Omit<Lead, 'id' | 'status' | 'submittedAt'> & { status?: Lead['status']; submittedAt?: string }) => {
    setLeads(prev => {
      const newLead: Lead = {
        ...lead,
        id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: lead.status || 'New',
        submittedAt: lead.submittedAt || new Date().toISOString()
      };
      const updated = [newLead, ...prev];
      localStorage.setItem('vows_vistas_crm_leads', JSON.stringify(updated));
      return updated;
    });
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, status } : l);
      localStorage.setItem('vows_vistas_crm_leads', JSON.stringify(updated));
      return updated;
    });
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, notes } : l);
      localStorage.setItem('vows_vistas_crm_leads', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead from CRM?')) {
      setLeads(prev => {
        const updated = prev.filter(l => l.id !== id);
        localStorage.setItem('vows_vistas_crm_leads', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearAllLeads = () => {
    if (confirm('Are you sure you want to delete ALL leads from CRM? This cannot be undone.')) {
      setLeads([]);
      localStorage.removeItem('vows_vistas_crm_leads');
    }
  };

  // Vendor Actions
  const addVendor = (vendor: Omit<Vendor, 'id'>) => {
    setVendors(prev => {
      const newVendor: Vendor = {
        ...vendor,
        id: `ven-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
      const updated = [...prev, newVendor];
      localStorage.setItem('vows_vistas_vendors', JSON.stringify(updated));
      return updated;
    });
  };

  const updateVendor = (id: string, updatedFields: Partial<Omit<Vendor, 'id'>>) => {
    setVendors(prev => {
      const updated = prev.map(v => v.id === id ? { ...v, ...updatedFields } : v);
      localStorage.setItem('vows_vistas_vendors', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(prev => {
        const updated = prev.filter(v => v.id !== id);
        localStorage.setItem('vows_vistas_vendors', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        editMode,
        setEditMode,
        adminOpen,
        setAdminOpen,
        updateSection,
        resetToDefault,
        exportConfig,
        importConfig,
        
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        clearAllLeads,

        vendors,
        addVendor,
        updateVendor,
        deleteVendor,

        checkoutOpen,
        setCheckoutOpen,
        selectedPackage,
        setSelectedPackage
      }}
    >
      {isLoaded ? children : <div className="min-h-screen bg-cream-50 flex items-center justify-center font-display text-2xl text-charcoal-900">Loading Vows & Vistas...</div>}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
