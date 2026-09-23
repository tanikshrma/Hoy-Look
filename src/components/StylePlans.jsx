import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { STYLE_PLANS } from '../data/mockData';

export const StylePlans = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="plans"
      className="relative z-60 min-h-[100dvh] py-16 sm:py-20 md:py-24 bg-[#EDE5DB] text-[#1A1817] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8C7A6B] uppercase mb-1.5">
              MEMBERSHIP PLANS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-none uppercase">
              <span className="font-['Cinzel'] font-bold text-[#1A1817]">STYLE PLANS</span>{' '}
              <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-[#B88F58]">FOR EVERY WARDROBE</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:text-right">
            <p className="text-[#595048] font-sans-body text-xs sm:text-sm">
              Upgrade, pause, or cancel at any time. Every paid tier includes dedicated personal stylist reviews.
            </p>
          </div>
        </div>

        {/* Annual / Monthly Toggle */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div className="bg-[#E4D8CC] p-1 rounded-full flex items-center border border-[#D8C7B6]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                !isAnnual ? 'bg-[#1A1817] text-white shadow-xs' : 'text-[#6E645D] hover:text-[#1A1817]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isAnnual ? 'bg-[#1A1817] text-white shadow-xs' : 'text-[#6E645D] hover:text-[#1A1817]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[9px] bg-[#C5A880] text-[#1A1817] font-bold px-1.5 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLE_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isDark = plan.isDark;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#1A1817] text-[#FAF8F5] shadow-2xl lg:-translate-y-2 border border-[#38312D]'
                    : 'bg-[#FAF8F5] text-[#1A1817] border border-[#E3D9CC] shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#1A1817] text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                        isDark ? 'text-[#C5A880]' : 'text-[#8C7A6B]'
                      }`}
                    >
                      {plan.tier}
                    </span>
                  </div>

                  <h3
                    className={`font-serif-display text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-[#1A1817]'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`text-xs font-sans-body mt-2 leading-relaxed min-h-[36px] ${
                      isDark ? 'text-[#B8AEA3]' : 'text-[#6E645D]'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-6 mb-6 pb-6 border-b border-[#EAE3DA]/30 flex items-baseline gap-1">
                    <span
                      className={`font-serif-display text-4xl font-bold ${
                        isDark ? 'text-white' : 'text-[#1A1817]'
                      }`}
                    >
                      ₹{price}
                    </span>
                    <span
                      className={`text-xs ${
                        isDark ? 'text-[#8C827A]' : 'text-[#8C7A6B]'
                      }`}
                    >
                      /month
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`text-[10px] font-bold tracking-widest uppercase block ${
                        isDark ? 'text-[#8C827A]' : 'text-[#8C7A6B]'
                      }`}
                    >
                      Included in {plan.name}:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isDark ? 'bg-[#2B2420] text-[#C5A880]' : 'bg-[#F0EAE1] text-[#B85D43]'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span
                          className={`text-xs font-sans-body ${
                            isDark ? 'text-[#D9D1C7]' : 'text-[#4A423C]'
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div>
                  <button
                    onClick={() => onSelectPlan(plan, isAnnual)}
                    className={`w-full py-3.5 px-4 rounded-full text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isDark
                        ? 'bg-[#C5A880] hover:bg-[#B3946B] text-[#1A1817] shadow-md'
                        : 'bg-[#1A1817] hover:bg-[#38312D] text-white shadow-xs'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-[#6E645D]">
          <ShieldCheck className="w-4 h-4 text-[#B85D43]" />
          <span>All subscriptions include our 14-day stylist satisfaction guarantee.</span>
        </div>

      </div>
    </section>
  );
};
