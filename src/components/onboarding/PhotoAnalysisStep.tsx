import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { photoAnalysisService, PhotoAnalysisResult } from '../../services/photoAnalysisService';
import uploadSample from '../../assets/upload.webp';

interface PhotoAnalysisStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const PhotoAnalysisStep: React.FC<PhotoAnalysisStepProps> = ({ onNext, onBack }) => {
  const { user } = useAuth();
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<PhotoAnalysisResult | null>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        photoAnalysisService.analyzePhoto(user?.profile.photoUrl || uploadSample).then((res) => {
          setAnalysis(res);
          setAnalyzing(false);
        });
      }
      setProgress(current);
    }, 180);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D9] p-5 sm:p-10 shadow-2xl animate-fade-in">
      {/* Step Header */}
      <div className="text-center mb-6 sm:mb-8 pr-6 sm:pr-0 pl-6 sm:pl-0">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#9E6E38] text-[11px] font-bold tracking-widest uppercase border border-[#E9DEC9] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 3 of 4 • Neural Silhouette Biometrics</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1817] font-normal tracking-tight">
          {analyzing ? 'Extracting Fit Proportions...' : 'Silhouette Calibration Complete'}
        </h2>
        <p className="text-sm text-[#7A6F66] font-sans-body mt-2 max-w-md mx-auto">
          {analyzing
            ? 'Analyzing shoulder-to-hip ratios, drape balance, and undertone harmonics.'
            : 'Digital twin calibrated with 96% fit precision.'}
        </p>
      </div>

      {/* Analysis Graphic View */}
      <div className="relative bg-[#1A1817] rounded-2xl p-6 text-white overflow-hidden mb-6 flex flex-col items-center">
        {/* Animated Scan Line */}
        {analyzing && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A880]/20 to-transparent animate-pulse pointer-events-none" />
        )}

        <div className="w-32 h-44 rounded-xl overflow-hidden border border-[#C5A880]/50 relative mb-4 shadow-xl">
          <img
            src={user?.profile.photoUrl || uploadSample}
            alt="Scan subject"
            className="w-full h-full object-cover opacity-90"
          />
          {analyzing && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C5A880] shadow-[0_0_12px_#C5A880] animate-bounce" />
          )}
        </div>

        {/* Progress Bar */}
        {analyzing ? (
          <div className="w-full max-w-xs space-y-2 text-center">
            <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C5A880] h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] tracking-widest uppercase text-[#C5A880] font-mono">
              Extracting landmarks {progress}%
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 w-full text-center">
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="text-[10px] uppercase text-[#A89D93]">Calculated Shape</div>
              <div className="text-sm font-bold text-[#EADFD0]">{analysis?.bodyShape || 'Hourglass'}</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="text-[10px] uppercase text-[#A89D93]">Harmonic Match</div>
              <div className="text-sm font-bold text-[#EADFD0]">Warm Sand</div>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <div className="text-[10px] uppercase text-[#A89D93]">Confidence</div>
              <div className="text-sm font-bold text-[#C5A880]">96%</div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Items */}
      {!analyzing && (
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2.5 text-xs text-[#382C1E] bg-[#FAF5EE] p-3 rounded-xl border border-[#E9DEC9]">
            <CheckCircle2 className="w-4 h-4 text-[#9E6E38] shrink-0" />
            <span>Calibrated shoulder drop, torso length, and waistline landmarks.</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#382C1E] bg-[#FAF5EE] p-3 rounded-xl border border-[#E9DEC9]">
            <CheckCircle2 className="w-4 h-4 text-[#9E6E38] shrink-0" />
            <span>Tone palette matched for contrast balance across all curated capsules.</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t border-[#EFE9DF] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={analyzing}
          className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#7A6F66] hover:text-[#1A1817] disabled:opacity-40 cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          disabled={analyzing}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1817] hover:bg-[#332E2B] disabled:opacity-40 text-white text-xs font-bold uppercase tracking-widest shadow-md transition-all transform hover:scale-102 cursor-pointer"
        >
          <span>Generate Wardrobe Capsules</span>
          <ArrowRight className="w-4 h-4 text-[#C5A880]" />
        </button>
      </div>
    </div>
  );
};

export default PhotoAnalysisStep;
