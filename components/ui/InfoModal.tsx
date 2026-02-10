'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export default function InfoModal({ isOpen, onClose, title, description }: InfoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Immediate open
      setVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Immediate close logic
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!mounted) return null;

  // We strictly use Portal to ensure it overlays everything
  return createPortal(
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center p-4 transition-all duration-200 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-sm bg-background border border-primary/20 rounded-3xl p-6 shadow-2xl transform transition-all duration-200 ease-out ${visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-[0.98] opacity-0 translate-y-2'
          }`}
        style={{
          boxShadow: '0 0 40px rgba(0,0,0,0.5)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-sm">💡</span>
          </div>
          {title}
        </h3>

        {/* Description */}
        <p className="text-primary/80 text-sm leading-relaxed whitespace-pre-line mb-6">
          {description}
        </p>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-muted hover:bg-muted/80 border border-primary/30 text-primary font-semibold text-sm transition-all active:scale-95 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        >
          Got it
        </button>
      </div>
    </div>,
    document.body
  );
}
