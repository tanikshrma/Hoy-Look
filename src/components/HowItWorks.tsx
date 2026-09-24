import React, { useState, useRef } from 'react';
import uploadImg from '../assets/upload.webp';
import personalizeImg from '../assets/personalize.webp';
import generateImg from '../assets/generate.webp';

interface HowItWorksProps {
  onOpenQuiz: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuiz }) => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      id: 'step-upload',
      stepNum: '01',
      title: 'Upload',
      description: 'Upload a full-body photo. Takes ten seconds, we do the rest.',
      image: uploadImg,
      alt: 'Upload a full-body photo for accurate measurements and fit',
      tags: ['selfie', 'full body', 'avatar'],
    },
    {
      id: 'step-personalise',
      stepNum: '02',
      title: 'Personalise',
      description: 'Tell us your preferences and your body shape.',
      image: personalizeImg,
      alt: 'Personalise style preferences, body proportions and color palette',
      tags: ['fit', 'palette', 'occasion'],
    },
    {
      id: 'step-generate',
      stepNum: '03',
      title: 'Generate',
      description: 'Get outfit ideas made for your shape, styled and ready to wear.',
      image: generateImg,
      alt: 'Generate AI curated outfit ideas ready to wear for daily occasions',
      tags: ['office', 'brunch', 'date night'],
    },
  ];

  const handleMobileScroll = () => {
    if (mobileTrackRef.current) {
      const scrollLeft = mobileTrackRef.current.scrollLeft;
      const cardWidth = mobileTrackRef.current.firstElementChild
        ? (mobileTrackRef.current.firstElementChild as HTMLElement).offsetWidth + 16
        : mobileTrackRef.current.offsetWidth * 0.82;
      if (cardWidth > 0) {
        const index = Math.round(scrollLeft / cardWidth);
        setActiveMobileIdx(Math.min(steps.length - 1, Math.max(0, index)));
      }
    }
  };

  const scrollToMobileCard = (idx: number) => {
    if (mobileTrackRef.current) {
      const cardWidth = mobileTrackRef.current.firstElementChild
        ? (mobileTrackRef.current.firstElementChild as HTMLElement).offsetWidth + 16
        : mobileTrackRef.current.offsetWidth * 0.82;
      mobileTrackRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
      setActiveMobileIdx(idx);
    }
  };

  return (
    <section
      id="process"
      className="relative z-20 scroll-mt-0 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-16 lg:pb-20 bg-[#B68E56] text-[#1E1710] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-6 mb-6 sm:mb-12 lg:mb-14">
          <div>
            <p className="text-[10px] sm:text-[12px] tracking-[0.25em] font-semibold text-[#382C1E] uppercase mb-1">
              HOW IT WORKS
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-tight sm:leading-none uppercase">
              <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-white">YOUR OUTFIT,</span>{' '}
              <span className="font-['Cinzel'] font-bold text-[#1E1710]">IN THREE STEPS</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#2B2117] text-xs sm:text-lg font-sans-body font-normal leading-relaxed">
              Real combinations that actually feel like you
            </p>
          </div>
        </div>

        {/* 3 Step Cards: Horizontal Carousel on Mobile, 3-Col Grid on Desktop */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              id={`how-it-works-${step.id}`}
              className="group flex flex-col cursor-pointer shrink-0 w-[82vw] sm:w-[320px] md:w-auto snap-center bg-[#E6D8C5]/60 md:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none border border-[#1E1710]/10 md:border-0 shadow-xs md:shadow-none transition-all duration-300"
              onClick={onOpenQuiz}
            >
              {/* Image Frame with dark border */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10.2] w-full rounded-xl sm:rounded-3xl overflow-hidden border-[2px] sm:border-[2.5px] border-[#1E1710] shadow-[0_4px_16px_rgba(30,23,16,0.15)] sm:shadow-[0_8px_24px_rgba(30,23,16,0.18)] bg-[#1E1710] transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="250"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#1E1710] text-white text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-white/20">
                  {step.stepNum}
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-3 sm:mt-6">
                <h3 className="text-lg sm:text-[26px] font-bold text-[#1E1710] font-sans-body mb-1 sm:mb-2 group-hover:text-black transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-[15px] text-[#2E2419] font-sans-body leading-relaxed mb-2.5 sm:mb-4 font-normal min-h-0 sm:min-h-[44px]">
                  {step.description}
                </p>

                {/* Pill Tags */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EADFD0] border border-[#D5C6B1]/70 text-[10px] sm:text-xs font-medium text-[#241C14] shadow-2xs group-hover:bg-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Indicator Dots & Progress */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`Scroll to step ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileIdx === idx ? 'w-6 bg-[#1E1710]' : 'w-2 bg-[#1E1710]/30'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#382C1E]">
            Step 0{activeMobileIdx + 1} of 03 • Swipe →
          </span>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
