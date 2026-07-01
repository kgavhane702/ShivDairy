import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import type { Product } from '../../domain/types';
import { useCart } from '../../features/cart/CartContext';
import { useTheme } from '../../theme/ThemeProvider';

export default function WishlistPage() {
  const { theme } = useTheme();
  const { wishlistItems, addItem, removeFromWishlist } = useCart();

  const summaryText = `${wishlistItems.length} saved items`;

  const moveToCart = (product: Product) => {
    addItem(product);
    removeFromWishlist(product.id);
  };

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="My Wishlist" backgroundColor="#fff" />
      <View style={styles.page}>
        <View style={[styles.heroCard, { backgroundColor: '#f5fbf7', borderColor: '#dcefe3' }]}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>Saved for later</Text>
            <Text style={styles.heroSubtitle}>Keep your favourite farm products close at hand and buy them whenever you are ready.</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{summaryText}</Text>
          </View>
        </View>

        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={[styles.emptyState, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
              <Text style={styles.emptyText}>Save products you love to compare and order later.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: '#e8f7ed' }]}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View>
                    <Text style={styles.price}>₹{item.price}</Text>
                    <Text style={styles.unit}>{item.unit}</Text>
                  </View>
                  <View style={[styles.stockPill, item.stock === 'Low stock' ? styles.stockLow : styles.stockGood]}>
                    <Text style={[styles.stockText, item.stock === 'Low stock' ? styles.stockLowText : styles.stockGoodText]}>{item.stock}</Text>
                  </View>
                </View>

                <View style={styles.actions}>
                  <Pressable onPress={() => moveToCart(item)} style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.primaryButtonText}>Move to cart</Text>
                  </Pressable>
                  <Pressable onPress={() => removeFromWishlist(item.id)} style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
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
    paddingBottom: 20,
    backgroundColor: '#f7f8fc',
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#4b5563',
  },
  heroBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a8a3e',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0a8a3e',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  unit: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  stockPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  stockGood: {
    backgroundColor: '#e8f7ed',
  },
  stockLow: {
    backgroundColor: '#fff6e9',
  },
  stockText: {
    fontSize: 11,
    fontWeight: '700',
  },
  stockGoodText: {
    color: '#0a8a3e',
  },
  stockLowText: {
    color: '#c47a00',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
