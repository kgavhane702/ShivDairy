import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const faqs = [
  {
    id: 'faq1',
    question: 'How do I track my order?',
    answer: 'Go to Orders in My Account and tap any order to view delivery status and estimated arrival.',
  },
  {
    id: 'faq2',
    question: 'Can I change my delivery address?',
    answer: 'Yes — update your default address under Address in My Account before placing an order.',
  },
  {
    id: 'faq3',
    question: 'What payment methods are supported?',
    answer: 'We accept UPI, debit/credit cards, net banking and wallet payments in the checkout flow.',
  },
  {
    id: 'faq4',
    question: 'How do I cancel a subscription?',
    answer: 'Open the Subscriptions screen and choose the plan you want to pause or cancel.',
  },
];

export default function SupportPage() {
  const { theme } = useTheme();

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Support & FAQs" backgroundColor="#fff" />
      <View style={[styles.page, { backgroundColor: theme.colors.background }]}> 
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Need help with your order?</Text>
          <Text style={styles.heroSubtitle}>Browse common questions or contact our support team for quick assistance.</Text>
        </View>

        <FlatList
          data={faqs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.faqCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 24 }} />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  faqCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  faqAnswer: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
  },
});
