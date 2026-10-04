import React, { useState, useRef } from 'react';
import uploadWardrobeImg from '../assets/why-upload.webp';
import personalizedLooksImg from '../assets/why-personalized.webp';
import stylistImg from '../assets/why-stylist.webp';

const USP_ITEMS = [
  {
    id: 'usp-wardrobe',
    label: 'Upload your wardrobe',
    image: uploadWardrobeImg,
    alt: 'Turn your closet into infinite outfits — upload photos of your existing wardrobe and HOY generates fresh outfit combinations from your own clothes.',
  },
  {
    id: 'usp-looks',
    label: 'Get personalized looks',
    image: personalizedLooksImg,
    alt: 'Curated looks ready to shop — personalized outfits matched to your body type, age and skin tone with instant shoppable links.',
  },
  {
    id: 'usp-stylist',
    label: 'Consult a stylist',
    image: stylistImg,
    alt: 'Stylist SOS in your pocket — real-time advice and curated occasion outfits from professional human stylists whenever you need a second opinion.',
  },
];

export const WhyHoy: React.FC = () => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const getCardWidth = (track: HTMLDivElement) =>
    track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 16
      : track.offsetWidth * 0.86;

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / getCardWidth(track));
    setActiveMobileIdx(Math.min(USP_ITEMS.length - 1, Math.max(0, index)));
  };

  const scrollToMobileCard = (idx: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    track.scrollTo({ left: idx * getCardWidth(track), behavior: 'smooth' });
    setActiveMobileIdx(idx);
  };

  return (
    <section
      id="why-hoy"
      className="relative z-20 scroll-mt-0 min-h-0 md:min-h-[100dvh] pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-16 lg:pb-20 bg-[#B68E56] text-[#1E1710] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-6 mb-6 sm:mb-12 lg:mb-14">
          <div>
            <p className="text-[10px] sm:text-[12px] tracking-[0.25em] font-semibold text-[#382C1E] uppercase mb-1">
              WHY HOY?
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-tight sm:leading-[1.05] uppercase">
              <span className="block font-['Cinzel'] font-bold text-[#1E1710]">YOUR 3 WAY</span>
              <span className="block font-['Cinzel'] font-normal tracking-[0.02em] text-white">FASHION UPGRADE</span>
            </h2>
          </div>

          <div className="lg:max-w-xs xl:max-w-sm lg:pb-2">
            <p className="text-[#2B2117] text-xs sm:text-lg font-sans-body font-normal leading-relaxed">
              From your closet to your next look, all in one place
            </p>
          </div>
        </div>

        {/* USP Cards: Horizontal Carousel on Mobile, 3-Col Grid on Desktop */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory no-scrollbar scrollbar-none pb-2 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
        >
          {USP_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`why-hoy-${item.id}`}
              className="group shrink-0 w-[86vw] sm:w-[420px] md:w-auto snap-center select-none"
            >
              <div className="relative aspect-[3/2] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-[2px] sm:border-[2.5px] border-[#1E1710] shadow-[0_4px_16px_rgba(30,23,16,0.15)] sm:shadow-[0_8px_24px_rgba(30,23,16,0.18)] bg-[#F3ECE2] transition-transform duration-300 group-hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll Indicator Dots */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1.5">
            {USP_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToMobileCard(idx)}
                aria-label={`Scroll to ${item.label}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileIdx === idx ? 'w-6 bg-[#1E1710]' : 'w-2 bg-[#1E1710]/30'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#382C1E]">
            {USP_ITEMS[activeMobileIdx].label} • Swipe →
          </span>
        </div>

      </div>
    </section>
  );
};

export default WhyHoy;
