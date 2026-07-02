import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const promos = [
  { title: 'Weekend Fresh', detail: '20% off on leafy vegetables', code: 'FRESH20' },
  { title: 'Free Delivery', detail: 'Enjoy free shipping above ₹499', code: 'SHIPFREE' },
  { title: 'Bundle Saver', detail: 'Buy 2 and save ₹30', code: 'BUNDLE30' },
];

export default function PromotionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Promotions</Text>
          <Text style={styles.subtitle}>Use special offers and promo codes</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {promos.map((promo) => (
          <View key={promo.code} style={styles.card}>
            <Text style={styles.cardTitle}>{promo.title}</Text>
            <Text style={styles.cardDetail}>{promo.detail}</Text>
            <View style={styles.codeRow}>
              <Text style={styles.codeText}>{promo.code}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 10 },
  backButton: { width: 40, height: 40, borderRadius: 999, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  backButtonText: { fontSize: 18, color: '#111827', fontWeight: '700' },
  headerContent: { flex: 1, marginLeft: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280', fontSize: 13, marginTop: 2 },
  contentContainer: { padding: 20, paddingBottom: 36 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  cardDetail: { color: '#6b7280', marginTop: 6 },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  codeText: { fontSize: 14, fontWeight: '700', color: '#0a8a3e' },
  copyButton: { backgroundColor: '#0a8a3e', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  copyButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
