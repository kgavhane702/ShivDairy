import { FlatList, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

type Review = {
  id: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
};

const sampleReviews: Review[] = [
  { id: 'r1', product: 'Organic Turmeric Powder', rating: 5, comment: 'Fresh and fragrant – perfect for daily cooking.', date: 'Today' },
  { id: 'r2', product: 'Premium Basmati Rice', rating: 4, comment: 'Great texture and aroma, delivered quickly.', date: 'Yesterday' },
  { id: 'r3', product: 'Natural Honey Jar', rating: 5, comment: 'Sweet, smooth and exactly what I wanted.', date: '2 days ago' },
];

export default function RatingsReviewsPage() {
  const { theme } = useTheme();
  const averageRating = sampleReviews.reduce((sum, item) => sum + item.rating, 0) / sampleReviews.length;

  const renderReview = ({ item }: { item: Review }) => (
    <View style={[styles.reviewCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
      <View style={styles.reviewHeader}>
        <Text style={[styles.reviewProduct, { color: theme.colors.text }]}>{item.product}</Text>
        <Text style={[styles.reviewRating, { color: theme.colors.primary }]}>{item.rating}.0</Text>
      </View>
      <Text style={[styles.reviewComment, { color: theme.colors.secondary }]}>{item.comment}</Text>
      <Text style={[styles.reviewDate, { color: theme.colors.secondary }]}>{item.date}</Text>
    </View>
  );

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Ratings & Reviews" backgroundColor="#fff" />
      <FlatList
        data={sampleReviews}
        keyExtractor={(item) => item.id}
        style={styles.page}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        ListHeaderComponent={
          <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Your reviews</Text>
            <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>See your recent ratings and feedback for completed orders.</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{averageRating.toFixed(1)}</Text>
                <Text style={[styles.summaryLabel, { color: theme.colors.secondary }]}>Average rating</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{sampleReviews.length}</Text>
                <Text style={[styles.summaryLabel, { color: theme.colors.secondary }]}>Reviews left</Text>
              </View>
            </View>
          </View>
        }
        renderItem={renderReview}
        ListEmptyComponent={
          <View style={[styles.emptyState, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No reviews yet</Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.secondary }]}>Leave ratings for orders to build your feedback history.</Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  hero: { padding: 20, borderRadius: 18, marginBottom: 16, borderWidth: 1 },
  heroTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { fontSize: 14, lineHeight: 20, marginBottom: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 28, fontWeight: '800' },
  summaryLabel: { fontSize: 13, marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.8 },
  reviewCard: { borderRadius: 18, borderWidth: 1, padding: 18, marginBottom: 12 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  reviewProduct: { fontSize: 16, fontWeight: '700' },
  reviewRating: { fontSize: 16, fontWeight: '800' },
  reviewComment: { fontSize: 14, lineHeight: 20, marginBottom: 10 },
  reviewDate: { fontSize: 12 },
  emptyState: { borderRadius: 18, borderWidth: 1, padding: 20, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
});
