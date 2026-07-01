import { Platform } from 'react-native';
import AddressMapNative from './AddressMap.native';
import AddressMapWeb from './AddressMap.web';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface AddressMapProps {
  location: LatLng;
  region: Region;
  onRegionChange: (nextRegion: Region) => void;
  onPress: (coordinate: LatLng) => void;
}

export default function AddressMap(props: AddressMapProps) {
  if (Platform.OS === 'web') {
    return <AddressMapWeb {...props} />;
  }

  return <AddressMapNative {...props} />;
}
