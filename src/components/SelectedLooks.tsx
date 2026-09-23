import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LookCapsule } from '../types';
import { CURATED_LOOKS } from '../data/mockData';

interface SelectedLooksProps {
  onSelectLook: (look: LookCapsule) => void;
  onOpenPlanModal?: () => void;
}

export const SelectedLooks: React.FC<SelectedLooksProps> = ({ onSelectLook }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const totalSlides = CURATED_LOOKS.length; // 7 looks

  // Max index for desktop sliding (shows ~4 to 4.5 cards at once)
  const maxIndex = Math.max(0, totalSlides - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Scroll tracking on mobile or drag
  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.scrollWidth / totalSlides;
      const targetScroll = currentIndex * cardWidth;
      trackRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }, [currentIndex, totalSlides]);

  const activeNumberString = String(Math.min(totalSlides, currentIndex + 1)).padStart(2, '0');
  const totalNumberString = String(totalSlides).padStart(2, '0');

  return (
    <section
      id="looks"
      className="relative z-30 min-h-[100dvh] py-14 sm:py-16 lg:py-20 bg-[#FCFAF7] text-[#1E1E1E] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.12)]"
    >
      {/* Decorative Right Squiggle Wave identical to screenshot */}
      <div
        className="pointer-events-none absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-[70%] max-h-[460px] w-8 sm:w-12 z-20 flex items-center justify-center opacity-80"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full text-[#9E6E38]"
          viewBox="0 0 50 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 25 10 C 5 60, 5 100, 25 140 C 45 180, 45 220, 25 260 C 5 300, 5 340, 25 380 C 45 420, 45 450, 25 470"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        
        {/* Top Header Bar matching attached screenshot */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="text-[11px] sm:text-[12px] tracking-[0.28em] font-semibold text-[#B88F58] uppercase mb-1.5">
              SELECTED LOOKS
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] tracking-tight leading-none text-[#11100F]">
              <span className="font-['Cinzel'] font-normal tracking-[0.02em]">STYLED</span>{' '}
              <span className="font-['Cinzel'] font-bold">FOR YOU</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs tracking-widest text-[#8C827A] uppercase font-medium">
            <span className="text-[11px] tracking-[0.22em] font-medium text-[#8C827A]">
              SCROLL TO EXPLORE
            </span>
            <span className="w-10 sm:w-14 h-px bg-[#D6CDC2]" />
            <span className="text-[11px] sm:text-xs font-semibold text-[#5A5047] tracking-wider">
              [ {activeNumberString} — {totalNumberString} ]
            </span>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute -left-2 sm:-left-6 top-[38%] -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-[#FAF5EE]/95 hover:bg-white text-[#38302A] shadow-lg border border-[#E8DFC2] flex items-center justify-center transition-all duration-200 cursor-pointer ${
              currentIndex === 0 ? 'opacity-25 pointer-events-none' : 'hover:scale-105 active:scale-95'
            }`}
            aria-label="Previous looks"
          >
            <ChevronLeft className="w-5 h-5 text-[#38302A]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-2 sm:-right-6 top-[38%] -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-[#FAF5EE]/95 hover:bg-white text-[#38302A] shadow-lg border border-[#E8DFC2] flex items-center justify-center transition-all duration-200 cursor-pointer ${
              currentIndex >= maxIndex ? 'opacity-25 pointer-events-none' : 'hover:scale-105 active:scale-95'
            }`}
            aria-label="Next looks"
          >
            <ChevronRight className="w-5 h-5 text-[#38302A]" />
          </button>

          {/* Cards Track (Horizontal overflow container with snap) */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: 'smooth' }}
          >
            {CURATED_LOOKS.map((look, idx) => (
              <div
                key={look.id}
                onClick={() => onSelectLook(look)}
                className="group shrink-0 w-[74vw] xs:w-[60vw] sm:w-[38vw] md:w-[28vw] lg:w-[19.2%] snap-start flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Image Frame with Number Overlay */}
                <div className="relative aspect-[3/3.85] w-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#EAE2D8] border border-[#E4D9CC] shadow-xs group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-104"
                    loading="lazy"
                  />

                  {/* Top Left Number Overlay matching screenshot (01, 02, etc.) */}
                  <div className="absolute top-3.5 left-4 select-none pointer-events-none">
                    <span className="font-serif-display text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                      {look.number || String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Below Image: Pill Badges & Look Title */}
                <div className="mt-4 space-y-2">
                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(look.tags || [look.occasion.toUpperCase()]).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-[#DCD3C7] bg-[#FAF8F5] text-[#554C42] text-[10.5px] tracking-wider uppercase font-semibold leading-none shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Look Title */}
                  <h3 className="font-serif-display text-lg sm:text-xl font-normal text-[#1A1817] group-hover:text-[#9E6E38] transition-colors leading-snug">
                    {look.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Pagination Dots / Indicators matching screenshot */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2">
          {CURATED_LOOKS.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 bg-[#9E6E38]'
                    : 'w-4 sm:w-5 bg-[#D6CDC2] hover:bg-[#B88F58]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
