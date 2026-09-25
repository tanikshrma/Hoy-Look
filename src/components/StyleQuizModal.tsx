import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ArrowLeft, UserCheck, Mail, ShieldCheck } from 'lucide-react';
import { STYLE_PLANS } from '../data/mockData';
import { StylePlan } from '../types';
import { getLenis } from '../lib/lenis';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelect: (plan?: StylePlan) => void;
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({ isOpen, onClose, onPlanSelect }) => {
  const [step, setStep] = useState(1);
  const [occasions, setOccasions] = useState<string[]>(['Office', 'Date Night']);
  const [aesthetic, setAesthetic] = useState('Minimalist Chic');
  const [palette, setPalette] = useState('Warm Neutrals & Terracotta');
  const [silhouette, setSilhouette] = useState('Tailored & Fluid');
  const [submitted, setSubmitted] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleReset();
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOccasionToggle = (occ: string) => {
    setOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    setShowPlans(false);
    onClose();
  };

  return (
    <div
      id="style-quiz-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        id="style-quiz-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl w-full max-w-[480px] shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-5 sm:p-7 no-scrollbar my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quiz-modal-btn"
          onClick={handleReset}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer shadow-xs"
          aria-label="Close Style Quiz"
        >
          <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-2.5 sm:mb-3 pr-9">
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-[#8C7A6B] mb-0.5">
                PERSONAL STYLE CONSULTATION
              </div>
              <h3 id="quiz-modal-title" className="font-serif-display text-lg sm:text-xl font-bold text-[#1A1817] uppercase tracking-wide leading-tight">
                {step === 1 && 'Which occasions do you dress for most?'}
                {step === 2 && 'Choose your primary style aesthetic'}
                {step === 3 && 'Select your ideal silhouette & palette'}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#EAE2D8] h-1 sm:h-1.5 rounded-full mb-3.5 sm:mb-4 overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Step 1: Occasions Selection */}
            {step === 1 && (
              <div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2.5">
                  SELECT ALL THAT APPLY:
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { name: 'Office', desc: 'Boardrooms & Smart Business' },
                    { name: 'Date Night', desc: 'Intimate Dinners & Galas' },
                    { name: 'Brunch', desc: 'Weekend Cafés & Strolls' },
                    { name: 'Weekend', desc: 'Effortless Leisure & Errands' },
                    { name: 'Wedding', desc: 'Formal Guest & Receptions' },
                    { name: 'Travel', desc: 'Resort Wear & Transit' },
                  ].map((occ) => {
                    const isSelected = occasions.includes(occ.name);
                    return (
                      <button
                        key={occ.name}
                        type="button"
                        onClick={() => handleOccasionToggle(occ.name)}
                        className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[64px] sm:min-h-[70px] ${
                          isSelected
                            ? 'bg-white border-[#C5A880] shadow-xs'
                            : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-serif-display font-bold text-xs sm:text-sm text-[#1A1817] uppercase">
                            {occ.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B85D43]" />}
                        </div>
                        <span className="text-[9.5px] sm:text-[11px] text-[#7A6F66] leading-tight">
                          {occ.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Aesthetic Mood Selection */}
            {step === 2 && (
              <div>
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2.5">
                  SELECT THE VISUAL TONE THAT RESONATES MOST:
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    { name: 'Minimalist Chic', desc: 'Clean lines, neutral palette & architectural cuts.' },
                    { name: 'Modern Classic', desc: 'Polished British tailoring & crisp shirting.' },
                    { name: 'Warm Mediterranean', desc: 'Terracotta, organic linen & relaxed drape.' },
                    { name: 'Contemporary Monochrome', desc: 'Sharp contrast & high-fashion proportions.' },
                  ].map((item) => {
                    const isSelected = aesthetic === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setAesthetic(item.name)}
                        className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[82px] sm:min-h-[92px] ${
                          isSelected
                            ? 'bg-white border-[#C5A880] shadow-xs'
                            : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-serif-display font-bold text-xs sm:text-sm text-[#1A1817] uppercase leading-tight line-clamp-1">
                            {item.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B85D43] shrink-0 ml-1" />}
                        </div>
                        <p className="text-[9.5px] sm:text-[11px] text-[#7A6F66] leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Silhouette & Palette */}
            {step === 3 && (
              <div className="space-y-3 sm:space-y-4">
                {/* Preferred Palette */}
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2">
                    PREFERRED PALETTE:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Warm Neutrals', colors: ['#FAF5EE', '#C5A880', '#B85D43', '#2C221D'] },
                      { name: 'Monochrome', colors: ['#FFFFFF', '#B0A8A0', '#4A4540', '#121110'] },
                      { name: 'Earth & Olive', colors: ['#EADBCE', '#8C7A6B', '#5A624E', '#2B2620'] },
                    ].map((p) => {
                      const isSelected = palette.startsWith(p.name);
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setPalette(p.name === 'Warm Neutrals' ? 'Warm Neutrals & Terracotta' : p.name)}
                          className={`p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer min-h-[56px] sm:min-h-[62px] ${
                            isSelected
                              ? 'bg-white border-[#C5A880] shadow-xs'
                              : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            {p.colors.map((c, i) => (
                              <span
                                key={i}
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-black/10 shrink-0"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-semibold text-[#1A1817] leading-tight">
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Silhouette */}
                <div>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2">
                    PREFERRED SILHOUETTE:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Tailored & Fluid',
                      'Structured & Oversized',
                      'Body-Skimming & Columnar',
                      'Relaxed & Breathable',
                    ].map((sil) => {
                      const isSelected = silhouette === sil;
                      return (
                        <button
                          key={sil}
                          type="button"
                          onClick={() => setSilhouette(sil)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#C5A880] shadow-xs'
                              : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                          }`}
                        >
                          <span className="text-[11px] sm:text-xs font-semibold text-[#1A1817] leading-tight">
                            {sil}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B85D43] shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Bottom Bar */}
            <div className="mt-3.5 sm:mt-5 pt-3 sm:pt-4 border-t border-[#EAE2D8] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#665D56] hover:text-[#1A1817] py-2 px-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>PREVIOUS</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 bg-[#1A1817] hover:bg-[#38312D] text-white text-[11px] sm:text-xs font-semibold tracking-widest uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xs cursor-pointer"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex items-center gap-1.5 bg-[#C5A880] hover:bg-[#B3946B] text-[#181716] text-[11px] sm:text-xs font-bold tracking-widest uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xs cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>GENERATE PROFILE</span>
                </button>
              )}
            </div>
          </div>
        ) : showPlans ? (
          /* Plan Selection View (Image 5) */
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 pr-8">
              <button
                type="button"
                onClick={() => setShowPlans(false)}
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#8C7A6B] hover:text-[#1A1817] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Capsule Profile</span>
              </button>
            </div>

            <div className="text-center my-1.5">
              <h3 className="font-serif-display text-lg sm:text-2xl font-bold text-[#1A1817] uppercase tracking-wide">
                SELECT YOUR STYLE PLAN
              </h3>
              <p className="mt-0.5 text-[11px] sm:text-xs text-[#665D56] font-sans-body">
                Curated for your {aesthetic} capsule with Yashika.
              </p>
            </div>

            {/* Plans Grid: 2 side-by-side cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 my-3 sm:my-4">
              {/* Explorer */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E0D7CC] flex flex-col justify-between text-left">
                <div>
                  <div className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] font-bold text-[#857C74] mb-0.5">
                    OPEN TO ALL
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#1A1817]">Explorer</h4>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-lg sm:text-2xl font-black text-[#1A1817]">₹499</span>
                    <span className="text-[10px] text-[#7A7169]">/mo</span>
                  </div>

                  <ul className="space-y-1.5 border-t border-black/5 pt-2 my-2 text-[10px] sm:text-[11px] text-[#524B44]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#857C74] font-bold shrink-0">✓</span>
                      <span>50 looks with links</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#857C74] font-bold shrink-0">✓</span>
                      <span>From own wardrobe</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const explorerPlan = STYLE_PLANS.find((p) => p.id === 'explorer');
                    handleReset();
                    onPlanSelect(explorerPlan);
                  }}
                  className="w-full text-center bg-[#1A1817] hover:bg-[#2C2825] text-white font-bold text-[9.5px] sm:text-[10.5px] tracking-wider uppercase py-2 sm:py-2.5 px-2 rounded-full transition-all cursor-pointer mt-2"
                >
                  CHOOSE EXPLORER
                </button>
              </div>

              {/* Insider */}
              <div className="relative bg-[#181716] text-white rounded-2xl p-3 sm:p-4 border-2 border-[#C5A880]/60 flex flex-col justify-between text-left">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#181716] text-[8px] sm:text-[8.5px] font-black uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-xs">
                  MOST POPULAR
                </div>

                <div>
                  <div className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] font-bold text-[#D48360] mb-0.5">
                    YASHIKA'S CLUB
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white">Insider</h4>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-lg sm:text-2xl font-black text-white">₹999</span>
                    <span className="text-[10px] text-[#A89E93]">/mo</span>
                  </div>

                  <ul className="space-y-1.5 border-t border-white/10 pt-2 my-2 text-[10px] sm:text-[11px] text-[#E5DCD2]">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>100 looks with links</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>From own wardrobe</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>Stylist session, mo</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const insiderPlan = STYLE_PLANS.find((p) => p.id === 'insider');
                    handleReset();
                    onPlanSelect(insiderPlan);
                  }}
                  className="w-full text-center bg-[#C5A880] hover:bg-[#D4B890] text-[#181716] font-bold text-[9.5px] sm:text-[10.5px] tracking-wider uppercase py-2 sm:py-2.5 px-2 rounded-full transition-all cursor-pointer mt-2"
                >
                  CHOOSE INSIDER
                </button>
              </div>
            </div>

            {/* Link to view all plans */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onPlanSelect();
                }}
                className="text-[11px] sm:text-xs font-semibold text-[#8C7A6B] hover:text-[#1A1817] underline underline-offset-4 cursor-pointer"
              >
                Or view all plans (including Icon • ₹1999) on the page →
              </button>
            </div>
          </div>
        ) : (
          /* Curated Profile Ready View (Image 4) */
          <div className="text-center py-2 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full border border-[#C5A880] text-[#B85D43] flex items-center justify-center mx-auto mb-2.5">
              <Check className="w-6 h-6 text-[#B85D43]" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                CURATED PROFILE READY
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1817] uppercase tracking-wide leading-tight mb-1">
                YOUR {aesthetic.toUpperCase()} CAPSULE
              </h3>
              <p className="text-xs text-[#665D56] font-sans-body mb-3.5">
                Paired with <strong className="text-[#1A1817]">Yashika</strong> (Lead Editorial Stylist).
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#ECE4DB] text-left max-w-md mx-auto space-y-2 text-xs sm:text-[13px] text-[#524B45] mb-4">
              <div className="flex justify-between py-1 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Occasions:</span>
                <span className="font-bold text-[#1A1817]">{occasions.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Aesthetic:</span>
                <span className="font-bold text-[#1A1817]">{aesthetic}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Palette:</span>
                <span className="font-bold text-[#1A1817]">{palette}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8C7A6B]">Silhouette:</span>
                <span className="font-bold text-[#1A1817]">{silhouette}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-2.5">
              <button
                id="quiz-choose-plan-btn"
                onClick={() => setShowPlans(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-[#181716] font-bold text-xs tracking-wider uppercase py-3 sm:py-3.5 px-6 rounded-full shadow-xs cursor-pointer"
              >
                <span>SELECT YOUR STYLE PLAN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="quiz-done-btn"
                onClick={handleReset}
                className="py-1 text-[11px] font-semibold uppercase tracking-wider text-[#7A6F66] hover:text-[#1A1817] cursor-pointer"
              >
                CLOSE & BROWSE LOOKS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleQuizModal;
