import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminSettingsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Settings" subtitle="Adjust your store basics" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>Store name</Text>
          <TextInput placeholder="KrishiKart" style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>Delivery fee</Text>
          <TextInput placeholder="₹49" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />

          <Text style={styles.label}>Free delivery above</Text>
          <TextInput placeholder="₹499" style={styles.input} placeholderTextColor="#9ca3af" keyboardType="numeric" />

          <Text style={styles.label}>Support email</Text>
          <TextInput placeholder="support@krishikart.com" style={styles.input} placeholderTextColor="#9ca3af" />

          <TouchableOpacity style={styles.saveButton} activeOpacity={0.9}>
            <Text style={styles.saveButtonText}>Save changes</Text>
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
  saveButton: {
    marginTop: 12,
    backgroundColor: '#0a8a3e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: '700' },
});
