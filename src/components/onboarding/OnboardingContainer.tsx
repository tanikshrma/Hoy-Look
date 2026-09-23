import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PhotoUploadStep } from './PhotoUploadStep';
import { PhotoAnalysisStep } from './PhotoAnalysisStep';
import { ProfileDetailsStep } from './ProfileDetailsStep';
import { AIGenerateLooksStep } from './AIGenerateLooksStep';

interface OnboardingContainerProps {
  onComplete: () => void;
  onExit: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({ onComplete, onExit }) => {
  const { onboardingStep, setOnboardingStep, userProfile, updateUserProfile } = useAuth();
  const [analyzedPhotoUrl, setAnalyzedPhotoUrl] = useState<string | null>(userProfile.photoUrl || null);

  if (onboardingStep === 0) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#FAF9F7] overflow-y-auto animate-in fade-in duration-200">
      
      {/* STEP 1: PHOTO UPLOAD */}
      {onboardingStep === 1 && (
        <PhotoUploadStep
          onContinue={(photoUrl) => {
            setAnalyzedPhotoUrl(photoUrl);
            updateUserProfile({ photoUrl });
            setOnboardingStep(2);
          }}
          onBack={onExit}
        />
      )}

      {/* STEP 2: PHOTO ANALYSIS PROCESSING */}
      {onboardingStep === 2 && analyzedPhotoUrl && (
        <PhotoAnalysisStep
          photoUrl={analyzedPhotoUrl}
          onComplete={(analysisResult) => {
            updateUserProfile({
              age: parseInt(analysisResult.estimatedAgeRange) || 22,
              heightCm: analysisResult.estimatedHeightCm,
              bodyShape: analysisResult.bodyShape,
              skinToneIndex: analysisResult.skinToneIndex,
            });
            setOnboardingStep(3);
          }}
        />
      )}

      {/* STEP 3: PROFILE / BODY DETAILS FORM */}
      {onboardingStep === 3 && (
        <ProfileDetailsStep
          onGenerate={(updatedProfile) => {
            updateUserProfile(updatedProfile);
            setOnboardingStep(4);
          }}
          onChangePhoto={() => setOnboardingStep(1)}
          onBack={() => setOnboardingStep(1)}
        />
      )}

      {/* STEP 4: AI GENERATE LOOKS PROCESSING */}
      {onboardingStep === 4 && (
        <AIGenerateLooksStep
          onComplete={() => {
            onComplete();
          }}
        />
      )}

    </div>
  );
};
