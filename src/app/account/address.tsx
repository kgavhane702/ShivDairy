import AddressMap from '@/components/AddressMap';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface AddressItem {
  id: string;
  label: string;
  name: string;
  street: string;
  cityState: string;
  phone: string;
  note: string;
  isDefault: boolean;
  location: LatLng;
}

interface SearchResult {
  id: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
  };
}

const initialAddresses: AddressItem[] = [
  {
    id: 'a1',
    label: 'Home',
    name: 'Kiran Gavhane',
    street: '123 Green Street',
    cityState: 'Pune, MH 411001',
    phone: '8788370576',
    note: 'Leave at the front door if nobody picks up.',
    isDefault: true,
    location: { latitude: 18.5204, longitude: 73.8567 },
  },
  {
    id: 'a2',
    label: 'Work',
    name: 'Kiran Gavhane',
    street: '78 Corporate Plaza',
    cityState: 'Mumbai, MH 400001',
    phone: '8788370576',
    note: 'Deliver to reception during business hours.',
    isDefault: false,
    location: { latitude: 19.0760, longitude: 72.8777 },
  },
];

const emptyForm: Omit<AddressItem, 'id' | 'isDefault' | 'location'> & { location: LatLng } = {
  label: 'Home',
  name: '',
  street: '',
  cityState: '',
  phone: '',
  note: '',
  location: { latitude: 18.5204, longitude: 73.8567 },
};

