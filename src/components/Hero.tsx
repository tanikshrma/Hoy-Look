import React, { useEffect, useState, useRef } from 'react';
import { ArrowDown, Briefcase, Coffee, Heart, Sun, Gem } from 'lucide-react';
import hoyLogo from '../assets/HOY Logo.avif';
import style1 from '../assets/style1.webp';
import style2 from '../assets/style2.webp';
import style3 from '../assets/style3.webp';
import style4 from '../assets/style4.webp';
import style5 from '../assets/style5.webp';

interface HeroProps {
  onOpenQuiz: () => void;
  onExploreClick: () => void;
}

interface OccasionItem {
  id: string;
  label: string;
  icon: React.ElementType;
  image: string;
  pillBg: string;
  pillText: string;
  positionClass: string;
  offset: { x: number; y: number };
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onExploreClick }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeOccasionId, setActiveOccasionId] = useState<string>('datenight');
  const [exitingOccasionId, setExitingOccasionId] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const exitingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const occasions: OccasionItem[] = [
    {
      id: 'office',
      label: 'OFFICE',
      icon: Briefcase,
      image: style3,
      pillBg: 'bg-white',
      pillText: 'text-[#181818]',
      positionClass: 'top-[2%] -left-3 sm:-left-6 lg:-left-8',
      offset: { x: -6, y: -6 },
    },
    {
      id: 'brunch',
      label: 'BRUNCH',
      icon: Coffee,
      image: style1,
      pillBg: 'bg-[#181818]',
      pillText: 'text-white',
      positionClass: 'top-[14%] -right-3 sm:-right-6 lg:-right-8',
      offset: { x: 6, y: -4 },
    },
    {
      id: 'datenight',
      label: 'DATE NIGHT',
      icon: Heart,
      image: style4,
      pillBg: 'bg-[#BE7A5B]',
      pillText: 'text-white',
      positionClass: 'top-[42%] -left-4 sm:-left-8 lg:-left-12',
      offset: { x: -8, y: 4 },
    },
    {
      id: 'weekend',
      label: 'WEEKEND',
      icon: Sun,
      image: style5,
      pillBg: 'bg-[#B58E52]',
      pillText: 'text-[#1E120A]',
      positionClass: 'top-[60%] -right-3 sm:-right-6 lg:-right-8',
      offset: { x: 6, y: 6 },
    },
    {
      id: 'wedding',
      label: 'WEDDING',
      icon: Gem,
      image: style2,
      pillBg: 'bg-white',
      pillText: 'text-[#181818]',
      positionClass: 'bottom-[3%] -left-2 sm:-left-5 lg:-left-7',
      offset: { x: -4, y: 8 },
    },
  ];

  // Infinite smooth auto-cycle through occasions every 4 seconds continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOccasionId((currentId) => {
        const currentIndex = occasions.findIndex((o) => o.id === currentId);
        const nextIndex = (currentIndex + 1) % occasions.length;
        
        if (exitingTimeoutRef.current) {
          clearTimeout(exitingTimeoutRef.current);
        }
        setExitingOccasionId(currentId);
        exitingTimeoutRef.current = setTimeout(() => {
          setExitingOccasionId(null);
        }, 1100);

        return occasions[nextIndex].id;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      if (exitingTimeoutRef.current) clearTimeout(exitingTimeoutRef.current);
    };
  }, [occasions]);

  // Smooth scroll parallax progress listener
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const heroHeight = rect.height;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / (heroHeight * 0.85), 0), 1);
        
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const activeIndex = occasions.findIndex((o) => o.id === activeOccasionId);
  const imageTranslateY = scrollProgress * 24;
  const imageScale = 1 + scrollProgress * 0.015;

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative z-10 h-[100dvh] max-h-[100dvh] sm:h-auto sm:min-h-[100dvh] lg:h-[100dvh] lg:max-h-[1080px] flex flex-col justify-between pt-14 xs:pt-16 sm:pt-24 lg:pt-20 pb-2 xs:pb-3 sm:pb-8 overflow-hidden bg-[#FAF9F7]"
    >
      {/* Background HOY Logo Watermark */}
      <div
        className="pointer-events-none absolute left-1/2 lg:left-[48%] top-[56%] lg:top-[45%] -translate-x-1/2 -translate-y-1/2 select-none z-0 max-w-[240px] xs:max-w-[270px] sm:max-w-[320px] w-full opacity-18"
        aria-hidden="true"
      >
        <img
          src={hoyLogo}
          alt=""
          className="w-full h-auto object-contain mix-blend-multiply"
          width="320"
          height="96"
          decoding="async"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex-1 flex flex-col justify-between">
        
        {/* Main Grid: Typography on top in mobile (order-1), Card Carousel below (order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1.5 xs:gap-2.5 lg:gap-6 items-center my-auto flex-1 py-0.5 sm:py-4">
          
          {/* TYPOGRAPHY & DESCRIPTION: Left on desktop (order-1), Top on mobile */}
          <div className="order-1 lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-0.5 sm:mb-0">
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs tracking-[0.24em] font-semibold text-[#8C7A6B] uppercase">
                YOUR STYLE. YOUR STORY. YOUR WAY.
              </span>
            </div>

            {/* Semantic Primary H1 Headline */}
            <h1 className="relative inline-block select-none my-0 sm:my-1">
              <span className="relative z-10 space-y-0 sm:space-y-1 flex flex-col items-center lg:items-start">
                
                {/* Line 1: FASHION */}
                <span className="block font-serif-display font-bold text-[34px] xs:text-[40px] sm:text-7xl lg:text-[82px] xl:text-[96px] leading-[0.88] tracking-tight text-[#11100F]">
                  FASHION
                </span>

                {/* Line 2: LIVES */}
                <span className="block font-serif-display font-light text-[34px] xs:text-[40px] sm:text-7xl lg:text-[82px] xl:text-[96px] leading-[0.88] tracking-tight text-[#B57451]">
                  LIVES
                </span>

                {/* Line 3: IN YOU. in beige highlight block */}
                <span className="block pt-0.5 sm:pt-2.5">
                  <span className="inline-block bg-[#C39E6D] text-[#FAF9F7] px-3.5 py-0.5 sm:px-5 sm:py-1.5 rounded-[3px] font-sans-body font-black text-xl xs:text-2xl sm:text-6xl lg:text-[72px] xl:text-[84px] leading-[0.92] tracking-tight">
                    IN YOU.
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="mt-1 xs:mt-1.5 sm:mt-4 text-[#5A6478] text-[11px] xs:text-xs sm:text-base font-sans-body font-normal leading-snug sm:leading-relaxed max-w-[290px] xs:max-w-xs sm:max-w-md lg:max-w-lg px-2 sm:px-0">
              Outfits picked for your body, your wardrobe, and your day — ready in seconds, no guesswork needed.
            </p>

          </div>

          {/* CARD DECK CAROUSEL: Right on desktop (order-2), Below headline on mobile */}
          <div className="order-2 lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-0 my-0.5 sm:my-1 lg:my-0">
            <div
              className="relative w-full max-w-[205px] xs:max-w-[235px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] aspect-[3/3.75] will-change-transform transition-transform duration-300 ease-out py-0.5 sm:py-4 px-1 sm:px-3"
              style={{
                transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale})`,
              }}
            >
              
              {/* STACKED CARDS CONTAINER */}
              <div 
                className="relative w-full h-full select-none"
              >
                {occasions.map((occ, idx) => {
                  const isExiting = occ.id === exitingOccasionId;
                  const isActive = occ.id === activeOccasionId && !isExiting;
                  const relIndex = (idx - activeIndex + occasions.length) % occasions.length;

                  let zIndex = 0;
                  let transformStyle = '';
                  let opacityStyle = 0;

                  if (isExiting) {
                    zIndex = 40;
                    transformStyle = 'translate3d(112%, -18px, 0) rotate(14deg) scale(0.96)';
                    opacityStyle = 0;
                  } else if (isActive) {
                    zIndex = 30;
                    transformStyle = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
                    opacityStyle = 1;
                  } else if (relIndex === 1) {
                    zIndex = 20;
                    transformStyle = 'translate3d(20px, 8px, 0) rotate(6deg) scale(0.97)';
                    opacityStyle = 0.72;
                  } else if (relIndex === occasions.length - 1) {
                    zIndex = 10;
                    transformStyle = 'translate3d(-20px, 6px, 0) rotate(-6deg) scale(0.95)';
                    opacityStyle = 0.62;
                  } else {
                    zIndex = 5;
                    transformStyle = 'translate3d(0, 12px, 0) rotate(0deg) scale(0.92)';
                    opacityStyle = 0;
                  }

                  return (
                    <div
                      key={occ.id}
                      style={{
                        zIndex,
                        transform: transformStyle,
                        opacity: opacityStyle,
                        transition: 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                      className="absolute inset-0 rounded-[22px] sm:rounded-[36px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.18)] bg-[#E2DCD4] border border-black/5 transform-gpu will-change-transform pointer-events-auto"
                    >
                      <img
                        src={occ.image}
                        alt={`HOY ${occ.label} Styling`}
                        className="w-full h-full object-cover object-[center_18%]"
                        loading="eager"
                        decoding="async"
                        width="380"
                        height="480"
                      />
                    </div>
                  );
                })}
              </div>

              {/* 5 FLOATING BADGE ELEMENTS WITH ICONS */}
              {occasions.map((occ, idx) => {
                const transformX = occ.offset.x * (1 + scrollProgress * 0.4);
                const transformY = occ.offset.y * (1 + scrollProgress * 0.4);
                const IconComponent = occ.icon;

                return (
                  <div
                    key={occ.id}
                    id={`pill-${occ.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    style={{
                      transform: `translate3d(${transformX}px, ${transformY}px, 0)`,
                      animationDelay: `${idx * 0.75}s`,
                    }}
                    className={`absolute ${occ.positionClass} z-50 ${occ.pillBg} ${occ.pillText} animate-float shadow-[0_8px_22px_rgba(0,0,0,0.16)] px-2.5 py-1 sm:px-5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 pointer-events-auto cursor-default select-none font-sans-body font-bold text-[10px] sm:text-xs md:text-sm tracking-wider leading-none uppercase border border-black/5`}
                  >
                    <IconComponent className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0 stroke-[2.2]" />
                    <span>{occ.label}</span>
                  </div>
                );
              })}

            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR (Both Mobile & Desktop) */}
        <div className="pt-1.5 sm:pt-4 pb-1 sm:pb-3 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-6 mt-auto">
          
          {/* Mobile Layout (< sm): Stacked Centered Buttons with clear hierarchy */}
          <div className="flex flex-col items-center gap-1.5 w-full sm:hidden px-2">
            {/* CREATE MY LOOK CTA Button */}
            <button
              type="button"
              id="hero-create-look-btn-mobile"
              onClick={onOpenQuiz}
              className="w-full max-w-[280px] xs:max-w-[310px] inline-flex items-center justify-center gap-2 bg-[#C39E6D] hover:bg-[#B38E5D] active:bg-[#A37E4D] text-[#11100F] text-xs xs:text-[13px] font-bold tracking-widest uppercase py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 cursor-pointer font-sans-body"
            >
              <span>CREATE MY LOOK</span>
              <span className="text-base leading-none">→</span>
            </button>

            {/* SCROLL TO EXPLORE Indicator */}
            <button
              type="button"
              id="hero-scroll-indicator-mobile"
              onClick={onExploreClick}
              className="flex items-center justify-center gap-1.5 group cursor-pointer py-0.5 text-center"
              aria-label="Scroll to explore looks"
            >
              <span className="text-[10px] xs:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#5A6478] group-hover:text-[#11100F] transition-colors font-sans-body">
                SCROLL TO EXPLORE
              </span>
              <ArrowDown className="w-3.5 h-3.5 text-[#5A6478] group-hover:text-[#11100F] transition-all transform group-hover:translate-y-0.5 animate-bounce" />
            </button>
          </div>

          {/* Desktop & Tablet Layout (sm and up) */}
          <div className="hidden sm:flex items-center justify-between w-full">
            {/* Horizontal divider line for desktop */}
            <div className="flex-1 h-[1px] bg-[#D4DCE6] mr-4 lg:mr-8" />

            {/* Action Cluster */}
            <div className="flex items-center justify-end gap-6 lg:gap-8 ml-auto shrink-0">
              {/* CREATE MY LOOK CTA Button */}
              <button
                type="button"
                id="hero-create-look-btn"
                onClick={onOpenQuiz}
                className="inline-flex items-center justify-center gap-2 bg-[#C39E6D] hover:bg-[#B38E5D] active:bg-[#A37E4D] text-[#11100F] text-xs sm:text-sm font-bold tracking-widest uppercase px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 cursor-pointer font-sans-body whitespace-nowrap shrink-0"
              >
                <span>CREATE MY LOOK</span>
                <span className="text-base leading-none shrink-0">→</span>
              </button>

              {/* Vertical Divider */}
              <div className="w-[1px] h-7 bg-[#CBD5E1]" />

              {/* Scroll To Explore Indicator */}
              <button
                type="button"
                id="hero-scroll-indicator"
                onClick={onExploreClick}
                className="flex flex-col items-center justify-center group cursor-pointer py-1 text-center shrink-0"
                aria-label="Scroll to explore looks"
              >
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#5A6478] group-hover:text-[#11100F] transition-colors font-sans-body">
                  SCROLL TO EXPLORE
                </span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5A6478] group-hover:text-[#11100F] transition-all transform group-hover:translate-y-1 mt-0.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

