import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const categories = ['Vegetables', 'Fruits', 'Groceries', 'Beverages'];

export default function AdminProductFormScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="New Product" subtitle="Create a polished catalog entry" onBack={() => router.back()} actionLabel="Save" onAction={() => {}} actionVariant="primary" />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>Product name</Text>
          <TextInput placeholder="Enter product name" style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>Category</Text>
          <View style={styles.pillRow}>
            {categories.map((category) => (
              <View key={category} style={styles.pill}>
                <Text style={styles.pillText}>{category}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Price</Text>
          <TextInput placeholder="₹0" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />

          <Text style={styles.label}>Stock</Text>
          <TextInput placeholder="0" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />

          <Text style={styles.label}>Description</Text>
          <TextInput placeholder="Describe the product" style={[styles.input, styles.textArea]} placeholderTextColor="#9ca3af" multiline />

          <Text style={styles.label}>Image URL</Text>
          <TextInput placeholder="https://..." style={styles.input} placeholderTextColor="#9ca3af" />
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
  pillText: { fontSize: 12, fontWeight: '600', color: '#374151' },
});
