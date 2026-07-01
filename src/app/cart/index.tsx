import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';

const initialItems = [
  { id: '1', title: 'Bananas (1 kg)', price: 40, qty: 2, image: require('../../../assets/fruits-and-vegetables.png') },
  { id: '2', title: 'Milk (1 L)', price: 55, qty: 1, image: require('../../../assets/fruits-and-vegetables.png') },
  { id: '3', title: 'Bread - Whole Wheat', price: 35, qty: 1, image: require('../../../assets/fruits-and-vegetables.png') },
];

const coupons = [
  { id: 'c1', code: 'SAVE10', desc: '10% off on orders above ₹200', value: 0.1 },
  { id: 'c2', code: 'FLAT50', desc: '₹50 off', value: 50 },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const c = coupons.find((c) => c.code === appliedCoupon);
    if (!c) return 0;
    return typeof c.value === 'number' && c.value < 1 ? Math.round(subtotal * c.value) : c.value;
  }, [appliedCoupon, subtotal]);
  const delivery = subtotal > 199 ? 0 : 30;
  const total = subtotal - discount + delivery;

  function updateQty(id: string, delta: number) {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it));
  }

  return (
    <Screen backgroundColor="#fff" contentStyle={{ backgroundColor: '#fff' }}>
      <View style={styles.page}>
        <AppHeader title="Cart" backgroundColor="#fff" />

        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 180 }]}>
        <View style={styles.couponsSection}>
          <Text style={styles.sectionTitle}>Available Coupons</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }} contentContainerStyle={{ paddingRight: 16 }}>
            {coupons.map((c) => (
              <TouchableOpacity key={c.id} style={[styles.coupon, appliedCoupon === c.code ? styles.couponActive : undefined]} onPress={() => setAppliedCoupon(c.code)}>
                <Text style={styles.couponCode}>{c.code}</Text>
                <Text style={styles.couponDesc}>{c.desc}</Text>
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
                  <TouchableOpacity style={styles.qtyBtn} activeOpacity={0.8} onPress={() => updateQty(it.id, -1)}><Text style={styles.qtySign}>-</Text></TouchableOpacity>
                  <View style={styles.qtyCount}><Text style={styles.qtyText}>{it.qty}</Text></View>
                  <TouchableOpacity style={styles.qtyBtn} activeOpacity={0.8} onPress={() => updateQty(it.id, +1)}><Text style={styles.qtySign}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.priceWrap}>
                <Text style={styles.price}>₹{it.price * it.qty}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text>₹{subtotal}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Discount</Text><Text>- ₹{discount}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery</Text><Text>₹{delivery}</Text></View>
          <View style={[styles.summaryRow, { marginTop: 8 }]}><Text style={[styles.summaryLabel, { fontWeight: '800' }]}>Total</Text><Text style={{ fontWeight: '800' }}>₹{total}</Text></View>
        </View>

      </ScrollView>

        <View style={styles.footer}> 
          <View style={styles.footerInner}>
            <View style={styles.leftBox} />
            <TouchableOpacity style={styles.placeOrderBtn} activeOpacity={0.85} onPress={() => router.push('/checkout')}>
              <Text style={styles.placeLabel}>Place order</Text>
              <Text style={styles.placePrice}>₹{total}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  summaryLabel: { color: '#374151' },
  footerInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  leftBox: { width: 140, height: 52 },
  placeOrderBtn: { flex: 1, backgroundColor: '#0a8a3e', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  placeLabel: { color: '#fff', fontWeight: '700', fontSize: 14 },
  placePrice: { color: '#fff', fontWeight: '900', marginTop: 4 },
});
