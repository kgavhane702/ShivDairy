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
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);

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
