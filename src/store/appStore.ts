import { create } from 'zustand';
import { coupons } from '../data/catalog';
import type { CartItem, CartSummary, Product } from '../domain/types';

type AppState = {
  items: CartItem[];
  appliedCouponCode: string | null;
  summary: CartSummary;
  wishlistItems: Product[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  getQuantity: (productId: string) => number;
  setAppliedCouponCode: (code: string | null) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const buildSummary = (items: CartItem[], appliedCouponCode: string | null): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const activeCoupon = coupons.find((coupon) => coupon.code === appliedCouponCode);
  const discount = activeCoupon
    ? activeCoupon.value < 1
      ? Math.round(subtotal * activeCoupon.value)
      : activeCoupon.value
    : 0;
  const delivery = subtotal > 199 ? 0 : 30;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  items: [],
  appliedCouponCode: null,
  summary: buildSummary([], null),
  wishlistItems: [],

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      const nextItems = existing
        ? state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...state.items, { ...product, quantity: 1 }];

      return {
        items: nextItems,
        summary: buildSummary(nextItems, state.appliedCouponCode),
      };
    }),

  updateQuantity: (productId, delta) =>
    set((state) => {
      const nextItems = state.items
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0);

      return {
        items: nextItems,
        summary: buildSummary(nextItems, state.appliedCouponCode),
      };
    }),

  removeItem: (productId) =>
    set((state) => {
      const nextItems = state.items.filter((item) => item.id !== productId);
      return {
        items: nextItems,
        summary: buildSummary(nextItems, state.appliedCouponCode),
      };
    }),

  getQuantity: (productId) => get().items.find((item) => item.id === productId)?.quantity ?? 0,

  setAppliedCouponCode: (code) =>
    set((state) => ({
      appliedCouponCode: code,
      summary: buildSummary(state.items, code),
    })),

  clearCart: () =>
    set(() => ({
      items: [],
      appliedCouponCode: null,
      summary: buildSummary([], null),
    })),

  toggleWishlist: (product) =>
    set((state) => {
      const exists = state.wishlistItems.some((item) => item.id === product.id);
      const nextWishlistItems = exists
        ? state.wishlistItems.filter((item) => item.id !== product.id)
        : [...state.wishlistItems, product];

      return { wishlistItems: nextWishlistItems };
    }),

  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.id !== productId),
    })),

  isInWishlist: (productId) => get().wishlistItems.some((item) => item.id === productId),
}));
