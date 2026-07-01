import { useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { orders, statusStyles } from '../../data/orders';
import { useTheme } from '../../theme/ThemeProvider';

export default function OrdersPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Order History" backgroundColor="#fff" />
      <View style={styles.page}>
        <Text style={styles.subtitle}>Track past purchases, view order status, and review your most recent orders.</Text>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const statusStyle = statusStyles[item.status];
            return (
              <Pressable
                onPress={() => router.push(`/account/order-detail?orderId=${item.id}`)}
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.productPreviewRow}>
                  {item.products.slice(0, 3).map((product) => (
                    <Image key={product.id} source={product.image} style={styles.productImage} />
                  ))}
                </View>

                <Text style={styles.orderSummary}>{item.summary}</Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.orderMeta}>{item.itemCount} items</Text>
                  <Text style={styles.orderTotal}>{item.total}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f7f8fc',
  },
  subtitle: {
    marginBottom: 16,
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  orderDate: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  productPreviewRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImage: {
    width: 54,
    height: 54,
    borderRadius: 14,
    marginRight: 10,
  },
  orderSummary: {
    marginBottom: 14,
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderMeta: {
    fontSize: 13,
    color: '#6b7280',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
});
