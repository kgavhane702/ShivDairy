import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { categories } from "../data/catalog";
import { useTheme } from "../theme/ThemeProvider";

function CategoryTile({ category, theme, onPress }: { category: { id: string; title: string; icon: string; description: string }; theme: any; onPress?: () => void }) {
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
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.touchable}>
        <View style={[styles.iconWrap, { backgroundColor: theme.colors.surface }]}> 
          <Text style={styles.icon}>{category.icon}</Text>
        </View>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{category.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function Categories() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Shop by Category</Text>
      <View style={styles.grid}>
        {categories.map((item) => (
          <CategoryTile key={item.id} category={item} theme={theme} onPress={() => item.slug === 'animals' ? router.push('/animals' as any) : undefined} />
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
    borderWidth: 1,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    overflow: 'hidden',
  },
  touchable: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 12 },
  icon: {
    width: 64,
    height: 64,
    lineHeight: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 30,
    overflow: 'hidden',
  },
  iconWrap: {
    overflow: 'hidden',
    borderRadius: 32,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  label: { fontSize: 12, textAlign: 'center' },
});
