// types/index.ts
export interface ProductVariation {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  attributes: Record<string, string>;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  tags?: string[];
  variations?: ProductVariation[];
  images?: string[];
  details?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: ProductVariation;
}