import React, { useState, useEffect } from 'react';
import hoyLogo from '../assets/HOY Logo.avif';
import { getLenis } from '../lib/lenis';

interface HeaderProps {
  onOpenQuiz: () => void;
  onNavigateSection?: (index: number) => void;
  activeSectionIndex?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = (scrollYPos?: number) => {
      const currentScroll = typeof scrollYPos === 'number' ? scrollYPos : (window.scrollY || document.documentElement.scrollTop);
      setIsScrolled(currentScroll > 25);
    };

    // Initial check
    checkScroll();

    // Native scroll listener
    const handleScroll = () => checkScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Lenis scroll listener hook
    const lenis = getLenis();
    const handleLenis = (e: { scroll: number }) => {
      checkScroll(e.scroll);
    };

    if (lenis) {
      lenis.on('scroll', handleLenis);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleLenis);
      }
    };
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-b border-[#EBE3DA]/80 py-3 sm:py-3.5'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero-section"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateSection) {
                onNavigateSection(0);
              } else {
                const heroEl = document.getElementById('hero-section');
                if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group flex items-center focus:outline-none py-0.5 cursor-pointer"
            aria-label="HOY Look Home"
          >
            <img
              src={hoyLogo}
              alt="HOY Look"
              className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Action: SIGN IN */}
          <div className="flex items-center gap-3 relative">
            <button
              id="cta-header-auth-btn"
              onClick={onOpenQuiz}
              className="bg-[#111111] hover:bg-[#2B2826] text-white text-xs font-semibold tracking-widest uppercase px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <span>SIGN IN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
