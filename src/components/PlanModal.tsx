import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ClipboardList, ArrowRight } from 'lucide-react';
import { StylePlan } from '../types';

interface PlanModalProps {
  plan: StylePlan | null;
  isAnnual: boolean;
  onClose: () => void;
  onOpenQuiz: () => void;
}

export const PlanModal: React.FC<PlanModalProps> = ({ plan, isAnnual, onClose, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleReset();
    };
    if (plan) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [plan]);

  if (!plan) return null;

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

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
      className="fixed inset-0 z-[10000] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        id="plan-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-lg w-full shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-plan-modal-btn"
          onClick={handleReset}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer"
          aria-label="Close Plan Selection"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Begin Membership
              </span>
              <h3 id="plan-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                {plan.name}
              </h3>
              <p className="text-xs text-[#6E645D] font-sans-body mt-1">
                {plan.description}
              </p>
            </div>

            {/* Price Preview Card */}
            <div className="bg-white rounded-2xl p-4.5 border border-[#ECE4DB] mb-6 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#8C7A6B] uppercase tracking-wider block font-semibold">
                  Billing: {isAnnual ? 'Annual (Save 20%)' : 'Monthly'}
                </span>
                <span className="text-xs text-[#595048]">Cancel or change anytime</span>
              </div>
              <div className="text-right">
                <span className="font-serif-display text-3xl font-bold text-[#1A1817]">
                  ₹{price}
                </span>
                <span className="text-xs text-[#8C7A6B]">/month</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Yashika"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D9CDBF] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D9CDBF] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase py-3.5 rounded-full shadow-sm cursor-pointer"
                >
                  <span>Activate {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7A6B] pt-2">
                <ShieldCheck className="w-4 h-4 text-[#B85D43]" />
                <span>14-day stylist satisfaction guarantee</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#C5A880] text-[#B85D43] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Welcome to HOY
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Your {plan.name} is Activated
              </h3>
              <p className="mt-2 text-xs text-[#665D56] font-sans-body max-w-sm mx-auto">
                Thank you, <strong>{name || 'Member'}</strong>! A confirmation email and stylist intake link have been dispatched to <strong>{email}</strong>.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  handleReset();
                  onOpenQuiz();
                }}
                className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-white text-xs font-semibold tracking-widest uppercase px-7 py-3 rounded-full shadow-sm cursor-pointer"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Complete Style Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanModal;
