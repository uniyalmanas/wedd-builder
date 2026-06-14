'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, defaultPortfolioData } from '../data/defaultData';

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
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vows_vistas_portfolio_data');
      if (saved) {
        setData(JSON.parse(saved));
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
      // Basic validation check
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
        importConfig
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
