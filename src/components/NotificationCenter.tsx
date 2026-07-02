import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppStore } from '../store/appStore';

export default function NotificationCenter({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const notifications = useAppStore((state) => state.notifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);

  return (
    <View style={styles.sheet}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {notifications.length === 0 ? (
          <Text style={styles.empty}>No notifications yet.</Text>
        ) : notifications.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.card, !item.read && styles.unread]} onPress={() => { markNotificationRead(item.id); router.push('/animals' as any); }}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMessage}>{item.message}</Text>
            <Text style={styles.time}>{item.createdAt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, maxHeight: '82%', width: '100%' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  closeText: { color: '#0a8a3e', fontWeight: '700' },
  list: { maxHeight: 420 },
  listContent: { paddingBottom: 8 },
  empty: { color: '#6b7280', fontSize: 13 },
  card: { backgroundColor: '#f8fafc', borderRadius: 16, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  unread: { borderColor: '#0a8a3e', backgroundColor: '#ecfdf5' },
  cardTitle: { fontWeight: '800', color: '#111827', marginBottom: 4 },
  cardMessage: { color: '#4b5563', fontSize: 13, lineHeight: 18 },
  time: { marginTop: 6, color: '#6b7280', fontSize: 11 },
});
