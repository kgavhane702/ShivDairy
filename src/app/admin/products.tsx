import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const products = [
  { name: 'Fresh Tomatoes', stock: 48, price: '₹45', status: 'Live' },
  { name: 'Organic Spinach', stock: 12, price: '₹30', status: 'Low Stock' },
  { name: 'Coconut Water', stock: 24, price: '₹60', status: 'Live' },
];

export default function AdminProductsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Products" subtitle="Manage inventory and catalog" onBack={() => router.back()} actionLabel="+ Add" onAction={() => router.push('/admin/product-form' as any)} actionVariant="primary" />

      <View style={styles.searchWrap}>
        <TextInput placeholder="Search products" style={styles.searchInput} placeholderTextColor="#9ca3af" />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.name} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMeta}>Stock: {product.stock} • Price: {product.price}</Text>
            </View>
            <View style={styles.productRight}>
              <View style={[styles.statusBadge, product.status === 'Low Stock' ? styles.lowStock : styles.live]}>
                <Text style={styles.statusText}>{product.status}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: { paddingHorizontal: 20, paddingBottom: 12 },
  searchInput: { backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  productCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  productMeta: { color: '#6b7280', fontSize: 12, marginTop: 4 },
  productRight: { alignItems: 'flex-end', gap: 8 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  live: { backgroundColor: '#dcfce7' },
  lowStock: { backgroundColor: '#fef3c7' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  editButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f3f4f6' },
  editButtonText: { color: '#111827', fontWeight: '700', fontSize: 12 },
});
