import React, { useRef, useEffect } from 'react';
import { ArrowDown, LogIn, ChevronRight, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ onOpenQuiz, onExploreClick }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const centerVisualRef = useRef(null);

  const { isAuthenticated, user, openAuthModal, startOnboarding } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1 }
      )
      .fromTo(
        centerVisualRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.7'
      )
      .fromTo(
        [leftCardRef.current, rightCardRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.6'
      );

      // Subtle parallax on scroll
      if (centerVisualRef.current) {
        gsap.to(centerVisualRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative z-10 min-h-[100dvh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-[#FAF8F5] text-[#1A1817]"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8DDD0]/50 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* Editorial Headline Top Section */}
        <div ref={headlineRef} className="text-center pt-2 sm:pt-4 md:pt-6 max-w-4xl mx-auto">
          {/* Top Tagline */}
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#8C7A6B] mb-2 sm:mb-3">
            3D Neural Avatar · Wardrobe Curation · Personal Styling
          </p>

          {/* Main Title matching STYLED FOR YOU style */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#1A1817] leading-[1.08] uppercase">
            <span className="block font-['Cinzel'] font-normal tracking-[0.02em]">STYLED FOR</span>
            <span className="block font-['Cinzel'] font-bold text-[#1A1817]">
              YOU.
            </span>
          </h1>

          {/* Subheading text */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#665D56] font-sans-body max-w-xl mx-auto leading-relaxed">
            See how complete outfits look on your customized 3D body twin before you step out or buy.
          </p>

          {/* CTA Buttons - Sign In trigger */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {!isAuthenticated ? (
              <button
                id="hero-signin-cta-btn"
                onClick={openAuthModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase px-7 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#C5A880]" />
                <span>Sign In</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            ) : (
              <button
                id="hero-onboarding-cta-btn"
                onClick={startOnboarding}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase px-7 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-[#C5A880]" />
                <span>Open 3D Avatar Twin</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            )}

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F0EAE1] hover:bg-[#E5DCCE] text-[#1A1817] text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-full transition-all duration-200 cursor-pointer border border-[#E0D5C7]"
            >
              <span>Explore The Process</span>
            </button>
          </div>
        </div>

        {/* Center Hero Visual Composition */}
        <div className="relative my-4 sm:my-6 md:my-8 flex items-center justify-center">
          
          {/* Left Floating Feature Card (Desktop) */}
          <div
            ref={leftCardRef}
            className="hidden lg:block absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 w-64 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#EAE3DA] shadow-xl z-20"
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C7A6B] block mb-1">
              Virtual Fit Match
            </span>
            <p className="text-xs font-semibold text-[#1A1817]">
              98.4% drape precision across chest, waist & shoulder geometry
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#2E7D32] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
              <span>Tailored Measurements Active</span>
            </div>
          </div>

          {/* Central High-Fashion Portrait Framed Container */}
          <div
            ref={centerVisualRef}
            className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#D6CDC2]"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
              alt="Editorial Haute Couture Styling Look"
              className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
            />

            {/* Subtle Gradient vignette on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

            {/* In-Frame Editorial Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/50 shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6B] block">
                  CAPSULE 04 · RESORT SUITE
                </span>
                <span className="font-serif-display text-sm font-bold text-[#1A1817]">
                  Ivory Double-Breasted Tailoring
                </span>
              </div>
              <button
                onClick={openAuthModal}
                className="w-8 h-8 rounded-full bg-[#1A1817] text-white flex items-center justify-center hover:bg-[#C5A880] transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="View look details"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Floating Feature Card (Desktop) */}
          <div
            ref={rightCardRef}
            className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 w-64 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-[#EAE3DA] shadow-xl z-20 text-right"
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8C7A6B] block mb-1">
              Personalized Palette
            </span>
            <p className="text-xs font-semibold text-[#1A1817]">
              Warm neutral & earthy undertones calibrated for your complexion
            </p>
            <div className="mt-3 flex items-center justify-end gap-1.5">
              <div className="flex -space-x-1">
                <span className="w-3.5 h-3.5 rounded-full bg-[#D4C3B3] border border-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#967259] border border-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#38220F] border border-white" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#634832] border border-white" />
              </div>
              <span className="text-[10px] text-[#6E645D] font-mono">Warm Autumn</span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="text-center pt-2">
          <button
            onClick={onExploreClick}
            className="inline-flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-[#8C7A6B] hover:text-[#1A1817] transition-colors cursor-pointer group"
          >
            <span>Explore The Experience</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
