import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useAdminStore } from '../../store/adminStore';
import { useTheme } from '../../theme/ThemeProvider';

const categories = ['Vegetables', 'Fruits', 'Groceries', 'Beverages'];
const sampleImages = [
  'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
];

export default function AdminProductFormScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const productId = typeof params.id === 'string' ? params.id : undefined;
  const isEdit = Boolean(productId);
  const products = useAdminStore((state) => state.products);
  const addProduct = useAdminStore((state) => state.addProduct);
  const updateProduct = useAdminStore((state) => state.updateProduct);
  const existingProduct = products.find((item) => item.id === productId);

  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [reorderThreshold, setReorderThreshold] = useState('');
  const [supplier] = useState('');
  const [sku, setSku] = useState('');
  const [imageUrl, setImageUrl] = useState(sampleImages[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setCategory(existingProduct.category);
      setPrice(existingProduct.price);
      setStock(String(existingProduct.stock));
      setReorderThreshold(String(existingProduct.reorderThreshold));
      setSku(existingProduct.sku);
      setImageUrl(existingProduct.imageUrl || sampleImages[0]);
      setImageIndex(sampleImages.findIndex((item) => item === (existingProduct.imageUrl || sampleImages[0])) >= 0 ? sampleImages.findIndex((item) => item === (existingProduct.imageUrl || sampleImages[0])) : 0);
      setDescription(existingProduct.name.includes('Tomatoes') ? 'Ripe and juicy tomatoes delivered fresh every morning.' : '');
      setActive(existingProduct.active);
    }
  }, [existingProduct]);

  const activeLabel = active ? 'Active in catalog' : 'Inactive';
  const formReady = useMemo(() => name.length > 0 && price.length > 0 && stock.length > 0, [name, price, stock]);

  const browseImage = () => {
    const nextIndex = (imageIndex + 1) % sampleImages.length;
    setImageIndex(nextIndex);
    setImageUrl(sampleImages[nextIndex]);
  };

  const handleSave = () => {
    if (!formReady) return;

    const nextProduct = {
      id: existingProduct?.id ?? `p-${Date.now()}`,
      name,
      category,
      price,
      stock: Number(stock) || 0,
      reorderThreshold: Number(reorderThreshold) || 0,
      supplier: existingProduct?.supplier ?? '',
      sku,
      imageUrl,
      active,
    };

    if (existingProduct) {
      updateProduct(nextProduct);
    } else {
      addProduct(nextProduct);
    }

    router.back();
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title={isEdit ? 'Edit item' : 'New item'} subtitle="Add product details and stock basics" onBack={() => router.back()} actionLabel="Save" onAction={handleSave} actionVariant="primary" />

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

          <Text style={styles.label}>Product image</Text>
          <View style={styles.imagePanel}>
            <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.imageButton} onPress={browseImage}>
              <Text style={styles.imageButtonText}>Browse image</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Describe the product" style={[styles.input, styles.textArea]} placeholderTextColor="#9ca3af" multiline />

          <View style={styles.switchRow}>
            <Text style={styles.label}>{activeLabel}</Text>
            <Switch value={active} onValueChange={setActive} thumbColor={active ? '#0a8a3e' : '#d1d5db'} trackColor={{ false: '#e5e7eb', true: '#d1fae5' }} />
          </View>

          <TouchableOpacity style={[styles.saveButton, !formReady && styles.saveButtonDisabled]} disabled={!formReady} onPress={handleSave}>
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
  imagePanel: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  imagePreview: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#f3f4f6' },
  imageButton: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999 },
  imageButtonText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  saveButton: { marginTop: 20, backgroundColor: '#0a8a3e', borderRadius: 16, paddingVertical: 14, alignItems: 'center' },
  saveButtonDisabled: { backgroundColor: '#9ca3af' },
  saveButtonText: { fontSize: 14, fontWeight: '800', color: '#fff' },
  saveButtonTextDisabled: { color: '#f3f4f6' },
});
