import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { coupons } from "../../data/catalog";
import type { CartItem, CartSummary, Product } from "../../domain/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  getQuantity: (productId: string) => number;
  appliedCouponCode: string | null;
  setAppliedCouponCode: (code: string | null) => void;
  summary: CartSummary;
  clearCart: () => void;
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((current) => {
      const next = current
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0);

      return next;
    });
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCouponCode(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }

      return [...current, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((current) => current.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlistItems.some((item) => item.id === productId);

  const getQuantity = (productId: string) => items.find((item) => item.id === productId)?.quantity ?? 0;

  const summary = useMemo<CartSummary>(() => {
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
  }, [appliedCouponCode, items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        getQuantity,
        appliedCouponCode,
        setAppliedCouponCode,
        summary,
        clearCart,
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
