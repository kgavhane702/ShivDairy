import { ScrollView, View } from "react-native";
import BannerCarousel from "../components/BannerCarousel";
import BottomTabs from "../components/BottomTabs";
import Categories from "../components/Categories";
import DealsRow from "../components/DealsRow";
import Screen from "../components/Screen";
import SearchBar from "../components/SearchBar";
import SubscriptionBanner from "../components/SubscriptionBanner";
import TopBar from "../components/TopBar";
import Trending from "../components/Trending";
import { useTheme } from "../theme/ThemeProvider";

export default function Index() {
  const { theme } = useTheme();

  return (
    <Screen backgroundColor={theme.colors.accent} contentStyle={{ backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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
