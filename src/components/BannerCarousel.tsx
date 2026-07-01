import { useRef, useState } from "react";
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const { width } = Dimensions.get("window");
const itemWidth = width - 32;

const data = [1, 2, 3];

export default function BannerCarousel() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<any> | null>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (itemWidth + 12));
    setIndex(idx);
  };
  return (
    <View style={{ width: width, paddingHorizontal: 16, marginTop: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(i) => String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + 12}
        decelerationRate="fast"
        ref={(r) => { ref.current = r; }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: '#e9f9ee', width: itemWidth }] }>
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Fresh Milk & Dairy Delivered Daily</Text>
                <Text style={styles.cardSubtitle}>From trusted farmers near you</Text>
                <View style={styles.cta}><Text style={{ color: '#fff', fontWeight: '700' }}>UP TO 15% OFF</Text></View>
              </View>
              <Image source={require('../../assets/fruits-and-vegetables.png')} style={styles.imgPlaceholder} />
            </View>
          </View>
        )}
      />
      <View style={styles.dots}>
        {data.map((d, i) => (
          <View key={i} style={[styles.dot, i === index ? styles.dotActive : null]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 18, borderRadius: 16, marginRight: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontWeight: '800', fontSize: 20, marginBottom: 6 },
  cardSubtitle: { color: '#4b4b4b', marginBottom: 8 },
  cta: { marginTop: 6, backgroundColor: '#0a8a3e', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' },
  imgPlaceholder: { width: 100, height: 80, backgroundColor: '#fff', borderRadius: 8, marginLeft: 12 }
  ,
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ddd', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#0a8a3e' }
});
