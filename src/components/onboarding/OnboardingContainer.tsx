import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
      className="fixed inset-0 z-50 bg-[#1A1817]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-8">
        {/* Close / Exit Button */}
        <button
          type="button"
          onClick={onExit}
          className="absolute -top-4 -right-2 sm:-right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1A1817] shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-20 cursor-pointer"
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
  );
};

export default OnboardingContainer;
