import { create } from 'zustand';

export type OrderStatus = 'Pending' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export type Product = {
  id: string;
  name: string;
  stock: number;
  reorderThreshold: number;
  price: string;
  active: boolean;
  category: string;
  supplier: string;
  sku: string;
  imageUrl: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  reorderThreshold: number;
  incoming: number;
  lastRestock: string;
  status: 'Healthy' | 'Low' | 'Out of Stock';
  paused: boolean;
  imageUrl?: string;
};

export type Customer = {
  name: string;
  email: string;
  orders: number;
  banned: boolean;
  reason?: string;
};

export type PromotionRuleType = 'percentage' | 'flat' | 'bogo' | 'spend_get' | 'free_shipping';

export type Promotion = {
  title: string;
  detail: string;
  code: string;
  active: boolean;
  type: PromotionRuleType;
  minSpend?: number;
  discountPercent?: number;
  discountAmount?: number;
  buyQty?: number;
  getQty?: number;
  rewardType?: 'percent' | 'amount';
  rewardValue?: number;
};

export type Order = {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
  reason?: string;
};

export type LivestockEntry = {
  id: string;
  title: string;
  breed: string;
  age: string;
  category: string;
  price: number;
  unit: string;
  availableUnits: number;
  minOrder: number;
  weight: string;
  availability: string;
  location: string;
  shortDescription: string;
  details: string;
  imageUrl: string;
  videoUrl?: string;
  status: 'Available' | 'Limited' | 'Booked';
};

