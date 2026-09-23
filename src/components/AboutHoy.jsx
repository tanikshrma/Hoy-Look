import React from 'react';
import { UserCheck } from 'lucide-react';
import aboutImg from '../assets/about.webp';

export const AboutHoy = ({ onOpenQuiz }) => {
  return (
    <section
      id="about-hoy"
      className="relative z-50 min-h-[100dvh] py-16 sm:py-20 md:py-24 bg-[#FAF8F5] text-[#1E1E1E] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Clean Editorial Lookbook Image */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[520px] bg-white p-3 sm:p-4 rounded-[28px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#EDE4D8]">
              <div className="relative rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[4/5] bg-[#221E1B]">
                <img
                  src={aboutImg}
                  alt="House of You - Editorial Styling"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Story & Brand Vision Copy */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Section Heading matching STYLED FOR YOU & Screenshot typography */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] uppercase">
                <span className="block">
                  <span className="font-['Cinzel'] font-bold text-[#1A1817]">ABOUT</span>
                </span>
                <span className="block mt-1">
                  <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-[#B88F58]">HOUSE OF YOU</span>
                </span>
              </h2>
            </div>

            {/* Structured Paragraphs directly from the design */}
            <div className="space-y-4 sm:space-y-5 text-[#4A423B] font-sans-body text-sm sm:text-[15px] md:text-base leading-[1.65]">
              <p>
                At HOY, we believe dressing well should feel effortless. We combine advanced technology with personalized styling to take the guesswork out of put-together outfits.
              </p>

              <p>
                By creating a personalized digital twin from a simple photo, HOY shows you exactly how complete looks fit your body type, skin tone, and measurements. You can preview full, styled combinations virtually on your personal avatar before you step out the door.
              </p>

              <p>
                We help you bring out the best in what you already own as well as discover fresh looks tailored for you. Upload items directly from your cupboard to let our intelligent engine mix and match your existing pre-owned clothes into suitable combinations. Alongside your existing closet, our stylists curate original, complete outfits rendered directly onto your personal avatar allowing you to buy new additions instantly with one-click shoppable purchase links.
              </p>

              {/* Concluding Emphasis Statement */}
              <p className="text-[#8C6239] font-medium pt-1 sm:pt-2 border-t border-[#EBE3DA]">
                No cluttered feeds or guesswork — just smart, personalized style crafted around your shape, your preferences, and your wardrobe.
              </p>
            </div>

            {/* Quick Action Button */}
            {onOpenQuiz && (
              <div className="mt-8 pt-2">
                <button
                  id="about-try-digital-twin-btn"
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#2B2826] active:bg-black text-[#FAF8F5] text-xs font-bold tracking-widest uppercase px-7 py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Experience Personal Styling</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
