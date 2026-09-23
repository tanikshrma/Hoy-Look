import React from 'react';
import uploadImg from '../assets/upload.webp';
import personalizeImg from '../assets/personalize.webp';
import generateImg from '../assets/generate.webp';

interface HowItWorksProps {
  onOpenQuiz: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuiz }) => {
  const steps = [
    {
      id: 'step-upload',
      title: 'Upload',
      description: 'Upload a full-body photo. Takes ten seconds, we do the rest.',
      image: uploadImg,
      alt: 'Upload a full-body photo for accurate measurements and fit',
      tags: ['selfie', 'full body', 'avatar'],
    },
    {
      id: 'step-personalise',
      title: 'Personalise',
      description: 'Tell us your preferences and your body shape.',
      image: personalizeImg,
      alt: 'Personalise style preferences, body proportions and color palette',
      tags: ['fit', 'palette', 'occasion'],
    },
    {
      id: 'step-generate',
      title: 'Generate',
      description: 'Get outfit ideas made for your shape, styled and ready to wear.',
      image: generateImg,
      alt: 'Generate AI curated outfit ideas ready to wear for daily occasions',
      tags: ['office', 'brunch', 'date night'],
    },
  ];

  return (
    <section
      id="process"
      className="relative z-20 min-h-[100dvh] py-12 sm:py-16 lg:py-20 bg-[#B68E56] text-[#1E1710] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14">
          <div>
            <p className="text-[11px] sm:text-[12px] tracking-[0.25em] font-semibold text-[#382C1E] uppercase mb-1.5">
              HOW IT WORKS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-none uppercase">
              <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-white">YOUR OUTFIT,</span>{' '}
              <span className="font-['Cinzel'] font-bold text-[#1E1710]">IN THREE STEPS</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#2B2117] text-base sm:text-lg font-sans-body font-normal leading-relaxed">
              Real combinations that actually feel like you
            </p>
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              id={`how-it-works-${step.id}`}
              className="group flex flex-col cursor-pointer"
              onClick={onOpenQuiz}
            >
              {/* Image Frame with dark border */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10.2] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-[2.5px] border-[#1E1710] shadow-[0_8px_24px_rgba(30,23,16,0.18)] bg-[#1E1710] transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="mt-5 sm:mt-6">
                <h3 className="text-2xl sm:text-[26px] font-bold text-[#1E1710] font-sans-body mb-2 group-hover:text-black transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-[15px] text-[#2E2419] font-sans-body leading-relaxed mb-4 font-normal min-h-[44px]">
                  {step.description}
                </p>

                {/* Pill Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3.5 py-1.5 rounded-full bg-[#EADFD0]/85 border border-[#D5C6B1]/60 text-xs font-medium text-[#241C14] shadow-xs group-hover:bg-[#EADFD0] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

