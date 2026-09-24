export interface GarmentItem {
  id?: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  imageUrl?: string;
  material?: string;
  color?: string;
}

export interface LookCapsule {
  id: string;
  number?: string;
  title: string;
  category: 'Casual' | 'Formal' | 'Smart Casual' | 'Evening' | 'Party';
  image: string;
  alt: string;
  items: GarmentItem[];
  tags: string[];
  stylingTip: string;
  occasion: string;
  tagline?: string;
  stylistNote?: string;
  totalPrice?: string;
  palette?: string[];
  stylistAvatar?: string;
  stylistName?: string;
  stylistRole?: string;
}

export interface StylePlan {
  id: string;
  name: string;
  tier?: string;
  subtitle: string;
  description?: string;
  monthlyPrice: string;
  annualPrice: string;
  billingFrequency: string;
  features: string[];
  isPopular?: boolean;
  isDark?: boolean;
  ctaText: string;
}

export type OccasionType = 'Everyday Casual' | 'Executive & Work' | 'Evening & Gala' | 'Resort & Travel' | 'Weekend Minimal';

export interface QuizAnswers {
  styleGoals: string[];
  bodyShape: string;
  colorPalette: string[];
  budgetTier: string;
  vibe: string;
  occasion?: OccasionType;
}
