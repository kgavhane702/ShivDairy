import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function AccountPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <Screen backgroundColor={theme.colors.background}>
      <View style={[styles.page, { backgroundColor: theme.colors.background }]}> 
        <AppHeader title="My Account" backgroundColor="#fff" />
        <View style={styles.topFixed}>
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}><Text style={{fontSize:18}}>👤</Text></View>
            <View style={{flex:1, marginLeft:12}}>
              <Text style={styles.name}>Kiran Gavhane</Text>
              <Text style={styles.sub}>8788370576</Text>
              <Text style={styles.sub}>kgavhane702@gmail.com</Text>
            </View>
          </View>
          <View style={styles.profileSummary}>
            <Text style={styles.profileSummaryText}>Personal details, orders, and saved preferences in one place.</Text>
          </View>
        </View>

        <View style={[styles.iconRow, { marginTop: 6 }] }>
          <Pressable onPress={() => router.push('/account/subscriptions')} style={({ pressed }) => [styles.iconItem, pressed && styles.iconItemPressed]}>
            <Text style={styles.iconEmoji}>📅</Text>
            <Text style={styles.iconLabel}>Subscriptions</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/account/orders')} style={({ pressed }) => [styles.iconItem, pressed && styles.iconItemPressed]}>
            <Text style={styles.iconEmoji}>🧾</Text>
            <Text style={styles.iconLabel}>Orders</Text>
            <Text style={styles.iconBadge}>₹25</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/account/address')} style={({ pressed }) => [styles.iconItem, pressed && styles.iconItemPressed]}>
            <Text style={styles.iconEmoji}>📍</Text>
            <Text style={styles.iconLabel}>Address</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 16 + insets.bottom }}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <Pressable onPress={() => router.push('/account/wishlist')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>My Wishlist</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/shopping-lists')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Shopping lists</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/saved-payments')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Saved Payments</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/ratings-reviews')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Ratings & Reviews</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => router.push('/account/support')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Support & FAQs</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/gift-cards')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>My Gift Cards</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/notifications')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Notifications</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/payment-methods')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Payment Methods</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/privacy-settings')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Privacy Settings</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/preferences')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Preferences</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push('/account/refer-earn')} style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}>
          <View style={styles.listItemContent}>
            <Text style={styles.listText}>Refer & Earn</Text>
            <Text style={styles.listChevron}>›</Text>
          </View>
        </Pressable>

      </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex:1 },
  profileCard: { marginHorizontal:16, marginTop:12, marginBottom:6, padding:16, borderRadius:12, borderWidth:1, borderColor:'#eceef2', backgroundColor:'#fff' },
  profileRow: { flexDirection:'row', alignItems:'center' },
  avatar: { width:48, height:48, borderRadius:24, backgroundColor:'#f4f6fb', alignItems:'center', justifyContent:'center' },
  name: { fontSize:18, fontWeight:'800' },
  sub: { color:'#666', marginTop:4 },
  scroll: { flex:1 },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  iconItem: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  iconItemPressed: {
    backgroundColor: '#f2f5ff',
  },
  iconEmoji: { fontSize: 20, marginBottom: 8 },
  iconLabel: { fontSize: 12, color: '#444', textAlign: 'center' },
  iconBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e5f5e6',
    color: '#0a8a3e',
    fontSize: 12,
    fontWeight: '700',
  },
  profileSummary: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  profileSummaryText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6d6d78',
  },
  listItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  listItemPressed: {
    backgroundColor: '#f2f5ff',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listChevron: {
    fontSize: 18,
    color: '#ccc',
  },
  listText: {
    fontSize: 16,
    color: '#121212',
  },
  topFixed: { paddingHorizontal: 0 },
});
