import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const StyleQuizModal = ({ isOpen, onClose, onPlanSelect }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    occasion: 'Office & Work',
    aesthetic: 'Minimalist Modern',
    silhouette: 'Relaxed Tailoring',
    colors: ['Neutrals & Earth Tones'],
    budget: 'Standard ($200-$500/look)'
  });

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      // Completed quiz
      onPlanSelect();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div
      id="quiz-modal-overlay"
      className="fixed inset-0 z-[10000] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="quiz-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-xl w-full shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quiz-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-semibold text-[#8C7A6B] mb-2">
            <span>Stylist Consultation · Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-[#EAE3DA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A880] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: OCCASION FOCUS */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Primary Goal
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                What occasions are you styling for primarily?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Office & Work', desc: 'Sartorial power dressing & smart casuals' },
                { title: 'Weekend & Casual', desc: 'Effortless daytime leisure styling' },
                { title: 'Date Nights & Galas', desc: 'Evening elegance & statement pieces' },
                { title: 'Travel & Resort', desc: 'Breathable linen & holiday capsules' }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setAnswers({ ...answers, occasion: item.title })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    answers.occasion === item.title
                      ? 'bg-white border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]'
                      : 'bg-white/60 border-[#EAE3DA] hover:border-[#D5C6B1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-[#1A1817]">{item.title}</span>
                    {answers.occasion === item.title && <Check className="w-4 h-4 text-[#B85D43]" />}
                  </div>
                  <p className="text-[11px] text-[#6E645D] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: AESTHETIC PROFILE */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Visual Identity
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Which aesthetic best defines your vision?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Minimalist Modern', desc: 'Clean lines, monochromatic & architectural' },
                { title: 'Classic Tailored', desc: 'Timeless blazers, trousers & crisp shirting' },
                { title: 'Bohemian Luxe', desc: 'Fluid silks, earthy tones & rich textures' },
                { title: 'Elevated Street', desc: 'Modern oversized silhouettes & utility' }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setAnswers({ ...answers, aesthetic: item.title })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    answers.aesthetic === item.title
                      ? 'bg-white border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]'
                      : 'bg-white/60 border-[#EAE3DA] hover:border-[#D5C6B1]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-[#1A1817]">{item.title}</span>
                    {answers.aesthetic === item.title && <Check className="w-4 h-4 text-[#B85D43]" />}
                  </div>
                  <p className="text-[11px] text-[#6E645D] mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SILHOUETTE PREFERENCE */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Cut & Proportions
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Preferred drape and cut preference:
              </h3>
            </div>

            <div className="space-y-2.5 pt-2">
              {[
                { title: 'Relaxed Tailoring', desc: 'Fluid drop shoulders and comfortable wide trousers' },
                { title: 'Sharp Slim Fit', desc: 'Form-accentuating structured cuts and defined waistlines' },
                { title: 'Classic Regular', desc: 'Balanced proportions suited for every daily occasion' }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setAnswers({ ...answers, silhouette: item.title })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    answers.silhouette === item.title
                      ? 'bg-white border-[#C5A880] shadow-sm ring-1 ring-[#C5A880]'
                      : 'bg-white/60 border-[#EAE3DA] hover:border-[#D5C6B1]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#1A1817] block">{item.title}</span>
                    <p className="text-[11px] text-[#6E645D] mt-0.5">{item.desc}</p>
                  </div>
                  {answers.silhouette === item.title && <Check className="w-4 h-4 text-[#B85D43]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: SUMMARY & STYLIST RECOMMENDATION */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block mb-1">
                Consultation Ready
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Your Tailored Style Persona
              </h3>
              <p className="text-xs text-[#6E645D] font-sans-body mt-1">
                Based on your selections, we have matched your aesthetic to our senior stylists.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA] space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0EAE1]">
                <span className="text-[#8C7A6B]">Primary Focus:</span>
                <span className="font-bold text-[#1A1817]">{answers.occasion}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#F0EAE1]">
                <span className="text-[#8C7A6B]">Design Aesthetic:</span>
                <span className="font-bold text-[#1A1817]">{answers.aesthetic}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8C7A6B]">Silhouette:</span>
                <span className="font-bold text-[#1A1817]">{answers.silhouette}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E2D2BC] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#B85D43] shrink-0" />
              <p className="text-xs text-[#5C4A3A] font-sans-body leading-tight">
                Recommended Plan: <strong>Insider Membership</strong> (Weekly looks + monthly 1-on-1 consultations).
              </p>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 pt-4 border-t border-[#EAE3DA] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#6E645D] hover:text-[#1A1817] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <span>{step === totalSteps ? 'View Matched Plans' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
