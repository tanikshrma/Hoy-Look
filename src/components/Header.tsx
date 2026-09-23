import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import hoyLogo from '../assets/HOY Logo.avif';
import { getLenis } from '../lib/lenis';

interface HeaderProps {
  onOpenQuiz: () => void;
  onNavigateSection?: (index: number) => void;
  activeSectionIndex?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz, onNavigateSection, activeSectionIndex }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'Process', href: '#process', sectionIndex: 1 },
    { label: 'Looks', href: '#looks', sectionIndex: 2 },
    { label: 'Motion', href: '#motion', sectionIndex: 3 },
    { label: 'About', href: '#about-hoy', sectionIndex: 4 },
    { label: 'Plans', href: '#plans', sectionIndex: 5 },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionIndex?: number) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateSection && typeof sectionIndex === 'number') {
      onNavigateSection(sectionIndex);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              setMobileMenuOpen(false);
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSectionIndex === link.sectionIndex;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.sectionIndex)}
                  className={`text-xs uppercase tracking-widest font-semibold transition-colors py-1 ${
                    isActive ? 'text-[#1A1817]' : 'text-[#615852] hover:text-[#1A1817]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 relative">
            <button
              id="cta-header-auth-btn"
              onClick={onOpenQuiz}
              className="bg-[#111111] hover:bg-[#2B2826] text-white text-xs font-semibold tracking-widest uppercase px-6 py-2.5 rounded-full shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <span>SIGN IN</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D2825] hover:text-[#B85D43] focus:outline-none transition-colors rounded-lg bg-[#FAF8F5]/80 backdrop-blur-sm sm:bg-transparent"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#FAF8F5] border-b border-[#E8E0D6] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 px-5 pt-3 pb-6 space-y-4"
        >
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.sectionIndex)}
                className="text-sm font-semibold tracking-wider uppercase text-[#3A3430] hover:text-[#B88F58] py-2 border-b border-[#F0EAE1] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              id="cta-mobile-auth-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase bg-[#111111] hover:bg-[#2B2826] text-white shadow-sm cursor-pointer flex items-center justify-center"
            >
              <span>SIGN IN</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

