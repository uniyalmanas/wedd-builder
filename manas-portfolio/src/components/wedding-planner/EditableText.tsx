'use client'
import React, { useRef, useEffect, useState } from 'react';
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'button' | 'a';
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  tagName = 'span'
}) => {
  const { editMode } = usePortfolioData();
  const elementRef = useRef<HTMLElement>(null);
  
  // AI Helper States
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [isMock, setIsMock] = useState(false);

  // Sync content with state if it changes outside
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== value) {
      elementRef.current.innerText = value;
    }
  }, [value]);

  const handleBlur = () => {
    if (elementRef.current) {
      const text = elementRef.current.innerText;
      if (text !== value) {
        onChange(text);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // If it's a single-line element (like span, button, a, h1-h6) and Enter is pressed, blur to save.
    if (['span', 'button', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName) && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const handleAiGenerate = async (type: string) => {
    setAiLoading(true);
    setAiResult('');
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentText: value,
          promptType: type,
          customPrompt: type === 'custom' ? customPrompt : ''
        })
      });
      if (response.ok) {
        const resData = await response.json();
        setAiResult(resData.text || '');
        setIsMock(!!resData.isMock);
      } else {
        setAiResult('Error generating content. Please check API connection.');
      }
    } catch (e) {
      console.error(e);
      setAiResult('Failed to connect to local AI endpoint.');
    }
    setAiLoading(false);
  };

  const handleApplyResult = () => {
    if (aiResult) {
      onChange(aiResult);
      if (elementRef.current) {
        elementRef.current.innerText = aiResult;
      }
      setShowAiHelper(false);
      setAiResult('');
      setCustomPrompt('');
    }
  };

  const Tag = tagName as any;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  const isBlock = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName);
  const wrapperClass = isBlock ? 'relative block group/edit' : 'relative inline-block group/edit';

  return (
    <span className={wrapperClass}>
      <Tag
        ref={elementRef}
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-none border border-dashed border-gold-500/40 hover:border-gold-500/85 bg-gold-500/5 px-1 rounded transition-colors duration-200 cursor-text`}
        title="Click to edit inline"
      />
      
      {/* Floating AI Button (Fades in on hover) */}
      <button
        onClick={() => setShowAiHelper(!showAiHelper)}
        className="absolute -top-6 right-0 bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow-lg opacity-0 group-hover/edit:opacity-100 focus:opacity-100 transition-opacity z-30 flex items-center gap-0.5 cursor-pointer font-sans"
        contentEditable={false}
        suppressContentEditableWarning
      >
        ✨ AI
      </button>

      {/* Floating AI Popover */}
      {showAiHelper && (
        <span 
          className="absolute bottom-full mb-2 right-0 z-40 bg-charcoal-900 border border-gold-500/35 text-cream-200 p-4 rounded shadow-2xl w-64 text-left font-sans block select-none"
          contentEditable={false}
          suppressContentEditableWarning
        >
          <span className="flex items-center justify-between border-b border-charcoal-700 pb-2 mb-3">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wide">✨ Gemini AI Writer</span>
            <button 
              onClick={() => {
                setShowAiHelper(false);
                setAiResult('');
                setCustomPrompt('');
              }}
              className="text-cream-200 hover:text-gold-500 cursor-pointer text-xs"
            >
              ✕
            </button>
          </span>

          {!aiResult && !aiLoading && (
            <span className="space-y-3 block">
              <span className="text-[9px] uppercase tracking-wider text-cream-200 opacity-60 block">Preset Options</span>
              <span className="grid grid-cols-2 gap-1.5 block">
                {[
                  { label: 'Headline', val: 'catchy headline' },
                  { label: 'Luxury Story', val: 'elegant description' },
                  { label: 'Formal Bio', val: 'formal professional tone' },
                  { label: 'Shorten Text', val: 'shorten copy' }
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => handleAiGenerate(opt.val)}
                    className="bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 transition-colors py-1 px-1.5 rounded text-[9px] uppercase font-bold text-center cursor-pointer border border-charcoal-700 text-cream-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </span>

              <span className="h-px bg-charcoal-800 block" />
              
              <span className="space-y-1 block">
                <span className="text-[9px] uppercase tracking-wider text-cream-200 opacity-60 block">Custom instructions</span>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. set in Jaipur, make romantic..."
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded px-2 py-1 text-[10px] text-cream-100 placeholder-charcoal-500 focus:outline-none focus:border-gold-500"
                />
              </span>

              <button
                type="button"
                onClick={() => handleAiGenerate('custom')}
                className="w-full bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold py-1.5 rounded text-[10px] uppercase tracking-wider cursor-pointer text-center block"
              >
                Generate Custom
              </button>
            </span>
          )}

          {aiLoading && (
            <span className="text-center py-4 space-y-2 block">
              <span className="w-5 h-5 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto block" />
              <span className="text-[10px] text-cream-100 block">AI is drafting premium copy...</span>
            </span>
          )}

          {aiResult && !aiLoading && (
            <span className="space-y-3 block">
              <span className="text-[9px] uppercase tracking-wider text-cream-200 opacity-60 block">Draft Preview</span>
              <span className="bg-charcoal-950 p-2.5 rounded border border-charcoal-800 text-[10px] text-cream-100 leading-relaxed max-h-24 overflow-y-auto italic block">
                "{aiResult}"
              </span>
              
              {isMock && (
                <span className="text-[8px] text-gold-400 opacity-70 leading-normal block">
                  💡 Hint: Set GEMINI_API_KEY in .env.local for live content. Showing sandbox lookup.
                </span>
              )}

              <span className="flex gap-2 block">
                <button
                  type="button"
                  onClick={handleApplyResult}
                  className="flex-1 bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-bold py-1 rounded text-[9px] uppercase tracking-wider cursor-pointer text-center block"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setAiResult('')}
                  className="flex-1 bg-charcoal-850 hover:bg-charcoal-800 text-cream-200 font-bold py-1 rounded text-[9px] uppercase tracking-wider cursor-pointer text-center block border border-charcoal-700"
                >
                  Retry
                </button>
              </span>
            </span>
          )}
        </span>
      )}
    </span>
  );
};
