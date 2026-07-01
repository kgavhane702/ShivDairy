import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

export default function TopBar() {
  const { theme } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 260 });
    translateY.value = withTiming(0, { duration: 260 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.wrapper, { backgroundColor: theme.colors.accent, paddingTop: Math.max(8, insets.top) }, animatedStyle]}> 
      <View style={[styles.container, { backgroundColor: theme.colors.accent }]}> 
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={[styles.eta, { color: theme.colors.primary }]}>13 mins</Text>
            <Text style={[styles.locationText, { color: theme.colors.textSecondary }]}>Home - D 403, Aura county Society, Bengaluru</Text>
          </View>
          <TouchableOpacity
            style={[styles.avatar, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => router.push({ pathname: '/account' })}
          > 
            <Text style={styles.avatarText}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 0 },
  container: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flex: 1, paddingRight: 8 },
  eta: { fontWeight: '800', fontSize: 16, marginBottom: 6 },
  locationText: { fontSize: 13, lineHeight: 20 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  avatarText: { fontSize: 18 },
});

