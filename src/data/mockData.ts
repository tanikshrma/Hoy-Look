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
    title: 'The Modern Monochrome',
    category: 'Casual',
    image: style1,
    alt: 'Minimalist neutral tailored blazer with cream linen trousers',
    occasion: 'Weekend Brunch & Creative Office',
    stylingTip: 'Pair with warm gold accents and square-toe leather loafers for an effortless silhouette.',
    tags: ['Tailored', 'Warm Earth', 'Effortless'],
    items: [
      { name: 'Double-Breasted Linen Blazer', brand: 'Studio HOY', category: 'Outerwear', price: '$240' },
      { name: 'Wide-Leg Pleated Trousers', brand: 'Studio HOY', category: 'Bottoms', price: '$180' },
      { name: 'Ribbed Supima Cotton Tank', brand: 'Studio HOY', category: 'Tops', price: '$65' },
    ],
  },
  {
    id: 'look-2',
    title: 'Effortless Atelier Drape',
    category: 'Smart Casual',
    image: style2,
    alt: 'Structured asymmetric knit dress with structured leather bag',
    occasion: 'Gallery Openings & Dinner',
    stylingTip: 'Let the sculptural lines lead. Keep jewelry geometric and footwear matte black.',
    tags: ['Architectural', 'Clean Silhouette', 'Evening'],
    items: [
      { name: 'Asymmetric Ribbed Midi Dress', brand: 'Studio HOY', category: 'Dresses', price: '$290' },
      { name: 'Sculptural Calfskin Clutch', brand: 'HOY Leather', category: 'Accessories', price: '$320' },
    ],
  },
  {
    id: 'look-3',
    title: 'Luxe Structured Trench',
    category: 'Formal',
    image: style3,
    alt: 'Classic belted stone trench over cashmere crewneck',
    occasion: 'Executive Travel & Client Meetings',
    stylingTip: 'Tie the belt casually at the back during transit, or belt tight for high-structure authority.',
    tags: ['Outerwear', 'City Luxe', 'Timeless'],
    items: [
      { name: 'Water-Resistant Cotton Gabardine Trench', brand: 'HOY Heritage', category: 'Outerwear', price: '$480' },
      { name: 'Fine-Knit Cashmere Mockneck', brand: 'Studio HOY', category: 'Knitwear', price: '$210' },
    ],
  },
  {
    id: 'look-4',
    title: 'Golden Hour Tailoring',
    category: 'Evening',
    image: style4,
    alt: 'Caramel relaxed silk-blend suit with tonal accessories',
    occasion: 'Sunset Cocktails & Special Events',
    stylingTip: 'Monochromatic styling elongates the body. Subtle tonal contrast creates depth.',
    tags: ['Silk Blend', 'Monochrome', 'Occasion'],
    items: [
      { name: 'Relaxed Silk-Wool Blazer', brand: 'Studio HOY', category: 'Outerwear', price: '$360' },
      { name: 'Straight-Cut High-Rise Pant', brand: 'Studio HOY', category: 'Bottoms', price: '$220' },
    ],
  },
  {
    id: 'look-5',
    title: 'Quiet Luxury Weekend',
    category: 'Casual',
    image: style5,
    alt: 'Cream oversized cardigan with relaxed cropped trousers',
    occasion: 'Sunday Stroll & Casual Gatherings',
    stylingTip: 'Roll the sleeves to expose delicate wrist jewelry; add a neutral leather tote.',
    tags: ['Relaxed', 'Soft Textures', 'Minimal'],
    items: [
      { name: 'Chunky Wool-Alpaca Cardigan', brand: 'Studio HOY', category: 'Knitwear', price: '$310' },
      { name: 'Relaxed Tapered Chino', brand: 'Studio HOY', category: 'Bottoms', price: '$150' },
    ],
  },
  {
    id: 'look-6',
    title: 'Contemporary Edge',
    category: 'Party',
    image: style6,
    alt: 'Deep espresso leather jacket over tonal minimalist base',
    occasion: 'Night Out & Concerts',
    stylingTip: 'Contrast the buttery leather with soft matte cotton beneath for tactile dimension.',
    tags: ['Leather', 'Modern', 'Statement'],
    items: [
      { name: 'Boxy Nappa Leather Overshirt', brand: 'HOY Atelier', category: 'Outerwear', price: '$580' },
      { name: 'Raw Edge Heavy Cotton Tee', brand: 'Studio HOY', category: 'Tops', price: '$75' },
    ],
  },
  {
    id: 'look-7',
    title: 'Resort High-Summer Tailoring',
    category: 'Casual',
    image: style7,
    alt: 'Lightweight sandy linen set with refined open collar',
    occasion: 'Summer Getaways & Outdoor Dinners',
    stylingTip: 'Keep collar unbuttoned and finish with leather slide sandals and tortoiseshell sunglasses.',
    tags: ['Linen', 'Summer', 'Relaxed Fit'],
    items: [
      { name: 'Camp Collar Linen Shirt', brand: 'Studio HOY', category: 'Tops', price: '$140' },
      { name: 'Drawstring Linen Trousers', brand: 'Studio HOY', category: 'Bottoms', price: '$160' },
    ],
  },
];

export const STYLE_PLANS: StylePlan[] = [
  {
    id: 'capsule-curator',
    name: 'Curator Plan',
    subtitle: 'For discovering signature looks',
    monthlyPrice: '$29',
    annualPrice: '$24',
    billingFrequency: 'per month',
    ctaText: 'Choose Curator',
    features: [
      'Personalized style profile analysis',
      '8 AI-generated outfit capsules monthly',
      'Virtual wardrobe pairing tools',
      'Standard email styling support',
    ],
  },
  {
    id: 'bespoke-atelier',
    name: 'Atelier Plan',
    subtitle: 'Our most sought-after membership',
    monthlyPrice: '$59',
    annualPrice: '$49',
    billingFrequency: 'per month',
    isPopular: true,
    ctaText: 'Choose Atelier',
    features: [
      'Everything in Curator',
      'Unlimited AI look generation',
      'Occasion-specific custom capsule styling',
      'Direct 1-on-1 human stylist feedback',
      'Early access to seasonal drop edits',
    ],
  },
  {
    id: 'private-client',
    name: 'Private Client',
    subtitle: 'For total wardrobe transformation',
    monthlyPrice: '$119',
    annualPrice: '$99',
    billingFrequency: 'per month',
    ctaText: 'Choose Private Client',
    features: [
      'Everything in Atelier',
      'Full wardrobe audit & digitisation',
      'Dedicated senior personal stylist',
      'Custom garment sourcing assistance',
      'Priority VIP response under 2 hours',
    ],
  },
];
