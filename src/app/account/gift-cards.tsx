import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

type GiftCard = {
  id: string;
  code: string;
  balance: number;
  expires: string;
};

const initialCards: GiftCard[] = [
  { id: 'gc1', code: 'KRISHI150', balance: 150, expires: '12/2026' },
  { id: 'gc2', code: 'FRESH50', balance: 50, expires: '09/2026' },
];

export default function GiftCardsPage() {
  const { theme } = useTheme();
  const [giftCards, setGiftCards] = useState<GiftCard[]>(initialCards);
  const [codeInput, setCodeInput] = useState('');
  const [notice, setNotice] = useState('');

  const totalBalance = giftCards.reduce((sum, card) => sum + card.balance, 0);

  const redeemGiftCard = () => {
    const trimmed = codeInput.trim().toUpperCase();
    if (!trimmed) {
      setNotice('Please enter a gift card code.');
      return;
    }

    if (giftCards.some((item) => item.code === trimmed)) {
      setNotice('This code is already added.');
      return;
    }

    const newCard: GiftCard = {
      id: `${Date.now()}`,
      code: trimmed,
      balance: 100,
      expires: '12/2027',
    };

    setGiftCards([newCard, ...giftCards]);
    setCodeInput('');
    setNotice('Gift card added successfully.');
  };

  const renderCard = ({ item }: { item: GiftCard }) => (
    <View style={[styles.cardRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
      <View style={styles.cardLeft}>
        <Text style={[styles.cardHeading, { color: theme.colors.text }]}>{item.code}</Text>
        <Text style={[styles.cardMeta, { color: theme.colors.secondary }]}>Expires {item.expires}</Text>
      </View>
      <Text style={[styles.cardAmount, { color: theme.colors.text }]}>
        ₹{item.balance}
      </Text>
    </View>
  );

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="My Gift Cards" backgroundColor="#fff" />
      <FlatList
        style={styles.page}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        data={giftCards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        ListHeaderComponent={
          <>
            <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Gift card wallet</Text>
              <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Track your balance and add new gift cards anytime.</Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={[styles.summaryLabel, { color: theme.colors.text }]}>Total balance</Text>
              <Text style={[styles.summaryValue, { color: theme.colors.text }]}>₹{totalBalance}</Text>
              <Text style={[styles.summaryMeta, { color: theme.colors.secondary }]}>{giftCards.length} gift card{giftCards.length === 1 ? '' : 's'}</Text>
            </View>

            <View style={[styles.redeemCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Redeem a gift card</Text>
              <TextInput
                value={codeInput}
                onChangeText={setCodeInput}
                placeholder="Enter gift card code"
                placeholderTextColor={theme.colors.secondary}
                style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
              />
              {notice ? <Text style={[styles.notice, { color: theme.colors.primary }]}>{notice}</Text> : null}
              <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={redeemGiftCard}>
                <Text style={styles.buttonText}>Redeem code</Text>
              </Pressable>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 12 }]}>Your gift cards</Text>
          </>
        }
        ListEmptyComponent={<Text style={[styles.emptyState, { color: theme.colors.secondary }]}>No gift cards added yet.</Text>}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  hero: { padding: 20, borderRadius: 18, marginBottom: 16, borderWidth: 1 },
  heroTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  summaryCard: { padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 16 },
  summaryLabel: { fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  summaryValue: { fontSize: 32, fontWeight: '800' },
  summaryMeta: { marginTop: 8, fontSize: 14 },
  redeemCard: { padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 14 },
  input: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12 },
  notice: { fontSize: 13, marginBottom: 8 },
  button: { borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '800' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 18, padding: 18, borderWidth: 1, marginBottom: 12 },
  cardLeft: { flex: 1, paddingRight: 12 },
  cardHeading: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardMeta: { fontSize: 13 },
  cardAmount: { fontSize: 20, fontWeight: '800' },
  emptyState: { fontSize: 14, color: '#888' },
});
