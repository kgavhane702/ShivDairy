import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const stockItems = [
  { name: 'Fresh Tomatoes', quantity: 48, status: 'Healthy' },
  { name: 'Organic Spinach', quantity: 12, status: 'Low' },
  { name: 'Coconut Water', quantity: 24, status: 'Healthy' },
];

export default function AdminInventoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Inventory" subtitle="Track stock levels at a glance" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {stockItems.map((item) => (
          <View key={item.name} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={[styles.badge, item.status === 'Low' ? styles.low : styles.good]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.quantity}>Available: {item.quantity}</Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 20, paddingBottom: 36 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  quantity: { fontSize: 13, color: '#6b7280', marginTop: 8 },
  badge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  good: { backgroundColor: '#dcfce7' },
  low: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#111827' },
});
