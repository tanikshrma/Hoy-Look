import React, { useState, useRef } from 'react';
import { UploadCloud, ArrowLeft, ArrowRight, Camera, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import uploadSample from '../../assets/upload.webp';

interface PhotoUploadStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ onNext, onBack }) => {
  const { updateUserProfile } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(uploadSample);
  const [fileName, setFileName] = useState<string>('Sample-FullBody-Scan.jpg');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      setPreviewUrl(url);
      updateUserProfile({ photoUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleProceed = () => {
    if (previewUrl) {
      updateUserProfile({ photoUrl: previewUrl });
    }
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E2D9] p-6 sm:p-10 shadow-2xl animate-fade-in">
      {/* Step Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#9E6E38] text-[11px] font-bold tracking-widest uppercase border border-[#E9DEC9] mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Step 2 of 4 • Full-Body Photo</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1817] font-normal tracking-tight">
          Upload Your Full-Body Frame
        </h2>
        <p className="text-sm text-[#7A6F66] font-sans-body mt-2 max-w-md mx-auto">
          Our biometric fitting module creates a private 3D neural mannequin to guarantee perfect drape on every outfit.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
          isDragging
            ? 'border-[#9E6E38] bg-[#FAF5EE]'
            : 'border-[#DFD6CA] bg-[#FAF8F5] hover:border-[#9E6E38] hover:bg-[#FAF6F0]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-[#1A1817] shadow-md shrink-0 bg-black">
              <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
            </div>
            <div className="text-left flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E6E38] uppercase tracking-wider mb-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo Ready for AI Extraction</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1817] truncate">{fileName}</p>
              <p className="text-xs text-[#7A6F66] mt-1">
                Click to replace with another photo or drag and drop a new image.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#FAF0E1] text-[#9E6E38] flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#1A1817]">Drag & drop your full-body photo here</p>
            <p className="text-xs text-[#7A6F66] mt-1">or browse from your device (JPG, PNG, WebP up to 10MB)</p>
          </div>
        )}
      </div>

      {/* Photography Guide Tips */}
      <div className="mt-6 bg-[#FAF8F5] rounded-xl p-4 border border-[#EBE4D8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5C534B]">
        <div className="flex items-start gap-2">
          <span className="text-[#9E6E38] font-bold">01.</span>
          <span>Full length head-to-toe standing view</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[#9E6E38] font-bold">02.</span>
          <span>Good natural lighting against simple backdrop</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[#9E6E38] font-bold">03.</span>
          <span>Fitted or neutral everyday clothing</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8 mt-6 border-t border-[#EFE9DF] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#7A6F66] hover:text-[#1A1817] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A1817] hover:bg-[#332E2B] text-white text-xs font-bold uppercase tracking-widest shadow-md transition-all transform hover:scale-102 cursor-pointer"
        >
          <span>Run Neural Scan</span>
          <ArrowRight className="w-4 h-4 text-[#C5A880]" />
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadStep;
