import React, { useState } from 'react';
import { ArrowRight, User, Ruler, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileDetailsStepProps {
  onNext: () => void;
  onCancel: () => void;
}

const BODY_SHAPES = [
  { id: 'Hourglass', label: 'Hourglass', desc: 'Balanced bust & hips, defined waist' },
  { id: 'Rectangle', label: 'Rectangle', desc: 'Even proportions, subtle waist curve' },
  { id: 'Pear', label: 'Pear', desc: 'Hips wider than shoulders/bust' },
  { id: 'Inverted Triangle', label: 'Inverted Triangle', desc: 'Shoulders/bust wider than hips' },
  { id: 'Athletic', label: 'Athletic', desc: 'Muscular, athletic build' },
];

const STYLE_VIBES = [
  'Minimalist Quiet Luxury',
  'Tailored Structure',
  'Relaxed Resort',
  'Contemporary Edge',
  'Effortless Classic',
  'Monochrome Atelier',
];

const SKIN_TONES = [
  { name: 'Porcelain Fair', color: '#F7E2D4' },
  { name: 'Warm Ivory', color: '#EFCDB8' },
  { name: 'Warm Sand', color: '#E4B896' },
  { name: 'Golden Honey', color: '#C89366' },
  { name: 'Deep Caramel', color: '#97613E' },
  { name: 'Espresso', color: '#563523' },
];

export const ProfileDetailsStep: React.FC<ProfileDetailsStepProps> = ({ onNext, onCancel }) => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.profile.name || user?.name || '');
  const [ageRange, setAgeRange] = useState(user?.profile.ageRange || '25-34');
  const [heightCm, setHeightCm] = useState(user?.profile.heightCm || 168);
  const [bodyShape, setBodyShape] = useState(user?.profile.bodyShape || 'Hourglass');
  const [skinToneIndex, setSkinToneIndex] = useState(user?.profile.skinToneIndex || 2);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(
    user?.profile.stylePreferences?.length ? user.profile.stylePreferences : ['Minimalist Quiet Luxury', 'Tailored Structure']
  );

  const toggleVibe = (vibe: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name || 'Valued Member',
      ageRange,
      heightCm: Number(heightCm),
      bodyShape,
      skinTone: SKIN_TONES[skinToneIndex].name,
      skinToneIndex,
      stylePreferences: selectedVibes,
    });
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 shadow-2xl animate-fade-in">
      {/* Step Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#9E6E38] text-[11px] font-bold tracking-widest uppercase border border-[#E9DEC9] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step 1 of 4 • Style Identity</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1817] font-normal tracking-tight">
          Craft Your Style Identity
        </h2>
        <p className="text-sm text-[#7A6F66] font-sans-body mt-2 max-w-md mx-auto">
          Help our neural styling engine calibrate recommendations precisely to your silhouette and aesthetics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name / Nickname */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2">
            Your Name / Nickname
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8C827A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#E2D9CD] rounded-xl text-sm text-[#1A1817] focus:outline-none focus:border-[#9E6E38] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Age & Height Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2">
              Age Range
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2D9CD] rounded-xl text-sm text-[#1A1817] focus:outline-none focus:border-[#9E6E38] focus:bg-white transition-all"
            >
              <option value="18-24">18 – 24</option>
              <option value="25-34">25 – 34</option>
              <option value="35-44">35 – 44</option>
              <option value="45-54">45 – 54</option>
              <option value="55+">55+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2 flex items-center justify-between">
              <span>Height (cm)</span>
              <span className="text-[#9E6E38] font-bold">{heightCm} cm</span>
            </label>
            <div className="relative flex items-center">
              <Ruler className="w-4 h-4 text-[#8C827A] absolute left-4" />
              <input
                type="number"
                min={140}
                max={220}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-[#E2D9CD] rounded-xl text-sm text-[#1A1817] focus:outline-none focus:border-[#9E6E38] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Body Shape Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2.5">
            Body Silhouette
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BODY_SHAPES.map((shape) => {
              const isSelected = bodyShape === shape.id;
              return (
                <button
                  type="button"
                  key={shape.id}
                  onClick={() => setBodyShape(shape.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex items-start justify-between ${
                    isSelected
                      ? 'border-[#9E6E38] bg-[#FAF5EE] text-[#1A1817] shadow-xs'
                      : 'border-[#EAE3D8] hover:border-[#C5A880] bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#1A1817]">{shape.label}</div>
                    <div className="text-[11px] text-[#7A6F66] mt-0.5">{shape.desc}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#9E6E38] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skin Undertone Palette */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2.5">
            Skin Undertone Palette (For Contrast Matching)
          </label>
          <div className="flex items-center gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D8] overflow-x-auto">
            {SKIN_TONES.map((tone, idx) => (
              <button
                type="button"
                key={tone.name}
                onClick={() => setSkinToneIndex(idx)}
                className={`flex-1 min-w-[54px] py-2 rounded-lg flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  skinToneIndex === idx ? 'ring-2 ring-[#9E6E38] bg-white shadow-xs' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: tone.color }}
                />
                <span className="text-[10px] text-[#4A423B] font-medium text-center truncate px-1">
                  {tone.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Style Aesthetics */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#382C1E] mb-2.5">
            Preferred Aesthetics & Silhouettes
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLE_VIBES.map((vibe) => {
              const isSelected = selectedVibes.includes(vibe);
              return (
                <button
                  type="button"
                  key={vibe}
                  onClick={() => toggleVibe(vibe)}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1817] text-white shadow-sm'
                      : 'bg-[#FAF8F5] border border-[#E2D9CD] text-[#4A423B] hover:border-[#1A1817]'
                  }`}
                >
                  {vibe}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#EFE9DF] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#7A6F66] hover:text-[#1A1817] cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1817] hover:bg-[#332E2B] text-white text-xs font-bold uppercase tracking-widest shadow-md transition-all transform hover:scale-102 cursor-pointer"
          >
            <span>Proceed to Photo Scan</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsStep;
