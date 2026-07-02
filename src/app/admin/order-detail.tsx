import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const statusOptions = ['Pending', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'] as const;

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  unitPrice: number;
  image: string;
};

type Order = {
  id: string;
  date: string;
  customer: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  paymentMethod: string;
  shippingMethod: string;
  deliveryEstimate: string;
  note?: string;
  status: (typeof statusOptions)[number];
  items: OrderItem[];
  cancelReason?: string;
};

const initialOrder: Order = {
  id: '#1001',
  date: 'Jul 02, 2026',
  customer: 'Aarav Sharma',
  phone: '+91 98765 43210',
  email: 'aarav@example.com',
  address: '12, Green Park, Delhi',
  city: 'Delhi, India',
  paymentMethod: 'UPI (PhonePe)',
  shippingMethod: 'Express courier',
  deliveryEstimate: 'Jul 05, 2026',
  note: 'Leave parcel at the gate if not available.',
  status: 'Packed',
  items: [
    { id: 'p1', name: 'Fresh Tomatoes', qty: 2, unitPrice: 45, image: 'https://via.placeholder.com/80/eff6ff/111827?text=Tomato' },
    { id: 'p2', name: 'Organic Spinach', qty: 1, unitPrice: 30, image: 'https://via.placeholder.com/80/fef3c7/111827?text=Spinach' },
    { id: 'p3', name: 'Coconut Water', qty: 3, unitPrice: 60, image: 'https://via.placeholder.com/80/d1fae5/111827?text=Coconut' },
  ],
};

export default function AdminOrderDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [order, setOrder] = useState<Order>(initialOrder);

  const subtotal = useMemo(() => order.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0), [order.items]);
  const shippingFee = 35;
  const discount = 20;
  const total = subtotal + shippingFee - discount;

  const updateStatus = (status: Order['status']) => {
    setOrder((current) => ({
      ...current,
      status,
      cancelReason: status !== 'Cancelled' ? undefined : current.cancelReason ?? 'Customer requested cancellation',
    }));
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title={`Order ${order.id}`} subtitle="Complete order summary" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.sectionTitle}>Order</Text>
              <Text style={styles.sectionValue}>{order.id}</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Placed</Text>
              <Text style={styles.sectionValue}>{order.date}</Text>
            </View>
          </View>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.sectionTitle}>Payment</Text>
              <Text style={styles.sectionValue}>{order.paymentMethod}</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Delivery</Text>
              <Text style={styles.sectionValue}>{order.deliveryEstimate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Customer & shipping</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{order.customer}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{order.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{order.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{order.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>City</Text>
            <Text style={styles.detailValue}>{order.city}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shipping</Text>
            <Text style={styles.detailValue}>{order.shippingMethod}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items purchased</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImageWrap}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                <Text style={styles.itemUnit}>₹{item.unitPrice} each</Text>
              </View>
              <Text style={styles.itemTotal}>₹{item.qty * item.unitPrice}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment summary</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal</Text>
            <Text style={styles.paymentValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Shipping fee</Text>
            <Text style={styles.paymentValue}>₹{shippingFee}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Discount</Text>
            <Text style={styles.paymentValue}>-₹{discount}</Text>
          </View>
          <View style={styles.paymentRowTotal}>
            <Text style={styles.paymentTotalLabel}>Total</Text>
            <Text style={styles.paymentTotalValue}>₹{total}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery workflow</Text>
          <View style={styles.timelineGrid}>
            {statusOptions.map((status) => {
              const isActive = statusOptions.indexOf(status) <= statusOptions.indexOf(order.status);
              return (
                <View key={status} style={[styles.timelineStep, isActive && styles.timelineStepActive]}>
                  <View style={[styles.timelineDot, isActive && styles.timelineDotActive]} />
                  <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>{status}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.statusList}>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => updateStatus(status)}
                style={[styles.statusOption, order.status === status && styles.statusOptionActive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.statusOptionText, order.status === status && styles.statusOptionTextActive]}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {order.status === 'Cancelled' ? (
            <View style={styles.cancelCard}>
              <Text style={styles.sectionTitle}>Cancellation reason</Text>
              <Text style={styles.cancelText}>{order.cancelReason}</Text>
            </View>
          ) : null}
        </View>

        {order.note ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Customer note</Text>
            <Text style={styles.noteText}>{order.note}</Text>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 20, paddingBottom: 36 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  sectionValue: { fontSize: 14, color: '#6b7280' },
  detailRow: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  detailLabel: { fontSize: 13, color: '#6b7280', marginBottom: 4 },
  detailValue: { fontSize: 14, color: '#111827' },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  itemImageWrap: { width: 68, height: 68, borderRadius: 18, overflow: 'hidden', marginRight: 14, backgroundColor: '#f3f4f6' },
  itemImage: { width: '100%', height: '100%' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  itemQty: { marginTop: 6, fontSize: 12, color: '#6b7280' },
  itemUnit: { marginTop: 4, fontSize: 12, color: '#6b7280' },
  itemTotal: { fontSize: 14, fontWeight: '700', color: '#0a8a3e' },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  paymentLabel: { fontSize: 13, color: '#6b7280' },
  paymentValue: { fontSize: 14, color: '#111827', fontWeight: '700' },
  paymentRowTotal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  paymentTotalLabel: { fontSize: 15, color: '#111827', fontWeight: '800' },
  paymentTotalValue: { fontSize: 16, color: '#0a8a3e', fontWeight: '800' },
  timelineGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  timelineStep: { alignItems: 'center', width: '31%', marginBottom: 14 },
  timelineStepActive: {},
  timelineDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: '#e5e7eb', marginBottom: 8 },
  timelineDotActive: { backgroundColor: '#0a8a3e' },
  timelineLabel: { fontSize: 10, color: '#6b7280', textAlign: 'center' },
  timelineLabelActive: { color: '#111827', fontWeight: '700' },
  statusList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  statusOption: { backgroundColor: '#f3f4f6', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999 },
  statusOptionActive: { backgroundColor: '#0a8a3e' },
  statusOptionText: { color: '#111827', fontWeight: '700' },
  statusOptionTextActive: { color: '#fff' },
  cancelCard: { marginTop: 16, backgroundColor: '#fef2f2', borderRadius: 18, padding: 14 },
  cancelText: { color: '#b91c1c', fontSize: 14 },
  noteText: { color: '#6b7280', fontSize: 14, lineHeight: 20 },
});
