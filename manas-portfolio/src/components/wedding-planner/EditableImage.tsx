'use client'
import React from 'react';
import { usePortfolioData } from '@/context/wedding-planner/PortfolioDataContext';

interface EditableImageProps {
  src: string;
  alt: string;
  onChange: (newSrc: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onChange,
  className = '',
  style
}) => {
  const { editMode } = usePortfolioData();

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newUrl = prompt('Enter the new Image URL (Unsplash, Cloudinary, etc.):', src);
    if (newUrl !== null && newUrl.trim() !== '') {
      onChange(newUrl.trim());
    }
  };

  if (!editMode) {
    return <div className={className} style={{ ...style, backgroundImage: `url('${src}')` }} role="img" aria-label={alt} />;
  }

  return (
    <div className={`relative group/img ${className}`} style={{ ...style, backgroundImage: `url('${src}')` }} role="img" aria-label={alt}>
      <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
        <button
          onClick={handleSwap}
          className="bg-gold-500 hover:bg-gold-600 text-cream-50 font-sans text-2xs uppercase tracking-widest px-4 py-2 rounded shadow-lg transition-transform duration-200 transform scale-95 group-hover/img:scale-100 cursor-pointer"
        >
          📷 Swap Image URL
        </button>
      </div>
    </div>
  );
};
