import { Platform, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region, UrlTile } from 'react-native-maps';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface AddressMapProps {
  location: LatLng;
  region: Region;
  onRegionChange: (nextRegion: Region) => void;
  onPress: (coordinate: LatLng) => void;
}

export default function AddressMap({ location, region, onRegionChange, onPress }: AddressMapProps) {
  const mapType = Platform.OS === 'android' ? 'none' : 'standard';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        mapType={mapType}
        onRegionChangeComplete={onRegionChange}
        onPress={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          onPress({ latitude, longitude });
        }}
        showsUserLocation={false}
        zoomEnabled
        pitchEnabled
        rotateEnabled
        scrollEnabled
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
          shouldReplaceMapContent
          flipY={false}
        />
        <Marker coordinate={location} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
