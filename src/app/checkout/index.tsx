import { StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';

export default function CheckoutPage() {
  return (
    <Screen backgroundColor="#fff">
      <View style={styles.page}>
        <AppHeader title="Checkout" backgroundColor="#fff" />
        <View style={styles.body}>
          <Text style={styles.h1}>Checkout (static)</Text>
          <Text style={styles.p}>This is a placeholder checkout screen. Integrate payment or address flows here.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  body: { padding: 16 },
  h1: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  p: { color: '#6b7280' },
});
