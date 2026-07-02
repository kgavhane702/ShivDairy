import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminLoginScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Secure access</Text>
          <Text style={styles.title}>Admin Login</Text>
          <Text style={styles.subtitle}>Enter your admin credentials to manage the store.</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput placeholder="admin@krishikart.com" style={styles.input} placeholderTextColor="#9ca3af" />

          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="••••••••" style={styles.input} placeholderTextColor="#9ca3af" secureTextEntry />

          <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={() => router.push('/admin' as any)}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  eyebrow: { color: '#0a8a3e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280', marginTop: 6, marginBottom: 18 },
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
  button: {
    marginTop: 12,
    backgroundColor: '#0a8a3e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});
