import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { coupons } from '../../data/catalog';
import { useCart } from '../../features/cart/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, appliedCouponCode, setAppliedCouponCode, summary } = useCart();
  const isEmpty = items.length === 0;

  return (
    <Screen backgroundColor="#fff" contentStyle={{ backgroundColor: '#fff' }}>
      <View style={styles.page}>
        <AppHeader title="Cart" backgroundColor="#fff" />

        {isEmpty ? (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>🛒</Text>
            </View>
            <Text style={styles.emptyTitle}>Your cart is getting lonely</Text>
            <Text style={styles.emptySubtitle}>Fill it up with all things good!</Text>
            <TouchableOpacity style={styles.emptyButton} activeOpacity={0.85} onPress={() => router.push('/')}> 
              <Text style={styles.emptyButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[styles.container, { paddingBottom: 180 }]}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
          >
        <View style={styles.couponsSection}>
          <Text style={styles.sectionTitle}>Available Coupons</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }} contentContainerStyle={{ paddingRight: 16 }}>
            {coupons.map((c) => (
              <TouchableOpacity key={c.id} style={[styles.coupon, appliedCouponCode === c.code ? styles.couponActive : undefined]} onPress={() => setAppliedCouponCode(c.code)}>
                <Text style={styles.couponCode}>{c.code}</Text>
                <Text style={styles.couponDesc}>{c.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.itemsSection}>
          {items.map((it) => (
            <View key={it.id} style={styles.row}>
              <Image source={it.image} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{it.title}</Text>
                <Text style={styles.meta}>₹{it.price}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} activeOpacity={0.8} onPress={() => updateQuantity(it.id, -1)}><Text style={styles.qtySign}>-</Text></TouchableOpacity>
                  <View style={styles.qtyCount}><Text style={styles.qtyText}>{it.quantity}</Text></View>
                  <TouchableOpacity style={styles.qtyBtn} activeOpacity={0.8} onPress={() => updateQuantity(it.id, +1)}><Text style={styles.qtySign}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.priceWrap}>
                <Text style={styles.price}>₹{it.price * it.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text>₹{summary.subtotal}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Discount</Text><Text>- ₹{summary.discount}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery</Text><Text>₹{summary.delivery}</Text></View>
          <View style={[styles.summaryRow, { marginTop: 8 }]}><Text style={[styles.summaryLabel, { fontWeight: '800' }]}>Total</Text><Text style={{ fontWeight: '800' }}>₹{summary.total}</Text></View>
        </View>

      </ScrollView>
        )}
        {!isEmpty && (
        <View style={styles.footer}> 
          <View style={styles.footerInner}>
            <View style={styles.leftBox} />
            <TouchableOpacity style={styles.placeOrderBtn} activeOpacity={0.85} onPress={() => router.push('/checkout')}>
              <Text style={styles.placeLabel}>Place order</Text>
              <Text style={styles.placePrice}>₹{summary.total}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16, paddingBottom: 220 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  image: { width: 72, height: 72, borderRadius: 8, backgroundColor: '#f4f6fb' },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#111827' },
  meta: { marginTop: 6, color: '#374151' },
  priceWrap: { width: 80, alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: '700' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  qtyBtn: { width: 30, height: 30, borderRadius: 6, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  qtySign: { fontSize: 16, fontWeight: '700', color: '#111827' },
  qtyCount: { width: 36, alignItems: 'center', justifyContent: 'center' },
  qtyText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, borderTopWidth: 1, borderColor: '#eceef2', backgroundColor: '#fff', zIndex: 10, elevation: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { color: '#6b7280' },
  totalValue: { fontSize: 18, fontWeight: '800' },
  checkout: { backgroundColor: '#0a8a3e', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '800' },
  couponsSection: { marginBottom: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  coupon: { padding: 12, backgroundColor: '#f8fafc', borderRadius: 10, marginRight: 12, minWidth: 160, borderWidth: 1, borderColor: '#eef2f6' },
  couponActive: { borderColor: '#0a8a3e', backgroundColor: '#e6f7ee' },
  couponCode: { fontWeight: '800', marginBottom: 6, color: '#111827' },
  couponDesc: { color: '#374151', fontSize: 12 },
  itemsSection: { marginTop: 6 },
  summarySection: { marginTop: 18, paddingBottom: 40 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  emptyStateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyIcon: { width: 140, height: 140, borderRadius: 80, backgroundColor: '#edf2ff', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyIconText: { fontSize: 64 },
  emptyTitle: { fontSize: 22, fontWeight: '800', marginBottom: 10, textAlign: 'center', color: '#111827' },
  emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  emptyButton: { backgroundColor: '#2563eb', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 28 },
  emptyButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  summaryLabel: { color: '#374151' },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  leftBox: { width: 140, height: 52 },
  placeOrderBtn: { flex: 1, backgroundColor: '#0a8a3e', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  placeLabel: { color: '#fff', fontWeight: '700', fontSize: 14 },
  placePrice: { color: '#fff', fontWeight: '900', marginTop: 4 },
});
