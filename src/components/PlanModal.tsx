import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ClipboardList, ArrowRight, Mail } from 'lucide-react';
import { StylePlan } from '../types';
import { getLenis } from '../lib/lenis';

interface PlanModalProps {
  plan: StylePlan | null;
  isAnnual?: boolean;
  onClose: () => void;
  onOpenQuiz?: () => void;
}

export const PlanModal: React.FC<PlanModalProps> = ({ plan, isAnnual = false, onClose, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleReset();
    };
    if (plan) {
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
  }, [plan]);

  if (!plan) return null;

  const price = isAnnual
    ? Math.round(Number(plan.monthlyPrice) * 0.8)
    : plan.monthlyPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <div
      id="plan-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-modal-title"
      className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        id="plan-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl w-full max-w-[460px] shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-5 sm:p-7 no-scrollbar my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-plan-modal-btn"
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer shadow-xs"
          aria-label="Close Plan Selection"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {!confirmed ? (
          <div>
            {/* Header */}
            <div className="mb-3 sm:mb-4 pr-9">
              <span className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] block mb-0.5">
                BEGIN MEMBERSHIP
              </span>
              <h3 id="plan-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817] uppercase tracking-wide">
                {plan.name}
              </h3>
            </div>

            {/* Price Preview Card */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#ECE4DB] mb-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10.5px] sm:text-xs text-[#554C42] uppercase tracking-wider block font-semibold">
                  BILLING: {isAnnual ? 'ANNUAL' : 'MONTHLY'}
                </span>
                <span className="text-[10px] sm:text-xs text-[#7A6F66]">Cancel or change anytime</span>
              </div>
              <div className="text-right">
                <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                  ₹{price}
                </span>
                <span className="text-[10px] sm:text-xs text-[#8C7A6B]">/month</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1">
                  YOUR FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Yashika"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#D9CDBF] bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="yashika@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 sm:py-3 pr-10 rounded-xl border border-[#D9CDBF] bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C7A6B]">
                    <Mail className="w-4 h-4 text-[#8C7A6B]" />
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
                <span>14-day stylist satisfaction guarantee</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen (Image 7) */
          <div className="text-center py-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full border border-[#C5A880] text-[#B85D43] flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-[#B85D43]" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] block mb-1">
              WELCOME TO HOY
            </span>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1817] uppercase tracking-wide leading-tight mb-2">
              YOUR {plan.name.toUpperCase()} IS ACTIVATED
            </h3>
            <p className="text-xs sm:text-[13px] text-[#665D56] font-sans-body mb-5 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-[#1A1817]">{name || 'valued member'}</strong>! A confirmation email and intake link have been dispatched to <strong className="text-[#1A1817]">{email || 'your email'}</strong>.
            </p>

            <button
              onClick={() => {
                handleReset();
                if (onOpenQuiz) onOpenQuiz();
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-[#181716] font-bold text-xs tracking-wider uppercase py-3 sm:py-3.5 px-6 rounded-full shadow-xs cursor-pointer"
            >
              <ClipboardList className="w-4 h-4" />
              <span>COMPLETE STYLE CONSULTATION</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanModal;
