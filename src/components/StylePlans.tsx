import React, { useState, useRef, useEffect } from 'react';
import { StylePlan } from '../types';
import { STYLE_PLANS } from '../data/mockData';

interface StylePlansProps {
  onSelectPlan: (plan: StylePlan, isAnnual: boolean) => void;
}

export const StylePlans: React.FC<StylePlansProps> = ({ onSelectPlan }) => {
  // Center on ₹999/mo (Insider) plan by default
  const defaultIdx = STYLE_PLANS.findIndex((p) => p.id === 'insider' || p.monthlyPrice === '999');
  const initialIdx = defaultIdx >= 0 ? defaultIdx : 0;

  const [activeMobileIdx, setActiveMobileIdx] = useState(initialIdx);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Center ₹999/mo plan properly on mobile on initial load and resize
  useEffect(() => {
    const centerDefaultCard = () => {
      if (window.innerWidth < 768 && mobileTrackRef.current) {
        const container = mobileTrackRef.current;
        const cards = Array.from(container.children) as HTMLElement[];
        const targetCard = cards[initialIdx];
        if (targetCard) {
          const targetScroll =
            targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
          container.scrollTo({
            left: targetScroll,
            behavior: 'auto',
          });
          setActiveMobileIdx(initialIdx);
        }
      }
    };

    centerDefaultCard();
    const rafId = requestAnimationFrame(centerDefaultCard);
    const timer = setTimeout(centerDefaultCard, 60);
    window.addEventListener('resize', centerDefaultCard);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', centerDefaultCard);
    };
  }, [initialIdx]);

  const handleMobileScroll = () => {
    const container = mobileTrackRef.current;
    if (!container) return;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = Array.from(container.children) as HTMLElement[];

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setActiveMobileIdx(closestIdx);
  };

  const scrollToMobileCard = (idx: number) => {
    const container = mobileTrackRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards[idx]) {
      const card = cards[idx];
      const targetScroll =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      mobileTrackRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setActiveMobileIdx(idx);
    }
  };

  return (
    <section
      id="plans"
      className="relative z-30 min-h-0 md:min-h-[100dvh] py-8 sm:py-16 lg:py-20 bg-[#B88F58] text-[#1A1817] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-6 mb-4 sm:mb-10">
          <div>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#2E2419] uppercase mb-0.5 sm:mb-1">
              STYLE PLANS
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.08] uppercase">
              <span className="block">
                <span className="font-['Cinzel'] font-bold text-[#1A1817]">STYLE FOR EVERYONE.</span>
              </span>
              <span className="block mt-0.5 sm:mt-1">
                <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-white">JOIN THE CLUB FOR MORE.</span>
              </span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#2E2419] text-xs sm:text-[15px] font-sans-body font-normal leading-relaxed">
              Every plan ships AI-styled looks with instant shopping links — Insider and Icon add a real stylist.
            </p>
          </div>
        </div>

        {/* 3 Plans: Centered Horizontal Carousel on Mobile (<md), 3-Column Grid on Tablet/Desktop (md+) */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 items-stretch overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory no-scrollbar scrollbar-none pb-2 md:pb-0 -mx-4 sm:-mx-6 md:mx-0 px-[10vw] xs:px-[12vw] sm:px-[15vw] md:px-0 pt-4 sm:pt-6 max-w-6xl mx-auto"
        >
          {STYLE_PLANS.map((plan) => {
            const isInsider = plan.isDark || plan.id === 'insider';

            if (isInsider) {
              return (
                <div
                  key={plan.id}
                  id={`pricing-card-${plan.id}`}
                  className="relative rounded-[24px] sm:rounded-[30px] bg-[#181716] text-white p-6 sm:p-7 lg:p-8 flex flex-col justify-between border-2 border-[#C5A880]/40 transition-all duration-300 shrink-0 w-[80vw] xs:w-[76vw] sm:w-[320px] md:w-auto snap-center mt-3 md:mt-0 md:-translate-y-2 lg:-translate-y-3 z-10"
                >
                  {/* MOST POPULAR Badge Tab on top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#181716] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] px-4 py-1 sm:px-5 sm:py-1 rounded-full z-20 whitespace-nowrap border border-[#FAF9F7]/20">
                    MOST POPULAR
                  </div>

                  <div>
                    {/* Tier Eyebrow */}
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#D48360] mb-2 sm:mb-3 pt-1">
                      {plan.tier}
                    </div>

                    {/* Plan Name */}
                    <h3 className="font-sans-body text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {plan.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-[13px] text-[#A89E93] mt-0.5 mb-3 sm:mb-4">
                      {plan.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mt-1 sm:mt-2 mb-4 sm:mb-6 flex items-baseline gap-1">
                      <span className="font-sans-body text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight">
                        ₹{plan.monthlyPrice}
                      </span>
                      <span className="text-xs sm:text-sm text-[#A89E93] font-medium">
                        /mo
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8 border-t border-white/10 pt-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#E5DCD2] font-sans-body leading-snug">
                          <span className="text-[#C5A880] font-bold text-sm shrink-0 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* High-visibility Primary CTA Button */}
                  <button
                    type="button"
                    id={`select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan, false)}
                    className="w-full text-center bg-[#C5A880] hover:bg-[#D4B890] active:bg-[#B59870] text-[#181716] font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer mt-auto"
                  >
                    {plan.ctaText}
                  </button>
                </div>
              );
            }

            // White Cards (Explorer, Icon)
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className="relative rounded-[24px] sm:rounded-[30px] bg-white text-[#1A1817] p-6 sm:p-7 lg:p-8 flex flex-col justify-between border border-black/5 transition-all duration-300 shrink-0 w-[80vw] xs:w-[76vw] sm:w-[320px] md:w-auto snap-center mt-3 md:mt-0"
              >
                <div>
                  {/* Tier Eyebrow */}
                  <div
                    className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold mb-2 sm:mb-3 pt-1 ${
                      plan.id === 'icon' ? 'text-[#C56247]' : 'text-[#857C74]'
                    }`}
                  >
                    {plan.tier}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-sans-body text-2xl sm:text-3xl font-extrabold text-[#1A1817] tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-[13px] text-[#7A7169] mt-0.5 mb-3 sm:mb-4">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="mt-1 sm:mt-2 mb-4 sm:mb-6 flex items-baseline gap-1">
                    <span className="font-sans-body text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1A1817] tracking-tight">
                      ₹{plan.monthlyPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-[#7A7169] font-medium">
                      /mo
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8 border-t border-black/5 pt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#524B44] font-sans-body leading-snug">
                        <span className="text-[#857C74] font-bold text-sm shrink-0 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  type="button"
                  id={`select-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan, false)}
                  className="w-full text-center bg-[#1A1817] hover:bg-[#2C2825] active:bg-black text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer mt-auto"
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll Indicator Dots (< md) */}
        <div className="flex md:hidden items-center justify-between mt-4 px-2 max-w-sm mx-auto">
          <div className="flex items-center gap-1.5">
            {STYLE_PLANS.map((plan, idx) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`Scroll to plan ${plan.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileIdx === idx ? 'w-6 bg-[#181716]' : 'w-2 bg-[#181716]/30'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2E2419]">
            {STYLE_PLANS[activeMobileIdx]?.name?.toUpperCase()} • ₹{STYLE_PLANS[activeMobileIdx]?.monthlyPrice}/MO
          </span>
        </div>

      </div>
    </section>
  );
};

export default StylePlans;
