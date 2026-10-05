import React from 'react';
import { RotateCcw, BadgeCheck, CalendarX } from 'lucide-react';
import guaranteeBadge from '../assets/luxury-guarantee-seal.png';

interface MoneyBackGuaranteeProps {
  onOpenPricing: () => void;
}

const PROMISES = [
  {
    icon: RotateCcw,
    title: 'Full refund in 30 days',
    text: "Not loving the app? Ask within 30 days of joining and we'll refund your entire payment.",
  },
  {
    icon: BadgeCheck,
    title: 'No questions asked',
    text: 'No forms, no follow-up calls trying to change your mind. One message is all it takes.',
  },
  {
    icon: CalendarX,
    title: 'Cancel anytime',
    text: 'No lock-ins. Pause, switch or cancel your plan whenever you like.',
  },
];

export const MoneyBackGuarantee: React.FC<MoneyBackGuaranteeProps> = ({ onOpenPricing }) => {
  return (
    <section
      id="guarantee"
      className="relative z-40 min-h-0 md:min-h-[100dvh] pt-20 pb-12 sm:py-20 lg:py-24 bg-[#F4EDE3] text-[#1A1817] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Seal + Heading */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <img
              src={guaranteeBadge}
              alt="100% guarantee badge"
              className="w-32 h-32 sm:w-40 sm:h-40 object-contain mb-5 sm:mb-7"
            />

            <p className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-[#B85D43] uppercase mb-1">
              100% MONEY-BACK GUARANTEE
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] tracking-tight leading-[1.08] uppercase">
              <span className="block font-['Cinzel'] font-bold text-[#1A1817]">TRY HOY.</span>
              <span className="block font-['Cinzel'] font-normal tracking-[0.02em] text-[#B68E56]">30-DAY GUARANTEE.</span>
            </h2>
            <p className="mt-3 sm:mt-5 text-xs sm:text-base text-[#524B44] font-sans-body leading-relaxed max-w-md">
              Love the outfits in your HOY app or get every rupee back. If you don't love getting dressed with HOY in 30 days, we'll refund your full payment.
            </p>

            <button
              type="button"
              id="guarantee-choose-plan-btn"
              onClick={onOpenPricing}
              className="group mt-5 sm:mt-8 inline-flex items-center justify-center gap-2.5 bg-[#181716] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase py-3.5 px-8 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span>CHOOSE YOUR PLAN</span>
              <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Promise Cards */}
          <ul className="grid gap-3 sm:gap-4">
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex items-start gap-3.5 sm:gap-5 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-black/5 shadow-[0_6px_20px_rgba(26,24,23,0.06)]"
              >
                <span className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F4EDE3] text-[#B85D43] flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-lg font-extrabold text-[#1A1817] font-sans-body">{title}</h3>
                  <p className="text-xs sm:text-[14px] text-[#665D56] font-sans-body leading-relaxed mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default MoneyBackGuarantee;
