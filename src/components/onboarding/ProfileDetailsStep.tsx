import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Sparkles, Check, Camera } from 'lucide-react';
import hoyLogo from '../../assets/HOY Logo.avif';
import { useAuth, UserOnboardingProfile } from '../../context/AuthContext';

interface ProfileDetailsStepProps {
  onGenerate: (profile: UserOnboardingProfile) => void;
  onChangePhoto: () => void;
  onBack: () => void;
}

const BODY_SHAPES = [
  { id: 'Rectangle', name: 'Rectangle', desc: 'Straight waist with balanced shoulders & hips' },
  { id: 'Hourglass', name: 'Hourglass', desc: 'Curvaceous figure with defined waist & hips' },
  { id: 'Pear', name: 'Pear', desc: 'Hips wider than bust & shoulders' },
  { id: 'Inverted Triangle', name: 'Inverted Triangle', desc: 'Broad shoulders with narrower waist & hips' },
  { id: 'Athletic', name: 'Athletic', desc: 'Muscular build with balanced proportions' },
] as const;

const SKIN_TONES = [
  { label: 'Fair', color: '#F7E2D6' },
  { label: 'Light', color: '#E8CAAD' },
  { label: 'Medium', color: '#C8A27A' },
  { label: 'Olive', color: '#A37E55' },
  { label: 'Tan', color: '#7D5838' },
  { label: 'Dark', color: '#4A3321' },
];

const COLOR_OPTIONS = [
  { id: 'Neutrals', label: 'Monochrome Neutrals', swatches: ['#1A1817', '#8C827A', '#FAF8F5'] },
  { id: 'Warm Earth', label: 'Warm Earth Tones', swatches: ['#B88F58', '#8C4B31', '#D4A373'] },
  { id: 'Cool Tones', label: 'Cool Slate & Navy', swatches: ['#1E293B', '#475569', '#94A3B8'] },
  { id: 'Pastels', label: 'Soft Pastels', swatches: ['#FDE2E4', '#E2ECE9', '#DFE7FD'] },
  { id: 'Bold', label: 'Bold Statement Tones', swatches: ['#991B1B', '#1E3A8A', '#065F46'] },
];

