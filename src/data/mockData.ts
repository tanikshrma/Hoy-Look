import style1 from '../assets/style1.webp';
import style2 from '../assets/style2.webp';
import style3 from '../assets/style3.webp';
import style4 from '../assets/style4.webp';
import style5 from '../assets/style5.webp';
import style6 from '../assets/style6.webp';
import style7 from '../assets/style7.webp';
import { LookCapsule, StylePlan } from '../types';

export const CURATED_LOOKS: LookCapsule[] = [
  {
    id: 'look-1',
    number: '01',
    title: 'The Modern Monochrome',
    category: 'Casual',
    image: style1,
    alt: 'Minimalist neutral tailored blazer with cream linen trousers',
    occasion: 'Weekend Brunch & Creative Office',
    stylingTip: 'Pair with warm gold accents and square-toe leather loafers for an effortless silhouette.',
    tags: ['TAILORED', 'WARM EARTH'],
    items: [
      { name: 'Double-Breasted Linen Blazer', brand: 'Studio HOY', category: 'Outerwear', price: '₹18,500' },
      { name: 'Wide-Leg Pleated Trousers', brand: 'Studio HOY', category: 'Bottoms', price: '₹12,400' },
      { name: 'Ribbed Supima Cotton Tank', brand: 'Studio HOY', category: 'Tops', price: '₹4,800' },
    ],
  },
  {
    id: 'look-2',
    number: '02',
    title: 'Effortless Atelier Drape',
    category: 'Smart Casual',
    image: style2,
    alt: 'Structured asymmetric knit dress with structured leather bag',
    occasion: 'Gallery Openings & Dinner',
    stylingTip: 'Let the sculptural lines lead. Keep jewelry geometric and footwear matte black.',
    tags: ['ARCHITECTURAL', 'CLEAN SILHOUETTE'],
    items: [
      { name: 'Asymmetric Ribbed Midi Dress', brand: 'Studio HOY', category: 'Dresses', price: '₹22,000' },
      { name: 'Sculptural Calfskin Clutch', brand: 'HOY Leather', category: 'Accessories', price: '₹24,500' },
    ],
  },
  {
    id: 'look-3',
    number: '03',
    title: 'Luxe Structured Trench',
    category: 'Formal',
    image: style3,
    alt: 'Classic belted stone trench over cashmere crewneck',
    occasion: 'Executive Travel & Client Meetings',
    stylingTip: 'Tie the belt casually at the back during transit, or belt tight for high-structure authority.',
    tags: ['CITY LUXE', 'TIMELESS'],
    items: [
      { name: 'Water-Resistant Cotton Gabardine Trench', brand: 'HOY Heritage', category: 'Outerwear', price: '₹36,000' },
      { name: 'Fine-Knit Cashmere Mockneck', brand: 'Studio HOY', category: 'Knitwear', price: '₹16,200' },
    ],
  },
  {
    id: 'look-4',
    number: '04',
    title: 'Golden Hour Tailoring',
    category: 'Evening',
    image: style4,
    alt: 'Caramel relaxed silk-blend suit with tonal accessories',
    occasion: 'Sunset Cocktails & Special Events',
    stylingTip: 'Monochromatic styling elongates the body. Subtle tonal contrast creates depth.',
    tags: ['SILK BLEND', 'MONOCHROME'],
    items: [
      { name: 'Relaxed Silk-Wool Blazer', brand: 'Studio HOY', category: 'Outerwear', price: '₹28,000' },
      { name: 'Straight-Cut High-Rise Pant', brand: 'Studio HOY', category: 'Bottoms', price: '₹17,500' },
    ],
  },
  {
    id: 'look-5',
    number: '05',
    title: 'Quiet Luxury Weekend',
    category: 'Casual',
    image: style5,
    alt: 'Cream oversized cardigan with relaxed cropped trousers',
    occasion: 'Sunday Stroll & Casual Gatherings',
    stylingTip: 'Roll the sleeves to expose delicate wrist jewelry; add a neutral leather tote.',
    tags: ['RELAXED', 'SOFT TEXTURES'],
    items: [
      { name: 'Chunky Wool-Alpaca Cardigan', brand: 'Studio HOY', category: 'Knitwear', price: '₹24,000' },
      { name: 'Relaxed Tapered Chino', brand: 'Studio HOY', category: 'Bottoms', price: '₹11,500' },
    ],
  },
  {
    id: 'look-6',
    number: '06',
    title: 'Contemporary Edge',
    category: 'Party',
    image: style6,
    alt: 'Deep espresso leather jacket over tonal minimalist base',
    occasion: 'Night Out & Concerts',
    stylingTip: 'Contrast the buttery leather with soft matte cotton beneath for tactile dimension.',
    tags: ['LEATHER', 'MODERN STATEMENT'],
    items: [
      { name: 'Boxy Nappa Leather Overshirt', brand: 'HOY Atelier', category: 'Outerwear', price: '₹42,000' },
      { name: 'Raw Edge Heavy Cotton Tee', brand: 'Studio HOY', category: 'Tops', price: '₹5,800' },
    ],
  },
  {
    id: 'look-7',
    number: '07',
    title: 'Resort High-Summer Tailoring',
    category: 'Casual',
    image: style7,
    alt: 'Lightweight sandy linen set with refined open collar',
    occasion: 'Summer Getaways & Outdoor Dinners',
    stylingTip: 'Keep collar unbuttoned and finish with leather slide sandals and tortoiseshell sunglasses.',
    tags: ['LINEN SET', 'SUMMER GETAWAY'],
    items: [
      { name: 'Camp Collar Linen Shirt', brand: 'Studio HOY', category: 'Tops', price: '₹11,000' },
      { name: 'Drawstring Linen Trousers', brand: 'Studio HOY', category: 'Bottoms', price: '₹12,800' },
    ],
  },
];

export const STYLE_PLANS: StylePlan[] = [
  {
    id: 'explorer',
    tier: 'OPEN TO EVERYONE',
    name: 'Explorer',
    subtitle: 'For regular outfit updates',
    monthlyPrice: '499',
    annualPrice: '399',
    billingFrequency: 'per month',
    ctaText: 'CHOOSE EXPLORER',
    features: [
      '50 looks with shopping links',
      'Style from your own wardrobe',
    ],
  },
  {
    id: 'insider',
    tier: 'THE HOY CLUB',
    name: 'Insider',
    subtitle: 'Our most popular club tier',
    monthlyPrice: '999',
    annualPrice: '799',
    billingFrequency: 'per month',
    isPopular: true,
    isDark: true,
    ctaText: 'CHOOSE INSIDER',
    features: [
      '100 looks with shopping links',
      'Style from your own wardrobe',
      'Stylist session, monthly',
    ],
  },
  {
    id: 'icon',
    tier: 'THE HOY CLUB',
    name: 'Icon',
    subtitle: 'The ultimate VIP wardrobe experience',
    monthlyPrice: '1999',
    annualPrice: '1599',
    billingFrequency: 'per month',
    ctaText: 'CHOOSE ICON',
    features: [
      'Unlimited looks',
      'Style from your own wardrobe',
      'Stylist session, weekly',
    ],
  },
];
