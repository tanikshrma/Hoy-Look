import style1 from '../assets/style1.webp';
import style2 from '../assets/style2.webp';
import style3 from '../assets/style3.webp';
import style4 from '../assets/style4.webp';
import style5 from '../assets/style5.webp';
import style6 from '../assets/style6.webp';
import style7 from '../assets/style7.webp';

export const CURATED_LOOKS = [
  {
    id: 'look-1',
    number: '01',
    title: 'Coastal Linen',
    occasion: 'Travel',
    tags: ['RESORT', 'VACATION'],
    tagline: 'Sun-bleached linen and effortless coastal nonchalance.',
    image: style1,
    stylistName: 'Elena Rostova',
    stylistRole: 'Senior Editorial Stylist',
    stylistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'Relaxed shirting draped over crisp ecru linen trousers balances seaside leisure with sophisticated structure.',
    totalPrice: 420,
    itemsCount: 4,
    palette: ['#E6DED5', '#2B2623', '#A89279', '#8C6239'],
    items: [
      { id: 'i-1', name: 'Open Collar Striped Resort Shirt', brand: 'Atelier Hoy', category: 'Tops', price: 180, color: 'Rust Stripe', material: 'Breathable Cotton Linen', imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-2', name: 'Pleated Ecru Linen Trousers', brand: 'Soleil Studio', category: 'Bottoms', price: 160, color: 'Bone Cream', material: '100% Belgian Linen', imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-3', name: 'Woven Leather Sandals', brand: 'Palma Footwear', category: 'Shoes', price: 80, color: 'Cognac', material: 'Italian Calfskin', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-2',
    number: '02',
    title: 'Modern Tuxedo',
    occasion: 'Wedding',
    tags: ['BLACK TIE', 'TAILORED'],
    tagline: 'Precision sartorial lines crafted for grand evenings.',
    image: style2,
    stylistName: 'Marcus Vance',
    stylistRole: 'Celebrity Wardrobe Consultant',
    stylistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'Satin lapel contrasts against midnight black super-130s wool for an iconic formal profile.',
    totalPrice: 850,
    itemsCount: 4,
    palette: ['#0A0A0A', '#FFFFFF', '#1F1B18', '#C5A880'],
    items: [
      { id: 'i-4', name: 'Single-Breasted Tuxedo Jacket', brand: 'Hoy Atelier', category: 'Outerwear', price: 490, color: 'Midnight Noir', material: 'Superfine Virgin Wool', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-5', name: 'Pleated Marcella Tuxedo Shirt', brand: 'Kollektiv', category: 'Tops', price: 160, color: 'Crisp White', material: 'Sea Island Cotton', imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-6', name: 'Silk Grosgrain Bow Tie', brand: 'Maison Or', category: 'Accessories', price: 75, color: 'Black Silk', material: '100% Mulberry Silk', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-7', name: 'Patent Leather Oxford Shoes', brand: 'Palma Footwear', category: 'Shoes', price: 210, color: 'Gloss Black', material: 'Mirror Calfskin', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-3',
    number: '03',
    title: 'City Tailored',
    occasion: 'Office',
    tags: ['STREET', 'CAPSULE'],
    tagline: 'Harmonious olive and alabaster street tailoring.',
    image: style3,
    stylistName: 'Camille Laurent',
    stylistRole: 'Parisian Style Editor',
    stylistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'Complementary tones of olive sage and warm biscuit tan create a striking, photogenic everyday presence.',
    totalPrice: 560,
    itemsCount: 4,
    palette: ['#6B705C', '#DDBEA9', '#FFE8D6', '#2F3E46'],
    items: [
      { id: 'i-8', name: 'Sleeveless Utility Jumpsuit', brand: 'Soleil Studio', category: 'Dresses', price: 240, color: 'Olive Sage', material: 'Tencel Lyocell', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-9', name: 'Relaxed Oxford Resort Shirt', brand: 'Atelier Hoy', category: 'Tops', price: 140, color: 'Sand White', material: 'Organic Cotton', imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-10', name: 'Belted Pleated Chino Trousers', brand: 'Kollektiv', category: 'Bottoms', price: 180, color: 'Alabaster Tan', material: 'Cotton Gabardine', imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-4',
    number: '04',
    title: 'Bohemian Luxe',
    occasion: 'Weekend',
    tags: ['RESORT', 'STATEMENT'],
    tagline: 'Vibrant silk foulard accents with fluid palazzo trousers.',
    image: style4,
    stylistName: 'Elena Rostova',
    stylistRole: 'Senior Editorial Stylist',
    stylistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'A patterned silk halter crop top styled with high-waisted sand trousers captures sunny cosmopolitan energy.',
    totalPrice: 480,
    itemsCount: 4,
    palette: ['#2A6F97', '#E9D8A6', '#EE9B00', '#001219'],
    items: [
      { id: 'i-11', name: 'Printed Silk Scarf Halter Top', brand: 'Riviera Maison', category: 'Tops', price: 170, color: 'Cerulean Multi', material: '100% Silk Twill', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-12', name: 'High-Waist Wide Palazzo Pant', brand: 'Soleil Studio', category: 'Bottoms', price: 190, color: 'Desert Sand', material: 'Fluid Linen Blend', imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-13', name: 'Tortoise Cat-Eye Sunglasses', brand: 'Hoy Atelier', category: 'Accessories', price: 65, color: 'Dark Amber', material: 'Italian Acetate', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-14', name: 'Woven Raffia Tote Bag', brand: 'Artisan Hoy', category: 'Bags', price: 95, color: 'Natural Straw', material: 'Madagascar Raffia', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-5',
    number: '05',
    title: 'Minimalist Chic',
    occasion: 'Office',
    tags: ['STUDIO', 'MONOCHROME'],
    tagline: 'Sculptural rib knitwear and pristine wide ivory trousers.',
    image: style5,
    stylistName: 'Camille Laurent',
    stylistRole: 'Parisian Style Editor',
    stylistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'Tonal ivory on bone white creates an elongated, refined silhouette suitable from morning desk to gallery opening.',
    totalPrice: 530,
    itemsCount: 3,
    palette: ['#F8F6F0', '#EAE4D9', '#3D352E', '#C5A880'],
    items: [
      { id: 'i-15', name: 'Fine Rib Knit High-Neck Top', brand: 'Kollektiv', category: 'Tops', price: 150, color: 'Alabaster Ivory', material: 'Silk Cashmere', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-16', name: 'Architectural Pleated White Trousers', brand: 'Studio Verona', category: 'Bottoms', price: 220, color: 'Pure Ivory', material: 'Heavy Wool Crepe', imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-17', name: 'Structured Leather Top-Handle Bag', brand: 'Hoy Atelier', category: 'Bags', price: 160, color: 'Chalk Bone', material: 'Smooth Calfskin', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-6',
    number: '06',
    title: 'Velvet Noir',
    occasion: 'Date Night',
    tags: ['EVENING', 'SILK'],
    tagline: 'Understated sensuality with lustrous texture and clean lines.',
    image: style6,
    stylistName: 'Marcus Vance',
    stylistRole: 'Celebrity Wardrobe Consultant',
    stylistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'A deep terracotta slip dress layered under a sharp blazer creates an undeniably chic, timeless mood.',
    totalPrice: 540,
    itemsCount: 4,
    palette: ['#B85D43', '#1F1B18', '#D8C29D', '#F2ECE4'],
    items: [
      { id: 'i-18', name: 'Sandwashed Silk Slip Midi', brand: 'Soleil Studio', category: 'Dresses', price: 260, color: 'Burnt Terracotta', material: '100% Mulberry Silk', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-19', name: 'Tailored Tuxedo Blazer', brand: 'Hoy Atelier', category: 'Outerwear', price: 180, color: 'Midnight Noir', material: 'Wool Crepe', imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-20', name: 'Barely-There Leather Mule', brand: 'Palma Footwear', category: 'Shoes', price: 160, color: 'Warm Tan', material: 'Italian Nappa Leather', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'look-7',
    number: '07',
    title: 'Cashmere Horizon',
    occasion: 'Weekend',
    tags: ['AUTUMN', 'LAYERING'],
    tagline: 'Casual elegance elevated through tactile luxury fabrics.',
    image: style7,
    stylistName: 'Elena Rostova',
    stylistRole: 'Senior Editorial Stylist',
    stylistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stylistNote: 'Cashmere in camel tone matches beautifully with dark rinse denim and understated loafers.',
    totalPrice: 490,
    itemsCount: 3,
    palette: ['#C5A880', '#302A24', '#7D6A58', '#FFFFFF'],
    items: [
      { id: 'i-21', name: 'Chunky Ribbed Cashmere Crew', brand: 'Nordic Hoy', category: 'Knitwear', price: 240, color: 'Camel Tan', material: '100% Mongolian Cashmere', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-22', name: 'Straight Raw Selvedge Denim', brand: 'Kollektiv', category: 'Denim', price: 130, color: 'Deep Indigo', material: '13oz Japanese Cotton', imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80' },
      { id: 'i-23', name: 'Leather Penny Loafer', brand: 'Palma Footwear', category: 'Shoes', price: 120, color: 'Dark Chocolate', material: 'Polished Box Calf', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' }
    ]
  }
];

export const STYLE_PLANS = [
  {
    id: 'free',
    name: 'Free',
    tier: 'OPEN TO EVERYONE',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Instant AI-styled daily looks crafted from your own wardrobe items.',
    features: [
      '5 looks with shopping links',
      'Style from your own wardrobe'
    ],
    ctaText: 'CHOOSE FREE'
  },
  {
    id: 'explorer',
    name: 'Explorer',
    tier: 'OPEN TO EVERYONE',
    monthlyPrice: 499,
    annualPrice: 399,
    description: 'Expanded looks and curated occasion combinations tailored to your schedule.',
    features: [
      '50 looks with shopping links',
      'Style from your own wardrobe'
    ],
    ctaText: 'CHOOSE EXPLORER'
  },
  {
    id: 'insider',
    name: 'Insider',
    tier: 'JOIN THE CLUB',
    badge: 'MOST POPULAR',
    isPopular: true,
    isDark: true,
    monthlyPrice: 999,
    annualPrice: 799,
    description: 'Comprehensive styling with high-volume looks and dedicated 1:1 stylist sessions.',
    features: [
      '100 looks with shopping links',
      'Style from your own wardrobe',
      'Stylist session, monthly'
    ],
    ctaText: 'CHOOSE INSIDER'
  },
  {
    id: 'icon',
    name: 'Icon',
    tier: 'JOIN THE CLUB',
    monthlyPrice: 1999,
    annualPrice: 1599,
    description: 'VIP styling with unlimited looks and weekly personal advisory consultations.',
    features: [
      'Unlimited looks',
      'Style from your own wardrobe',
      'Stylist session, weekly'
    ],
    ctaText: 'CHOOSE ICON'
  }
];
