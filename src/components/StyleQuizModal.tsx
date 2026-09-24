import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ArrowLeft, CheckCircle2, UserCheck, Heart } from 'lucide-react';
import { STYLE_PLANS } from '../data/mockData';
import { StylePlan } from '../types';

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
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      className="fixed inset-0 z-[10000] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={handleReset}
    >
      <div
        id="style-quiz-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quiz-modal-btn"
          onClick={handleReset}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer"
          aria-label="Close Style Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] mb-1">
                Personal Style Consultation
              </div>
              <h3 id="quiz-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                {step === 1 && 'Which occasions do you dress for most?'}
                {step === 2 && 'Choose your primary style aesthetic'}
                {step === 3 && 'Select your ideal silhouette & palette'}
              </h3>
              <p className="text-xs text-[#6E645D] font-sans-body mt-1">
                Our editorial team tailors your capsules to match these dimensions.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#EAE2D8] h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Step 1: Occasions Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider">
                  Select all that apply:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Office', desc: 'Boardrooms, Smart Business, Creative Studios' },
                    { name: 'Date Night', desc: 'Intimate Dinners, Wine Bars, Evening Galas' },
                    { name: 'Brunch', desc: 'Weekend Cafés, Gallery Strolls' },
                    { name: 'Weekend', desc: 'Effortless Leisure, City Errands' },
                    { name: 'Wedding', desc: 'Formal Guest, Receptions, Destination' },
                    { name: 'Travel', desc: 'Resort Wear, Transit Layering' }
                  ].map((occ) => {
                    const isSelected = occasions.includes(occ.name);
                    return (
                      <button
                        key={occ.name}
                        type="button"
                        onClick={() => handleOccasionToggle(occ.name)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#C5A880] ring-2 ring-[#C5A880]/40 shadow-xs'
                            : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif-display font-bold text-sm text-[#1A1817]">
                            {occ.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#B85D43]" />}
                        </div>
                        <span className="text-[10px] text-[#7A6F66]">
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
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider">
                  Select the visual tone that resonates most:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { name: 'Minimalist Chic', desc: 'Clean lines, neutral palette, architectural silhouettes, timeless elegance.' },
                    { name: 'Modern Classic', desc: 'Polished British tailoring, crisp shirting, refined heritage textures.' },
                    { name: 'Warm Mediterranean', desc: 'Terracotta, organic linen, breezy silk, relaxed effortless drape.' },
                    { name: 'Contemporary Monochrome', desc: 'Sharp contrast, high-fashion proportions, structured outerwear.' }
                  ].map((item) => {
                    const isSelected = aesthetic === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setAesthetic(item.name)}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#C5A880] ring-2 ring-[#C5A880]/40 shadow-xs'
                            : 'bg-white border-[#EAE2D8] hover:border-[#D6C8B8]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif-display font-bold text-base text-[#1A1817]">
                            {item.name}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#B85D43]" />}
                        </div>
                        <p className="text-xs text-[#7A6F66]">
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
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2">
                    Preferred Palette:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Warm Neutrals & Terracotta', colors: ['#FAF5EE', '#C5A880', '#B85D43', '#2C221D'] },
                      { name: 'Monochrome & Charcoal', colors: ['#FFFFFF', '#B0A8A0', '#4A4540', '#121110'] },
                      { name: 'Earth Tones & Olive', colors: ['#EADBCE', '#8C7A6B', '#5A624E', '#2B2620'] }
                    ].map((p) => {
                      const isSelected = palette === p.name;
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setPalette(p.name)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#C5A880] ring-2 ring-[#C5A880]/40'
                              : 'bg-white border-[#EAE2D8]'
                          }`}
                        >
                          <div className="flex items-center gap-1 mb-2">
                            {p.colors.map((c, i) => (
                              <span key={i} className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#1A1817] block">
                            {p.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider mb-2">
                    Preferred Silhouette:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Tailored & Fluid', 'Structured & Oversized', 'Body-Skimming & Columnar', 'Relaxed & Breathable'].map((sil) => {
                      const isSelected = silhouette === sil;
                      return (
                        <button
                          key={sil}
                          type="button"
                          onClick={() => setSilhouette(sil)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected ? 'bg-white border-[#C5A880] ring-2 ring-[#C5A880]/40' : 'bg-white border-[#EAE2D8]'
                          }`}
                        >
                          <span className="text-xs font-bold text-[#1A1817]">{sil}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#B85D43]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-[#EAE2D8] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#665D56] hover:text-[#1A1817] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-white text-xs font-semibold tracking-widest uppercase px-7 py-3 rounded-full shadow-sm cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Generate My Style Profile</span>
                </button>
              )}
            </div>
          </div>
        ) : showPlans ? (
          /* Plan Selection View inside Modal showing ₹499 and ₹999 plans */
          <div className="py-2 space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-start border-b border-[#EAE2D8] pb-3">
              <button
                type="button"
                onClick={() => setShowPlans(false)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6B] hover:text-[#1A1817] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Capsule Profile</span>
              </button>
            </div>

            <div className="text-center max-w-md mx-auto">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                Select Your Style Plan
              </h3>
              <p className="mt-1 text-xs text-[#665D56] font-sans-body">
                Curated for your {aesthetic} capsule with Yashika (Lead Editorial Stylist).
              </p>
            </div>

            {/* Plans Grid: ₹499 and ₹999 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-1">
              {/* ₹499 Explorer Plan */}
              <div className="bg-white rounded-[24px] p-6 border border-[#E0D7CC] flex flex-col justify-between text-left transition-all">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#857C74] mb-1">
                    OPEN TO EVERYONE
                  </div>
                  <h4 className="text-xl font-extrabold text-[#1A1817]">Explorer</h4>
                  <p className="text-xs text-[#7A7169] mt-0.5 mb-2.5">
                    For regular outfit updates
                  </p>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl font-black text-[#1A1817]">₹499</span>
                    <span className="text-xs text-[#7A7169]">/mo</span>
                  </div>

                  <ul className="space-y-2.5 border-t border-black/5 pt-3 my-4 text-xs text-[#524B44]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#857C74] font-bold shrink-0">✓</span>
                      <span>50 looks with shopping links</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#857C74] font-bold shrink-0">✓</span>
                      <span>Style from your own wardrobe</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  id="modal-select-explorer-btn"
                  onClick={() => {
                    const explorerPlan = STYLE_PLANS.find((p) => p.id === 'explorer');
                    handleReset();
                    onPlanSelect(explorerPlan);
                  }}
                  className="w-full text-center bg-[#1A1817] hover:bg-[#2C2825] active:bg-black text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer mt-auto"
                >
                  CHOOSE EXPLORER
                </button>
              </div>

              {/* ₹999 Insider Plan (Most Popular) */}
              <div className="relative bg-[#181716] text-white rounded-[24px] p-6 border-2 border-[#C5A880]/40 flex flex-col justify-between text-left transition-all mt-3 sm:mt-0">
                {/* Most Popular Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C5A880] text-[#181716] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.22em] px-4 py-1 rounded-full whitespace-nowrap border border-[#FAF9F7]/20">
                  MOST POPULAR
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#D48360] mb-1">
                    YASHIKA'S CLUB
                  </div>
                  <h4 className="text-xl font-extrabold text-white">Insider</h4>
                  <p className="text-xs text-[#A89E93] mt-0.5 mb-2.5">
                    Our most popular club tier
                  </p>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl font-black text-white">₹999</span>
                    <span className="text-xs text-[#A89E93]">/mo</span>
                  </div>

                  <ul className="space-y-2.5 border-t border-white/10 pt-3 my-4 text-xs text-[#E5DCD2]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>100 looks with shopping links</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>Style from your own wardrobe</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#C5A880] font-bold shrink-0">✓</span>
                      <span>Stylist session, monthly</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  id="modal-select-insider-btn"
                  onClick={() => {
                    const insiderPlan = STYLE_PLANS.find((p) => p.id === 'insider');
                    handleReset();
                    onPlanSelect(insiderPlan);
                  }}
                  className="w-full text-center bg-[#C5A880] hover:bg-[#D4B890] active:bg-[#B59870] text-[#181716] font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 px-4 rounded-full transition-all duration-200 cursor-pointer mt-auto"
                >
                  CHOOSE INSIDER
                </button>
              </div>
            </div>

            {/* Footer link to view all plans */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  onPlanSelect();
                }}
                className="text-xs font-semibold text-[#8C7A6B] hover:text-[#1A1817] underline underline-offset-4 cursor-pointer"
              >
                Or view all plans (including Icon • ₹1999) on the page →
              </button>
            </div>
          </div>
        ) : (
          /* Submission Result: Personalized Style Profile */
          <div className="text-center py-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#C5A880] text-[#B85D43] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Curated Profile Ready
              </span>
              <h3 className="font-serif-display text-3xl font-bold text-[#1A1817]">
                Your {aesthetic} Capsule
              </h3>
              <p className="mt-2 text-xs text-[#665D56] font-sans-body max-w-md mx-auto">
                We have paired you with <strong className="text-[#1A1817]">Yashika</strong> (Lead Editorial Stylist) to prepare your initial lookbooks.
              </p>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#ECE4DB] text-left max-w-md mx-auto space-y-2.5 text-xs text-[#524B45]">
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Focus Occasions:</span>
                <span className="font-bold text-[#1A1817]">{occasions.join(', ')}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Aesthetic Archetype:</span>
                <span className="font-bold text-[#1A1817]">{aesthetic}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F2ECE4]">
                <span className="text-[#8C7A6B]">Color Harmony:</span>
                <span className="font-bold text-[#1A1817]">{palette}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A6B]">Silhouette:</span>
                <span className="font-bold text-[#1A1817]">{silhouette}</span>
              </div>
            </div>

            {/* Next Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="quiz-choose-plan-btn"
                onClick={() => setShowPlans(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#B3946B] text-white text-xs font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full shadow-sm cursor-pointer"
              >
                <span>Select Your Style Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="quiz-done-btn"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#7A6F66] hover:text-[#1A1817] cursor-pointer"
              >
                Close & Browse Looks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleQuizModal;
