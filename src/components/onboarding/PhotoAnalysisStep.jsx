import React, { useEffect, useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import hoyLogo from '../../assets/HOY Logo.avif';
import { photoAnalysisService } from '../../services/photoAnalysisService';

export const PhotoAnalysisStep = ({ photoUrl, onComplete }) => {
  const [currentStatus, setCurrentStatus] = useState('Fetching details from your photo...');
  const [subStatus, setSubStatus] = useState('Estimating your age range...');
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    let isMounted = true;

    const runAnalysis = async () => {
      const steps = [
        { main: 'Fetching details from your photo...', sub: 'Estimating your age range...', progress: 30, delay: 900 },
        { main: 'Analyzing body proportions...', sub: 'Estimating height & shoulder width...', progress: 60, delay: 1000 },
        { main: 'Extracting skin undertone & complexion...', sub: 'Calibrating personal color palette...', progress: 85, delay: 900 },
        { main: 'Finalizing 3D Neural Twin profile...', sub: 'Synthesizing measurements...', progress: 98, delay: 700 },
      ];

      for (const step of steps) {
        if (!isMounted) return;
        setCurrentStatus(step.main);
        setSubStatus(step.sub);
        setProgress(step.progress);
        await new Promise((res) => setTimeout(res, step.delay));
      }

      const result = await photoAnalysisService.analyzePhoto(photoUrl);

      if (isMounted) {
        setProgress(100);
        setTimeout(() => {
          onComplete(result);
        }, 500);
      }
    };

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, [photoUrl, onComplete]);

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#11100F] font-sans-body flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-2 border-b border-[#EAE2D8]/80 mb-6">
        <div className="w-16" />
        <img src={hoyLogo} alt="HOY" className="h-6 sm:h-7 w-auto object-contain" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F0] text-[#C85235] text-[10px] font-bold tracking-widest uppercase border border-[#F8D7D0]">
          AI SCANNING
        </div>
      </header>

      {/* Main Analysis Card */}
      <div className="max-w-md mx-auto w-full my-auto text-center space-y-6">
        <div className="bg-white border border-[#EAE2D8] rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          {/* Scanning Animation Header with Red/Terracotta Icon */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C85235]">
            <div className="size-6 rounded-full bg-[#FDF2F0] flex items-center justify-center border border-[#F8D7D0]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85235] animate-spin" />
            </div>
            <span>PHOTO ANALYSIS IN PROGRESS</span>
          </div>

          {/* User Uploaded Photo Frame with Beam */}
          <div className="relative w-full aspect-[3/3.8] max-w-[260px] mx-auto rounded-3xl overflow-hidden border-2 border-[#E2D8CC] shadow-md bg-black/5">
            <img
              src={photoUrl}
              alt="User uploaded photo"
              className="w-full h-full object-cover filter contrast-[1.03]"
            />

            {/* Terracotta Laser Beam Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#C85235]/20 via-transparent to-transparent animate-pulse pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C85235] shadow-[0_0_15px_#C85235] animate-bounce pointer-events-none" />

            {/* HUD Grid Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#C85235_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
          </div>

          {/* Status Indicators */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-base font-serif-display font-bold text-[#11100F]">
                <Loader2 className="w-4 h-4 animate-spin text-[#C85235]" />
                <span>{currentStatus}</span>
              </div>
              <p className="text-xs text-[#8C7A6B] font-semibold">
                {subStatus}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#EFE9DF] h-2 rounded-full overflow-hidden max-w-xs mx-auto">
              <div
                className="bg-[#C85235] h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-[11px] text-[#8C827A] font-sans-body pt-1">
              This takes about 15-20 seconds — hang tight.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-[#8C827A] py-2">
        HOY Neural Scan Engine v2.4 · Privacy Assured
      </footer>

    </div>
  );
};
