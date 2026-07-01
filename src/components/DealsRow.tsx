import { FlatList, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";

const deals = [
  { id: '1', title: 'Amul Butter', price: '265' },
  { id: '2', title: 'Aashirvaad Atta', price: '249' },
  { id: '3', title: 'Fortune Sunlite', price: '135' },
  { id: '4', title: 'Tata Salt', price: '17' },
];

export default function DealsRow() {
  return (
    <View style={{ width: '100%', marginTop: 16, paddingHorizontal: 16, paddingBottom: 8 }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: '700' }}>Deals of the Day 🔥</Text>
        <Text style={{ color: '#888' }}>View all</Text>
      </View>
      <FlatList
        data={deals}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16, paddingVertical: 4 }}
        renderItem={({ item }) => <ProductCard title={item.title} price={item.price} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 } });
