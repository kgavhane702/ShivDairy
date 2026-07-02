import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const statusOptions = ['Pending', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'] as const;

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: (typeof statusOptions)[number];
  reason?: string;
};

const initialOrders: Order[] = [
  { id: '#1001', customer: 'Aarav', amount: '₹360', status: 'Packed' },
  { id: '#1002', customer: 'Meera', amount: '₹180', status: 'Pending' },
  { id: '#1003', customer: 'Rohan', amount: '₹540', status: 'Out for Delivery' },
  { id: '#1004', customer: 'Sana', amount: '₹290', status: 'Cancelled', reason: 'Customer request' },
];

export default function AdminOrdersScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrder = (id: string, status: Order['status']) => {
    setOrders((current) =>
      current.map((order) => ({
        ...order,
        status: order.id === id ? status : order.status,
        reason: order.id === id && status !== 'Cancelled' ? undefined : order.reason,
      }))
    );
  };

  const setReason = (id: string, reason: string) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, reason } : order)));
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Orders" subtitle="Review and update customer orders" onBack={() => router.back()} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.largeColumn]}>Order</Text>
            <Text style={styles.tableHeaderText}>Customer</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            <Text style={[styles.tableHeaderText, styles.statusColumn]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.actionsColumn]}>Actions</Text>
          </View>
          {orders.map((order) => (
            <View key={order.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.largeColumn]}>{order.id}</Text>
              <Text style={styles.tableCell}>{order.customer}</Text>
              <Text style={styles.tableCell}>{order.amount}</Text>
              <View style={[styles.tableCell, styles.statusColumn]}> 
                <Text
                  style={[
                    styles.statusBadge,
                    order.status === 'Pending'
                      ? styles.pending
                      : order.status === 'Packed'
                      ? styles.packed
                      : order.status === 'Shipped'
                      ? styles.shipped
                      : order.status === 'Out for Delivery'
                      ? styles.outForDelivery
                      : order.status === 'Delivered'
                      ? styles.delivered
                      : styles.cancelled,
                  ]}
                >
                  {order.status}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.actionsColumn]}>
                <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/admin/order-detail' as any)}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {orders.map((order) => (
          <View key={`${order.id}-actions`} style={styles.orderCard}>
            <Text style={styles.orderSectionTitle}>{order.id} actions</Text>
            <View style={styles.statusList}>
              {statusOptions.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.statusOption, order.status === status && styles.statusOptionActive]}
                  onPress={() => updateOrder(order.id, status)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.statusOptionText, order.status === status && styles.statusOptionTextActive]}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {order.status === 'Cancelled' ? (
              <View style={styles.reasonBox}>
                <Text style={styles.reasonLabel}>Cancellation reason</Text>
                <TextInput
                  value={order.reason}
                  onChangeText={(text) => setReason(order.id, text)}
                  placeholder="Enter reason for cancellation"
                  placeholderTextColor="#9ca3af"
                  style={styles.reasonInput}
                  multiline
                />
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tableHeader: { flexDirection: 'row', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableHeaderText: { flex: 1, color: '#6b7280', fontWeight: '700', fontSize: 12 },
  largeColumn: { flex: 1.4 },
  statusColumn: { flex: 1.2 },
  actionsColumn: { flex: 1.2 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tableCell: { flex: 1, color: '#111827', fontSize: 13 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, overflow: 'hidden', fontSize: 12, fontWeight: '700' },
  pending: { backgroundColor: '#fef3c7', color: '#92400e' },
  packed: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  shipped: { backgroundColor: '#cffafe', color: '#0f766e' },
  delivered: { backgroundColor: '#dcfce7', color: '#166534' },
  cancelled: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  viewButton: { backgroundColor: '#f3f4f6', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start' },
  viewButtonText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  orderCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  orderSectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12, color: '#111827' },
  statusList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statusOption: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999, backgroundColor: '#f3f4f6', marginRight: 8, marginBottom: 10 },
  statusOptionActive: { backgroundColor: '#0a8a3e' },
  statusOptionText: { color: '#111827', fontWeight: '700' },
  statusOptionTextActive: { color: '#fff' },
  reasonBox: { marginTop: 14 },
  reasonLabel: { fontSize: 13, fontWeight: '700', color: '#111827', marginBottom: 8 },
  reasonInput: { backgroundColor: '#f9fafb', borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, minHeight: 80, textAlignVertical: 'top' },
});
