import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { liveAnimalProducts } from '../../data/catalog';
import { useAppStore } from '../../store/appStore';
import { useTheme } from '../../theme/ThemeProvider';

export default function AnimalDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { theme } = useTheme();
  const addEnquiry = useAppStore((state) => state.addEnquiry);
  const animal = liveAnimalProducts.find((item) => item.id === params.id);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitEnquiry = () => {
    if (!animal) return;
    addEnquiry({
      animalId: animal.id,
      animalTitle: animal.title,
      name,
      phone,
      notes,
    });
    setSubmitted(true);
    setTimeout(() => {
      setShowEnquiry(false);
      setName('');
      setPhone('');
      setNotes('');
      setSubmitted(false);
    }, 1200);
  };

  if (!animal) {
    return (
      <Screen backgroundColor="#f8fafc" contentStyle={{ backgroundColor: '#f8fafc' }}>
        <AppHeader title="Animal detail" backgroundColor="#f8fafc" onBack={() => router.back()} />
        <View style={styles.empty}><Text style={styles.emptyText}>Animal not found.</Text></View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor="#f8fafc" contentStyle={{ backgroundColor: '#f8fafc' }}>
      <View style={styles.page}>
        <AppHeader title={animal.title} backgroundColor="#f8fafc" onBack={() => router.back()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Image source={animal.image as any} style={styles.image} />
          <View style={styles.body}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{animal.title}</Text>
                <Text style={styles.subtitle}>{animal.breed} • {animal.age}</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.price}>₹{animal.price.toLocaleString()}</Text>
                <Text style={styles.unit}>{animal.unit}</Text>
              </View>
            </View>

            <View style={styles.badgeRow}>
              <View style={styles.badge}><Text style={styles.badgeText}>{animal.status ?? 'Available'}</Text></View>
              <View style={styles.badge}><Text style={styles.badgeText}>{animal.availableUnits ?? 0} units</Text></View>
            </View>

            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{animal.details}</Text>

            <View style={styles.metaGrid}>
              <View style={styles.metaBox}><Text style={styles.metaLabel}>Weight</Text><Text style={styles.metaValue}>{animal.weight}</Text></View>
              <View style={styles.metaBox}><Text style={styles.metaLabel}>Availability</Text><Text style={styles.metaValue}>{animal.availability}</Text></View>
              <View style={styles.metaBox}><Text style={styles.metaLabel}>Location</Text><Text style={styles.metaValue}>{animal.location}</Text></View>
            </View>

            <Text style={styles.sectionTitle}>What you should know</Text>
            <Text style={styles.description}>{animal.shortDescription}</Text>

            {animal.videoUrl ? (
              <TouchableOpacity style={styles.videoButton} onPress={() => setShowEnquiry(true)}>
                <Text style={styles.videoButtonText}>Watch video / enquire</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity style={styles.actionButton} onPress={() => setShowEnquiry(true)}>
              <Text style={styles.actionButtonText}>Book / Enquire</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal visible={showEnquiry} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Enquiry for {animal.title}</Text>
              <Text style={styles.modalSubtitle}>Share your contact details and we will follow up with availability and delivery.</Text>
              <TextInput placeholder="Your name" value={name} onChangeText={setName} style={styles.inputField} />
              <TextInput placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.inputField} />
              <TextInput placeholder="Tell us about your requirement" value={notes} onChangeText={setNotes} multiline style={[styles.inputField, styles.textArea]} />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowEnquiry(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={submitEnquiry}>
                  <Text style={styles.saveButtonText}>{submitted ? 'Sent' : 'Submit'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { paddingBottom: 32 },
  image: { width: '100%', height: 240, backgroundColor: '#e5e7eb' },
  body: { padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { marginTop: 4, color: '#6b7280', fontSize: 13 },
  priceBox: { alignItems: 'flex-end' },
  price: { fontSize: 18, fontWeight: '800', color: '#0a8a3e' },
  unit: { fontSize: 12, color: '#6b7280', marginTop: 3 },
  badgeRow: { flexDirection: 'row', marginTop: 12, gap: 8 },
  badge: { backgroundColor: '#ecfdf5', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  badgeText: { color: '#166534', fontWeight: '700', fontSize: 12 },
  sectionTitle: { marginTop: 16, fontSize: 15, fontWeight: '800', color: '#111827' },
  description: { marginTop: 8, color: '#4b5563', fontSize: 13, lineHeight: 20 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  metaBox: { width: '31%', minWidth: 90, backgroundColor: '#f8fafc', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  metaLabel: { fontSize: 10, color: '#6b7280', fontWeight: '700', textTransform: 'uppercase' },
  metaValue: { marginTop: 4, fontSize: 12, color: '#111827', fontWeight: '700' },
  videoButton: { marginTop: 16, backgroundColor: '#f3f4f6', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  videoButtonText: { color: '#111827', fontWeight: '700', fontSize: 13 },
  actionButton: { marginTop: 12, backgroundColor: '#0a8a3e', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(17,24,39,0.45)' },
  modalCard: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, maxHeight: '90%' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  modalSubtitle: { marginTop: 6, marginBottom: 12, color: '#6b7280', fontSize: 13, lineHeight: 20 },
  inputField: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  textArea: { minHeight: 90, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 6 },
  cancelButton: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  cancelButtonText: { color: '#111827', fontWeight: '700' },
  saveButton: { flex: 1, backgroundColor: '#0a8a3e', borderRadius: 999, paddingVertical: 12, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#111827', fontWeight: '700', fontSize: 15 },
});
