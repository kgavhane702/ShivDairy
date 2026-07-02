import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useTheme } from '../../theme/ThemeProvider';

type Promotion = {
  title: string;
  detail: string;
  code: string;
  active: boolean;
};

const initialPromotions: Promotion[] = [
  { title: 'Weekend Deal', detail: '20% off on leafy greens', code: 'FRESH20', active: true },
  { title: 'Free Delivery', detail: 'Free shipping above ₹499', code: 'SHIPFREE', active: false },
  { title: 'Bundle Saver', detail: 'Buy 2 and save ₹30', code: 'BUNDLE30', active: true },
];

export default function AdminPromotionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);

  const togglePromotion = (code: string) => {
    setPromotions((current) => current.map((promo) => (promo.code === code ? { ...promo, active: !promo.active } : promo)));
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Promotions" subtitle="Manage banners, codes, and offers" onBack={() => router.back()} actionLabel="New promo" onAction={() => {}} actionVariant="primary" />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {promotions.map((promo) => (
          <View key={promo.code} style={styles.promoCard}>
            <View style={styles.promoInfo}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDetail}>{promo.detail}</Text>
              <Text style={styles.promoCode}>Code: {promo.code}</Text>
            </View>
            <View style={styles.promoActions}>
              <View style={[styles.statusBadge, promo.active ? styles.active : styles.draft]}>
                <Text style={styles.statusText}>{promo.active ? 'Active' : 'Draft'}</Text>
              </View>
              <TouchableOpacity style={styles.toggleButton} onPress={() => togglePromotion(promo.code)}>
                <Text style={styles.toggleButtonText}>{promo.active ? 'Disable' : 'Activate'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 24 },
  promoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  promoInfo: { flex: 1, paddingRight: 12 },
  promoTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  promoDetail: { color: '#6b7280', marginTop: 6, fontSize: 13 },
  promoCode: { marginTop: 10, fontSize: 13, fontWeight: '700', color: '#0a8a3e' },
  promoActions: { alignItems: 'flex-end', justifyContent: 'space-between' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, marginBottom: 12 },
  active: { backgroundColor: '#dcfce7' },
  draft: { backgroundColor: '#f3f4f6' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  toggleButton: { backgroundColor: '#0a8a3e', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14 },
  toggleButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
