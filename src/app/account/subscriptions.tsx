import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const subscriptions = [
  {
    id: 's1',
    title: 'Daily Milk Delivery',
    description: 'Fresh milk delivered every morning',
    frequency: 'Daily',
    nextDelivery: 'Tomorrow, 7:00 AM',
    amount: 159,
    savings: '5% OFF',
    status: 'Active',
  },
  {
    id: 's2',
    title: 'Weekly Vegetable Box',
    description: 'Seasonal vegetables and greens',
    frequency: 'Weekly',
    nextDelivery: 'Fri, Jul 4',
    amount: 370,
    savings: '₹20 saved',
    status: 'Active',
  },
];

export default function SubscriptionsPage() {
  const { theme } = useTheme();

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Subscriptions" backgroundColor="#fff" />
      <View style={[styles.page, { backgroundColor: theme.colors.background }]}> 
        <View style={[styles.accountCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <View style={styles.accountCardHeader}>
            <Text style={[styles.accountTitle, { color: theme.colors.text }]}>Subscription details</Text>
            <Text style={styles.accountSub}>Kiran Gavhane · 8788370576</Text>
          </View>
          <Text style={styles.accountText}>You are enrolled in automatic deliveries for your current subscriptions. Manage frequency, next delivery and payment from one place.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active subscriptions</Text>
          <Text style={styles.sectionMeta}>{subscriptions.length} plans</Text>
        </View>

        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <View style={styles.cardHead}>
                <View>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <View style={styles.badge}> 
                  <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.subscriptionRow}>
                <View style={styles.subscriptionMeta}>
                  <Text style={styles.metaLabel}>Frequency</Text>
                  <Text style={styles.metaValue}>{item.frequency}</Text>
                </View>
                <View style={styles.subscriptionMeta}>
                  <Text style={styles.metaLabel}>Next delivery</Text>
                  <Text style={styles.metaValue}>{item.nextDelivery}</Text>
                </View>
              </View>

              <View style={styles.subscriptionRow}> 
                <View style={styles.subscriptionMeta}>
                  <Text style={styles.metaLabel}>Amount</Text>
                  <Text style={styles.metaValue}>₹{item.amount}</Text>
                </View>
                <View style={styles.subscriptionMeta}> 
                  <Text style={styles.metaLabel}>Savings</Text>
                  <Text style={styles.metaValue}>{item.savings}</Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <Pressable style={[styles.actionButton, styles.primaryAction]}>
                  <Text style={styles.actionText}>Manage</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.secondaryAction]}>
                  <Text style={[styles.actionText, styles.secondaryText]}>Pause</Text>
                </Pressable>
              </View>
            </View>
          )}
          ListFooterComponent={<View style={{ height: 32 }} />}
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
  accountCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  accountCardHeader: {
    marginBottom: 10,
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  accountSub: {
    marginTop: 6,
    color: '#6b7280',
    fontSize: 13,
  },
  accountText: {
    color: '#4b5563',
    fontSize: 13,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  sectionMeta: {
    color: '#6b7280',
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#6b7280',
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    backgroundColor: '#e8f7ed',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#0a8a3e',
    fontWeight: '800',
    fontSize: 12,
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  subscriptionMeta: {
    flex: 1,
  },
  metaLabel: {
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryAction: {
    backgroundColor: '#0a8a3e',
  },
  secondaryAction: {
    backgroundColor: '#f3f4f6',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryText: {
    color: '#111827',
  },
});
