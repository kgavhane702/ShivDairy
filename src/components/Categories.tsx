import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { categories } from "../data/catalog";
import { useTheme } from "../theme/ThemeProvider";

function CategoryTile({ category, theme }: { category: { id: string; title: string; icon: string; description: string }; theme: any }) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 220 });
    scale.value = withSpring(1, { damping: 16, stiffness: 220 });
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.item, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }, animatedStyle]}> 
      <View style={[styles.iconWrap, { backgroundColor: theme.colors.surface }]}> 
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{category.title}</Text>
    </Animated.View>
  );
}

export default function Categories() {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Shop by Category</Text>
      <View style={styles.grid}>
        {categories.map((item) => (
          <CategoryTile key={item.id} category={item} theme={theme} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: '100%', marginTop: 12, paddingHorizontal: 16 },
  sectionTitle: { fontWeight: '700', marginBottom: 10, fontSize: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: {
    width: '32%',
    height: 112,
    marginBottom: 12,
    borderRadius: 14,
    alignItems: 'center',
    paddingTop: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', marginBottom: 8 },
  iconWrap: { overflow: 'hidden', borderRadius: 28, marginBottom: 8 },
  label: { fontSize: 12, textAlign: 'center' },
});
