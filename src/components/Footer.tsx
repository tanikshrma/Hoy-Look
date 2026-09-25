import React from 'react';
import hoyLogoWhite from '../assets/HOY Logo White.avif';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenPolicy?: (key: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onOpenPolicy }) => {
  const handlePolicyClick = (key: string) => {
    if (onOpenPolicy) {
      onOpenPolicy(key);
    }
  };

  return (
    <footer id="main-footer" className="relative z-[80] bg-[#181615] text-[#FAF8F5] pt-8 sm:pt-20 pb-6 sm:pb-12 border-t border-[#2B2622] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid: Logo + 2 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 pb-8 sm:pb-16">
          
          {/* Logo Column (Full Width on mobile) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex items-start mb-2 md:mb-0">
            <img
              src={hoyLogoWhite}
              alt="HOY - House of You"
              className="h-14 sm:h-24 md:h-28 w-auto object-contain opacity-95"
              width="220"
              height="88"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* EXPLORE Column - Header Menu Links */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h5 className="font-semibold uppercase tracking-[0.2em] text-[#8C827A] mb-2 sm:mb-4 text-[10px] sm:text-xs">
              EXPLORE
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-[#D1C9C0] font-sans-body font-medium">
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition-colors">
                  Style Plans
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL & PRIVACY Column */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4">
            <h5 className="font-semibold uppercase tracking-[0.2em] text-[#8C827A] mb-2 sm:mb-4 text-[10px] sm:text-xs">
              LEGAL & PRIVACY
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-[#D1C9C0] font-sans-body font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Privacy Policy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Payment Policy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Payment Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Disclaimer')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('Refund Policy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('AI & Image Use')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  AI & Image Use
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider Line */}
        <div className="border-t border-[#2D2723] pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-sm text-[#8C827A] font-sans-body text-center sm:text-left">
          <p>© 2026 HOY. House of You. All rights reserved.</p>
          <p className="text-[#A89D93]">Personal style, made intelligent.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
