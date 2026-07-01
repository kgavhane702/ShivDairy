import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { orderMap, statusStyles } from '../../data/orders';
import { useTheme } from '../../theme/ThemeProvider';

interface Params {
  orderId?: string;
}

export default function OrderDetailPage() {
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const orderId = typeof params.orderId === 'string' ? params.orderId : '1';
  const order = orderMap[orderId] ?? orderMap['1'];
  const statusStyle = statusStyles[order.status];

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Order Details" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}> 
              <Text style={[styles.statusText, { color: statusStyle.color }]}>{order.status}</Text>
            </View>
          </View>

          <Text style={styles.orderTotal}>{order.total}</Text>
          <Text style={styles.deliveryEstimate}>{order.deliveryEstimate}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.sectionText}>{order.address}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Billing Summary</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>{order.subTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery fee</Text>
            <Text style={styles.billValue}>{order.deliveryFee}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Tax</Text>
            <Text style={styles.billValue}>{order.tax}</Text>
          </View>
          <View style={styles.billDivider} />
          <View style={[styles.billRow, styles.billTotalRow]}>
            <Text style={styles.billTotalLabel}>Total</Text>
            <Text style={styles.billTotalValue}>{order.total}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order Note</Text>
          <Text style={styles.sectionText}>{order.note}</Text>
        </View>

        <Pressable style={styles.helpButton} onPress={() => {}}>
          <Text style={styles.helpButtonText}>Need help with this order?</Text>
        </Pressable>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.products.map((product) => (
            <View key={product.id} style={styles.itemRow}>
              <Image source={product.image} style={styles.itemImage} />
              <View style={styles.itemMeta}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemDetails}>{product.quantity} × {product.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#f7f8fc',
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.05)',
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  orderDate: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  orderTotal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },
  deliveryEstimate: {
    fontSize: 14,
    color: '#6b7280',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 14,
  },
  itemMeta: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 13,
    color: '#6b7280',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billLabel: {
    color: '#6b7280',
    fontSize: 14,
  },
  billValue: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  billTotalRow: {
    marginTop: 6,
  },
  billTotalLabel: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  billTotalValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
  helpButton: {
    backgroundColor: '#eff6ff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 14,
  },
  helpButtonText: {
    color: '#1d4ed8',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
