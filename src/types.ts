export type OccasionType = 'All' | 'Office' | 'Brunch' | 'Date Night' | 'Weekend' | 'Wedding' | 'Travel';

export interface LookItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  color: string;
  material: string;
}

export interface LookCapsule {
  id: string;
  title: string;
  occasion: OccasionType;
  tagline: string;
  image: string;
  stylistName: string;
  stylistRole: string;
  stylistAvatar: string;
  stylistNote: string;
  totalPrice: number;
  itemsCount: number;
  items: LookItem[];
  palette: string[];
  tags?: string[];
  number?: string;
}

export interface StylePlan {
  id: string;
  name: string;
  tier: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isDark?: boolean;
  ctaText: string;
}
