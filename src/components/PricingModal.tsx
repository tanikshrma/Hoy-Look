import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { StylePlan } from '../types';
import { STYLE_PLANS } from '../data/mockData';
import { getLenis } from '../lib/lenis';

interface PricingModalProps {
  isOpen: boolean;
  /** Plan picked from the pricing section; skips straight to the details step. */
  initialPlan?: StylePlan | null;
  onClose: () => void;
}

type Step = 'plans' | 'details' | 'done';

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, initialPlan = null, onClose }) => {
  const [step, setStep] = useState<Step>(initialPlan ? 'details' : 'plans');
  const [plan, setPlan] = useState<StylePlan | null>(initialPlan);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const lenis = getLenis();
      lenis?.stop();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        lenis?.start();
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChoosePlan = (chosen: StylePlan) => {
    setPlan(chosen);
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('done');
  };

  return (
    <div
      id="pricing-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="pricing-modal-container"
        className={`relative bg-[#FAF8F5] rounded-3xl w-full shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-4 sm:p-6 lg:p-7 no-scrollbar my-auto ${
          step === 'plans' ? 'max-w-[920px]' : 'max-w-[440px]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-pricing-modal-btn"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer shadow-xs"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {step === 'plans' && (
          <div>
            {/* Header */}
            <div className="mb-3 sm:mb-5 pr-10">
              <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] block mb-0.5">
                STYLE PLANS
              </span>
              <h3 id="pricing-modal-title" className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-[#1A1817] uppercase tracking-wide leading-tight">
                Choose your plan
              </h3>
            </div>

            {/* Plans: compact rows on mobile, 3 columns on md+ */}
            <div className="grid gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 md:pt-2">
              {STYLE_PLANS.map((p) => {
                const dark = p.isDark;
                return (
                  <button
                    key={p.id}
                    type="button"
                    id={`pricing-modal-plan-${p.id}`}
                    onClick={() => handleChoosePlan(p)}
                    className={`group relative text-left rounded-2xl md:rounded-3xl p-3.5 sm:p-4 md:p-5 flex md:flex-col gap-3 md:gap-0 items-center md:items-stretch cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                      dark
                        ? 'bg-[#181716] text-white border-2 border-[#C5A880]/60 shadow-lg'
                        : 'bg-white text-[#1A1817] border border-[#ECE4DB] hover:border-[#C5A880]'
                    }`}
                  >
                    {p.isPopular && (
                      <span className="absolute -top-2.5 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 bg-[#C5A880] text-[#181716] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        MOST POPULAR
                      </span>
                    )}

                    <div className="flex-1 min-w-0">
                      <span className={`text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] font-bold block ${dark ? 'text-[#D48360]' : p.id === 'icon' ? 'text-[#C56247]' : 'text-[#857C74]'}`}>
                        {p.tier}
                      </span>
                      <span className={`block text-base sm:text-lg md:text-2xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-[#1A1817]'}`}>
                        {p.name}
                      </span>
                      <ul className={`mt-1 md:mt-3 md:pt-3 md:border-t md:space-y-1.5 text-[10.5px] sm:text-[11.5px] md:text-[12.5px] leading-snug ${dark ? 'md:border-white/10 text-[#E5DCD2]' : 'md:border-black/5 text-[#524B44]'}`}>
                        {p.features.map((f) => (
                          <li key={f} className="inline md:flex md:items-start md:gap-1.5 after:content-['_·_'] last:after:content-none md:after:content-none">
                            <Check className={`hidden md:block w-3.5 h-3.5 shrink-0 mt-0.5 ${dark ? 'text-[#C5A880]' : 'text-[#857C74]'}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="shrink-0 flex flex-col items-end md:items-stretch md:mt-auto md:pt-4">
                      <span className="flex items-baseline gap-0.5 md:mb-3">
                        <span className={`text-xl sm:text-2xl md:text-[32px] font-black tracking-tight ${dark ? 'text-white' : 'text-[#1A1817]'}`}>
                          ₹{p.monthlyPrice}
                        </span>
                        <span className={`text-[10px] sm:text-xs ${dark ? 'text-[#A89E93]' : 'text-[#7A7169]'}`}>/mo</span>
                      </span>
                      <span
                        className={`mt-1 md:mt-0 inline-flex items-center justify-center gap-1 rounded-full text-[9.5px] sm:text-[10.5px] md:text-xs font-extrabold tracking-wider uppercase px-3 py-1.5 md:py-2.5 transition-colors ${
                          dark ? 'bg-[#C5A880] text-[#181716] group-hover:bg-[#D4B890]' : 'bg-[#1A1817] text-white group-hover:bg-[#38312D]'
                        }`}
                      >
                        Choose
                        <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Risk-free guarantee */}
            <div className="mt-3 sm:mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#F0E8DD] px-3 py-2 sm:py-2.5 text-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B85D43] shrink-0" />
              <p className="text-[10.5px] sm:text-[13px] text-[#3D352E] leading-snug">
                <strong className="text-[#1A1817]">100% guarantee: 30-day money-back guarantee.</strong>{' '}
                Not loving it? Get a full refund.
              </p>
            </div>
          </div>
        )}

        {step === 'details' && plan && (
          <div>
            {!initialPlan && (
              <button
                type="button"
                onClick={() => setStep('plans')}
                className="inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-[#8C7A6B] hover:text-[#1A1817] mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All plans
              </button>
            )}

            {/* Header */}
            <div className="mb-3 sm:mb-4 pr-9">
              <span className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] block mb-0.5">
                BEGIN MEMBERSHIP
              </span>
              <h3 id="pricing-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817] uppercase tracking-wide">
                {plan.name}
              </h3>
            </div>

            {/* Price Preview Card */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#ECE4DB] mb-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10.5px] sm:text-xs text-[#554C42] uppercase tracking-wider block font-semibold">
                  {plan.tier}
                </span>
                <span className="text-[10px] sm:text-xs text-[#7A6F66]">Cancel or change anytime</span>
              </div>
              <div className="text-right">
                <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                  ₹{plan.monthlyPrice}
                </span>
                <span className="text-[10px] sm:text-xs text-[#8C7A6B]">/month</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="pricing-name" className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1">
                  YOUR NAME
                </label>
                <input
                  id="pricing-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#D9CDBF] bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label htmlFor="pricing-phone" className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1">
                  PHONE NUMBER
                </label>
                <div className="relative flex items-stretch rounded-xl border border-[#D9CDBF] bg-white focus-within:ring-2 focus-within:ring-[#C5A880] overflow-hidden">
                  <span className="flex items-center px-3 text-xs sm:text-sm font-semibold text-[#554C42] bg-[#F5EFE7] border-r border-[#D9CDBF]">
                    +91
                  </span>
                  <input
                    id="pricing-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    title="Enter a valid 10-digit mobile number"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="flex-1 min-w-0 px-3.5 py-2.5 sm:py-3 pr-10 bg-transparent text-xs sm:text-sm focus:outline-none"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Phone className="w-4 h-4 text-[#8C7A6B]" />
                  </div>
                </div>
              </div>

              <div className="pt-1 sm:pt-1.5">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-bold tracking-widest uppercase py-3 sm:py-3.5 rounded-full shadow-xs cursor-pointer"
                >
                  <span>ACTIVATE {plan.name.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#8C7A6B] pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B85D43]" />
                <span>100% guarantee · 30-day money-back guarantee</span>
              </div>
            </form>
          </div>
        )}

        {step === 'done' && plan && (
          <div className="text-center py-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full border border-[#C5A880] text-[#B85D43] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-[#B85D43]" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] block mb-1">
              WELCOME TO HOY
            </span>
            <h3 id="pricing-modal-title" className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1817] uppercase tracking-wide leading-tight mb-2">
              YOU'RE IN, {name.split(' ')[0].toUpperCase() || 'STYLE STAR'}!
            </h3>
            <p className="text-xs sm:text-[13px] text-[#665D56] font-sans-body mb-5 max-w-sm mx-auto leading-relaxed">
              Your <strong className="text-[#1A1817]">{plan.name}</strong> plan is reserved. Our team will reach out on{' '}
              <strong className="text-[#1A1817]">+91 {phone}</strong> to get you styled.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-[#181716] font-bold text-xs tracking-wider uppercase py-3 sm:py-3.5 px-6 rounded-full shadow-xs cursor-pointer"
            >
              DONE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingModal;