type AdminState = {
  products: Product[];
  inventory: InventoryItem[];
  customers: Customer[];
  promotions: Promotion[];
  orders: Order[];
  livestock: LivestockEntry[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  toggleProductActive: (id: string) => void;
  adjustInventoryQuantity: (id: string, delta: number) => void;
  updateInventoryThreshold: (id: string, threshold: number) => void;
  toggleInventoryPause: (id: string) => void;
  requestInventoryRestock: (id: string) => void;
  updateInventoryImage: (id: string, imageUrl: string) => void;
  toggleCustomerBan: (email: string) => void;
  setCustomerBanReason: (email: string, reason: string) => void;
  togglePromotion: (code: string) => void;
  addPromotion: (promotion: Promotion) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  setOrderReason: (id: string, reason: string) => void;
  addLivestockEntry: (entry: LivestockEntry) => void;
  updateLivestockEntry: (entry: LivestockEntry) => void;
  removeLivestockEntry: (id: string) => void;
  getOrderById: (id: string) => Order | undefined;
};

const initialProducts: Product[] = [
  { id: 'p1', name: 'Fresh Tomatoes', stock: 48, reorderThreshold: 20, price: '₹45', active: true, category: 'Vegetables', supplier: 'Green Farm Supplies', sku: 'KR-VEG-001', imageUrl: 'https://via.placeholder.com/80/eff6ff/111827?text=T' },
  { id: 'p2', name: 'Organic Spinach', stock: 12, reorderThreshold: 18, price: '₹30', active: false, category: 'Vegetables', supplier: 'Leafy Greens Co.', sku: 'KR-VEG-002', imageUrl: 'https://via.placeholder.com/80/fef3c7/111827?text=S' },
  { id: 'p3', name: 'Coconut Water', stock: 24, reorderThreshold: 15, price: '₹60', active: true, category: 'Beverages', supplier: 'Tropical Traders', sku: 'KR-BVG-003', imageUrl: 'https://via.placeholder.com/80/d1fae5/111827?text=C' },
];

const initialInventory: InventoryItem[] = [
  { id: 'i1', name: 'Fresh Tomatoes', category: 'Vegetables', supplier: 'Green Farm Supplies', quantity: 48, reorderThreshold: 20, incoming: 14, lastRestock: 'Jun 28, 2026', status: 'Healthy', paused: false, imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80' },
  { id: 'i2', name: 'Organic Spinach', category: 'Vegetables', supplier: 'Leafy Greens Co.', quantity: 12, reorderThreshold: 18, incoming: 0, lastRestock: 'Jun 24, 2026', status: 'Low', paused: false, imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80' },
  { id: 'i3', name: 'Coconut Water', category: 'Beverages', supplier: 'Tropical Traders', quantity: 0, reorderThreshold: 15, incoming: 20, lastRestock: 'Jun 20, 2026', status: 'Out of Stock', paused: false, imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=400&q=80' },
];

const initialCustomers: Customer[] = [
  { name: 'Aarav', email: 'aarav@example.com', orders: 3, banned: false },
  { name: 'Meera', email: 'meera@example.com', orders: 2, banned: false },
  { name: 'Rohan', email: 'rohan@example.com', orders: 5, banned: true, reason: 'Repeated cancellations' },
];

const initialPromotions: Promotion[] = [
  { title: 'Weekend Deal', detail: '20% off on orders above ₹499', code: 'FRESH20', active: true, type: 'percentage', minSpend: 499, discountPercent: 20 },
  { title: 'Free Delivery', detail: 'Free shipping on orders above ₹799', code: 'SHIPFREE', active: false, type: 'free_shipping', minSpend: 799 },
  { title: 'Bundle Saver', detail: 'Buy 2 get 1 free', code: 'BUNDLE30', active: true, type: 'bogo', buyQty: 2, getQty: 1 },
];

const initialOrders: Order[] = [
  { id: '#1001', customer: 'Aarav', amount: '₹360', status: 'Packed' },
  { id: '#1002', customer: 'Meera', amount: '₹180', status: 'Pending' },
  { id: '#1003', customer: 'Rohan', amount: '₹540', status: 'Out for Delivery' },
  { id: '#1004', customer: 'Sana', amount: '₹290', status: 'Cancelled', reason: 'Customer request' },
];

const initialLivestock: LivestockEntry[] = [
  { id: 'livestock-broiler-chicken', title: 'Broiler Chicken', breed: 'Broiler', age: '6-8 weeks', category: 'Poultry', price: 280, unit: 'Per bird', availableUnits: 24, minOrder: 1, weight: '2.2-2.6 kg', availability: 'Today', location: 'Pune Farm', shortDescription: 'Healthy broiler birds with premium meat quality.', details: 'Vet-checked broiler birds, ideal for fresh home consumption and farm pickup. These birds are kept in a clean, well-ventilated poultry shed with regular health monitoring.', imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1200&q=80', videoUrl: 'https://www.youtube.com/watch?v=3eLJmI8U8sA', status: 'Available' },
  { id: 'livestock-kombda-goat', title: 'Kombda Goat', breed: 'Kombda', age: '12-18 months', category: 'Goat', price: 9800, unit: 'Per goat', availableUnits: 8, minOrder: 1, weight: '28-35 kg', availability: 'This week', location: 'Satara Goat Farm', shortDescription: 'Strong kombda goats selected for breeding and healthy farming use.', details: 'Healthy, active breeding-quality goat with strong build and good temperament. Suitable for farms, breeding, and home rearing.', imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80', videoUrl: 'https://www.youtube.com/watch?v=QhFW9aR9v0Q', status: 'Limited' },
  { id: 'livestock-jersey-cow', title: 'Jersey Cow', breed: 'Jersey', age: '3 years', category: 'Cattle', price: 58000, unit: 'Per cow', availableUnits: 5, minOrder: 1, weight: '320-380 kg', availability: 'Next week', location: 'Baramati Dairy', shortDescription: 'Premium dairy cow with excellent milk yield and calm temperament.', details: 'High-yield Jersey cow with good milking temperament and veterinary clearance. Ideal for dairy farms wanting reliable milk production.', imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80', videoUrl: 'https://www.youtube.com/watch?v=V0d2j2H0A8Q', status: 'Available' },
];

export const useAdminStore = create<AdminState>((set, get) => ({
  products: initialProducts,
  inventory: initialInventory,
  customers: initialCustomers,
  promotions: initialPromotions,
  orders: initialOrders,
  livestock: initialLivestock,

  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (product) => set((state) => ({ products: state.products.map((item) => (item.id === product.id ? product : item)) })),
  toggleProductActive: (id) => set((state) => ({ products: state.products.map((item) => (item.id === id ? { ...item, active: !item.active } : item)) })),

  adjustInventoryQuantity: (id, delta) =>
    set((state) => ({
      inventory: state.inventory.map((item) => {
        if (item.id !== id) return item;
        const nextQuantity = Math.max(0, item.quantity + delta);
        return {
          ...item,
          quantity: nextQuantity,
          status: nextQuantity === 0 ? 'Out of Stock' : nextQuantity <= item.reorderThreshold ? 'Low' : 'Healthy',
        };
      }),
    })),

  updateInventoryThreshold: (id, threshold) =>
    set((state) => ({
      inventory: state.inventory.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          reorderThreshold: threshold,
          status: item.quantity === 0 ? 'Out of Stock' : item.quantity <= threshold ? 'Low' : 'Healthy',
        };
      }),
    })),

  toggleInventoryPause: (id) => set((state) => ({ inventory: state.inventory.map((item) => (item.id === id ? { ...item, paused: !item.paused } : item)) })),

  requestInventoryRestock: (id) => set((state) => ({ inventory: state.inventory.map((item) => (item.id === id ? { ...item, incoming: item.incoming + 10 } : item)) })),
  updateInventoryImage: (id, imageUrl) => set((state) => ({ inventory: state.inventory.map((item) => (item.id === id ? { ...item, imageUrl } : item)) })),

  toggleCustomerBan: (email) =>
    set((state) => ({
      customers: state.customers.map((customer) => (customer.email === email ? { ...customer, banned: !customer.banned, reason: customer.banned ? undefined : customer.reason ?? '' } : customer)),
    })),

  setCustomerBanReason: (email, reason) => set((state) => ({ customers: state.customers.map((customer) => (customer.email === email ? { ...customer, reason } : customer)) })),

  togglePromotion: (code) => set((state) => ({ promotions: state.promotions.map((promo) => (promo.code === code ? { ...promo, active: !promo.active } : promo)) })),
  addPromotion: (promotion) => set((state) => ({ promotions: [...state.promotions, promotion] })),

  updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)) })),
  setOrderReason: (id, reason) => set((state) => ({ orders: state.orders.map((order) => (order.id === id ? { ...order, reason } : order)) })),
  addLivestockEntry: (entry) => set((state) => ({ livestock: [...state.livestock, entry] })),
  updateLivestockEntry: (entry) => set((state) => ({ livestock: state.livestock.map((item) => (item.id === entry.id ? entry : item)) })),
  removeLivestockEntry: (id) => set((state) => ({ livestock: state.livestock.filter((item) => item.id !== id) })),

  getOrderById: (id) => get().orders.find((order) => order.id === id),
}));
