import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const customers = [
  { name: 'Aarav', email: 'aarav@example.com', orders: 3 },
  { name: 'Meera', email: 'meera@example.com', orders: 2 },
  { name: 'Rohan', email: 'rohan@example.com', orders: 5 },
];

export default function AdminCustomersScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Customers" subtitle="Overview of your users" onBack={() => router.back()} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {customers.map((customer) => (
          <View key={customer.email} style={styles.customerCard}>
            <View>
              <Text style={styles.customerName}>{customer.name}</Text>
              <Text style={styles.customerEmail}>{customer.email}</Text>
            </View>
            <View style={styles.orderCountBox}>
              <Text style={styles.orderCount}>{customer.orders}</Text>
              <Text style={styles.orderCountLabel}>orders</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  customerCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  customerName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  customerEmail: { color: '#6b7280', marginTop: 4 },
  orderCountBox: { alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12 },
  orderCount: { fontSize: 18, fontWeight: '800', color: '#0a8a3e' },
  orderCountLabel: { fontSize: 11, color: '#6b7280' },
});
