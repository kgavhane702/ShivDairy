import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const stats = [
  { label: 'Orders', value: '128', detail: '+12% this week' },
  { label: 'Revenue', value: '₹84k', detail: 'Monthly target' },
  { label: 'Products', value: '246', detail: 'Live catalog' },
  { label: 'Pending', value: '14', detail: 'Needs action' },
];

const recentOrders = [
  { id: '#1005', customer: 'Aarav', amount: '₹420', status: 'Packed' },
  { id: '#1004', customer: 'Meera', amount: '₹180', status: 'Pending' },
  { id: '#1003', customer: 'Rohan', amount: '₹540', status: 'Delivered' },
];

const quickActions = [
  { title: 'Manage Products', subtitle: 'Add, edit, and stock items', route: '/admin/products' },
  { title: 'Order Queue', subtitle: 'Track new customer orders', route: '/admin/orders' },
  { title: 'Inventory', subtitle: 'Monitor stock availability', route: '/admin/inventory' },
  { title: 'Customers', subtitle: 'View registered users', route: '/admin/customers' },
  { title: 'Promotions', subtitle: 'Banners and offers', route: '/admin/promotions' },
  { title: 'Settings', subtitle: 'Store pricing and delivery rules', route: '/admin/settings' },
];

export default function AdminDashboardScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.eyebrow}>Admin Panel</Text>
            <Text style={styles.title}>KrishiKart Operations</Text>
            <Text style={styles.subtitle}>A polished command center for managing your store.</Text>
          </View>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <Text style={styles.sectionHint}>Everything you need in one place</Text>
        </View>

        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.title} style={styles.actionCard} onPress={() => router.push(action.route as any)}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent orders</Text>
          <Text style={styles.sectionHint}>Latest activity from the store</Text>
        </View>

        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.tableColumnLarge]}>Order</Text>
            <Text style={styles.tableHeaderText}>Customer</Text>
            <Text style={styles.tableHeaderText}>Total</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableColumnLarge]}>{order.id}</Text>
              <Text style={styles.tableCell}>{order.customer}</Text>
              <Text style={styles.tableCell}>{order.amount}</Text>
              <Text style={[styles.tableCell, styles.statusBadge, order.status === 'Pending' ? styles.pending : order.status === 'Packed' ? styles.packed : styles.delivered]}>{order.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 20, paddingBottom: 40 },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  heroTextWrap: { flex: 1, paddingRight: 12 },
  eyebrow: { color: '#0a8a3e', fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1.2 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 6, color: '#6b7280', fontSize: 14 },
  backButton: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  backButtonText: { color: '#111827', fontWeight: '700' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statLabel: { color: '#6b7280', fontSize: 13, marginBottom: 8 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#111827' },
  statDetail: { marginTop: 6, color: '#0a8a3e', fontSize: 12, fontWeight: '600' },
  sectionHeader: { marginTop: 18, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  sectionHint: { color: '#6b7280', fontSize: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  actionTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  actionSubtitle: { marginTop: 6, color: '#6b7280', fontSize: 13 },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  tableHeader: { flexDirection: 'row', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableHeaderText: { flex: 1, color: '#6b7280', fontWeight: '700', fontSize: 12 },
  tableColumnLarge: { flex: 1.5 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tableCell: { flex: 1, color: '#111827', fontSize: 13 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, fontWeight: '700' },
  pending: { backgroundColor: '#fef3c7', color: '#92400e' },
  packed: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  delivered: { backgroundColor: '#dcfce7', color: '#166534' },
});
