import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const orders = [
  { id: '#1001', customer: 'Aarav', amount: '₹360', status: 'Packed' },
  { id: '#1002', customer: 'Meera', amount: '₹180', status: 'Pending' },
  { id: '#1003', customer: 'Rohan', amount: '₹540', status: 'Delivered' },
];

export default function AdminOrdersScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Orders" subtitle="Review and update customer orders" onBack={() => router.back()} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.customerName}>{order.customer}</Text>
              <Text style={styles.amount}>{order.amount}</Text>
            </View>
            <View style={styles.orderRight}>
              <View style={[styles.statusBadge, order.status === 'Pending' ? styles.pending : order.status === 'Packed' ? styles.packed : styles.delivered]}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
              <TouchableOpacity style={styles.detailButton} onPress={() => router.push('/admin/order-detail' as any)}>
                <Text style={styles.detailButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  orderCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  orderInfo: { flex: 1 },
  orderId: { fontSize: 15, fontWeight: '700', color: '#111827' },
  customerName: { color: '#6b7280', marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700', color: '#0a8a3e', marginTop: 4 },
  orderRight: { alignItems: 'flex-end', gap: 8 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  pending: { backgroundColor: '#fef3c7' },
  packed: { backgroundColor: '#dbeafe' },
  delivered: { backgroundColor: '#dcfce7' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  detailButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f3f4f6' },
  detailButtonText: { color: '#111827', fontWeight: '700', fontSize: 12 },
});
