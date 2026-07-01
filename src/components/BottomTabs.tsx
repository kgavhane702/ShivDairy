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
    <View style={[styles.container, { backgroundColor: 'rgba(255,255,255,0.78)', borderTopColor: 'rgba(255,255,255,0.65)' }]}> 
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderColor: 'rgba(255,255,255,0.7)',
  },
  tabButton: { alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  activeTab: { paddingHorizontal: 12, borderRadius: 20, backgroundColor: 'rgba(79,70,229,0.12)' },
  icon: { fontSize: 18, marginBottom: 4 },
  activeIcon: {},
  label: { fontSize: 10 },
  activeLabel: { fontWeight: '700' },
});
