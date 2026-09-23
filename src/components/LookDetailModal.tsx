import React, { useState } from 'react';
import { X, Shirt, Check, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { LookCapsule } from '../types';

interface LookDetailModalProps {
  look: LookCapsule | null;
  onClose: () => void;
  onOpenQuiz: () => void;
}

export const LookDetailModal: React.FC<LookDetailModalProps> = ({ look, onClose, onOpenQuiz }) => {
  const [saved, setSaved] = useState(false);
  const [addedItems, setAddedItems] = useState<string[]>([]);

  if (!look) return null;

  const toggleAddItem = (itemId: string) => {
    setAddedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div
      id="look-detail-modal-overlay"
      className="fixed inset-0 z-[10000] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="look-detail-modal-container"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-look-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors z-20 cursor-pointer"
          aria-label="Close Look Details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Main Look Image & Palette */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#F2ECE4] aspect-3/4 border border-[#E8E0D6]">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1817]">
                {look.occasion}
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="p-3 bg-white rounded-xl border border-[#EAE2D8] flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6B]">
                Curated Palette:
              </span>
              <div className="flex items-center gap-1.5">
                {look.palette.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-5 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Stylist Card */}
            <div className="p-4 bg-white rounded-xl border border-[#EAE2D8] flex items-center gap-3">
              <img
                src={look.stylistAvatar}
                alt={look.stylistName}
                className="w-10 h-10 rounded-full object-cover border border-[#D9CDBF]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B85D43] block">
                  Curated by
                </span>
                <h4 className="font-serif-display font-bold text-xs text-[#1A1817]">
                  {look.stylistName}
                </h4>
                <p className="text-[10px] text-[#7A6F66]">
                  {look.stylistRole}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Look Breakdown, Pieces, & Actions */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C5A880]">
                  {look.occasion} Capsule Collection
                </span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1817]">
                {look.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#615750] font-sans-body leading-relaxed">
                {look.tagline}
              </p>
            </div>

            {/* Stylist's Editorial Note */}
            <div className="p-4 bg-[#FAF5EE] rounded-xl border-l-3 border-[#B85D43]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B85D43] block mb-1">
                Stylist's Fitting Note
              </span>
              <p className="font-serif-editorial italic text-xs sm:text-sm text-[#38302B] leading-relaxed">
                "{look.stylistNote}"
              </p>
            </div>

            {/* Individual Garment Items List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-[#1A1817]">
                  Capsule Pieces ({look.items.length})
                </span>
                <span className="text-xs text-[#8C7A6B]">
                  Estimated Total: <strong className="text-[#1A1817] font-serif-display text-sm">${look.totalPrice}</strong>
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {look.items.map((item) => {
                  const isAdded = addedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-[#ECE4DA] flex items-center justify-between gap-3 hover:border-[#C5A880] transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover bg-[#F5EFEB] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#1A1817] truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#7A6E65] truncate">
                            {item.brand} • {item.material} ({item.color})
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-serif-display font-bold text-[#1A1817] block">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => toggleAddItem(item.id)}
                          className={`text-[10px] uppercase tracking-wider font-semibold cursor-pointer ${
                            isAdded ? 'text-[#B85D43]' : 'text-[#8C7A6B] hover:text-[#1A1817]'
                          }`}
                        >
                          {isAdded ? 'Selected ✓' : '+ Select'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#EAE2D8] flex flex-col sm:flex-row items-center gap-3">
              <button
                id="modal-quiz-cta"
                onClick={() => {
                  onClose();
                  onOpenQuiz();
                }}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#B5966D] text-white text-xs font-semibold tracking-widest uppercase py-3.5 px-6 rounded-full shadow-sm transition-all cursor-pointer"
              >
                <Shirt className="w-4 h-4" />
                <span>Style This Look For Me</span>
              </button>

              <button
                id="modal-save-closet-btn"
                onClick={() => setSaved(!saved)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase py-3.5 px-5 rounded-full border transition-all cursor-pointer ${
                  saved
                    ? 'bg-[#FAF5EE] border-[#B85D43] text-[#B85D43]'
                    : 'border-[#D9CEBE] hover:border-[#1A1817] text-[#1A1817] bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current text-[#B85D43]' : ''}`} />
                <span>{saved ? 'Saved to Closet' : 'Save Look'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LookDetailModal;
