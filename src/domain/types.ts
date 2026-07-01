import type { ImageSourcePropType } from "react-native";

export type ProductCategory = "milk-dairy" | "vegetables" | "fruits" | "eggs" | "animals" | "grocery" | "snacks";

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
