export const products = [
  {
    id: 'prod-iphone15-pro',
    name: 'Apple iPhone 15 Pro',
    category: 'Mobiles',
    brand: 'Apple',
    price: 134900,
    startingEmi: 5620,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 1420,
    badge: 'Zero Cost EMI',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    variants: [
      { id: 'v-128gb-nat', name: '128GB - Natural Titanium', priceDelta: 0 },
      { id: 'v-256gb-nat', name: '256GB - Natural Titanium', priceDelta: 10000 },
      { id: 'v-512gb-blue', name: '512GB - Blue Titanium', priceDelta: 30000 },
    ],
    specifications: [
      { label: 'Display', value: '6.1-inch Super Retina XDR OLED' },
      { label: 'Chipset', value: 'A17 Pro chip with 6-core GPU' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide + Telephoto' },
      { label: 'Material', value: 'Titanium design with Ceramic Shield' }
    ]
  },
  {
    id: 'prod-macbook-air-m3',
    name: 'MacBook Air 15" M3',
    category: 'Laptops',
    brand: 'Apple',
    price: 154900,
    startingEmi: 6454,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 980,
    badge: 'Popular',
    description: 'Lean. Mean. M3 machine. The 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.',
    variants: [
      { id: 'v-8gb-256gb', name: '8GB RAM / 256GB SSD - Midnight', priceDelta: 0 },
      { id: 'v-16gb-512gb', name: '16GB RAM / 512GB SSD - Starlight', priceDelta: 20000 },
      { id: 'v-24gb-1tb', name: '24GB RAM / 1TB SSD - Space Grey', priceDelta: 50000 },
    ],
    specifications: [
      { label: 'Display', value: '15.3-inch Liquid Retina display' },
      { label: 'Processor', value: 'Apple M3 chip (8-core CPU, 10-core GPU)' },
      { label: 'Battery Life', value: 'Up to 18 hours battery life' },
      { label: 'Weight', value: '1.51 kg' }
    ]
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Audio',
    brand: 'Sony',
    price: 29990,
    startingEmi: 2499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewCount: 2310,
    badge: 'Best Seller',
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented noise cancellation and exceptional call quality.',
    variants: [
      { id: 'v-black', name: 'Black', priceDelta: 0 },
      { id: 'v-silver', name: 'Silver / Platinum', priceDelta: 0 },
      { id: 'v-blue', name: 'Smoky White', priceDelta: 1000 },
    ],
    specifications: [
      { label: 'Driver Unit', value: '30mm specially designed driver' },
      { label: 'Battery Life', value: 'Up to 30 hours (NC ON)' },
      { label: 'Bluetooth', value: 'Version 5.2 with LDAC' },
      { label: 'Weight', value: '250 grams' }
    ]
  },
  {
    id: 'prod-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Mobiles',
    brand: 'Samsung',
    price: 129999,
    startingEmi: 5416,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 1150,
    badge: 'Galaxy AI',
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    variants: [
      { id: 'v-256gb-gray', name: '12GB RAM / 256GB - Titanium Gray', priceDelta: 0 },
      { id: 'v-512gb-black', name: '12GB RAM / 512GB - Titanium Black', priceDelta: 12000 },
      { id: 'v-1tb-yellow', name: '12GB RAM / 1TB - Titanium Yellow', priceDelta: 30000 },
    ],
    specifications: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X 120Hz' },
      { label: 'Camera', value: '200MP Quad Camera with 100x Space Zoom' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Stylus', value: 'Built-in S Pen included' }
    ]
  },
  {
    id: 'prod-ipad-air-m2',
    name: 'Apple iPad Air 11" M2',
    category: 'Tablets',
    brand: 'Apple',
    price: 59900,
    startingEmi: 4991,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 840,
    badge: 'New Launch',
    description: 'Freshly redesigned around the M2 chip. Packed with a stunning Liquid Retina display, landscape front camera, and fast Wi-Fi 6E.',
    variants: [
      { id: 'v-128gb-wifi', name: '128GB - Wi-Fi - Space Grey', priceDelta: 0 },
      { id: 'v-256gb-wifi', name: '256GB - Wi-Fi - Starlight', priceDelta: 10000 },
      { id: 'v-512gb-cellular', name: '512GB - Wi-Fi + Cellular - Purple', priceDelta: 30000 },
    ],
    specifications: [
      { label: 'Display', value: '11-inch Liquid Retina Display' },
      { label: 'Processor', value: 'Apple M2 Chip' },
      { label: 'Front Camera', value: 'Landscape 12MP Ultra Wide' },
      { label: 'Pencil Support', value: 'Supports Apple Pencil Pro' }
    ]
  },
  {
    id: 'prod-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'Wearables',
    brand: 'Apple',
    price: 89900,
    startingEmi: 7491,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 620,
    badge: '0% Interest',
    description: 'The ultimate sports and adventure watch. Features the S9 SiP, a super-bright 3000-nit display, double tap gesture, and carbon neutral options.',
    variants: [
      { id: 'v-titanium-loop', name: '49mm Titanium - Alpine Loop', priceDelta: 0 },
      { id: 'v-titanium-trail', name: '49mm Titanium - Trail Loop', priceDelta: 0 },
      { id: 'v-titanium-ocean', name: '49mm Titanium - Ocean Band', priceDelta: 0 },
    ],
    specifications: [
      { label: 'Case Size', value: '49mm Titanium Case' },
      { label: 'Brightness', value: '3000 nits Always-On Retina' },
      { label: 'Water Resistance', value: '100m Water Resistant / EN13319' },
      { label: 'Battery', value: 'Up to 36 hours (72 hours in Low Power Mode)' }
    ]
  }
];

export const emiPlansMap = {
  'prod-iphone15-pro': [
    { id: 'emi-ip15-3m', productId: 'prod-iphone15-pro', tenureMonths: 3, monthlyAmount: 44966, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 2000 },
    { id: 'emi-ip15-6m', productId: 'prod-iphone15-pro', tenureMonths: 6, monthlyAmount: 22483, interestRate: 0, isNoCost: true, processingFee: 199, cashback: 3000 },
    { id: 'emi-ip15-12m', productId: 'prod-iphone15-pro', tenureMonths: 12, monthlyAmount: 11241, interestRate: 0, isNoCost: true, processingFee: 499, cashback: 0 },
    { id: 'emi-ip15-18m', productId: 'prod-iphone15-pro', tenureMonths: 18, monthlyAmount: 8240, interestRate: 12.5, isNoCost: false, processingFee: 799, cashback: 0 },
    { id: 'emi-ip15-24m', productId: 'prod-iphone15-pro', tenureMonths: 24, monthlyAmount: 6380, interestRate: 13.5, isNoCost: false, processingFee: 999, cashback: 0 },
  ],
  'prod-macbook-air-m3': [
    { id: 'emi-mb-3m', productId: 'prod-macbook-air-m3', tenureMonths: 3, monthlyAmount: 51633, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 2500 },
    { id: 'emi-mb-6m', productId: 'prod-macbook-air-m3', tenureMonths: 6, monthlyAmount: 25816, interestRate: 0, isNoCost: true, processingFee: 299, cashback: 4000 },
    { id: 'emi-mb-12m', productId: 'prod-macbook-air-m3', tenureMonths: 12, monthlyAmount: 12908, interestRate: 0, isNoCost: true, processingFee: 599, cashback: 0 },
    { id: 'emi-mb-24m', productId: 'prod-macbook-air-m3', tenureMonths: 24, monthlyAmount: 7320, interestRate: 12.0, isNoCost: false, processingFee: 1199, cashback: 0 },
  ],
  'prod-sony-wh1000xm5': [
    { id: 'emi-sony-3m', productId: 'prod-sony-wh1000xm5', tenureMonths: 3, monthlyAmount: 9996, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 1000 },
    { id: 'emi-sony-6m', productId: 'prod-sony-wh1000xm5', tenureMonths: 6, monthlyAmount: 4998, interestRate: 0, isNoCost: true, processingFee: 99, cashback: 1500 },
    { id: 'emi-sony-12m', productId: 'prod-sony-wh1000xm5', tenureMonths: 12, monthlyAmount: 2499, interestRate: 0, isNoCost: true, processingFee: 199, cashback: 0 },
  ],
  'prod-s24-ultra': [
    { id: 'emi-s24-3m', productId: 'prod-s24-ultra', tenureMonths: 3, monthlyAmount: 43333, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 3000 },
    { id: 'emi-s24-6m', productId: 'prod-s24-ultra', tenureMonths: 6, monthlyAmount: 21666, interestRate: 0, isNoCost: true, processingFee: 249, cashback: 5000 },
    { id: 'emi-s24-12m', productId: 'prod-s24-ultra', tenureMonths: 12, monthlyAmount: 10833, interestRate: 0, isNoCost: true, processingFee: 499, cashback: 0 },
    { id: 'emi-s24-18m', productId: 'prod-s24-ultra', tenureMonths: 18, monthlyAmount: 7940, interestRate: 13.0, isNoCost: false, processingFee: 749, cashback: 0 },
    { id: 'emi-s24-24m', productId: 'prod-s24-ultra', tenureMonths: 24, monthlyAmount: 6150, interestRate: 13.5, isNoCost: false, processingFee: 999, cashback: 0 },
  ],
  'prod-ipad-air-m2': [
    { id: 'emi-ipad-3m', productId: 'prod-ipad-air-m2', tenureMonths: 3, monthlyAmount: 19966, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 1500 },
    { id: 'emi-ipad-6m', productId: 'prod-ipad-air-m2', tenureMonths: 6, monthlyAmount: 9983, interestRate: 0, isNoCost: true, processingFee: 149, cashback: 2000 },
    { id: 'emi-ipad-12m', productId: 'prod-ipad-air-m2', tenureMonths: 12, monthlyAmount: 4991, interestRate: 0, isNoCost: true, processingFee: 299, cashback: 0 },
  ],
  'prod-watch-ultra-2': [
    { id: 'emi-watch-3m', productId: 'prod-watch-ultra-2', tenureMonths: 3, monthlyAmount: 29966, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 2000 },
    { id: 'emi-watch-6m', productId: 'prod-watch-ultra-2', tenureMonths: 6, monthlyAmount: 14983, interestRate: 0, isNoCost: true, processingFee: 199, cashback: 2500 },
    { id: 'emi-watch-12m', productId: 'prod-watch-ultra-2', tenureMonths: 12, monthlyAmount: 7491, interestRate: 0, isNoCost: true, processingFee: 399, cashback: 0 },
    { id: 'emi-watch-18m', productId: 'prod-watch-ultra-2', tenureMonths: 18, monthlyAmount: 5490, interestRate: 12.5, isNoCost: false, processingFee: 599, cashback: 0 },
  ]
};

// Default fallback EMI generator for dynamic or custom calculated variants
export function generateDefaultEmiPlans(productId, price) {
  const base3 = Math.round(price / 3);
  const base6 = Math.round(price / 6);
  const base12 = Math.round(price / 12);
  const base24 = Math.round((price * 1.13) / 24);

  return [
    { id: `emi-${productId}-3m`, productId, tenureMonths: 3, monthlyAmount: base3, interestRate: 0, isNoCost: true, processingFee: 0, cashback: 1000 },
    { id: `emi-${productId}-6m`, productId, tenureMonths: 6, monthlyAmount: base6, interestRate: 0, isNoCost: true, processingFee: 199, cashback: 2000 },
    { id: `emi-${productId}-12m`, productId, tenureMonths: 12, monthlyAmount: base12, interestRate: 0, isNoCost: true, processingFee: 499, cashback: 0 },
    { id: `emi-${productId}-24m`, productId, tenureMonths: 24, monthlyAmount: base24, interestRate: 13.0, isNoCost: false, processingFee: 899, cashback: 0 },
  ];
}
