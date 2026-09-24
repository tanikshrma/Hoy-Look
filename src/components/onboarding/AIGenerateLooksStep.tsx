import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GENERATION_STAGES, lookGenerationService } from '../../services/lookGenerationService';
import generateImg from '../../assets/generate.webp';

interface AIGenerateLooksStepProps {
  onComplete: () => void;
}

export const AIGenerateLooksStep: React.FC<AIGenerateLooksStepProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage < GENERATION_STAGES.length) {
        setCurrentStageIdx(stage);
      } else {
        clearInterval(interval);
        if (user?.profile) {
          lookGenerationService.generateLooks(user.profile).then(() => {
            setIsCompleted(true);
          });
        } else {
          setIsCompleted(true);
        }
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [user]);

  const activeStage = GENERATION_STAGES[currentStageIdx] || GENERATION_STAGES[GENERATION_STAGES.length - 1];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 shadow-2xl animate-fade-in text-center">
      {/* Step Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#9E6E38] text-[11px] font-bold tracking-widest uppercase border border-[#E9DEC9] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 4 of 4 • Capsule Synthesis</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1817] font-normal tracking-tight">
          {isCompleted ? 'Wardrobe Capsules Ready!' : 'Synthesizing Your Personal Looks'}
        </h2>
        <p className="text-sm text-[#7A6F66] font-sans-body mt-2 max-w-md mx-auto">
          {isCompleted
            ? 'Your personalized wardrobe capsules have been customized to your fit profile.'
            : activeStage.detail}
        </p>
      </div>

      {/* Synthesis Display */}
      <div className="relative bg-[#1A1817] rounded-2xl p-8 text-white overflow-hidden mb-8 flex flex-col items-center">
        <div className="w-40 h-48 rounded-xl overflow-hidden border border-[#C5A880]/50 relative mb-5 shadow-2xl">
          <img
            src={generateImg}
            alt="Generated capsule preview"
            className="w-full h-full object-cover"
            width="160"
            height="192"
            decoding="async"
          />
          {!isCompleted && (
            <div className="absolute inset-0 bg-[#1A1817]/40 backdrop-blur-[1px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#C5A880] animate-spin" />
            </div>
          )}
        </div>

        {/* Stage list indicators */}
        <div className="w-full max-w-md space-y-2 text-left">
          {GENERATION_STAGES.map((stg, idx) => {
            const isDone = isCompleted || idx < currentStageIdx;
            const isCurrent = !isCompleted && idx === currentStageIdx;
            return (
              <div
                key={stg.id}
                className={`flex items-center justify-between p-2.5 rounded-lg text-xs transition-all ${
                  isDone
                    ? 'bg-white/10 text-[#EADFD0]'
                    : isCurrent
                    ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40'
                    : 'text-white/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isCurrent ? 'bg-[#C5A880] animate-ping' : 'bg-white/20'
                      }`}
                    />
                  )}
                  <span className="font-semibold tracking-wider">{stg.label}</span>
                </div>
                <span className="text-[11px] opacity-75">{isDone ? 'Completed' : isCurrent ? 'Working...' : 'Pending'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Wardrobe CTA */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          disabled={!isCompleted}
          onClick={onComplete}
          className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#1A1817] hover:bg-[#332E2B] disabled:opacity-40 text-white text-xs font-bold uppercase tracking-widest shadow-xl transition-all transform hover:scale-102 cursor-pointer"
        >
          <span>Explore Your Curated Looks</span>
          <ArrowRight className="w-4 h-4 text-[#C5A880]" />
        </button>
      </div>
    </div>
  );
};

export default AIGenerateLooksStep;
