import { Image, StyleSheet, Text, View } from 'react-native';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface AddressMapProps {
  location: LatLng;
  region?: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  onRegionChange?: (nextRegion: any) => void;
  onPress?: (coordinate: LatLng) => void;
}

export default function AddressMap({ location }: AddressMapProps) {
  const staticMapUrl = `https://maps.wikimedia.org/img/osm-intl,15,${location.latitude},${location.longitude},700x400.png`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: staticMapUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Web preview only — map tap not supported</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
});
