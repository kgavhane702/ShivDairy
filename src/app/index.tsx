import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomTabs from "../components/BottomTabs";
import Categories from "../components/Categories";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";
import { useAppStore } from "../store/appStore";
import { useTheme } from "../theme/ThemeProvider";
import Deferred from "../utils/Deferred";

const BannerCarousel = (props: any) => <Deferred loader={() => import('../components/BannerCarousel')} props={props} />;
const Trending = (props: any) => <Deferred loader={() => import('../components/Trending')} props={props} />;
const DealsRow = (props: any) => <Deferred loader={() => import('../components/DealsRow')} props={props} />;
const SubscriptionBanner = (props: any) => <Deferred loader={() => import('../components/SubscriptionBanner')} props={props} />;

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();
  const cartCount = useAppStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <Screen backgroundColor={theme.colors.accent} contentStyle={{ backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // Disable overscroll bounce on iOS and Android where supported
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          contentContainerStyle={{ paddingBottom: 24 }}
          stickyHeaderIndices={[1]}
        >
          <TopBar />
          <SearchBar />
          <BannerCarousel />
          <Categories />
          <Trending />
          <DealsRow />
          <SubscriptionBanner />
          <View style={{ height: 24 }} />
        </ScrollView>
        {cartCount > 0 && (
          <TouchableOpacity style={[styles.floatingPill, { backgroundColor: 'rgba(10,138,62,0.96)' }]} activeOpacity={0.9} onPress={() => router.push('/cart')}>
            <Text style={styles.pillText}>{cartCount} item{cartCount === 1 ? '' : 's'} in cart</Text>
            <Text style={styles.pillArrow}>›</Text>
          </TouchableOpacity>
        )}
        <BottomTabs />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  floatingPill: {
    position: 'absolute',
    right: 16,
    bottom: 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    elevation: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    zIndex: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pillText: { color: '#fff', fontWeight: '700', marginRight: 8 },
  pillArrow: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
