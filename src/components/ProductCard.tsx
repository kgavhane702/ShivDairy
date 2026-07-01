import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";

export default function ProductCard({ title, price }: { title: string; price: string }) {
  const { theme } = useTheme();
  const [qty, setQty] = useState<number>(0);
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
    setQty(1);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
      <View style={[styles.imageWrap, { backgroundColor: theme.colors.surface }]}> 
        <Image source={require('../../assets/fruits-and-vegetables.png')} style={styles.imagePlaceholder} />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>500 g</Text>
        <View style={styles.row}>
          <View>
            <Text style={[styles.price, { color: theme.colors.text }]}>₹{price}</Text>
            <Text style={[styles.old, { color: theme.colors.textSecondary }]}>₹{Math.round(Number(price) * 1.2)}</Text>
          </View>
          {qty === 0 ? (
            <Animated.View style={addAnimatedStyle}>
              <TouchableOpacity style={[styles.add, { backgroundColor: theme.colors.primary }]} onPress={handleAdd} activeOpacity={0.9}>
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.counter, { backgroundColor: theme.colors.muted, borderColor: theme.colors.border }, counterAnimatedStyle]}> 
              <TouchableOpacity style={styles.counterBtn} onPress={() => setQty(Math.max(0, qty - 1))} activeOpacity={0.8}><Text style={[styles.counterSign, { color: theme.colors.text }]}>-</Text></TouchableOpacity>
              <View style={styles.counterValue}><Text style={[styles.counterText, { color: theme.colors.text }]}>{qty}</Text></View>
              <TouchableOpacity style={styles.counterBtn} onPress={() => setQty(qty + 1)} activeOpacity={0.8}><Text style={[styles.counterSign, { color: theme.colors.text }]}>+</Text></TouchableOpacity>
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
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imageWrap: { width: '100%', height: 100, padding: 8 },
  imagePlaceholder: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 },
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
