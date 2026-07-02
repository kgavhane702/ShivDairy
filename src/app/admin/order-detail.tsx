import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const items = [
  { name: 'Fresh Tomatoes', qty: 2, price: '₹90' },
  { name: 'Organic Spinach', qty: 1, price: '₹30' },
];

export default function AdminOrderDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Order #1001" subtitle="Customer details and order summary" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Customer</Text>
            <Text style={styles.sectionValue}>Aarav Sharma</Text>
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Phone</Text>
            <Text style={styles.sectionValue}>+91 98765 43210</Text>
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.sectionValue}>12, Green Park, Delhi</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order items</Text>
          {items.map((item) => (
            <View key={item.name} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Packed</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.9}>
              <Text style={styles.actionButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  sectionRow: { marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 4 },
  sectionValue: { fontSize: 14, color: '#6b7280' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  itemQty: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '700', color: '#0a8a3e' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  statusBadge: { backgroundColor: '#dbeafe', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  statusBadgeText: { color: '#1d4ed8', fontWeight: '700' },
  actionButton: { backgroundColor: '#0a8a3e', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999 },
  actionButtonText: { color: '#fff', fontWeight: '700' },
});
