import { ScrollView, View } from "react-native";
import BottomTabs from "../components/BottomTabs";
import Categories from "../components/Categories";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";
import { useTheme } from "../theme/ThemeProvider";
import Deferred from "../utils/Deferred";

const BannerCarousel = (props: any) => <Deferred loader={() => import('../components/BannerCarousel')} props={props} />;
const Trending = (props: any) => <Deferred loader={() => import('../components/Trending')} props={props} />;
const DealsRow = (props: any) => <Deferred loader={() => import('../components/DealsRow')} props={props} />;
const SubscriptionBanner = (props: any) => <Deferred loader={() => import('../components/SubscriptionBanner')} props={props} />;

export default function Index() {
  const { theme } = useTheme();

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
        <BottomTabs />
      </View>
    </Screen>
  );
}
