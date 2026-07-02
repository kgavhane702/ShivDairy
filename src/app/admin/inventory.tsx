import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useAdminStore } from '../../store/adminStore';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminInventoryScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const inventory = useAdminStore((state) => state.inventory);
  const adjustInventoryQuantity = useAdminStore((state) => state.adjustInventoryQuantity);
  const updateInventoryThreshold = useAdminStore((state) => state.updateInventoryThreshold);
  const toggleInventoryPause = useAdminStore((state) => state.toggleInventoryPause);
  const requestInventoryRestock = useAdminStore((state) => state.requestInventoryRestock);
  const updateInventoryImage = useAdminStore((state) => state.updateInventoryImage);
  const [search, setSearch] = useState('');
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});

  const filteredInventory = useMemo(
    () => inventory.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())),
    [inventory, search]
  );

  const reorderCount = inventory.filter((item) => item.quantity <= item.reorderThreshold).length;
  const outOfStockCount = inventory.filter((item) => item.quantity === 0).length;

  const adjustQuantity = (id: string, delta: number) => {
    adjustInventoryQuantity(id, delta);
  };

  const updateThreshold = (id: string, value: string) => {
    const threshold = Number(value.replace(/[^0-9]/g, '')) || 0;
    updateInventoryThreshold(id, threshold);
  };

  const togglePause = (id: string) => {
    toggleInventoryPause(id);
  };

  const requestRestock = (id: string) => {
    requestInventoryRestock(id);
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
  ];

  const browseImage = (id: string) => {
    const currentIndex = imageIndexes[id] ?? 0;
    const nextIndex = (currentIndex + 1) % sampleImages.length;
    setImageIndexes((current) => ({ ...current, [id]: nextIndex }));
    updateInventoryImage(id, sampleImages[nextIndex]);
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Stock" subtitle="Adjust quantities and reorder levels" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{inventory.length}</Text>
            <Text style={styles.summaryLabel}>Total SKUs</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{reorderCount}</Text>
            <Text style={styles.summaryLabel}>Reorder needed</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{outOfStockCount}</Text>
            <Text style={styles.summaryLabel}>Out of stock</Text>
          </View>
        </View>

        <View style={styles.searchSection}>
          <TextInput placeholder="Search inventory" value={search} onChangeText={setSearch} style={styles.searchInput} placeholderTextColor="#9ca3af" />
        </View>

        {filteredInventory.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.itemHeader}>
              <View style={styles.itemTitleWrap}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
              <View style={[styles.badge, item.status === 'Low' ? styles.low : item.status === 'Out of Stock' ? styles.outOfStock : styles.healthy]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.imageRow}>
              <Image source={{ uri: item.imageUrl || sampleImages[0] }} style={styles.itemImage} />
              <TouchableOpacity style={styles.imageButton} onPress={() => browseImage(item.id)}>
                <Text style={styles.imageButtonText}>Browse image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>Current stock</Text>
                <Text style={styles.statValue}>{item.quantity}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>Reorder at</Text>
                <TextInput
                  value={String(item.reorderThreshold)}
                  onChangeText={(value) => updateThreshold(item.id, value)}
                  keyboardType="numeric"
                  style={styles.thresholdInput}
                  placeholder="0"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>Incoming</Text>
                <Text style={styles.statValue}>{item.incoming}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>Last restock</Text>
                <Text style={styles.statValue}>{item.lastRestock}</Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <View style={styles.adjustRow}>
                <TouchableOpacity style={styles.adjustButton} onPress={() => adjustQuantity(item.id, -5)}>
                  <Text style={styles.adjustText}>-5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adjustButton} onPress={() => adjustQuantity(item.id, 5)}>
                  <Text style={styles.adjustText}>+5</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.actionGroup}>
                <TouchableOpacity style={styles.actionButton} onPress={() => requestRestock(item.id)}>
                  <Text style={styles.actionButtonText}>Request restock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.pauseButton]} onPress={() => togglePause(item.id)}>
                  <Text style={[styles.actionButtonText, styles.pauseButtonText]}>{item.paused ? 'Resume' : 'Pause'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 20, paddingBottom: 36 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  summaryCard: { flex: 1, backgroundColor: '#fff', borderRadius: 18, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  summaryValue: { fontSize: 22, fontWeight: '800', color: '#111827' },
  summaryLabel: { marginTop: 6, fontSize: 12, color: '#6b7280' },
  searchSection: { marginBottom: 16 },
  searchInput: { backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  itemTitleWrap: { flex: 1, paddingRight: 10 },
  itemName: { fontSize: 16, fontWeight: '800', color: '#111827' },
  itemCategory: { marginTop: 4, fontSize: 12, color: '#6b7280' },
  imageRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  itemImage: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#f3f4f6' },
  imageButton: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999 },
  imageButtonText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  badge: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  healthy: { backgroundColor: '#dcfce7' },
  low: { backgroundColor: '#fef3c7' },
  outOfStock: { backgroundColor: '#fee2e2' },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  statBlock: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 18, padding: 14 },
  statLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#111827' },
  thresholdInput: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: '#111827' },
  detailRow: { borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 14, marginBottom: 14 },
  detailLabel: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  detailValue: { fontSize: 14, color: '#111827' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  adjustRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  adjustButton: { backgroundColor: '#f3f4f6', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 18 },
  adjustText: { fontWeight: '700', color: '#111827' },
  actionGroup: { flex: 1, alignItems: 'flex-end', gap: 10 },
  actionButton: { backgroundColor: '#0a8a3e', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 18, marginBottom: 10 },
  actionButtonText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
  pauseButton: { backgroundColor: '#f3f4f6' },
  pauseButtonText: { color: '#111827' },
});
