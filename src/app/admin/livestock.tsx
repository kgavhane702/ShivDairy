import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import Screen from '../../components/Screen';
import { liveAnimalProducts } from '../../data/catalog';
import type { Product, ProductCategory } from '../../domain/types';
import { useAppStore } from '../../store/appStore';
import { useTheme } from '../../theme/ThemeProvider';

const sampleImages = [
  'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508170752016-f7abd86503b7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516556645000-3898c7f475ee?auto=format&fit=crop&w=800&q=80',
];

type FormStep = 'basic' | 'pricing' | 'media';

type DraftEntry = {
  id?: string;
  title: string;
  breed: string;
  age: string;
  category: string;
  price: string;
  unit: string;
  availableUnits: string;
  minOrder: string;
  weight: string;
  availability: string;
  location: string;
  shortDescription: string;
  details: string;
  imageUrl: string;
  videoUrl: string;
  status: 'Available' | 'Limited' | 'Booked';
};

const createEmptyDraft = (): DraftEntry => ({
  title: '', breed: '', age: '', category: '', price: '', unit: 'Per animal', availableUnits: '1', minOrder: '1', weight: '', availability: 'Today', location: '', shortDescription: '', details: '', imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=1200&q=80', videoUrl: '', status: 'Available' });

export default function AdminLivestockScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const enquiries = useAppStore((state) => state.enquiries);
  const updateEnquiryStatus = useAppStore((state) => state.updateEnquiryStatus);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'livestock' | 'enquiries'>('livestock');
  const [items, setItems] = useState(liveAnimalProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState<DraftEntry>(createEmptyDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<FormStep>('basic');

  const totalAnimals = items.length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((item) => item.status === 'New').length;
  const bookedEnquiries = enquiries.filter((item) => item.status === 'Booked').length;

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((animal) => [animal.title, animal.breed, animal.location, animal.details].join(' ').toLowerCase().includes(query));
  }, [items, search]);

  const rotateImage = (id: string) => {
    setItems((current) => current.map((animal) => animal.id === id ? { ...animal, image: { uri: sampleImages[(sampleImages.indexOf((animal.image as any)?.uri ?? sampleImages[0]) + 1) % sampleImages.length] } } : animal));
  };

  const browseImage = (id: string) => {
    const currentUrl = (items.find((animal) => animal.id === id)?.image as any)?.uri ?? sampleImages[0];
    const nextUrl = sampleImages[(sampleImages.indexOf(currentUrl) + 1) % sampleImages.length];
    setItems((current) => current.map((animal) => animal.id === id ? { ...animal, image: { uri: nextUrl } } : animal));
  };

  const browseDraftImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library to pick an animal image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setDraft((current) => ({ ...current, imageUrl: result.assets[0].uri }));
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setDraft(createEmptyDraft());
    setActiveStep('basic');
    setModalVisible(true);
  };

  const openEdit = (animal: (typeof items)[number]) => {
    setEditingId(animal.id);
    setDraft({
      id: animal.id,
      title: animal.title,
      breed: animal.breed ?? '',
      age: animal.age ?? '',
      category: animal.tags?.[1] ?? 'Poultry',
      price: String(animal.price),
      unit: animal.unit,
      availableUnits: String(animal.availableUnits ?? 0),
      minOrder: String(animal.minOrder ?? 1),
      weight: animal.weight ?? '',
      availability: animal.availability ?? 'Today',
      location: animal.location ?? '',
      shortDescription: animal.shortDescription ?? '',
      details: animal.details ?? '',
      imageUrl: (animal.image as any)?.uri ?? sampleImages[0],
      videoUrl: animal.videoUrl ?? '',
      status: (animal.status as DraftEntry['status']) ?? 'Available',
    });
    setActiveStep('basic');
    setModalVisible(true);
  };

  const saveEntry = () => {
    const entry: Product = {
      id: editingId ?? `livestock-${draft.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: draft.title,
      breed: draft.breed,
      age: draft.age,
      category: (draft.category || 'animals') as ProductCategory,
      price: Number(draft.price) || 0,
      unit: draft.unit,
      availableUnits: Number(draft.availableUnits) || 0,
      minOrder: Number(draft.minOrder) || 1,
      weight: draft.weight,
      availability: draft.availability,
      location: draft.location,
      shortDescription: draft.shortDescription,
      details: draft.details,
      image: { uri: draft.imageUrl || sampleImages[0] },
      videoUrl: draft.videoUrl,
      status: draft.status,
      tags: ['live', (draft.category || 'animals').toLowerCase()],
      saleMode: 'unit',
    };

    setItems((current) => editingId ? current.map((animal) => animal.id === editingId ? entry : animal) : [...current, entry]);
    setActiveStep('basic');
    setModalVisible(false);
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <View style={styles.page}>
        <AdminScreenHeader title="Livestock" subtitle="Manage live animals as separate unit-based listings" onBack={() => router.back()} actionLabel="Add" onAction={openCreate} actionVariant="primary" />
        <View style={styles.searchWrap}>
          <TextInput value={search} onChangeText={setSearch} placeholder="Search animal type or location" style={styles.input} placeholderTextColor="#9ca3af" />
        </View>

        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'livestock' && styles.tabButtonActive]} onPress={() => setActiveTab('livestock')}>
            <Text style={[styles.tabLabel, activeTab === 'livestock' && styles.tabLabelActive]}>Livestock</Text>
            <View style={[styles.tabBadge, activeTab === 'livestock' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'livestock' && styles.tabBadgeTextActive]}>{totalAnimals}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabButton, activeTab === 'enquiries' && styles.tabButtonActive]} onPress={() => setActiveTab('enquiries')}>
            <Text style={[styles.tabLabel, activeTab === 'enquiries' && styles.tabLabelActive]}>Enquiries</Text>
            <View style={[styles.tabBadge, activeTab === 'enquiries' && styles.tabBadgeActive]}>
              <Text style={[styles.tabBadgeText, activeTab === 'enquiries' && styles.tabBadgeTextActive]}>{totalEnquiries}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalAnimals}</Text>
            <Text style={styles.statLabel}>Animals</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalEnquiries}</Text>
            <Text style={styles.statLabel}>Enquiries</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{newEnquiries}</Text>
            <Text style={styles.statLabel}>New</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{bookedEnquiries}</Text>
            <Text style={styles.statLabel}>Booked</Text>
          </View>
        </View>

        {activeTab === 'livestock' ? (
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {filteredItems.map((animal) => (
              <View key={animal.id} style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
                <Image source={animal.image as any} style={styles.image} />
                <View style={styles.body}>
                  <View style={styles.rowBetween}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.title, { color: theme.colors.text }]}>{animal.title}</Text>
                      <Text style={[styles.subtle, { color: theme.colors.textSecondary }]}>{animal.breed} • {animal.age}</Text>
                    </View>
                    <View style={styles.inlineActions}>
                      <TouchableOpacity style={styles.imageButton} onPress={() => openEdit(animal)}>
                        <Text style={styles.imageButtonText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={[styles.details, { color: theme.colors.textSecondary }]}>{animal.details}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>Price</Text>
                    <Text style={styles.metaValue}>₹{animal.price.toLocaleString()}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>Availability</Text>
                    <Text style={styles.metaValue}>{animal.availability}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>Location</Text>
                    <Text style={styles.metaValue}>{animal.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {enquiries.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No enquiries yet.</Text>
              </View>
            ) : enquiries.map((item) => (
              <View key={item.id} style={[styles.enquiryCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
                <View style={styles.enquiryHeaderRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.enquiryCardTitle, { color: theme.colors.text }]}>{item.animalTitle}</Text>
                    <Text style={[styles.enquiryCardMeta, { color: theme.colors.textSecondary }]}>From {item.name} • {item.phone}</Text>
                  </View>
                  <View style={styles.enquiryStatusBadge}>
                    <Text style={styles.enquiryStatusText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={[styles.enquiryCardNote, { color: theme.colors.textSecondary }]}>{item.notes}</Text>
                <Text style={styles.enquiryCardTime}>{item.createdAt}</Text>
                <View style={styles.enquiryActionsRow}>
                  <TouchableOpacity style={styles.enquiryAction} onPress={() => updateEnquiryStatus(item.id, 'Reviewed')}>
                    <Text style={styles.enquiryActionText}>Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.enquiryAction} onPress={() => updateEnquiryStatus(item.id, 'Booked')}>
                    <Text style={styles.enquiryActionText}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>{editingId ? 'Edit animal entry' : 'Add animal entry'}</Text>
                <View style={styles.stepRow}>
                  {(['basic', 'pricing', 'media'] as FormStep[]).map((step) => (
                    <TouchableOpacity key={step} style={[styles.stepPill, activeStep === step && styles.stepPillActive]} onPress={() => setActiveStep(step)}>
                      <Text style={[styles.stepPillText, activeStep === step && styles.stepPillTextActive]}>{step === 'basic' ? 'Basic' : step === 'pricing' ? 'Pricing' : 'Media'}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {activeStep === 'basic' ? (
                  <>
                    <TextInput placeholder="Animal title" value={draft.title} onChangeText={(value) => setDraft((current) => ({ ...current, title: value }))} style={styles.inputField} />
                    <TextInput placeholder="Breed" value={draft.breed} onChangeText={(value) => setDraft((current) => ({ ...current, breed: value }))} style={styles.inputField} />
                    <TextInput placeholder="Age" value={draft.age} onChangeText={(value) => setDraft((current) => ({ ...current, age: value }))} style={styles.inputField} />
                    <TextInput placeholder="Category" value={draft.category} onChangeText={(value) => setDraft((current) => ({ ...current, category: value }))} style={styles.inputField} />
                    <TextInput placeholder="Weight" value={draft.weight} onChangeText={(value) => setDraft((current) => ({ ...current, weight: value }))} style={styles.inputField} />
                    <TextInput placeholder="Availability" value={draft.availability} onChangeText={(value) => setDraft((current) => ({ ...current, availability: value }))} style={styles.inputField} />
                    <TextInput placeholder="Location" value={draft.location} onChangeText={(value) => setDraft((current) => ({ ...current, location: value }))} style={styles.inputField} />
                    <TextInput placeholder="Short description" value={draft.shortDescription} onChangeText={(value) => setDraft((current) => ({ ...current, shortDescription: value }))} style={styles.inputField} />
                    <TextInput placeholder="Detailed description" multiline value={draft.details} onChangeText={(value) => setDraft((current) => ({ ...current, details: value }))} style={[styles.inputField, styles.textArea]} />
                  </>
                ) : null}
                {activeStep === 'pricing' ? (
                  <>
                    <TextInput placeholder="Price" keyboardType="numeric" value={draft.price} onChangeText={(value) => setDraft((current) => ({ ...current, price: value }))} style={styles.inputField} />
                    <TextInput placeholder="Unit" value={draft.unit} onChangeText={(value) => setDraft((current) => ({ ...current, unit: value }))} style={styles.inputField} />
                    <TextInput placeholder="Available units" keyboardType="numeric" value={draft.availableUnits} onChangeText={(value) => setDraft((current) => ({ ...current, availableUnits: value }))} style={styles.inputField} />
                    <TextInput placeholder="Minimum order" keyboardType="numeric" value={draft.minOrder} onChangeText={(value) => setDraft((current) => ({ ...current, minOrder: value }))} style={styles.inputField} />
                    <TextInput placeholder="Status" value={draft.status} onChangeText={(value) => setDraft((current) => ({ ...current, status: value as DraftEntry['status'] }))} style={styles.inputField} />
                  </>
                ) : null}
                {activeStep === 'media' ? (
                  <>
                    <View style={styles.imageFieldRow}>
                      <TextInput placeholder="Image URL" value={draft.imageUrl} onChangeText={(value) => setDraft((current) => ({ ...current, imageUrl: value }))} style={[styles.inputField, styles.imageInput]} />
                      <TouchableOpacity style={styles.imageButton} onPress={browseDraftImage}>
                        <Text style={styles.imageButtonText}>Browse</Text>
                      </TouchableOpacity>
                    </View>
                    {draft.imageUrl ? (
                      <Image source={{ uri: draft.imageUrl }} style={styles.previewImage} />
                    ) : null}
                    <TextInput placeholder="Video URL" value={draft.videoUrl} onChangeText={(value) => setDraft((current) => ({ ...current, videoUrl: value }))} style={styles.inputField} />
                  </>
                ) : null}

                <View style={styles.modalActions}>
                  {activeStep === 'basic' ? (
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setActiveStep(activeStep === 'media' ? 'pricing' : 'basic')}>
                      <Text style={styles.cancelButtonText}>Back</Text>
                    </TouchableOpacity>
                  )}
                  {activeStep === 'media' ? (
                    <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.saveButton} onPress={() => setActiveStep(activeStep === 'basic' ? 'pricing' : 'media')}>
                      <Text style={styles.saveButtonText}>Next</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  searchWrap: { paddingHorizontal: 16, paddingBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  tabRow: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10, padding: 4, backgroundColor: '#f3f4f6', borderRadius: 999 },
  tabButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 999 },
  tabButtonActive: { backgroundColor: '#0a8a3e' },
  tabLabel: { color: '#111827', fontWeight: '700', fontSize: 13 },
  tabLabelActive: { color: '#fff' },
  tabBadge: { marginLeft: 8, minWidth: 24, height: 24, borderRadius: 999, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  tabBadgeActive: { backgroundColor: '#ffffff22' },
  tabBadgeText: { color: '#111827', fontWeight: '700', fontSize: 11 },
  tabBadgeTextActive: { color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginBottom: 6, gap: 8 },
  statCard: { flexBasis: '48%', backgroundColor: '#fff', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#111827' },
  statLabel: { marginTop: 4, fontSize: 12, color: '#6b7280', fontWeight: '600' },
  content: { padding: 16, paddingBottom: 32 },
  card: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, marginBottom: 14 },
  image: { width: '100%', height: 150, backgroundColor: '#e5e7eb' },
  body: { padding: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '800' },
  subtle: { marginTop: 4, fontSize: 12 },
  details: { marginTop: 10, fontSize: 13, lineHeight: 20 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  metaLabel: { color: '#6b7280', fontSize: 12, fontWeight: '700' },
  metaValue: { color: '#111827', fontSize: 12, fontWeight: '700' },
  inlineActions: { flexDirection: 'row', gap: 8 },
  imageButton: { backgroundColor: '#f3f4f6', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 8 },
  imageButtonText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  emptyCard: { backgroundColor: '#fff', borderRadius: 18, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#e5e7eb' },
  emptyText: { color: '#6b7280', fontWeight: '700' },
  enquiryCard: { borderRadius: 18, padding: 14, marginBottom: 12, borderWidth: 1 },
  enquiryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  enquiryCardTitle: { fontSize: 15, fontWeight: '800' },
  enquiryCardMeta: { marginTop: 4, fontSize: 12 },
  enquiryStatusBadge: { backgroundColor: '#ecfdf5', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  enquiryStatusText: { color: '#166534', fontSize: 11, fontWeight: '700' },
  enquiryCardNote: { marginTop: 8, fontSize: 13, lineHeight: 20 },
  enquiryCardTime: { marginTop: 6, fontSize: 11, color: '#6b7280' },
  enquiryActionsRow: { marginTop: 10, flexDirection: 'row', gap: 8 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(17,24,39,0.45)' },
  modalCard: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, maxHeight: '90%' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  stepRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  stepPill: { flex: 1, paddingVertical: 8, borderRadius: 999, alignItems: 'center', backgroundColor: '#f3f4f6' },
  stepPillActive: { backgroundColor: '#0a8a3e' },
  stepPillText: { color: '#111827', fontWeight: '700', fontSize: 12 },
  stepPillTextActive: { color: '#fff' },
  inputField: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  imageFieldRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  imageInput: { flex: 1, marginBottom: 0 },
  previewImage: { width: '100%', height: 160, borderRadius: 16, marginBottom: 10, backgroundColor: '#e5e7eb' },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 6 },
  cancelButton: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  cancelButtonText: { color: '#111827', fontWeight: '700' },
  saveButton: { flex: 1, backgroundColor: '#0a8a3e', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  enquiryBox: { marginTop: 12, backgroundColor: '#f8fafc', borderRadius: 14, padding: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  enquiryTitle: { fontSize: 12, fontWeight: '800', color: '#111827', marginBottom: 8 },
  enquiryRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 },
  enquiryName: { fontSize: 12, fontWeight: '700', color: '#111827' },
  enquiryNote: { marginTop: 3, fontSize: 11, color: '#6b7280', lineHeight: 16 },
  enquiryStatus: { marginTop: 3, fontSize: 10, color: '#0a8a3e', fontWeight: '700' },
  enquiryActions: { flexDirection: 'row', gap: 6 },
  enquiryAction: { backgroundColor: '#0a8a3e', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 6 },
  enquiryActionText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
