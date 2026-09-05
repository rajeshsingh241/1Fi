export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  startingEmi: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  variants: ProductVariant[];
  specifications: Specification[];
}

export interface EMIPlan {
  id: string;
  productId: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  isNoCost: boolean;
  processingFee: number;
  cashback?: number;
}

export interface CartSelection {
  product: Product | null;
  selectedVariant: ProductVariant | null;
  selectedEmiPlan: EMIPlan | null;
}

export type MainTabType = 'home' | 'shop' | 'emi-dues' | 'limit' | 'profile';
export type ShopSubTabType = 'top-brands' | 'nearby-stores' | 'marketplace';