export default function AddressPage() {
  const { theme } = useTheme();
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<AddressItem, 'id' | 'isDefault'>>(emptyForm);
  const [selectedLocation, setSelectedLocation] = useState<LatLng>(emptyForm.location);
  const [region, setRegion] = useState({
    latitude: emptyForm.location.latitude,
    longitude: emptyForm.location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedLocation(emptyForm.location);
    // reset any previous search state when opening add modal
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setModalVisible(true);
  };

  const openEditModal = (address: AddressItem) => {
    setEditingId(address.id);
    setForm({
      label: address.label,
      name: address.name,
      street: address.street,
      cityState: address.cityState,
      phone: address.phone,
      note: address.note,
      location: address.location,
    });
    setSelectedLocation(address.location);
    // reset previous search state when editing an address
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setModalVisible(true);
  };

  const saveAddress = () => {
    const addressData = { ...form, location: selectedLocation };

    if (editingId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? { ...address, ...addressData }
            : address
        )
      );
    } else {
      const newAddress: AddressItem = {
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
        ...addressData,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    setModalVisible(false);
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((address) => ({
      ...address,
      isDefault: address.id === id,
    })));
  };

  const hasFormValues = form.name.trim().length > 0 && form.street.trim().length > 0 && form.cityState.trim().length > 0 && form.phone.trim().length > 0;

  useEffect(() => {
    if (!modalVisible) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    setIsSearching(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const encodedQuery = encodeURIComponent(searchQuery.trim());
        const url = `https://photon.komoot.io/api/?q=${encodedQuery}&limit=6`;
        const response = await fetch(url, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'KrishiKart/1.0',
          },
        });
        const data = await response.json();
        setSearchResults(
          Array.isArray(data?.features)
            ? data.features.map((item: any) => ({
                id: item.properties?.osm_id?.toString() ?? `${item.geometry.coordinates[1]}-${item.geometry.coordinates[0]}`,
                display_name: item.properties?.name
                  ? `${item.properties.name}, ${item.properties.city || item.properties.state || item.properties.country}`.trim()
                  : item.properties?.country || item.properties?.state || item.properties?.city || 'Unknown location',
                lat: item.geometry.coordinates[1].toString(),
                lon: item.geometry.coordinates[0].toString(),
                address: {
                  city: item.properties?.city,
                  town: item.properties?.city,
                  village: item.properties?.city,
                  state: item.properties?.state,
                  postcode: item.properties?.postcode,
                },
              }))
            : []
        );
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery, modalVisible]);

  const selectSearchResult = (result: SearchResult) => {
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    const cityName = result.address?.city || result.address?.town || result.address?.village || result.address?.state || '';
    const postcode = result.address?.postcode ? ` ${result.address.postcode}` : '';

    setSelectedLocation({ latitude, longitude });
    setRegion({ latitude, longitude, latitudeDelta: 0.012, longitudeDelta: 0.012 });
    setForm((prev) => ({
      ...prev,
      street: result.display_name,
      cityState: `${cityName}${postcode}`.trim(),
      location: { latitude, longitude },
    }));
    // Apply selection and clear the search input so the dropdown closes
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Saved Addresses" backgroundColor="#fff" />
      <FlatList
        contentContainerStyle={styles.page}
        data={addresses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, item.isDefault && styles.defaultCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.addressLabel}>{item.label}</Text>
              <Text style={styles.defaultLabel}>{item.isDefault ? 'Default' : 'Set default'}</Text>
            </View>

            <Text style={styles.addressName}>{item.name}</Text>
            <Text style={styles.addressLine}>{item.street}</Text>
            <Text style={styles.addressLine}>{item.cityState}</Text>
            <Text style={styles.addressLine}>Phone: {item.phone}</Text>
            <Text style={styles.addressNote}>{item.note}</Text>

            <View style={styles.actionRow}>
              <Pressable
                style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
                onPress={() => removeAddress(item.id)}
              >
                <Text style={styles.actionText}>Remove</Text>
              </Pressable>
              {!item.isDefault ? (
                <Pressable
                  style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
                  onPress={() => setDefaultAddress(item.id)}
                >
                  <Text style={styles.actionText}>Set default</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <Pressable style={styles.addButton} onPress={openAddModal}>
            <Text style={styles.addButtonText}>Add new address</Text>
          </Pressable>
        )}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingId ? 'Edit Address' : 'Add Address'}</Text>
            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search delivery address"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  clearButtonMode="while-editing"
                />
                {isSearching && <Text style={styles.searchStatus}>Searching...</Text>}
                {searchResults.length > 0 && (
                  <View style={styles.searchResultsBox}>
                        {searchResults.map((result, idx) => (
                          <Pressable
                            key={`${result.id}-${idx}`}
                            style={({ pressed }) => [styles.searchResultItem, pressed && styles.searchResultPressed]}
                            onPress={() => selectSearchResult(result)}
                          >
                            <Text style={styles.searchResultText}>{result.display_name}</Text>
                          </Pressable>
                        ))}
                  </View>
                )}
              </View>

              <View style={styles.mapPreview}>
                <AddressMap
                  location={selectedLocation}
                  region={region}
                  onRegionChange={(nextRegion: any) => {
                    setRegion(nextRegion);
                    setSelectedLocation({ latitude: nextRegion.latitude, longitude: nextRegion.longitude });
                    setForm((prev) => ({ ...prev, location: { latitude: nextRegion.latitude, longitude: nextRegion.longitude } }));
                  }}
                  onPress={(coords: { latitude: number; longitude: number }) => {
                    const { latitude, longitude } = coords;
                    setSelectedLocation({ latitude, longitude });
                    setRegion((prev) => ({ ...prev, latitude, longitude }));
                    setForm((prev) => ({ ...prev, location: { latitude, longitude } }));
                  }}
                />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.mapPreviewLabel}>Selected location</Text>
                <Text style={styles.locationText}>{selectedLocation.latitude.toFixed(5)}, {selectedLocation.longitude.toFixed(5)}</Text>
              </View>
              <Text style={styles.mapPreviewText}>Tap the map to reposition the pin or choose a search result above.</Text>

              <Text style={styles.fieldLabel}>Label</Text>
              <View style={styles.labelRow}>
                {['Home', 'Work', 'Other'].map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.labelChip,
                      form.label === option && styles.labelChipSelected,
                    ]}
                    onPress={() => setForm((prev) => ({ ...prev, label: option }))}
                  >
                    <Text
                      style={
                        form.label === option
                          ? styles.labelChipTextSelected
                          : styles.labelChipText
                      }
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={form.name}
                onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Street address"
                value={form.street}
                onChangeText={(value) => setForm((prev) => ({ ...prev, street: value }))}
              />
              <TextInput
                style={styles.input}
                placeholder="City, state, pincode"
                value={form.cityState}
                onChangeText={(value) => setForm((prev) => ({ ...prev, cityState: value }))}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Delivery note"
                value={form.note}
                onChangeText={(value) => setForm((prev) => ({ ...prev, note: value }))}
                multiline
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.saveButton, !hasFormValues && styles.saveButtonDisabled]}
                onPress={saveAddress}
                disabled={!hasFormValues}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    paddingBottom: 36,
    backgroundColor: '#f7f8fc',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.04)',
    elevation: 2,
  },
  defaultCard: {
    borderColor: '#dbeafe',
    backgroundColor: '#eff6ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  defaultLabel: {
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  addressLine: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  addressNote: {
    marginTop: 12,
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 18,
    flexWrap: 'wrap',
  },
  actionButton: {
    marginRight: 12,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
  actionButtonPressed: {
    backgroundColor: '#f3f4f6',
  },
  actionText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  addButton: {
    marginTop: 6,
    backgroundColor: '#2563eb',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    minHeight: '60%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2ff',
  },
  mapPreview: {
    height: 220,
    marginBottom: 12,
    borderRadius: 18,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPreviewLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d4ed8',
    marginBottom: 4,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  webMapPlaceholderTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  webMapPlaceholderText: {
    color: '#cbd5e1',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  staticMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  locationInfo: {
    marginBottom: 10,
  },
  locationText: {
    color: '#475569',
    fontSize: 13,
  },
  mapPreviewText: {
    marginBottom: 16,
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  labelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  labelChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  labelChipSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  labelChipText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700',
  },
  labelChipTextSelected: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  modalBody: {
    padding: 20,
    paddingTop: 0,
  },
  searchContainer: {
    marginBottom: 12,
    position: 'relative',
    zIndex: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
  },
  searchStatus: {
    marginTop: 8,
    color: '#525252',
    fontSize: 12,
  },
  searchResultsBox: {
    position: 'absolute',
    top: 58,
    left: 0,
    right: 0,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    maxHeight: 240,
    overflow: 'hidden',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
    elevation: 6,
    zIndex: 30,
  },
  searchResultItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchResultPressed: {
    backgroundColor: '#f8fafc',
  },
  searchResultText: {
    color: '#111827',
    fontSize: 13,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eef2ff',
    backgroundColor: '#fff',
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
  },
  cancelText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
  },
  saveButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: '#2563eb',
  },
  saveButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