export const ProfileDetailsStep: React.FC<ProfileDetailsStepProps> = ({
  onGenerate,
  onChangePhoto,
  onBack,
}) => {
  const { userProfile, updateUserProfile } = useAuth();

  // Form Fields State
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(userProfile.gender || 'Female');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft/in'>(userProfile.heightUnit || 'cm');
  const [heightCm, setHeightCm] = useState<number>(userProfile.heightCm || 163);
  const [age, setAge] = useState<number>(userProfile.age || 22);
  const [bodyShape, setBodyShape] = useState<UserOnboardingProfile['bodyShape']>(userProfile.bodyShape || 'Rectangle');
  const [skinToneIndex, setSkinToneIndex] = useState<number>(userProfile.skinToneIndex ?? 1);

  const [topSize, setTopSize] = useState<string>(userProfile.topSize || 'S');
  const [bottomSize, setBottomSize] = useState<string>(userProfile.bottomSize || 'M');
  const [shoeSize, setShoeSize] = useState<string>(userProfile.shoeSize || 'EU 38');

  const [selectedColors, setSelectedColors] = useState<string[]>(userProfile.preferredColors || ['Neutrals', 'Warm Earth']);

  // Accordion Expand/Collapse States
  const [isSizesOpen, setIsSizesOpen] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);

  const toggleColor = (colorId: string) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorId));
    } else {
      setSelectedColors([...selectedColors, colorId]);
    }
  };

  const selectedShapeObj = BODY_SHAPES.find((s) => s.id === bodyShape) || BODY_SHAPES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: UserOnboardingProfile = {
      ...userProfile,
      gender,
      heightCm,
      heightUnit,
      age,
      bodyShape,
      skinToneIndex,
      topSize,
      bottomSize,
      shoeSize,
      preferredColors: selectedColors,
    };

    updateUserProfile(updated);
    onGenerate(updated);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#11100F] font-sans-body p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="max-w-2xl mx-auto flex items-center justify-between py-2 border-b border-[#EAE2D8]/80 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#615852] hover:text-[#11100F] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <img src={hoyLogo} alt="HOY" className="h-6 sm:h-7 w-auto object-contain" />

        <span className="text-[11px] font-bold text-[#8C7A6B] uppercase tracking-widest">
          STEP 2 OF 3
        </span>
      </header>

      {/* Main Form Container */}
      <main className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white border border-[#EAE2D8] rounded-3xl shadow-xl p-6 sm:p-8 space-y-7">
          
          {/* Header Title */}
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#11100F]">
              Your Body & Style Twin
            </h2>
            <p className="text-xs sm:text-sm text-[#615852] mt-1">
              Refine your measurements for tailored 3D Neural Twin recommendations.
            </p>
          </div>

          {/* Photo Summary Row */}
          <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {userProfile.photoUrl && (
                <img
                  src={userProfile.photoUrl}
                  alt="Avatar summary"
                  className="size-12 sm:size-14 rounded-xl object-cover border border-[#DCD3C7]"
                />
              )}
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#11100F] capitalize">
                  {gender} · Age {age} · ~{heightCm} {heightUnit} · {bodyShape} build
                </p>
                <p className="text-[11px] text-[#8C827A] font-medium">
                  Detected complexion: {SKIN_TONES[skinToneIndex]?.label} skin tone
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onChangePhoto}
              className="text-xs font-bold text-[#B88F58] hover:text-[#9A733E] underline underline-offset-2 cursor-pointer shrink-0"
            >
              Change Photo
            </button>
          </div>

          {/* GENDER SELECTOR */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6F66] mb-2">
              GENDER <span className="text-[#DC2626]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['Male', 'Female', 'Other'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    gender === g
                      ? 'bg-[#11100F] text-white border-[#11100F] shadow-sm'
                      : 'bg-[#FAF8F5] text-[#5A524C] border-[#EAE2D8] hover:border-[#B88F58]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* HEIGHT & UNIT TOGGLE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6F66]">
                HEIGHT
              </label>
              <div className="inline-flex rounded-lg bg-[#FAF8F5] border border-[#EAE2D8] p-0.5">
                <button
                  type="button"
                  onClick={() => setHeightUnit('cm')}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-colors cursor-pointer ${
                    heightUnit === 'cm' ? 'bg-[#11100F] text-white' : 'text-[#8C827A]'
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => setHeightUnit('ft/in')}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-colors cursor-pointer ${
                    heightUnit === 'ft/in' ? 'bg-[#11100F] text-white' : 'text-[#8C827A]'
                  }`}
                >
                  ft/in
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                min={120}
                max={230}
                className="w-full py-3.5 px-4 bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl text-sm font-bold text-[#11100F] focus:outline-none focus:border-[#B88F58]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C827A]">
                {heightUnit === 'cm' ? 'cm' : 'ft/in'}
              </span>
            </div>
          </div>

          {/* AGE SLIDER */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6F66]">
                AGE
              </label>

              <span className="text-xs font-bold text-[#11100F] px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE2D8]">
                {age} years old
              </span>
            </div>

            <input
              type="range"
              min={16}
              max={70}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[#B88F58] cursor-pointer"
            />
          </div>

          {/* BODY SHAPE / BUILD (DROPDOWN + CARDS) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6F66] mb-2">
              BODY SHAPE / BUILD
            </label>

            {/* Dropdown Selector */}
            <div className="relative mb-3">
              <select
                value={bodyShape}
                onChange={(e) => setBodyShape(e.target.value as UserOnboardingProfile['bodyShape'])}
                className="w-full appearance-none py-3.5 px-4 bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl text-xs font-bold text-[#11100F] focus:outline-none focus:border-[#B88F58] cursor-pointer pr-10"
              >
                {BODY_SHAPES.map((shape) => (
                  <option key={shape.id} value={shape.id}>
                    {shape.name} — {shape.desc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#8C827A] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Selected Shape Short Description Banner */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#B88F58]/40 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#11100F]">{selectedShapeObj.name}</p>
                <p className="text-[11px] text-[#615852]">{selectedShapeObj.desc}</p>
              </div>
              <Check className="w-4 h-4 text-[#B88F58] shrink-0 ml-2" />
            </div>
          </div>

          {/* SKIN TONE SLIDER */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6F66]">
                SKIN TONE
              </label>

              <span className="text-xs font-bold text-[#11100F] capitalize">
                {SKIN_TONES[skinToneIndex].label}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 p-2.5 bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl">
              {SKIN_TONES.map((tone, idx) => (
                <button
                  key={tone.label}
                  type="button"
                  onClick={() => setSkinToneIndex(idx)}
                  style={{ backgroundColor: tone.color }}
                  className={`size-8 rounded-full transition-transform cursor-pointer border ${
                    skinToneIndex === idx ? 'scale-125 border-[#11100F] shadow-md ring-2 ring-[#B88F58]' : 'border-black/10 opacity-80'
                  }`}
                  title={tone.label}
                />
              ))}
            </div>
          </div>

          {/* YOUR SIZES (EXPANDABLE) */}
          <div className="border border-[#EAE2D8] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsSizesOpen(!isSizesOpen)}
              className="w-full p-4 bg-[#FAF8F5] hover:bg-[#F5EFE6] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-[#11100F]">YOUR SIZES</p>
                <p className="text-[11px] text-[#8C827A]">Top: {topSize} · Bottom: {bottomSize} · Shoes: {shoeSize}</p>
              </div>
              {isSizesOpen ? <ChevronUp className="w-4 h-4 text-[#8C827A]" /> : <ChevronDown className="w-4 h-4 text-[#8C827A]" />}
            </button>

            {isSizesOpen && (
              <div className="p-4 bg-white border-t border-[#EAE2D8] space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#7A6F66] mb-1.5 uppercase">Top Size</label>
                  <div className="flex gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setTopSize(sz)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                          topSize === sz ? 'bg-[#11100F] text-white border-[#11100F]' : 'border-[#EAE2D8] text-[#5A524C]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7A6F66] mb-1.5 uppercase">Bottom Size</label>
                  <div className="flex gap-2">
                    {['28', '30', '32', '34', '36'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setBottomSize(sz)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                          bottomSize === sz ? 'bg-[#11100F] text-white border-[#11100F]' : 'border-[#EAE2D8] text-[#5A524C]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#7A6F66] mb-1.5 uppercase">Footwear Size</label>
                  <div className="flex gap-2">
                    {['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setShoeSize(sz)}
                        className={`flex-1 py-2 text-[11px] font-bold rounded-lg border cursor-pointer ${
                          shoeSize === sz ? 'bg-[#11100F] text-white border-[#11100F]' : 'border-[#EAE2D8] text-[#5A524C]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COLOR PALETTE PREFERENCES (EXPANDABLE) */}
          <div className="border border-[#EAE2D8] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setIsColorsOpen(!isColorsOpen)}
              className="w-full p-4 bg-[#FAF8F5] hover:bg-[#F5EFE6] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-[#11100F]">COLOR PALETTE PREFERENCES</p>
                <p className="text-[11px] text-[#8C827A]">{selectedColors.length} palette types selected</p>
              </div>
              {isColorsOpen ? <ChevronUp className="w-4 h-4 text-[#8C827A]" /> : <ChevronDown className="w-4 h-4 text-[#8C827A]" />}
            </button>

            {isColorsOpen && (
              <div className="p-4 bg-white border-t border-[#EAE2D8] space-y-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleColor(c.id)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedColors.includes(c.id) ? 'bg-[#FAF8F5] border-[#B88F58]' : 'border-[#EAE2D8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1">
                        {c.swatches.map((hex) => (
                          <span
                            key={hex}
                            style={{ backgroundColor: hex }}
                            className="size-4 rounded-full border border-black/10 inline-block"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#11100F]">{c.label}</span>
                    </div>
                    {selectedColors.includes(c.id) && <Check className="w-4 h-4 text-[#B88F58]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex items-center gap-3 border-t border-[#EAE2D8]">
            <button
              type="button"
              onClick={onBack}
              className="py-4 px-6 rounded-full border border-[#DDD5CB] text-[#5A524C] hover:text-[#11100F] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Back
            </button>

            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-full bg-[#11100F] hover:bg-[#2C2723] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
            >
              <span>Generate Looks</span>
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
            </button>
          </div>

        </form>
      </main>

    </div>
  );
};

