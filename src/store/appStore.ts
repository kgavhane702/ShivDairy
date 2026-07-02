import { create } from 'zustand';
import { coupons } from '../data/catalog';
import type { CartItem, CartSummary, Product } from '../domain/types';

export type EnquiryStatus = 'New' | 'Reviewed' | 'Booked';

export type EnquiryItem = {
  id: string;
  animalId: string;
  animalTitle: string;
  name: string;
  phone: string;
  notes: string;
  createdAt: string;
  status: EnquiryStatus;
};

type AppState = {
  items: CartItem[];
  appliedCouponCode: string | null;
  summary: CartSummary;
  wishlistItems: Product[];
  enquiries: EnquiryItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  getQuantity: (productId: string) => number;
  setAppliedCouponCode: (code: string | null) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addEnquiry: (enquiry: Omit<EnquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
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
  enquiries: [
    {
      id: 'sample-enquiry-1',
      animalId: 'animal-broiler-chicken',
      animalTitle: 'Broiler Chicken',
      name: 'Rahul Patil',
      phone: '9876543210',
      notes: 'Need 3 healthy birds for weekend delivery.',
      createdAt: 'Today, 10:30 AM',
      status: 'New',
    },
    {
      id: 'sample-enquiry-2',
      animalId: 'animal-kombda-goat',
      animalTitle: 'Kombda Goat',
      name: 'Meera Deshmukh',
      phone: '9123456780',
      notes: 'Looking for a breeding-quality goat with good health.',
      createdAt: 'Today, 1:15 PM',
      status: 'Reviewed',
    },
  ],

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      const nextItems = existing
        ? product.saleMode === "unit"
          ? state.items
          : state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
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

  addEnquiry: (enquiry) =>
    set((state) => ({
      enquiries: [
        {
          id: `${Date.now()}`,
          animalId: enquiry.animalId,
          animalTitle: enquiry.animalTitle,
          name: enquiry.name,
          phone: enquiry.phone,
          notes: enquiry.notes,
          createdAt: new Date().toLocaleString(),
          status: 'New',
        },
        ...state.enquiries,
      ],
    })),

  updateEnquiryStatus: (id, status) =>
    set((state) => ({
      enquiries: state.enquiries.map((item) => (item.id === id ? { ...item, status } : item)),
    })),
}));
