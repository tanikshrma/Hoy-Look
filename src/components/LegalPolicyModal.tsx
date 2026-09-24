import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalPolicyModalProps {
  policyKey: string | null;
  onClose: () => void;
}

const POLICY_DETAILS: Record<string, { title: string; subtitle: string; content: string[] }> = {
  'Privacy Policy': {
    title: 'Privacy Policy',
    subtitle: 'How House of You protects your measurements, imagery, and personal profile.',
    content: [
      'House of You (HOY) respects your privacy. All uploaded full-body photos and selfies are encrypted using 256-bit AES encryption at rest and in transit.',
      'Your uploaded imagery is used exclusively to generate your personalized body silhouette and digital avatar twin for styling lookbooks. We never sell, license, or share your photos with third-party advertising networks.',
      'You retain full ownership of your data and can permanently delete your photos, measurements, and profile history at any time from your account settings.'
    ]
  },
  'Payment Policy': {
    title: 'Payment & Security Policy',
    subtitle: 'Transparent, encrypted billing for all styling subscriptions.',
    content: [
      'All payments for Free, Explorer, Insider, and Icon membership tiers are processed through PCI-DSS Level 1 certified payment gateways.',
      'We do not store your complete credit/debit card numbers or bank credentials on our servers.',
      'Subscriptions renew automatically each billing cycle (monthly or annually) based on your selected plan. You may cancel renewal at any time before the billing date.'
    ]
  },
  'Grievance Policy': {
    title: 'Grievance Redressal Policy',
    subtitle: 'Direct support and dispute resolution for all HOY members.',
    content: [
      'In accordance with Information Technology guidelines, our dedicated grievance officer addresses any member concerns promptly.',
      'For questions regarding styling deliveries, billing discrepancies, or account privacy, email us at support@hoylook.com with your registered email.',
      'All formal inquiries receive a ticket confirmation within 4 hours and final resolution within 24 to 48 business hours.'
    ]
  },
  'Disclaimer': {
    title: 'Disclaimer Policy',
    subtitle: 'Editorial curation and retail availability disclosures.',
    content: [
      'HOY Look provides algorithmic and stylist-curated outfit recommendations based on the preferences and measurements you supply.',
      'While we partner with premier brands to provide real-time product links, garment inventory and pricing are set by third-party retailers and may fluctuate.',
      'Colors and garment textures displayed on your digital twin are calibrated for maximum realism but may appear slightly varied across different display screen gamuts.'
    ]
  },
  'Refund Policy': {
    title: 'Cancellation & Refund Policy',
    subtitle: 'Satisfaction guarantee for our personalized styling services.',
    content: [
      'If your first curated lookbook capsule does not meet your expectations, you may request a free restyle with a senior stylist within 7 days.',
      'Paid subscription fees can be refunded pro-rata within 7 days of activation if no digital capsules have been generated for that billing period.',
      'Approved refunds are credited back to your original payment method within 5 to 7 business days.'
    ]
  },
  'AI & Image Use': {
    title: 'AI & Image Use Policy',
    subtitle: 'Ethical, consent-driven generative styling principles.',
    content: [
      'HOY uses private generative models specifically fine-tuned on fashion draping, fabric physics, and body proportions.',
      'Your photos are strictly quarantined in isolated tenant storage and are never used to train public foundational AI models.',
      'Our algorithms are trained to respect diverse body shapes, heights, and skin tones with zero distortion or unrealistic alterations.'
    ]
  },
  'Terms & Conditions': {
    title: 'Terms & Conditions',
    subtitle: 'General service terms for using the HOY platform.',
    content: [
      'By creating an account or using HOY Look styling tools, you agree to adhere to our community guidelines and fair usage terms.',
      'Curated lookbooks and digital styling twins are intended solely for personal, non-commercial use.',
      'HOY reserves the right to enhance features and optimize styling models to deliver the highest quality recommendations.'
    ]
  }
};

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({ policyKey, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (policyKey) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [policyKey, onClose]);

  if (!policyKey) return null;

  const data = POLICY_DETAILS[policyKey] || {
    title: policyKey,
    subtitle: 'House of You Editorial Policies',
    content: ['For complete information, contact our support team at support@hoylook.com.']
  };

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] text-[#1E1E1E] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8DFC2] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8DFC2]">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#181615] flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5 text-[#C5A880]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8C7A6B]">
                HOY LEGAL
              </span>
              <h3 id="policy-modal-title" className="font-serif-display text-xl sm:text-2xl font-bold text-[#181615]">
                {data.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-9 rounded-full bg-white hover:bg-[#EFE9DF] border border-[#DDD3C4] flex items-center justify-center text-[#554C42] hover:text-[#181615] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-xs sm:text-sm font-medium text-[#7A6E63] leading-relaxed">
          {data.subtitle}
        </p>

        {/* Content Paragraphs */}
        <div className="mt-4 space-y-3">
          {data.content.map((para, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-[#443D36] leading-relaxed font-sans-body">
              {para}
            </p>
          ))}
        </div>

        {/* Close Action Button */}
        <div className="mt-6 pt-4 border-t border-[#E8DFC2] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#181615] hover:bg-[#2C2825] text-white font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
