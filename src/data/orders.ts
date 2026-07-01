import type { ImageSourcePropType } from 'react-native';

const placeholderImage: ImageSourcePropType = require('../../assets/fruits-and-vegetables.png');

export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled' | 'Shipped';

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: string;
  image: ImageSourcePropType;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: string;
  itemCount: number;
  summary: string;
  products: OrderProduct[];
  deliveryEstimate: string;
  address: string;
}

export const orders: OrderItem[] = [
  {
    id: '1',
    orderNumber: 'ORD-1024',
    date: 'Jun 28, 2026',
    status: 'Delivered',
    total: '₹1,245',
    itemCount: 3,
    summary: 'Fresh vegetables, milk, and citrus fruits',
    deliveryEstimate: 'Delivered on Jun 30, 2026',
    address: '123 Green Street, Pune, MH 411001',
    products: [
      { id: 'p1', name: 'Organic Honey', quantity: 1, price: '₹299', image: placeholderImage },
      { id: 'p2', name: 'Fresh Milk', quantity: 1, price: '₹149', image: placeholderImage },
      { id: 'p3', name: 'Navel Oranges', quantity: 1, price: '₹399', image: placeholderImage },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-1019',
    date: 'Jun 22, 2026',
    status: 'Shipped',
    total: '₹869',
    itemCount: 2,
    summary: 'Grocery staples and snack essentials',
    deliveryEstimate: 'Arriving by Jul 2, 2026',
    address: '123 Green Street, Pune, MH 411001',
    products: [
      { id: 'p4', name: 'Whole Wheat Flour', quantity: 1, price: '₹249', image: placeholderImage },
      { id: 'p5', name: 'Masala Chips', quantity: 1, price: '₹179', image: placeholderImage },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-1005',
    date: 'Jun 15, 2026',
    status: 'Processing',
    total: '₹1,999',
    itemCount: 5,
    summary: 'Weekly essentials with doorstep delivery',
    deliveryEstimate: 'Expected Jul 3, 2026',
    address: '123 Green Street, Pune, MH 411001',
    products: [
      { id: 'p6', name: 'Paneer', quantity: 1, price: '₹225', image: placeholderImage },
      { id: 'p7', name: 'Ghee', quantity: 1, price: '₹299', image: placeholderImage },
      { id: 'p8', name: 'Rice', quantity: 1, price: '₹359', image: placeholderImage },
      { id: 'p9', name: 'Spices', quantity: 1, price: '₹179', image: placeholderImage },
      { id: 'p10', name: 'Salt', quantity: 1, price: '₹49', image: placeholderImage },
    ],
  },
];

export const orderMap: Record<string, OrderItem> = orders.reduce((map, order) => {
  map[order.id] = order;
  return map;
}, {} as Record<string, OrderItem>);

export const statusStyles: Record<OrderStatus, { backgroundColor: string; color: string }> = {
  Delivered: { backgroundColor: '#d1fae5', color: '#047857' },
  Shipped: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  Processing: { backgroundColor: '#fef3c7', color: '#92400e' },
  Cancelled: { backgroundColor: '#fee2e2', color: '#991b1b' },
};
