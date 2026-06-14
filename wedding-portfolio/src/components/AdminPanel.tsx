'use client'
import React, { useRef } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function AdminPanel() {
  const { editMode, setEditMode, adminOpen, setAdminOpen, resetToDefault, exportConfig, importConfig } = usePortfolioData();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  if (!adminOpen) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <div className="bg-charcoal-900 border border-gold-500/30 text-cream-200 p-6 rounded-lg shadow-2xl w-80 max-w-sm transition-all duration-300 animate-fade-in-up">
        <div className="flex items-center justify-between border-b border-charcoal-700 pb-3 mb-4">
          <h3 className="font-display text-cream-50 text-lg font-medium">Control Dashboard</h3>
          <button
            onClick={() => setAdminOpen(false)}
            className="text-cream-200 hover:text-gold-500 transition-colors text-xs font-sans tracking-widest uppercase cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="space-y-5">
          {/* Toggle Edit Mode */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-cream-50 uppercase block">Edit Mode</span>
              <span className="text-2xs text-cream-200 opacity-60 block">Click text to edit inline</span>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                editMode ? 'bg-gold-500' : 'bg-charcoal-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-cream-50 transition-transform duration-300 ${
                  editMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-charcoal-800" />

          {/* Actions list */}
          <div className="space-y-2.5">
            {/* Save / Export JSON */}
            <button
              onClick={exportConfig}
              className="w-full bg-charcoal-800 hover:bg-gold-600 hover:text-cream-50 transition-colors duration-300 py-2.5 px-4 rounded text-left text-xs uppercase tracking-widest border border-charcoal-700 cursor-pointer text-cream-50"
            >
              💾 Export JSON Config
            </button>

            {/* Import JSON */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-charcoal-800 hover:bg-gold-600 hover:text-cream-50 transition-colors duration-300 py-2.5 px-4 rounded text-left text-xs uppercase tracking-widest border border-charcoal-700 cursor-pointer text-cream-50"
            >
              📂 Import JSON Config
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />

            {/* Reset to Default */}
            <button
              onClick={resetToDefault}
              className="w-full bg-red-950/40 hover:bg-red-900/60 text-red-200 transition-colors duration-300 py-2.5 px-4 rounded text-left text-xs uppercase tracking-widest border border-red-900/30 cursor-pointer"
            >
              🔄 Reset to Defaults
            </button>
          </div>

          {/* Helper tips */}
          <div className="bg-charcoal-800 p-3 rounded border border-charcoal-700">
            <p className="text-2xs text-cream-200 leading-normal opacity-70">
              <strong className="text-gold-400">Owner Hint:</strong> Export your configuration after making changes. Then, replace the contents of <code className="text-gold-300 bg-charcoal-900 px-1 py-0.5 rounded">src/data/defaultData.ts</code> with the exported JSON to lock in changes permanently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
