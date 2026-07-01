import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import type { Product } from "../domain/types";
import { useAppStore } from "../store/appStore";
import { useTheme } from "../theme/ThemeProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { theme } = useTheme();
  const addItem = useAppStore((state) => state.addItem);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const wishlistItems = useAppStore((state) => state.wishlistItems);
  const qty = useAppStore((state) => state.getQuantity(product.id));
  const isSaved = wishlistItems.some((item) => item.id === product.id);
  const addScale = useSharedValue(1);
  const counterOpacity = useSharedValue(0);
  const counterScale = useSharedValue(0.94);

  useEffect(() => {
    counterOpacity.value = withTiming(qty === 0 ? 0 : 1, { duration: 220 });
    counterScale.value = withSpring(qty === 0 ? 0.94 : 1, { damping: 16, stiffness: 220 });
  }, [counterOpacity, counterScale, qty]);

  const addAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addScale.value }],
  }));

  const counterAnimatedStyle = useAnimatedStyle(() => ({
    opacity: counterOpacity.value,
    transform: [{ scale: counterScale.value }],
  }));

  const handleAdd = () => {
    addScale.value = withSpring(1.05, { damping: 12, stiffness: 260 });
    addScale.value = withTiming(1, { duration: 140 });
    addItem(product);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
      <View style={[styles.imageWrap, { backgroundColor: theme.colors.surface }]}> 
        <Image source={product.image} style={styles.imagePlaceholder} resizeMode="cover" />
        <TouchableOpacity
          style={[styles.heartButton, isSaved && styles.heartButtonActive]}
          onPress={() => toggleWishlist(product)}
          activeOpacity={0.9}
        >
          <Text style={[styles.heartIcon, isSaved && styles.heartIconActive]}>{isSaved ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{product.title}</Text>
        <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>{product.unit}</Text>
        <View style={styles.row}>
          <View>
            <Text style={[styles.price, { color: theme.colors.text }]}>₹{product.price}</Text>
            <Text style={[styles.old, { color: theme.colors.textSecondary }]}>₹{Math.round(product.price * 1.2)}</Text>
          </View>
          {qty === 0 ? (
            <Animated.View style={addAnimatedStyle}>
              <TouchableOpacity style={[styles.add, { backgroundColor: theme.colors.primary }]} onPress={handleAdd} activeOpacity={0.9}>
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.counter, { backgroundColor: theme.colors.muted, borderColor: theme.colors.border }, counterAnimatedStyle]}> 
              <TouchableOpacity style={styles.counterBtn} onPress={() => updateQuantity(product.id, -1)} activeOpacity={0.8}><Text style={[styles.counterSign, { color: theme.colors.text }]}>-</Text></TouchableOpacity>
              <View style={styles.counterValue}><Text style={[styles.counterText, { color: theme.colors.text }]}>{qty}</Text></View>
              <TouchableOpacity style={styles.counterBtn} onPress={() => updateQuantity(product.id, +1)} activeOpacity={0.8}><Text style={[styles.counterSign, { color: theme.colors.text }]}>+</Text></TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 1,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  imageWrap: { width: '100%', height: 100, padding: 8, position: 'relative' },
  imagePlaceholder: { width: '100%', height: '100%', borderRadius: 10 },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  heartButtonActive: {
    backgroundColor: '#fff1f2',
  },
  heartIcon: {
    fontSize: 15,
    color: '#64748b',
  },
  heartIconActive: {
    color: '#ef4444',
  },
  body: { padding: 12 },
  title: { fontSize: 13, marginBottom: 4, fontWeight: '700' },
  sub: { fontSize: 12, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontWeight: '700' },
  old: { textDecorationLine: 'line-through', fontSize: 12 },
  add: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  counter: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, overflow: 'hidden', borderWidth: 1 },
  counterBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  counterSign: { fontSize: 16, fontWeight: '700' },
  counterValue: { minWidth: 28, alignItems: 'center', justifyContent: 'center', paddingVertical: 6 },
  counterText: { fontWeight: '700' },
});
