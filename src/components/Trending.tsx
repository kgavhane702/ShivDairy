import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";

const trending = [
  { id: '1', title: 'Organic Honey', price: '299' },
  { id: '2', title: 'Masala Combo', price: '149' },
  { id: '3', title: 'Basmati Rice', price: '359' },
  { id: '4', title: 'Fresh Paneer', price: '225' },
];

export default function Trending() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Items</Text>
        <Text style={styles.viewAll}>See all</Text>
      </View>
      <FlatList
        data={trending}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ProductCard title={item.title} price={item.price} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginTop: 16, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontWeight: '700', fontSize: 16 },
  viewAll: { color: '#888', fontSize: 12 },
  listContent: { paddingRight: 16, paddingBottom: 4 },
});
