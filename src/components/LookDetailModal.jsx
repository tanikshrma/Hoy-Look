import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, Heart, Check, ArrowRight } from 'lucide-react';

export const LookDetailModal = ({ look, onClose, onOpenQuiz }) => {
  const [activeTab, setActiveTab] = useState('pieces');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!look) return null;

  return (
    <div
      id="look-detail-overlay"
      className="fixed inset-0 z-[10000] overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="look-detail-modal"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-4xl w-full shadow-2xl border border-[#EAE3DA] text-[#1A1817] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-look-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF8F5]/80 backdrop-blur-md hover:bg-[#EAE3DA] text-[#1A1817] flex items-center justify-center transition-colors z-30 cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Look Presentation */}
        <div className="md:w-5/12 bg-[#1A1817] relative min-h-[320px] md:min-h-full flex flex-col justify-between">
          <img
            src={look.image}
            alt={look.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Top Tag */}
          <div className="relative z-10 p-5">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase">
              LOOK #{look.number} · {look.occasion}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="relative z-10 p-5 text-white">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight">
              {look.title}
            </h3>
            <p className="text-xs text-white/80 font-sans-body mt-1">
              {look.tagline}
            </p>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20 text-xs">
              <span className="text-white/70">Estimated Capsule Total</span>
              <span className="font-serif-display text-xl font-bold text-[#C5A880]">
                ${look.totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Details & Wardrobe Breakdown */}
        <div className="md:w-7/12 p-5 sm:p-7 overflow-y-auto flex-1 flex flex-col justify-between">
          <div>
            {/* Navigation Tabs */}
            <div className="flex items-center gap-4 border-b border-[#EAE3DA] pb-3 mb-5">
              <button
                onClick={() => setActiveTab('pieces')}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors pb-1 relative cursor-pointer ${
                  activeTab === 'pieces'
                    ? 'text-[#1A1817]'
                    : 'text-[#8C7A6B] hover:text-[#1A1817]'
                }`}
              >
                Wardrobe Breakdown ({look.items.length})
                {activeTab === 'pieces' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('stylist')}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors pb-1 relative cursor-pointer ${
                  activeTab === 'stylist'
                    ? 'text-[#1A1817]'
                    : 'text-[#8C7A6B] hover:text-[#1A1817]'
                }`}
              >
                Stylist Advice
                {activeTab === 'stylist' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880] rounded-full" />
                )}
              </button>
            </div>

            {/* TAB 1: PIECES LIST */}
            {activeTab === 'pieces' && (
              <div className="space-y-3">
                {look.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="p-3.5 rounded-2xl bg-white border border-[#EAE3DA] hover:border-[#C5A880] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#EAE3DA]"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6B] block">
                          {item.brand} · {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1A1817]">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[#6E645D]">
                          {item.color} · {item.material}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-[#1A1817] block">
                        ${item.price}
                      </span>
                      <a
                        href="#shop"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-[#8C6239] hover:underline mt-0.5"
                      >
                        <span>Shop</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: STYLIST ADVICE */}
            {activeTab === 'stylist' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA] space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={look.stylistAvatar}
                      alt={look.stylistName}
                      className="w-11 h-11 rounded-full object-cover border border-[#E0D5C7]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1817]">
                        {look.stylistName}
                      </h4>
                      <p className="text-[11px] text-[#8C7A6B]">
                        {look.stylistRole}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A423C] font-sans-body italic leading-relaxed pt-2 border-t border-[#F0EAE1]">
                    "{look.stylistNote}"
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E2D2BC] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A6B] block">
                    Curated Color Harmonization
                  </span>
                  <div className="flex items-center gap-2">
                    {look.palette.map((hex, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#E0D5C7]">
                        <span
                          style={{ backgroundColor: hex }}
                          className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        />
                        <span className="text-[10px] font-mono font-medium text-[#4A423C] uppercase">
                          {hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-full sm:w-auto px-4 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#F2ECE4] border-[#C5A880] text-[#8C6239]'
                  : 'bg-white border-[#E0D5C7] text-[#1A1817] hover:bg-[#F7F2EB]'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 text-[#8C6239]" /> : <Heart className="w-4 h-4" />}
              <span>{isSaved ? 'Saved to Wardrobe' : 'Save Look'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuiz();
              }}
              className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Drape on My Avatar Twin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
