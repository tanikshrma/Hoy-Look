import React, { useState, useRef } from 'react';
import { StylePlan } from '../types';
import { STYLE_PLANS } from '../data/mockData';

interface StylePlansProps {
  onSelectPlan: (plan: StylePlan, isAnnual: boolean) => void;
}

export const StylePlans: React.FC<StylePlansProps> = ({ onSelectPlan }) => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    if (mobileTrackRef.current) {
      const scrollLeft = mobileTrackRef.current.scrollLeft;
      const cardWidth = mobileTrackRef.current.firstElementChild
        ? (mobileTrackRef.current.firstElementChild as HTMLElement).offsetWidth + 14
        : mobileTrackRef.current.offsetWidth * 0.82;
      if (cardWidth > 0) {
        const index = Math.round(scrollLeft / cardWidth);
        setActiveMobileIdx(Math.min(STYLE_PLANS.length - 1, Math.max(0, index)));
      }
    }
  };

  const scrollToMobileCard = (idx: number) => {
    if (mobileTrackRef.current) {
      const cardWidth = mobileTrackRef.current.firstElementChild
        ? (mobileTrackRef.current.firstElementChild as HTMLElement).offsetWidth + 14
        : mobileTrackRef.current.offsetWidth * 0.82;
      mobileTrackRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
      setActiveMobileIdx(idx);
    }
  };

  return (
    <section
      id="plans"
      className="relative z-[60] min-h-0 md:min-h-[100dvh] py-8 sm:py-16 lg:py-20 bg-[#B88F58] text-[#1A1817] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
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

        {/* 4 Plans: Horizontal Carousel on Mobile (reduces vertical scroll), Grid on Desktop */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 items-stretch overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 pt-3 sm:pt-2"
        >
          {STYLE_PLANS.map((plan) => {
            const isInsider = plan.isDark || plan.id === 'insider';

            if (isInsider) {
              return (
                <div
                  key={plan.id}
                  id={`pricing-card-${plan.id}`}
                  className="relative rounded-[22px] sm:rounded-[28px] bg-[#181716] text-white p-5 sm:p-7 flex flex-col justify-between shadow-2xl border border-[#2E2925] transition-transform duration-300 shrink-0 w-[82vw] xs:w-[75vw] sm:w-auto snap-center mt-2 sm:mt-0"
                >
                  {/* MOST POPULAR Badge Tab on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#181716] text-[9.5px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] px-4 py-0.5 sm:px-5 sm:py-1 rounded-t-lg shadow-sm z-20 whitespace-nowrap">
                    MOST POPULAR
                  </div>

                  <div>
                    {/* Tier Eyebrow */}
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold text-[#D48360] mb-2 sm:mb-3 pt-0.5">
                      {plan.tier}
                    </div>

                    {/* Plan Name */}
                    <h3 className="font-sans-body text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-1 sm:mt-2 mb-4 sm:mb-6 flex items-baseline gap-0.5">
                      <span className="font-sans-body text-2xl sm:text-4xl font-black text-white tracking-tight">
                        ₹{plan.monthlyPrice}
                      </span>
                      <span className="text-xs text-[#A89E93] font-medium">
                        /mo
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#E5DCD2] font-sans-body leading-snug">
                          <span className="text-[#C5A880] font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    id={`select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan, false)}
                    className="w-full text-center bg-[#181716] hover:bg-[#2A2623] active:bg-black text-white font-extrabold text-xs tracking-wider uppercase py-3 sm:py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer border border-white/20 mt-auto shadow-sm"
                  >
                    {plan.ctaText}
                  </button>
                </div>
              );
            }

            // White Cards (Free, Explorer, Icon)
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className="relative rounded-[22px] sm:rounded-[28px] bg-white text-[#1A1817] p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-transform duration-300 shrink-0 w-[82vw] xs:w-[75vw] sm:w-auto snap-center mt-2 sm:mt-0"
              >
                <div>
                  {/* Tier Eyebrow */}
                  <div
                    className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-bold mb-2 sm:mb-3 ${
                      plan.id === 'icon' ? 'text-[#C56247]' : 'text-[#857C74]'
                    }`}
                  >
                    {plan.tier}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-sans-body text-xl sm:text-3xl font-extrabold text-[#1A1817] tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-1 sm:mt-2 mb-4 sm:mb-6 flex items-baseline gap-0.5">
                    <span className="font-sans-body text-2xl sm:text-4xl font-black text-[#1A1817] tracking-tight">
                      ₹{plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-[#7A7169] font-medium">
                      /mo
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#524B44] font-sans-body leading-snug">
                        <span className="text-[#857C74] font-bold text-xs shrink-0 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  id={`select-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan, false)}
                  className="w-full text-center bg-[#1A1817] hover:bg-[#2C2825] active:bg-black text-white font-extrabold text-xs tracking-wider uppercase py-3 sm:py-3.5 px-4 rounded-full shadow-xs transition-all duration-200 cursor-pointer mt-auto"
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll Indicator Dots */}
        <div className="flex sm:hidden items-center justify-between mt-3 px-1">
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
          <span className="text-[10px] font-mono font-bold uppercase text-[#2E2419]">
            {STYLE_PLANS[activeMobileIdx].name} • Swipe →
          </span>
        </div>

      </div>
    </section>
  );
};

export default StylePlans;
