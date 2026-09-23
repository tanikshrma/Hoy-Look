import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle, ArrowRight, MessageSquare, Loader2, Info } from 'lucide-react';
import hoyLogo from '../assets/HOY Logo.avif';
import { useAuth } from '../context/AuthContext';

interface WhatsAppAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const WhatsAppAuthModal: React.FC<WhatsAppAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { setAuthenticatedUser } = useAuth();

  // Step state: 1 = Phone & Consent, 2 = 4-digit OTP verification
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consent, setConsent] = useState(false);
  const [showConsentDetails, setShowConsentDetails] = useState(false);

  // OTP inputs: array of 4 digits
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Async & Error States
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Resend Countdown Timer (starts at 30s)
  const [resendCountdown, setResendCountdown] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus first OTP box automatically when entering Step 2
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        otpRefs[0].current?.focus();
      }, 150);

      startResendTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const startResendTimer = () => {
    setResendCountdown(30);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!isOpen) return null;

  // Format Phone Input for display
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    let val = e.target.value;
    // Keep plus, digits, and space
    if (!val.startsWith('+') && val.length > 0) {
      val = '+' + val.replace(/\D/g, '');
    }
    setPhoneNumber(val);
  };

  // Step 1: Request OTP
  const handleSendOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setErrorMessage('Please enter a valid WhatsApp number with country code (e.g. +91 9876543210).');
      return;
    }

    if (!consent) {
      setErrorMessage('Please agree before continuing.');
      return;
    }

    try {
      setIsSendingOtp(true);
      // Realistic simulated fast network dispatch on the client side
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Success -> move to Step 2
      setStep(2);
      setOtpDigits(['', '', '', '']);
      setSuccessMessage('OTP code sent successfully to your WhatsApp! (Use 1234 or any 4 digits to test)');
      setTimeout(() => setSuccessMessage(null), 5000);

    } catch (err) {
      console.error('Send OTP error:', err);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Step 2: Single OTP digit change
  const handleOtpDigitChange = (index: number, value: string) => {
    setErrorMessage(null);
    // Allow numeric input only
    const digit = value.replace(/\D/g, '').slice(-1);

    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    // Auto-advance focus
    if (digit && index < 3) {
      otpRefs[index + 1].current?.focus();
    }

    // Check if complete 4 digits
    if (digit && index === 3 && newDigits.every((d) => d !== '')) {
      handleVerifyOTP(newDigits.join(''));
    }
  };

  // Handle Backspace navigation
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  // Handle Paste event for 4 digits
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

    if (pastedData.length === 4) {
      const digits = pastedData.split('');
      setOtpDigits(digits);
      otpRefs[3].current?.focus();
      handleVerifyOTP(pastedData);
    } else if (pastedData.length > 0) {
      const digits = [...otpDigits];
      for (let i = 0; i < pastedData.length; i++) {
        digits[i] = pastedData[i];
      }
      setOtpDigits(digits);
      if (pastedData.length < 4) {
        otpRefs[pastedData.length].current?.focus();
      }
    }
  };

  // Step 2: Submit OTP Verification
  const handleVerifyOTP = async (codeToVerify?: string) => {
    const finalOtp = codeToVerify || otpDigits.join('');
    setErrorMessage(null);

    if (finalOtp.length < 4) {
      setErrorMessage('Please enter the complete 4-digit OTP code.');
      return;
    }

    try {
      setIsVerifyingOtp(true);
      // Simulated fast client verification
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockUser = {
        id: 'usr_' + Date.now().toString(36),
        phoneNumber: phoneNumber.trim(),
        createdAt: new Date().toISOString(),
      };

      setAuthenticatedUser(mockUser);
      if (onSuccess) onSuccess();
      onClose();

    } catch (err) {
      console.error('Verify OTP error:', err);
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendClick = () => {
    if (resendCountdown > 0 || isSendingOtp) return;
    handleSendOTP();
    startResendTimer();
  };

  const isFormValidStep1 = phoneNumber.trim().length >= 8 && consent;

  return (
    <div
      id="whatsapp-auth-modal-overlay"
      className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="whatsapp-auth-modal-card"
        className="bg-[#FAF8F5] text-[#11100F] border border-[#EAE2D8] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8C827A] hover:text-[#11100F] p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Brand Icon */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={hoyLogo}
            alt="HOY"
            className="h-7 w-auto object-contain"
          />
          <div className="h-4 w-[1px] bg-[#E2D8CD]" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#8C7A6B] uppercase font-sans-body">
            AUTHENTICATION
          </span>
        </div>

        {/* STEP 1: WhatsApp Number & Consent */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#11100F] leading-tight">
                Welcome to HOY.
              </h3>
              <p className="text-xs sm:text-sm text-[#615852] font-sans-body mt-1.5 leading-relaxed">
                Enter your WhatsApp number to receive a one-time code.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-[#FDF2F2] border border-[#F8D7DA] text-[#B91C1C] text-xs font-sans-body flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626]" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSendOTP} className="space-y-5">
              {/* WhatsApp Number Field */}
              <div>
                <label
                  htmlFor="whatsapp-phone-input"
                  className="block text-[11px] uppercase tracking-wider font-semibold text-[#7A6F66] mb-1.5"
                >
                  WhatsApp Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1.5 text-[#25D366] pointer-events-none">
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </div>
                  <input
                    id="whatsapp-phone-input"
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full pl-10 pr-4 py-3.5 bg-white border border-[#DDD5CB] rounded-2xl text-sm font-sans-body font-semibold text-[#11100F] placeholder-[#A0958A] shadow-xs focus:outline-none focus:border-[#B88F58] focus:ring-2 focus:ring-[#B88F58]/20 transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#8C827A] mt-1 font-sans-body">
                  Example: +91 9876543210
                </p>
              </div>

              {/* Consent Checkbox */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrorMessage(null);
                    }}
                    className="mt-0.5 size-4 rounded-md border-[#CBD5E1] text-[#B88F58] focus:ring-[#B88F58] cursor-pointer"
                  />
                  <span className="text-xs text-[#4A423C] font-sans-body leading-relaxed group-hover:text-[#11100F] transition-colors">
                    I agree to HOY processing my photos & wardrobe images for AI styling.
                  </span>
                </label>

                <div className="pl-7">
                  <button
                    type="button"
                    onClick={() => setShowConsentDetails(!showConsentDetails)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B88F58] hover:text-[#9A733E] underline underline-offset-2 cursor-pointer"
                  >
                    <Info className="w-3 h-3" />
                    <span>Read & agree</span>
                  </button>
                </div>

                {/* Consent details accordion */}
                {showConsentDetails && (
                  <div className="mt-2 p-3 bg-white border border-[#EBE3DA] rounded-xl text-[11px] text-[#615852] space-y-1 animate-in fade-in duration-150">
                    <p className="font-semibold text-[#11100F]">HOY AI Styling Privacy Terms:</p>
                    <p>• Your uploaded wardrobe images are processed strictly for personalized outfit recommendations.</p>
                    <p>• Data is encrypted in transit and stored securely with private access controls.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValidStep1 || isSendingOtp}
                className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                  isFormValidStep1 && !isSendingOtp
                    ? 'bg-[#11100F] hover:bg-[#2C2723] text-white cursor-pointer active:scale-98'
                    : 'bg-[#E2DDD5] text-[#9A9086] cursor-not-allowed opacity-70'
                }`}
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: 4-Digit OTP Verification */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8EE] border border-[#B7ECC8] text-[#16A34A] text-[11px] font-semibold tracking-wide mb-3">
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>OTP sent via WhatsApp</span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#11100F] leading-tight">
                Verify your number
              </h3>
              <p className="text-xs sm:text-sm text-[#615852] font-sans-body mt-1.5 leading-relaxed">
                We sent a 4-digit code to <strong className="text-[#11100F]">{phoneNumber}</strong>
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-[#FDF2F2] border border-[#F8D7DA] text-[#B91C1C] text-xs font-sans-body flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DC2626]" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Success Message Banner */}
            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs font-sans-body flex items-start gap-2.5 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2563EB]" />
                <span className="leading-snug">{successMessage}</span>
              </div>
            )}

            {/* 4 OTP Input Boxes */}
            <div className="py-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#7A6F66] mb-3 text-center">
                Enter 4-Digit OTP Code
              </label>

              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="size-12 sm:size-14 text-center text-xl sm:text-2xl font-bold font-sans-body rounded-2xl border border-[#DDD5CB] bg-white text-[#11100F] shadow-xs focus:outline-none focus:border-[#B88F58] focus:ring-2 focus:ring-[#B88F58]/30 transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerifyOTP()}
              disabled={otpDigits.some((d) => d === '') || isVerifyingOtp}
              className={`w-full py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                otpDigits.every((d) => d !== '') && !isVerifyingOtp
                  ? 'bg-[#11100F] hover:bg-[#2C2723] text-white cursor-pointer active:scale-98'
                  : 'bg-[#E2DDD5] text-[#9A9086] cursor-not-allowed opacity-70'
              }`}
            >
              {isVerifyingOtp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify & Sign In</span>
                  <span>✓</span>
                </>
              )}
            </button>

            {/* Action Links: Change Number & Resend Timer */}
            <div className="pt-2 flex items-center justify-between text-xs font-sans-body border-t border-[#EAE2D8]">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setErrorMessage(null);
                }}
                className="text-[#615852] hover:text-[#11100F] font-semibold transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>← Change number</span>
              </button>

              <div>
                {resendCountdown > 0 ? (
                  <span className="text-[#8C827A] font-medium">
                    Resend in <strong className="text-[#11100F]">{resendCountdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendClick}
                    disabled={isSendingOtp}
                    className="text-[#B88F58] hover:text-[#9A733E] font-bold underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
