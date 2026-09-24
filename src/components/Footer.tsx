import React from 'react';
import hoyLogoWhite from '../assets/HOY Logo White.avif';

interface FooterProps {
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz }) => {
  return (
    <footer id="main-footer" className="relative z-[80] bg-[#181615] text-[#FAF8F5] pt-8 sm:pt-20 pb-6 sm:pb-12 border-t border-[#2B2622] shadow-[0_-25px_60px_rgba(0,0,0,0.35)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid: Logo + 3 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 pb-8 sm:pb-16">
          
          {/* Logo Column (Full Width on mobile) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex items-start mb-2 md:mb-0">
            <img
              src={hoyLogoWhite}
              alt="HOY - House of You"
              className="h-14 sm:h-24 md:h-28 w-auto object-contain opacity-95"
            />
          </div>

          {/* EXPLORE Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <h5 className="font-semibold uppercase tracking-[0.2em] text-[#8C827A] mb-2 sm:mb-4 text-[10px] sm:text-xs">
              EXPLORE
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-[#D1C9C0] font-sans-body font-medium">
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#looks" className="hover:text-white transition-colors">
                  Styled feed
                </a>
              </li>
              <li>
                <a href="#motion" className="hover:text-white transition-colors">
                  Wardrobe
                </a>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-left cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* LEGAL & PRIVACY Column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <h5 className="font-semibold uppercase tracking-[0.2em] text-[#8C827A] mb-2 sm:mb-4 text-[10px] sm:text-xs">
              LEGAL & PRIVACY
            </h5>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-[#D1C9C0] font-sans-body font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Payment Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Grievance Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Disclaimer
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Refund Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  AI & Image Use
                </span>
              </li>
            </ul>
          </div>

          {/* ACCOUNT Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t border-[#2B2622]/60 md:border-0">
            <h5 className="font-semibold uppercase tracking-[0.2em] text-[#8C827A] mb-2 sm:mb-4 text-[10px] sm:text-xs">
              ACCOUNT
            </h5>
            <ul className="flex md:block items-center gap-6 md:space-y-3 text-xs sm:text-sm text-[#D1C9C0] font-sans-body font-medium">
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sign in
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors cursor-pointer text-left">
                  Create account
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
