import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const acceptedMethods = ['Visa', 'Mastercard', 'UPI', 'Paytm', 'Google Pay'];

export default function PaymentMethodsPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const methodList = useMemo(
    () => acceptedMethods.map((method) => ({ id: method, name: method })),
    [],
  );

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Payment Methods" backgroundColor="#fff" />
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} bounces={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Payment methods</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Secure payment options for faster checkout.</Text>
        </View>

        <View style={[styles.listCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          {methodList.map((method) => (
            <View key={method.id} style={styles.methodRow}>
              <Text style={[styles.methodText, { color: theme.colors.text }]}>{method.name}</Text>
              <Text style={[styles.methodStatus, { color: theme.colors.secondary }]}>Accepted</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Saved payment methods</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.secondary }]}>Manage cards, UPI IDs and wallet methods you use most.</Text>

        <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/account/saved-payments')}>
          <Text style={styles.buttonText}>Open saved payments</Text>
        </Pressable>

        <View style={[styles.tipCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.tipTitle, { color: theme.colors.text }]}>Tip</Text>
          <Text style={[styles.tipBody, { color: theme.colors.secondary }]}>Keep your preferred card active for one-tap checkout and faster delivery on every order.</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  hero: { padding: 20, borderRadius: 18, marginBottom: 16, borderWidth: 1 },
  heroTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  listCard: { borderWidth: 1, borderRadius: 18, padding: 18, marginBottom: 20 },
  methodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eceef2' },
  methodText: { fontSize: 16, fontWeight: '700' },
  methodStatus: { fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  sectionSubtitle: { fontSize: 14, lineHeight: 20, marginBottom: 18 },
  button: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontWeight: '800' },
  tipCard: { padding: 18, borderRadius: 18, borderWidth: 1 },
  tipTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  tipBody: { fontSize: 14, lineHeight: 20 },
});
