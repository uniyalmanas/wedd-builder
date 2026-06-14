'use client'
import React, { useRef, useEffect } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

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

  const Tag = tagName as any;

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} outline-none border border-dashed border-gold-500/40 hover:border-gold-500/80 bg-gold-500/5 px-1 rounded transition-colors duration-200 cursor-text relative group`}
      title="Click to edit inline"
    />
  );
};
