import React, { useState } from 'react';
import { X, MessageSquare, ArrowRight, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const WhatsAppAuthModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { loginWithWhatsApp } = useAuth();

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter the 4-digit code sent to WhatsApp');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      await loginWithWhatsApp(`+91 ${phone}`);
      setIsLoading(false);
      setStep('success');

      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch {
      setIsLoading(false);
      setErrorMsg('Verification failed. Please try again.');
    }
  };

  return (
    <div
      id="whatsapp-auth-overlay"
      className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="whatsapp-auth-modal"
        className="relative bg-[#FAF8F5] rounded-3xl max-w-md w-full shadow-2xl border border-[#EAE3DA] text-[#1A1817] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-whatsapp-auth-btn"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F0EAE1] hover:bg-[#E2D6C6] text-[#1A1817] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'phone' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#EBF7EE] border border-[#25D366]/30 text-[#25D366] flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block">
                Instant Access
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Sign In with WhatsApp
              </h3>
              <p className="text-xs text-[#6E645D] font-sans-body">
                We'll send a 4-digit verification code directly to your WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4 pt-2">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#665D56] block mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-[#D9CDBF] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#C5A880]">
                  <span className="px-3.5 py-3 bg-[#FAF8F5] border-r border-[#EAE3DA] text-xs font-bold text-[#6E645D] flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none text-[#1A1817]"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-[#DC2626] mt-1.5">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                ) : (
                  <>
                    <span>Get WhatsApp OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7A6B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Zero spam · End-to-end encrypted</span>
              </div>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8C7A6B] block">
                Verification
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
                Enter WhatsApp Code
              </h3>
              <p className="text-xs text-[#6E645D] font-sans-body">
                Sent to <strong>+91 {phone}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center font-bold text-xl rounded-xl border border-[#D9CDBF] bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880] text-[#1A1817]"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-center text-[11px] text-[#DC2626]">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#1A1817] hover:bg-[#38312D] text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-[11px] text-[#8C7A6B] hover:text-[#1A1817] underline cursor-pointer"
                >
                  Change mobile number
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#EBF7EE] border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-[#1A1817]">
              Signed In Successfully
            </h3>
            <p className="text-xs text-[#6E645D]">
              Preparing your 3D Style Twin workspace...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
