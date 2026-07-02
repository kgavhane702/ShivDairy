import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useAdminStore } from '../../store/adminStore';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminProductsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const products = useAdminStore((state) => state.products);
  const toggleProductActive = useAdminStore((state) => state.toggleProductActive);

  const filtered = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()) || product.sku.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const toggleActive = (id: string) => toggleProductActive(id);

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Catalog" subtitle="Create and manage catalog items" onBack={() => router.back()} actionLabel="Add item" onAction={() => router.push('/admin/product-form' as any)} actionVariant="primary" />

      <View style={styles.searchWrap}>
        <TextInput placeholder="Search products" value={search} onChangeText={setSearch} style={styles.searchInput} placeholderTextColor="#9ca3af" />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.largeColumn]}>Product</Text>
            <Text style={styles.tableHeaderText}>Stock</Text>
            <Text style={styles.tableHeaderText}>Reorder</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.actionsColumn]}>Manage</Text>
          </View>
          {filtered.map((product) => {
            const lowStock = product.stock <= product.reorderThreshold;
            return (
              <View key={product.id} style={styles.tableRow}>
                <View style={[styles.productInfo, styles.largeColumn]}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category} • {product.sku}</Text>
                </View>
                <Text style={styles.tableCell}>{product.stock}</Text>
                <Text style={styles.tableCell}>{product.reorderThreshold}</Text>
                <View style={[styles.tableCell, styles.statusColumn]}>
                  <View style={[styles.badge, lowStock ? styles.low : styles.healthy]}>
                    <Text style={styles.badgeText}>{product.stock === 0 ? 'Out of stock' : lowStock ? 'Reorder soon' : 'Healthy'}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.actionsColumn]}>
                  <TouchableOpacity style={styles.editButton} onPress={() => router.push(`/admin/product-form?id=${product.id}` as any)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchWrap: { paddingHorizontal: 20, paddingBottom: 12 },
  searchInput: { backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tableHeader: { flexDirection: 'row', paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableHeaderText: { flex: 1, color: '#6b7280', fontWeight: '700', fontSize: 12 },
  largeColumn: { flex: 2 },
  statusColumn: { flex: 1.4 },
  actionsColumn: { flex: 1.2 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tableCell: { flex: 1, color: '#111827', fontSize: 13 },
  productInfo: { flex: 2 },
  productName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  productCategory: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  healthy: { backgroundColor: '#dcfce7' },
  low: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  editButton: { backgroundColor: '#f3f4f6', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, alignSelf: 'flex-start' },
  editButtonText: { color: '#111827', fontWeight: '700', fontSize: 12 },
});
