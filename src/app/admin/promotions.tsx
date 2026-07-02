import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

const promotions = [
  { title: 'Weekend Deal', detail: '20% off on leafy greens', status: 'Active' },
  { title: 'Fresh Harvest', detail: 'Free delivery above ₹499', status: 'Draft' },
  { title: 'Bundle Offer', detail: 'Buy 2 save ₹30', status: 'Active' },
];

export default function AdminPromotionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Promotions" subtitle="Manage banners and offers" onBack={() => router.back()} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {promotions.map((promo) => (
          <View key={promo.title} style={styles.promoCard}>
            <View style={styles.promoInfo}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDetail}>{promo.detail}</Text>
            </View>
            <View style={[styles.statusBadge, promo.status === 'Active' ? styles.active : styles.draft]}>
              <Text style={styles.statusText}>{promo.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  promoCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  promoInfo: { flex: 1 },
  promoTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  promoDetail: { color: '#6b7280', marginTop: 4 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  active: { backgroundColor: '#dcfce7' },
  draft: { backgroundColor: '#f3f4f6' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#111827' },
});
