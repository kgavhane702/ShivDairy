import { useRouter, useSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const categories = ['Vegetables', 'Fruits', 'Groceries', 'Beverages'];
const suppliers = ['Green Farm Supplies', 'Leafy Greens Co.', 'Tropical Traders', 'Local Market Hub'];

export default function AdminProductFormScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useSearchParams();
  const isEdit = Boolean(params.id);

  const [name, setName] = useState(isEdit ? 'Fresh Tomatoes' : '');
  const [category, setCategory] = useState(isEdit ? 'Vegetables' : categories[0]);
  const [price, setPrice] = useState(isEdit ? '₹45' : '');
  const [stock, setStock] = useState(isEdit ? '48' : '');
  const [reorderThreshold, setReorderThreshold] = useState(isEdit ? '20' : '');
  const [supplier, setSupplier] = useState(isEdit ? 'Green Farm Supplies' : suppliers[0]);
  const [sku, setSku] = useState(isEdit ? 'KR-VEG-001' : '');
  const [imageUrl, setImageUrl] = useState(isEdit ? 'https://via.placeholder.com/80/eff6ff/111827?text=T' : '');
  const [description, setDescription] = useState(isEdit ? 'Ripe and juicy tomatoes delivered fresh every morning.' : '');
  const [active, setActive] = useState(isEdit ? true : true);

  const activeLabel = active ? 'Active in catalog' : 'Inactive';
  const formReady = useMemo(() => name.length > 0 && price.length > 0 && stock.length > 0, [name, price, stock]);

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title={isEdit ? 'Edit Product' : 'New Product'} subtitle="Manage catalog and inventory details" onBack={() => router.back()} actionLabel="Save" onAction={() => {}} actionVariant="primary" />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>Product name</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Enter product name" style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>SKU</Text>
          <TextInput value={sku} onChangeText={setSku} placeholder="Enter SKU" style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>Category</Text>
          <View style={styles.pillRow}>
            {categories.map((option) => (
              <TouchableOpacity key={option} style={[styles.pill, category === option && styles.pillActive]} onPress={() => setCategory(option)}>
                <Text style={[styles.pillText, category === option && styles.pillTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Supplier</Text>
          <View style={styles.pillRow}>
            {suppliers.map((option) => (
              <TouchableOpacity key={option} style={[styles.pill, supplier === option && styles.pillActive]} onPress={() => setSupplier(option)}>
                <Text style={[styles.pillText, supplier === option && styles.pillTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price</Text>
          <TextInput value={price} onChangeText={setPrice} placeholder="₹0" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />

          <View style={styles.splitRow}>
            <View style={styles.splitCol}>
              <Text style={styles.label}>Stock</Text>
              <TextInput value={stock} onChangeText={setStock} placeholder="0" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />
            </View>
            <View style={styles.splitCol}>
              <Text style={styles.label}>Reorder level</Text>
              <TextInput value={reorderThreshold} onChangeText={setReorderThreshold} placeholder="0" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />
            </View>
          </View>

          <Text style={styles.label}>Inventory image URL</Text>
          <TextInput value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Describe the product" style={[styles.input, styles.textArea]} placeholderTextColor="#9ca3af" multiline />

          <View style={styles.switchRow}>
            <Text style={styles.label}>{activeLabel}</Text>
            <Switch value={active} onValueChange={setActive} thumbColor={active ? '#0a8a3e' : '#d1d5db'} trackColor={{ false: '#e5e7eb', true: '#d1fae5' }} />
          </View>

          <TouchableOpacity style={[styles.saveButton, !formReady && styles.saveButtonDisabled]} disabled={!formReady} onPress={() => {}}>
            <Text style={[styles.saveButtonText, !formReady && styles.saveButtonTextDisabled]}>Save product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 20, paddingBottom: 36 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 8, marginTop: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#f9fafb',
  },
  textArea: { minHeight: 96, textAlignVertical: 'top' },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  pill: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  pillActive: { backgroundColor: '#0a8a3e' },
  pillText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  pillTextActive: { color: '#fff' },
  splitRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  splitCol: { flex: 1 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  saveButton: { marginTop: 20, backgroundColor: '#0a8a3e', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  saveButtonDisabled: { backgroundColor: '#9ca3af' },
  saveButtonText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  saveButtonTextDisabled: { color: '#f3f4f6' },
});
