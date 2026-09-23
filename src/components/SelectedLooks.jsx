import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, ShoppingBag, Eye, Heart } from 'lucide-react';
import { CURATED_LOOKS } from '../data/mockData';

export const SelectedLooks = ({
  onSelectLook,
  onOpenPlanModal,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState('ALL');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [likedLooks, setLikedLooks] = useState({});

  const occasions = ['ALL', 'Casual & Everyday', 'Office & Formal', 'Evening & Party', 'Vacation & Resort'];

  const filteredLooks = CURATED_LOOKS.filter((look) => {
    if (selectedOccasion === 'ALL') return true;
    if (selectedOccasion === 'Casual & Everyday') return look.occasion === 'Weekend';
    if (selectedOccasion === 'Office & Formal') return look.occasion === 'Office';
    if (selectedOccasion === 'Evening & Party') return look.occasion === 'Wedding' || look.occasion === 'Date Night';
    if (selectedOccasion === 'Vacation & Resort') return look.occasion === 'Travel';
    return true;
  });

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedLooks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, filteredLooks.length - 1)));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < filteredLooks.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="looks"
      className="relative z-30 min-h-[100dvh] py-16 sm:py-20 bg-[#FAF8F5] text-[#1E1710] overflow-hidden flex flex-col justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] font-semibold text-[#8C7A6B] uppercase mb-1.5">
              CURATED STYLE CAPSULES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-none uppercase">
              <span className="font-['Cinzel'] font-bold text-[#1A1817]">GENERATED LOOKS</span>{' '}
              <span className="font-['Cinzel'] font-normal tracking-[0.02em] text-[#B88F58]">& CAPSULES</span>
            </h2>
          </div>

          <p className="text-[#665D56] font-sans-body text-xs sm:text-sm max-w-sm lg:text-right">
            Tap any curated capsule to inspect item details, stylist notes, and direct shopping links.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#EAE3DA] mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            {occasions.map((occ) => {
              const isActive = selectedOccasion === occ;
              return (
                <button
                  key={occ}
                  onClick={() => {
                    setSelectedOccasion(occ);
                    setCurrentSlideIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#1A1817] text-white shadow-xs'
                      : 'bg-[#F0EAE1] text-[#6E645D] hover:bg-[#E2D6C6] hover:text-[#1A1817]'
                  }`}
                >
                  {occ}
                </button>
              );
            })}
          </div>

          {/* Carousel Arrows (Mobile / Tablet / Desktop) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Look"
              className="w-9 h-9 rounded-full bg-white border border-[#E0D5C7] hover:border-[#B88F58] text-[#1A1817] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next Look"
              className="w-9 h-9 rounded-full bg-white border border-[#E0D5C7] hover:border-[#B88F58] text-[#1A1817] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel / Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLooks.map((look) => (
            <div
              key={look.id}
              onClick={() => onSelectLook(look)}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-[#EAE3DA] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] bg-[#221E1B] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-[#1A1817]/85 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase">
                    {look.tags[0] || look.occasion}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => toggleLike(look.id, e)}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-[#1A1817] flex items-center justify-center transition-colors z-10 cursor-pointer shadow-xs"
                  aria-label="Save look"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      likedLooks[look.id] ? 'fill-[#C85235] text-[#C85235]' : 'text-[#1A1817]'
                    }`}
                  />
                </button>

                {/* Quick View Floating Action Bar on Hover */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1817] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#B88F58]" />
                    <span>View Capsule</span>
                  </span>
                  <span className="text-xs font-bold text-[#B88F58]">
                    ${look.totalPrice}
                  </span>
                </div>
              </div>

              {/* Look Info Card */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] font-semibold uppercase tracking-wider mb-1">
                    <span>Look #{look.number}</span>
                    <span>{look.itemsCount} pieces</span>
                  </div>

                  <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1A1817] group-hover:text-[#B88F58] transition-colors">
                    {look.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#665D56] font-sans-body line-clamp-2">
                    {look.tagline}
                  </p>
                </div>

                {/* Stylist & Palette Row */}
                <div className="mt-4 pt-3 border-t border-[#EAE3DA] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={look.stylistAvatar}
                      alt={look.stylistName}
                      className="w-6 h-6 rounded-full object-cover border border-[#E0D5C7]"
                    />
                    <span className="text-xs font-semibold text-[#1A1817] truncate max-w-[110px]">
                      {look.stylistName}
                    </span>
                  </div>

                  <div className="flex -space-x-1">
                    {look.palette.slice(0, 3).map((hex, idx) => (
                      <span
                        key={idx}
                        style={{ backgroundColor: hex }}
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3DA] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1A1817]">
              Want this styled directly on your 3D digital twin?
            </h4>
            <p className="text-xs sm:text-sm text-[#665D56] font-sans-body">
              Upload 1 photo and get tailored outfit recommendations matching your silhouette instantly.
            </p>
          </div>

          <button
            onClick={onOpenPlanModal}
            className="inline-flex items-center gap-2 bg-[#1A1817] hover:bg-[#332E2A] text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded-full shadow-md hover:shadow-xl transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Unlock All Style Plans</span>
          </button>
        </div>

      </div>
    </section>
  );
};
