import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, LogIn, User as UserIcon } from 'lucide-react';
import hoyLogo from '../assets/HOY Logo.avif';
import { useAuth } from '../context/AuthContext';
import { getLenis } from '../lib/lenis';

export const Header = ({
  onOpenQuiz,
  onNavigateSection,
  activeSectionIndex = 0,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, user, openAuthModal, startOnboarding } = useAuth();

  // Dynamic header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check lenis instance if available
    const lenis = getLenis();
    const handleLenisScroll = (e) => {
      setIsScrolled(e.scroll > 40);
    };

    if (lenis) {
      lenis.on('scroll', handleLenisScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleLenisScroll);
      }
    };
  }, []);

  const navLinks = [
    { name: 'How It Works', sectionIndex: 1 },
    { name: 'Generated Looks', sectionIndex: 2 },
    { name: 'Motion', sectionIndex: 3 },
    { name: 'About', sectionIndex: 4 },
    { name: 'Pricing', sectionIndex: 5 },
  ];

  const handleNavClick = (sectionIndex) => {
    setIsMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionIndex);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#EAE3DA]/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick(0)}
          >
            <img
              src={hoyLogo}
              alt="HOY - House of You"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((link) => {
              const isActive = activeSectionIndex === link.sectionIndex;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.sectionIndex)}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#1A1817]'
                      : 'text-[#5C534D] hover:text-[#1A1817]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Action Group */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Direct Sign-In Button on Desktop */}
            {!isAuthenticated ? (
              <button
                id="header-signin-btn"
                onClick={openAuthModal}
                className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#332E2A] text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={startOnboarding}
                className="inline-flex items-center gap-2 bg-white border border-[#E0D6CB] hover:border-[#B88F58] text-[#1A1817] text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#B88F58]" />
                <span className="max-w-[100px] truncate">{user?.phoneNumber || 'My Twin'}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu & Sign-In */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={openAuthModal}
              className="inline-flex items-center justify-center whitespace-nowrap bg-[#1A1817] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-2 rounded-full cursor-pointer leading-none"
            >
              <span>Sign In</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-[#1A1817] hover:bg-[#EAE3DA]/60 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#EAE3DA] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.sectionIndex)}
                className={`text-left text-xs font-semibold tracking-widest uppercase px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  activeSectionIndex === link.sectionIndex
                    ? 'bg-[#EAE3DA]/70 text-[#1A1817]'
                    : 'text-[#6E645D] hover:text-[#1A1817] hover:bg-[#EAE3DA]/30'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#EAE3DA] flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAuthModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1817] text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-full cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#C5A880]" />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenQuiz) onOpenQuiz();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-full cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult Stylist</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
