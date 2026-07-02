import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import { useAppStore } from '../../store/appStore';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminEnquiriesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const enquiries = useAppStore((state) => state.enquiries);
  const updateEnquiryStatus = useAppStore((state) => state.updateEnquiryStatus);

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Enquiries</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {enquiries.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No enquiries yet.</Text>
            </View>
          ) : enquiries.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <View style={styles.rowBetween}>
                <Text style={[styles.animalTitle, { color: theme.colors.text }]}>{item.animalTitle}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>From {item.name} • {item.phone}</Text>
              <Text style={[styles.notes, { color: theme.colors.textSecondary }]}>{item.notes}</Text>
              <Text style={styles.time}>{item.createdAt}</Text>
              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButton} onPress={() => updateEnquiryStatus(item.id, 'Reviewed')}>
                  <Text style={styles.actionText}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => updateEnquiryStatus(item.id, 'Booked')}>
                  <Text style={styles.actionText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backText: { color: '#0a8a3e', fontWeight: '700' },
  title: { fontSize: 20, fontWeight: '800', color: '#111827' },
  content: { padding: 16, paddingBottom: 32 },
  emptyCard: { backgroundColor: '#fff', borderRadius: 18, padding: 20, alignItems: 'center' },
  emptyText: { color: '#6b7280', fontWeight: '600' },
  card: { borderRadius: 18, padding: 14, marginBottom: 12, borderWidth: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  animalTitle: { fontSize: 16, fontWeight: '800', flex: 1 },
  status: { fontSize: 12, fontWeight: '700', color: '#0a8a3e' },
  meta: { marginTop: 6, fontSize: 12 },
  notes: { marginTop: 8, fontSize: 13, lineHeight: 20 },
  time: { marginTop: 8, fontSize: 11, color: '#6b7280' },
  actionsRow: { marginTop: 10, flexDirection: 'row', gap: 8 },
  actionButton: { backgroundColor: '#0a8a3e', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  actionText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
