import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
        </View>

        <View style={[styles.iconRow, {marginTop: 6}] }>
          <View style={styles.iconItem}><Text style={styles.iconEmoji}>📅</Text><Text style={styles.iconLabel}>Subscriptions</Text></View>
          <View style={styles.iconItem}><Text style={styles.iconEmoji}>🧾</Text><Text style={styles.iconLabel}>Orders</Text><Text style={{color:'#0a8a3e', fontWeight:'700'}}>₹25</Text></View>
          <View style={styles.iconItem}><Text style={styles.iconEmoji}>📍</Text><Text style={styles.iconLabel}>Address</Text></View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{padding:16, paddingTop:8, paddingBottom: 16 + insets.bottom}}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View style={styles.listItem}><Text style={styles.listText}>My Wishlist</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Shopping lists</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Saved Payments</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Ratings & Reviews</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>NeuCard</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Support & FAQs</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>My Gift Cards</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Notifications</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Manage Subscriptions</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Saved Addresses</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Payment Methods</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Privacy Settings</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Order History</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Preferences</Text></View>
        <View style={styles.listItem}><Text style={styles.listText}>Refer & Earn</Text></View>

      </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex:1 },
  header: { flexDirection:'row', alignItems:'center', paddingHorizontal:16, paddingBottom:12 },
  back: { padding:8 },
  backText: { fontSize:18 },
  title: { fontSize:20, fontWeight:'700', marginLeft:8 },
  profileCard: { marginHorizontal:16, marginTop:12, marginBottom:6, padding:16, borderRadius:12, borderWidth:1, borderColor:'#eceef2', backgroundColor:'#fff' },
  profileRow: { flexDirection:'row', alignItems:'center' },
  avatar: { width:48, height:48, borderRadius:24, backgroundColor:'#f4f6fb', alignItems:'center', justifyContent:'center' },
  name: { fontSize:18, fontWeight:'800' },
  sub: { color:'#666', marginTop:4 },
  scroll: { flex:1 },
  iconRow: { flexDirection:'row', justifyContent:'space-between', marginBottom:12 },
  iconItem: { alignItems:'center', width:'30%' },
  iconEmoji: { fontSize:20, marginBottom:6 },
  iconLabel: { fontSize:12, color:'#444' },
  listItem: { paddingVertical:16, borderBottomWidth:1, borderColor:'#f0f0f0' },
  listText: { fontSize:16 }
  ,
  topFixed: { paddingHorizontal: 0 }
});
