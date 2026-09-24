import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = CURATED_LOOKS.length; // 7 looks
  const maxIndex = Math.max(0, totalSlides - 1);

  // Scroll to specific index programmatically
  const scrollToIndex = useCallback((index: number) => {
    const targetIdx = Math.min(maxIndex, Math.max(0, index));
    setCurrentIndex(targetIdx);

    if (trackRef.current) {
      isProgrammaticScroll.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const firstCard = trackRef.current.firstElementChild as HTMLElement;
      if (firstCard) {
        // Calculate offset based on card width + gap
        const cardWidth = firstCard.getBoundingClientRect().width;
        const computedGap = parseFloat(window.getComputedStyle(trackRef.current).gap || '16');
        const scrollAmount = (cardWidth + computedGap) * targetIdx;

        trackRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }

      // Reset programmatic flag after smooth scroll completes (~400ms)
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  }, [maxIndex]);

  const handlePrev = () => {
    scrollToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  // Listen to manual user scrolling (touch swipe / trackpad)
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !trackRef.current) return;

    const track = trackRef.current;
    const firstCard = track.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const computedGap = parseFloat(window.getComputedStyle(track).gap || '16');
      const step = cardWidth + computedGap;

      if (step > 0) {
        const index = Math.round(track.scrollLeft / step);
        const clampedIndex = Math.min(maxIndex, Math.max(0, index));
        if (clampedIndex !== currentIndex) {
          setCurrentIndex(clampedIndex);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const activeNumberString = String(Math.min(totalSlides, currentIndex + 1)).padStart(2, '0');
  const totalNumberString = String(totalSlides).padStart(2, '0');

  return (
    <section
      id="looks"
      className="relative z-30 min-h-0 md:min-h-[100dvh] py-8 sm:py-16 lg:py-20 bg-[#FCFAF7] text-[#1E1E1E] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-5 sm:mb-10">
          <div>
            <p className="text-[10px] sm:text-[12px] tracking-[0.28em] font-semibold text-[#B88F58] uppercase mb-1">
              SELECTED LOOKS
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] tracking-tight leading-none text-[#11100F]">
              <span className="font-['Cinzel'] font-normal tracking-[0.02em]">STYLED</span>{' '}
              <span className="font-['Cinzel'] font-bold">FOR YOU</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs tracking-widest text-[#8C827A] uppercase font-medium">
            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] font-medium text-[#8C827A]">
              SWIPE TO EXPLORE
            </span>
            <span className="w-8 sm:w-14 h-px bg-[#D6CDC2]" />
            <span className="text-[10px] sm:text-xs font-semibold text-[#5A5047] tracking-wider">
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
            className={`absolute -left-2 sm:-left-6 top-[40%] -translate-y-1/2 z-30 size-9 sm:size-12 rounded-full bg-[#FAF5EE]/95 hover:bg-white text-[#38302A] shadow-md sm:shadow-lg border border-[#E8DFC2] flex items-center justify-center transition-all duration-200 cursor-pointer ${
              currentIndex === 0 ? 'opacity-20 pointer-events-none' : 'hover:scale-105 active:scale-95'
            }`}
            aria-label="Previous looks"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#38302A]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-2 sm:-right-6 top-[40%] -translate-y-1/2 z-30 size-9 sm:size-12 rounded-full bg-[#FAF5EE]/95 hover:bg-white text-[#38302A] shadow-md sm:shadow-lg border border-[#E8DFC2] flex items-center justify-center transition-all duration-200 cursor-pointer ${
              currentIndex >= maxIndex ? 'opacity-20 pointer-events-none' : 'hover:scale-105 active:scale-95'
            }`}
            aria-label="Next looks"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#38302A]" />
          </button>

          {/* Cards Track - Matching standard section padding & horizontal scroll margins */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-3.5 sm:gap-6 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none touch-pan-x -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {CURATED_LOOKS.map((look, idx) => (
              <div
                key={look.id}
                onClick={() => onSelectLook(look)}
                className="group shrink-0 w-[65vw] xs:w-[52vw] sm:w-[38vw] md:w-[28vw] lg:w-[19.2%] snap-start flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Image Frame with Top-Center Alignment */}
                <div className="relative aspect-[3/3.1] sm:aspect-[3/3.85] w-full rounded-[16px] sm:rounded-[24px] overflow-hidden bg-[#EAE2D8] border border-[#E4D9CC] shadow-xs group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104"
                    loading="lazy"
                  />

                  {/* Top Left Number Overlay */}
                  <div className="absolute top-2.5 left-3 sm:top-3.5 sm:left-4 select-none pointer-events-none">
                    <span className="font-serif-display text-xl sm:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                      {look.number || String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Below Image: Pill Badges & Look Title */}
                <div className="mt-2.5 sm:mt-4 space-y-1.5 sm:space-y-2">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                    {(look.tags || [look.occasion.toUpperCase()]).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#DCD3C7] bg-[#FAF8F5] text-[#554C42] text-[9.5px] sm:text-[10.5px] tracking-wider uppercase font-semibold leading-none shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-serif-display text-base sm:text-xl font-normal text-[#1A1817] group-hover:text-[#9E6E38] transition-colors leading-snug truncate">
                    {look.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-5 sm:mt-10 flex items-center justify-center gap-1.5 sm:gap-2">
          {CURATED_LOOKS.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 sm:w-8 bg-[#9E6E38]'
                    : 'w-2 sm:w-5 bg-[#D6CDC2] hover:bg-[#B88F58]/60'
                }`}
                aria-label={`Go to look ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SelectedLooks;
