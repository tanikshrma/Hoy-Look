import React from 'react';
import hoyLogoWhite from '../assets/HOY Logo White.avif';

export const ReadyWhenYouAre = ({ onOpenQuiz }) => {
  return (
    <section
      id="ready-when-you-are"
      className="relative z-[70] min-h-[100dvh] w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center items-center text-center bg-[#BE7A5B] shadow-[0_-20px_50px_rgba(0,0,0,0.18)] m-0 border-0"
    >
      {/* Background HOY Logo White Watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0 max-w-[200px] sm:max-w-[260px] lg:max-w-[320px] w-full"
        aria-hidden="true"
      >
        <div className="relative w-full">
          <img
            src={hoyLogoWhite}
            alt=""
            className="w-full h-auto object-contain opacity-[0.12]"
          />
          {/* Soft background overlay for seamless subtle blend */}
          <div className="absolute inset-0 bg-[#BE7A5B]/40 pointer-events-none" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto z-10 w-full relative">
        {/* Section Heading matching Cinzel style */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.08] uppercase text-center">
          <span className="block">
            <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-white">READY WHEN</span>{' '}
            <span className="font-['Cinzel'] font-bold text-white">YOU ARE</span>
          </span>
        </h2>

        {/* Subheading */}
        <p className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-[26px] font-bold text-[#19120D] tracking-tight leading-snug">
          A better outfit is already in your wardrobe.
        </p>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-[16px] text-[#2C1E15] font-sans-body font-normal max-w-xl mx-auto leading-relaxed">
          Styling built around your body, your budget, and the clothes you already own.
        </p>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            id="ready-start-styling-btn"
            onClick={onOpenQuiz}
            className="group inline-flex items-center justify-center gap-2.5 bg-[#141210] hover:bg-black active:bg-[#1E1B18] text-white text-xs sm:text-sm font-bold tracking-[0.18em] uppercase py-3.5 px-8 sm:py-4 sm:px-9 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-103 cursor-pointer"
          >
            <span>START STYLING</span>
            <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
