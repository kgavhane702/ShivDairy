import { FlatList, StyleSheet, Text, View } from "react-native";
import { dealProducts } from "../data/catalog";
import ProductCard from "./ProductCard";

export default function DealsRow() {
  return (
    <View style={{ width: '100%', marginTop: 16, paddingHorizontal: 16, paddingBottom: 8 }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: '700' }}>Deals of the Day 🔥</Text>
        <Text style={{ color: '#888' }}>View all</Text>
      </View>
      <FlatList
        data={dealProducts}
        keyExtractor={(i) => i.id}
        horizontal
        bounces={false}
        alwaysBounceHorizontal={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16, paddingVertical: 4 }}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({ header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 } });
