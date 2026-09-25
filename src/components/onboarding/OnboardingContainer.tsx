import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getLenis } from '../../lib/lenis';
import { ProfileDetailsStep } from './ProfileDetailsStep';
import { PhotoUploadStep } from './PhotoUploadStep';
import { PhotoAnalysisStep } from './PhotoAnalysisStep';
import { AIGenerateLooksStep } from './AIGenerateLooksStep';

interface OnboardingContainerProps {
  onComplete: () => void;
  onExit: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ onComplete, onExit }) => {
  const { isOnboardingActive, onboardingStep, setOnboardingStep } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onExit();
    };
    if (isOnboardingActive && onboardingStep > 0) {
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
  }, [isOnboardingActive, onboardingStep, onExit]);

  if (!isOnboardingActive || onboardingStep === 0) {
    return null;
  }

  const handleNext = () => {
    setOnboardingStep(onboardingStep + 1);
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    } else {
      onExit();
    }
  };

  const handleFinish = () => {
    setOnboardingStep(0);
    onComplete();
  };

  return (
    <div
      id="onboarding-modal-overlay"
      className="fixed inset-0 z-[100000] overflow-y-auto overscroll-contain bg-[#1A1817]/80 backdrop-blur-md p-3 sm:p-6"
    >
      <div className="min-h-full flex items-center justify-center py-3 sm:py-8 w-full max-w-2xl mx-auto">
        <div className="relative w-full my-auto">
          {/* Close / Exit Button */}
          <button
            type="button"
            onClick={onExit}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF5EE] hover:bg-white text-[#1A1817] border border-[#E8E2D9] shadow-md flex items-center justify-center transition-transform hover:scale-105 z-30 cursor-pointer"
            aria-label="Exit onboarding"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Dynamic Step Rendering */}
          {onboardingStep === 1 && (
            <ProfileDetailsStep onNext={handleNext} onCancel={onExit} />
          )}
          {onboardingStep === 2 && (
            <PhotoUploadStep onNext={handleNext} onBack={handleBack} />
          )}
          {onboardingStep === 3 && (
            <PhotoAnalysisStep onNext={handleNext} onBack={handleBack} />
          )}
          {onboardingStep === 4 && (
            <AIGenerateLooksStep onComplete={handleFinish} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;
