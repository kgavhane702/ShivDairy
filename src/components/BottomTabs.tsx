import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useTheme } from "../theme/ThemeProvider";

type TabButtonProps = {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
};

function TabButton({ label, icon, isActive, onPress }: TabButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1.03 : 1, { damping: 16, stiffness: 220 });
  }, [isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, isActive && [styles.activeTab, { backgroundColor: theme.colors.surface }]]}>
      <TouchableOpacity style={styles.tabButton} onPress={onPress} activeOpacity={0.85}>
        <Text style={[styles.icon, isActive ? [styles.activeIcon, { color: theme.colors.primary }] : { color: theme.colors.textSecondary }]}>{icon}</Text>
        <Text style={[styles.label, isActive ? [styles.activeLabel, { color: theme.colors.primary }] : { color: theme.colors.textSecondary }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function BottomTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const activeTab = (tab: string) => pathname === tab || pathname === `${tab}/index`;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}> 
      <TabButton
        label="Home"
        icon="🏠"
        isActive={activeTab('/')}
        onPress={() => {
          if (!activeTab('/')) {
            router.push('/');
          }
        }}
      />
      <TabButton
        label="Categories"
        icon="▦"
        isActive={activeTab('/categories')}
        onPress={() => {
          if (!activeTab('/categories')) {
            router.push('/categories');
          }
        }}
      />
      <TabButton label="Offers" icon="🎁" isActive={false} onPress={() => {}} />
      <TabButton
        label="Cart"
        icon="🛒"
        isActive={activeTab('/cart')}
        onPress={() => {
          if (!activeTab('/cart')) {
            router.push('/cart');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8, borderTopWidth: StyleSheet.hairlineWidth, width: '100%' },
  tabButton: { alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 16 },
  activeTab: { paddingHorizontal: 12, borderRadius: 16 },
  icon: { fontSize: 18, marginBottom: 2 },
  activeIcon: {},
  label: { fontSize: 10 },
  activeLabel: { fontWeight: '700' },
});
