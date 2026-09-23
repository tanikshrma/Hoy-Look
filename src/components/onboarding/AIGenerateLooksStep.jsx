import React, { useEffect, useState } from 'react';
import { Sparkles, Check, Loader2, Cpu, Layers, Activity } from 'lucide-react';
import hoyLogo from '../../assets/HOY Logo.avif';
import { lookGenerationService, GENERATION_STAGES } from '../../services/lookGenerationService';
import { useAuth } from '../../context/AuthContext';

const AI_DIAGNOSTICS_STEPS = [
  { id: 'face', number: '1.', title: 'Scanning your face', detail: 'Detecting facial landmarks, shape & geometry...' },
  { id: 'color', number: '2.', title: 'Scanning your color', detail: 'Analyzing skin undertone, contrast & palette...' },
  { id: 'info', number: '3.', title: 'Extracting information', detail: 'Extracting body measurements, silhouette & drape...' },
  { id: 'process', number: '4.', title: 'Processing', detail: 'Synthesizing 3D Neural Twin & outfit capsules...' },
];

export const AIGenerateLooksStep = ({ onComplete }) => {
  const { userProfile, completeOnboarding } = useAuth();
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const executeGenerationPipeline = async () => {
      for (let i = 0; i < GENERATION_STAGES.length; i++) {
        if (!isMounted) return;
        setCurrentStageIdx(i);
        await new Promise((res) => setTimeout(res, GENERATION_STAGES[i].durationMs));
      }

      await lookGenerationService.generateLooks(userProfile);

      if (isMounted) {
        completeOnboarding();
        onComplete();
      }
    };

    executeGenerationPipeline();

    return () => {
      isMounted = false;
    };
  }, [userProfile, completeOnboarding, onComplete]);

  const activeStep = AI_DIAGNOSTICS_STEPS[currentStageIdx] || AI_DIAGNOSTICS_STEPS[0];

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#11100F] font-sans-body relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300 select-none">
      
      {/* Background Editorial Tech Grid Visuals */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#B88F58_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Subtle Technical HUD Elements */}
        <div className="absolute top-16 left-8 text-[10px] font-mono tracking-widest text-[#8C7A6B] space-y-1 hidden sm:block">
          <p>BIOMETRIC_MESH :: 468_POINTS</p>
          <p>FACIAL_LANDMARKS :: CALIBRATED</p>
          <p>COLOR_DNA_PALETTE :: WARM_NEUTRAL</p>
          <p>BODY_MEASUREMENTS :: SYNCHRONIZED</p>
        </div>

        <div className="absolute bottom-16 right-8 text-[10px] font-mono tracking-widest text-[#8C7A6B] space-y-1 text-right hidden sm:block">
          <p>FABRIC_DRAPE_MATRIX :: ACTIVE</p>
          <p>FIT_MATRIX_SCORE :: 0.988</p>
          <p>OUTFIT_HARMONY_INDEX :: MAXIMUM</p>
          <p>3D_NEURAL_TWIN :: GENERATING</p>
        </div>
      </div>

      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-2 border-b border-[#EAE2D8]/80 relative z-10">
        <img src={hoyLogo} alt="HOY" className="h-6 sm:h-7 w-auto object-contain" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#11100F] text-white text-[10px] font-bold tracking-widest uppercase shadow-xs">
          <Cpu className="w-3.5 h-3.5 text-[#C5A880] animate-spin" />
          <span>NEURAL STYLIST AI</span>
        </div>
      </header>

      {/* Main Center Interface */}
      <main className="max-w-xl mx-auto w-full my-auto relative z-10 py-4">
        <div className="bg-white/95 backdrop-blur-md border border-[#EAE2D8] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-7 text-center">
          
          {/* Top Progress Stages Bar */}
          <div className="grid grid-cols-4 gap-2 border-b border-[#EAE2D8] pb-4">
            {GENERATION_STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStageIdx;
              const isActive = idx === currentStageIdx;
              return (
                <div key={stage.id} className="space-y-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#16A34A]'
                        : isActive
                        ? 'bg-[#B88F58] animate-pulse'
                        : 'bg-[#EAE2D8]'
                    }`}
                  />
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider block truncate ${
                      isActive ? 'text-[#11100F]' : 'text-[#A0958A]'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* User Photo & Styling Preview Frame */}
          <div className="relative size-44 sm:size-52 mx-auto rounded-3xl overflow-hidden border-2 border-[#B88F58]/50 shadow-xl bg-black/5">
            {userProfile.photoUrl ? (
              <img
                src={userProfile.photoUrl}
                alt="Neural Twin Stylist Preview"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#B88F58]">
                <Layers className="w-10 h-10 animate-pulse" />
              </div>
            )}

            {/* Subtle Biometric Landmark Points Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3 pointer-events-none">
              <span className="text-[10px] font-mono text-white/90 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                Landmarks & Drape Matched
              </span>
            </div>

            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-x-0 h-0.5 bg-[#B88F58] shadow-[0_0_12px_#B88F58] animate-bounce pointer-events-none top-1/2" />
          </div>

          {/* Active Step Subtitle Description */}
          <div className="space-y-1.5">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#11100F]">
              {activeStep.detail}
            </h3>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8C7A6B]">
              <Loader2 className="w-4 h-4 animate-spin text-[#B88F58]" />
              <span>Generating your 3D Neural Twin look capsules...</span>
            </div>
          </div>

          {/* AI DIAGNOSTICS Card Checklist */}
          <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl p-4 text-left space-y-2.5 text-xs font-sans-body">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D8]">
              <span className="font-bold uppercase tracking-widest text-[10px] text-[#8C7A6B] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#B88F58]" />
                AI DIAGNOSTICS
              </span>
              <span className="text-[10px] font-bold text-[#B88F58] uppercase">
                {currentStageIdx + 1} OF 4
              </span>
            </div>

            {AI_DIAGNOSTICS_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStageIdx;
              const isActive = idx === currentStageIdx;
              return (
                <div key={step.id} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="w-4 h-4 text-[#B88F58] animate-spin shrink-0" />
                    ) : (
                      <span className="size-2 rounded-full bg-[#D6CFC7] shrink-0 ml-1" />
                    )}
                    <span
                      className={`font-semibold ${
                        isCompleted ? 'text-[#16A34A]' : isActive ? 'text-[#11100F]' : 'text-[#8C827A]'
                      }`}
                    >
                      {step.number} {step.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isCompleted
                        ? 'bg-[#E8F8EE] text-[#16A34A]'
                        : isActive
                        ? 'bg-[#FDF6EA] text-[#B88F58]'
                        : 'bg-[#EFE9DF] text-[#8C827A]'
                    }`}
                  >
                    {isCompleted ? 'COMPLETED' : isActive ? 'ACTIVE' : 'QUEUED'}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#8C827A] py-2 relative z-10">
        Synthesizing high-precision fabric drape & color harmony matrix
      </footer>

    </div>
  );
};
