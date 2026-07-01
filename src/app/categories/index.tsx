import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';

const sections = [
  {
    title: 'Fresh',
    items: [
      { title: 'Fruits & veggies', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Bakery & batters', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Dairy', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Eggs, meat & fish', image: require('../../../assets/fruits-and-vegetables.png') },
    ],
  },
  {
    title: 'Grocery & kitchen',
    items: [
      { title: 'Atta, rice, dal & more', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Oil, ghee & masala', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Dry fruits & cereals', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Kitchenware & appliances', image: require('../../../assets/fruits-and-vegetables.png') },
    ],
  },
  {
    title: 'Snacks & drinks',
    items: [
      { title: 'Hot & cold beverages', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Namkeen & chips', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Biscuits & cookies', image: require('../../../assets/fruits-and-vegetables.png') },
      { title: 'Instant & frozen food', image: require('../../../assets/fruits-and-vegetables.png') },
    ],
  },
];

export default function CategoriesPage() {
  const insets = useSafeAreaInsets();
  return (
    <Screen backgroundColor="#fff">
      <View style={styles.page}>
        <AppHeader title="Categories" backgroundColor="#fff" />

        <ScrollView
          style={styles.body}
          contentContainerStyle={[styles.container, { paddingBottom: 32 + insets.bottom }] }
          // disable overscroll when content doesn't need scrolling
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
        >
          {sections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.grid}>
                {section.items.map((item) => (
                  <View key={item.title} style={styles.card}>
                    <Image source={item.image} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                      <Text style={styles.cardText}>{item.title}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  headerBar: { flexDirection: 'row', alignItems: 'center', paddingTop: 44, paddingHorizontal: 16, paddingBottom: 12 },
  back: { padding: 8 },
  backText: { fontSize: 18 },
  container: { padding: 16, paddingTop: 24, paddingBottom: 32 },
  header: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  body: { flex: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#111827' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '47%', borderRadius: 16, backgroundColor: '#fff', marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eceef2' },
  cardImage: { width: '100%', height: 90, resizeMode: 'cover' },
  cardContent: { minHeight: 60, justifyContent: 'center', padding: 12 },
  cardText: { fontSize: 13, lineHeight: 18, fontWeight: '700', color: '#1f2937' },
});
