import { useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";

export default function SearchBar() {
  const { theme } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 260 });
    translateY.value = withTiming(0, { duration: 260 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.colors.accent }, animatedStyle]}> 
      <View style={[styles.searchRow, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder='Search for tea'
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.searchInput, { color: theme.colors.text }]}
        />
        <View style={[styles.iconBadge, { backgroundColor: theme.colors.surface }]}> 
          <Text style={styles.mic}>🎤</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 12, paddingHorizontal: 16 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  searchInput: { flex: 1, height: 36, fontSize: 14, marginHorizontal: 6 },
  searchIcon: { marginRight: 4, fontSize: 16 },
  iconBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  mic: { fontSize: 14 },
});
