import type { ImageSourcePropType } from "react-native";

export type ProductCategory = "milk-dairy" | "vegetables" | "fruits" | "eggs" | "animals" | "grocery" | "snacks";

export type SaleMode = "quantity" | "unit";

export interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  category: ProductCategory;
  image: ImageSourcePropType;
  tags: string[];
  isFeatured?: boolean;
  isDeal?: boolean;
  saleMode?: SaleMode;
  breed?: string;
  age?: string;
  weight?: string;
  availability?: string;
  location?: string;
  details?: string;
  shortDescription?: string;
  availableUnits?: number;
  minOrder?: number;
  videoUrl?: string;
  status?: string;
}

export interface CategoryDefinition {
  id: string;
  title: string;
  slug: ProductCategory;
  icon: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  value: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}
