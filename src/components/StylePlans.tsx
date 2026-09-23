import React from 'react';
import { StylePlan } from '../types';
import { STYLE_PLANS } from '../data/mockData';

interface StylePlansProps {
  onSelectPlan: (plan: StylePlan, isAnnual: boolean) => void;
}

export const StylePlans: React.FC<StylePlansProps> = ({ onSelectPlan }) => {
  return (
    <section
      id="plans"
      className="relative z-[60] min-h-[100dvh] py-12 sm:py-16 md:py-20 bg-[#B59157] text-[#1A1817] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <p className="text-[11px] sm:text-xs tracking-[0.22em] font-semibold text-[#2E2419] uppercase mb-2">
              STYLE PLANS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.08] uppercase">
              <span className="block">
                <span className="font-['Cinzel'] font-bold text-[#1A1817]">STYLE FOR EVERYONE.</span>
              </span>
              <span className="block mt-0.5 sm:mt-1">
                <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-white">JOIN THE CLUB FOR MORE.</span>
              </span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#2E2419] text-sm sm:text-[15px] font-sans-body font-normal leading-relaxed">
              Every plan ships AI-styled looks with instant shopping links — Insider and Icon add a real stylist.
            </p>
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {STYLE_PLANS.map((plan) => {
            const isInsider = plan.isDark || plan.id === 'insider';

            if (isInsider) {
              return (
                <div
                  key={plan.id}
                  id={`pricing-card-${plan.id}`}
                  className="relative rounded-[22px] bg-[#181615] text-white p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-[#2D2824] transition-all duration-300 transform hover:-translate-y-1 mt-3 sm:mt-0"
                >
                  {/* MOST POPULAR Badge Tab on top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C99E66] text-[#181615] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] px-4 py-1 rounded-t-md shadow-xs z-20">
                    MOST POPULAR
                  </div>

                  <div>
                    {/* Category Eyebrow */}
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#C85235] mb-3 pt-1">
                      {plan.tier}
                    </div>

                    {/* Plan Name */}
                    <h3 className="font-serif-display text-2xl font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-3 mb-6 flex items-baseline gap-0.5">
                      <span className="font-sans-body text-3xl font-extrabold text-white tracking-tight">
                        ₹{plan.monthlyPrice}
                      </span>
                      <span className="text-xs text-[#A89E93] font-medium">
                        /mo
                      </span>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2.5 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#E5DCD2] font-sans-body">
                          <span className="text-[#D4A774] font-bold text-xs mt-0.5 shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    id={`select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan, false)}
                    className="w-full text-center bg-[#252220] hover:bg-[#322E2B] active:bg-[#181615] text-white font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer border border-white/10 mt-auto"
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
                className="relative rounded-[22px] bg-white text-[#1A1817] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Category Eyebrow */}
                  <div
                    className={`text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold mb-3 ${
                      plan.id === 'icon' ? 'text-[#C85235]' : 'text-[#857B72]'
                    }`}
                  >
                    {plan.tier}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-serif-display text-2xl font-bold text-[#1A1817] tracking-tight">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-3 mb-6 flex items-baseline gap-0.5">
                    <span className="font-sans-body text-3xl font-extrabold text-[#1A1817] tracking-tight">
                      ₹{plan.monthlyPrice}
                    </span>
                    <span className="text-xs text-[#7A7169] font-medium">
                      /mo
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#524B44] font-sans-body">
                        <span className="text-[#857B72] font-bold text-xs mt-0.5 shrink-0">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  id={`select-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan, false)}
                  className="w-full text-center bg-[#181615] hover:bg-[#2B2724] active:bg-black text-white font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-full shadow-xs transition-all duration-200 cursor-pointer mt-auto"
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

