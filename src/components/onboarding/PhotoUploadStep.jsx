import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, ArrowLeft, Check, X, Sparkles, User as UserIcon } from 'lucide-react';
import hoyLogo from '../../assets/HOY Logo.avif';
import { useAuth } from '../../context/AuthContext';

export const PhotoUploadStep = ({ onContinue, onBack }) => {
  const { user, userProfile, updateUserProfile } = useAuth();
  
  const [selectedPhoto, setSelectedPhoto] = useState(userProfile.photoUrl || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File size exceeds 15MB. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setSelectedPhoto(result);
        updateUserProfile({ photoUrl: result });
        setIsModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedPhoto) {
      onContinue(selectedPhoto);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#11100F] font-sans-body flex flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-2 border-b border-[#EAE2D8]/80 mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#615852] hover:text-[#11100F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <img src={hoyLogo} alt="HOY" className="h-6 sm:h-7 w-auto object-contain" />

        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-[#E2D4C3] text-[#4A3B2C] text-[10px] font-bold tracking-widest uppercase">
            FREE PLAN
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E0D6CB] text-xs font-semibold text-[#3A3430]">
            <UserIcon className="w-3.5 h-3.5 text-[#B88F58]" />
            <span className="max-w-[100px] truncate">{user?.phoneNumber || '+91 User'}</span>
          </div>
        </div>
      </header>

      {/* Main Upload Card Container */}
      <div className="max-w-xl mx-auto w-full my-auto">
        <div className="bg-white border border-[#EAE2D8] rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
          
          <div className="text-center space-y-1">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#11100F]">
              Build Your 3D Style Twin
            </h2>
            <p className="text-xs sm:text-sm text-[#615852] font-sans-body">
              Upload a clear full-body photo to generate accurate AI outfit drapes.
            </p>
          </div>

          {/* Photo Dropzone Box */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative w-full aspect-[3/3.8] max-w-[280px] sm:max-w-[320px] mx-auto rounded-3xl border-2 border-dashed border-[#CFC5B8] hover:border-[#B88F58] bg-[#FAF8F5] transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center p-4 group"
          >
            {selectedPhoto ? (
              <div className="relative w-full h-full">
                <img
                  src={selectedPhoto}
                  alt="User Full Body"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest gap-2 backdrop-blur-xs">
                  <Camera className="w-5 h-5" />
                  <span>Change Photo</span>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="size-16 rounded-full bg-[#EFE9DF] group-hover:bg-[#E3D8C8] flex items-center justify-center mx-auto text-[#B88F58] transition-colors">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif-display font-bold text-lg text-[#11100F]">
                    No photo selected
                  </p>
                  <p className="text-xs text-[#8C827A] font-semibold mt-0.5">
                    Tap to add a photo
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Photo Guidelines List */}
          <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl p-4 sm:p-5 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B]">
              PHOTO GUIDELINES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A423C]">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Full body in frame, head to feet</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Face clear and sharp</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>Standing straight, good lighting</span>
              </div>
              <div className="flex items-start gap-2">
                <X className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span>No selfies or group photos</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div>
            <button
              onClick={handleUploadClick}
              disabled={!selectedPhoto}
              className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md ${
                selectedPhoto
                  ? 'bg-[#11100F] hover:bg-[#2C2723] text-white cursor-pointer active:scale-98'
                  : 'bg-[#E2DDD5] text-[#9A9086] cursor-not-allowed opacity-70'
              }`}
            >
              <span>Upload & Continue</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[#8C827A] text-center mt-2.5">
              * Photo upload is mandatory to build your 3D Style Twin avatar
            </p>
          </div>

        </div>
      </div>

      {/* Footer Branding */}
      <footer className="text-center text-xs text-[#8C827A] py-2">
        © 2026 HOY. House of You. All rights reserved.
      </footer>

      {/* Hidden Native File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelected}
        className="hidden"
      />

      {/* STEP 2: PHOTO SOURCE MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="bg-[#FAF8F5] text-[#11100F] border border-[#EAE2D8] rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8C827A] hover:text-[#11100F] p-1.5 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-display text-xl font-bold text-[#11100F] mb-4 text-center">
              Add Your Photo
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  cameraInputRef.current?.click();
                }}
                className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-[#DDD5CB] hover:border-[#B88F58] hover:shadow-md transition-all cursor-pointer group space-y-2 text-center"
              >
                <div className="size-12 rounded-full bg-[#FAF8F5] group-hover:bg-[#F2E8DB] flex items-center justify-center text-[#B88F58] transition-colors">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#11100F]">TAKE PHOTO</p>
                  <p className="text-[10px] text-[#8C827A]">Wide-angle camera</p>
                </div>
              </button>

              <button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-[#DDD5CB] hover:border-[#B88F58] hover:shadow-md transition-all cursor-pointer group space-y-2 text-center"
              >
                <div className="size-12 rounded-full bg-[#FAF8F5] group-hover:bg-[#F2E8DB] flex items-center justify-center text-[#B88F58] transition-colors">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-xs text-[#11100F]">CHOOSE FILE</p>
                  <p className="text-[10px] text-[#8C827A]">From gallery</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
