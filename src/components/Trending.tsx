import { FlatList, StyleSheet, Text, View } from "react-native";
import { featuredProducts } from "../data/catalog";
import ProductCard from "./ProductCard";

export default function Trending() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trending Items</Text>
        <Text style={styles.viewAll}>See all</Text>
      </View>
      <FlatList
        data={featuredProducts}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        alwaysBounceHorizontal={false}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ProductCard product={item} />}
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
