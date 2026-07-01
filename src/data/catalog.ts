import type { CategoryDefinition, Coupon, Product } from "../domain/types";

const placeholderImage = require("../../assets/fruits-and-vegetables.png");

export const categories: CategoryDefinition[] = [
  { id: "milk-dairy", title: "Milk & Dairy", slug: "milk-dairy", icon: "🥛", description: "Fresh dairy, butter, paneer and more" },
  { id: "vegetables", title: "Vegetables", slug: "vegetables", icon: "🥕", description: "Farm fresh vegetables" },
  { id: "fruits", title: "Fruits", slug: "fruits", icon: "🍎", description: "Seasonal fruits and berries" },
  { id: "eggs", title: "Eggs", slug: "eggs", icon: "🥚", description: "Fresh eggs and protein staples" },
  { id: "animals", title: "Live Animals", slug: "animals", icon: "🐄", description: "Cattle, buffalo and livestock" },
  { id: "grocery", title: "Grocery", slug: "grocery", icon: "🧺", description: "Grains, pulses and essentials" },
  { id: "snacks", title: "Snacks", slug: "snacks", icon: "🍿", description: "Snacks and pantry favourites" },
];

export const coupons: Coupon[] = [
  { id: "c1", code: "SAVE10", description: "10% off on orders above ₹200", value: 0.1 },
  { id: "c2", code: "FLAT50", description: "₹50 off", value: 50 },
];

export const featuredProducts: Product[] = [
  { id: "p1", title: "Organic Honey", price: 299, unit: "500 g", category: "grocery", image: placeholderImage, tags: ["featured", "sweet"], isFeatured: true },
  { id: "p2", title: "Masala Combo", price: 149, unit: "250 g", category: "grocery", image: placeholderImage, tags: ["featured", "spice"], isFeatured: true },
  { id: "p3", title: "Basmati Rice", price: 359, unit: "1 kg", category: "grocery", image: placeholderImage, tags: ["featured", "grain"], isFeatured: true },
  { id: "p4", title: "Fresh Paneer", price: 225, unit: "500 g", category: "milk-dairy", image: placeholderImage, tags: ["featured", "dairy"], isFeatured: true },
];

export const dealProducts: Product[] = [
  { id: "d1", title: "Amul Butter", price: 265, unit: "200 g", category: "milk-dairy", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d2", title: "Aashirvaad Atta", price: 249, unit: "5 kg", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d3", title: "Fortune Sunlite", price: 135, unit: "1 L", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
  { id: "d4", title: "Tata Salt", price: 17, unit: "1 kg", category: "grocery", image: placeholderImage, tags: ["deal"], isDeal: true },
];

export const allProducts = [...featuredProducts, ...dealProducts];
