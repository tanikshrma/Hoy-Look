import React from 'react';
import { UserCheck } from 'lucide-react';
import aboutImg from '../assets/about.webp';

interface AboutHoyProps {
  onOpenQuiz?: () => void;
}

export const AboutHoy: React.FC<AboutHoyProps> = ({ onOpenQuiz }) => {
  return (
    <section
      id="about-hoy"
      className="relative z-50 min-h-0 md:min-h-[100dvh] py-8 sm:py-20 md:py-24 bg-[#FAF8F5] text-[#1E1E1E] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Clean Editorial Lookbook Image (Full Image Display) */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] bg-white p-2.5 sm:p-4 rounded-[24px] sm:rounded-[36px] shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-[#EDE4D8]">
              <div className="relative rounded-[18px] sm:rounded-[28px] overflow-hidden aspect-[3/3.8] sm:aspect-[4/5] bg-[#221E1B]">
                <img
                  src={aboutImg}
                  alt="House of You - Editorial Styling"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width="520"
                  height="650"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Story & Brand Vision Copy */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Section Heading */}
            <div className="mb-4 sm:mb-8">
              <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] uppercase">
                <span className="block">
                  <span className="font-['Cinzel'] font-bold text-[#1A1817]">ABOUT</span>
                </span>
                <span className="block mt-0.5 sm:mt-1">
                  <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-[#B88F58]">HOUSE OF YOU</span>
                </span>
              </h2>
            </div>

            {/* Structured Paragraphs directly from the design */}
            <div className="space-y-3 sm:space-y-5 text-[#4A423B] font-sans-body text-xs sm:text-[15px] md:text-base leading-relaxed sm:leading-[1.65]">
              <p>
                At HOY, we believe dressing well should feel effortless. We combine advanced technology with personalized styling to take the guesswork out of put-together outfits.
              </p>

              <p>
                By creating a personalized digital twin from a simple photo, HOY shows you exactly how complete looks fit your body type, skin tone, and measurements. Preview full, styled combinations virtually on your personal avatar before you step out the door.
              </p>

              <p>
                We help you bring out the best in what you already own as well as discover fresh looks tailored for you. Upload items directly from your cupboard to let our intelligent engine mix and match your existing clothes. Alongside your existing closet, our stylists curate original outfits rendered directly onto your avatar with one-click shoppable purchase links.
              </p>

              {/* Concluding Emphasis Statement */}
              <p className="text-[#8C6239] font-medium pt-1 sm:pt-2 border-t border-[#EBE3DA]">
                No cluttered feeds or guesswork — just smart, personalized style crafted around your shape, your preferences, and your wardrobe.
              </p>
            </div>

            {/* Quick Action Button */}
            {onOpenQuiz && (
              <div className="mt-5 sm:mt-8 pt-1">
                <button
                  id="about-try-digital-twin-btn"
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#2B2826] active:bg-black text-[#FAF8F5] text-[11px] sm:text-xs font-bold tracking-widest uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
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

export default AboutHoy;
