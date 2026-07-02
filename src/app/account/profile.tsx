import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>My account</Text>
          <Text style={styles.title}>Aarav Sharma</Text>
          <Text style={styles.subtitle}>aarav@example.com</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/auth/login' as any)}>
            <Text style={styles.rowText}>Sign in</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/auth/register' as any)}>
            <Text style={styles.rowText}>Create account</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>Sign out</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 20, paddingBottom: 36 },
  card: { backgroundColor: '#fff', borderRadius: 22, padding: 18, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  eyebrow: { color: '#0a8a3e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280', marginTop: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  rowText: { fontSize: 15, fontWeight: '600', color: '#111827' },
  arrow: { fontSize: 20, color: '#0a8a3e', fontWeight: '700' },
});
