import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import Screen from '../components/Screen';
import { liveAnimalProducts } from '../data/catalog';
import { useAppStore } from '../store/appStore';
import { useTheme } from '../theme/ThemeProvider';

export default function LiveAnimalsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const addEnquiry = useAppStore((state) => state.addEnquiry);
  const [selectedAnimal, setSelectedAnimal] = useState<(typeof liveAnimalProducts)[number] | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitEnquiry = () => {
    if (!selectedAnimal) return;
    addEnquiry({
      animalId: selectedAnimal.id,
      animalTitle: selectedAnimal.title,
      name,
      phone,
      notes,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSelectedAnimal(null);
      setName('');
      setPhone('');
      setNotes('');
      setSubmitted(false);
    }, 1200);
  };

  return (
    <Screen backgroundColor="#f8fafc" contentStyle={{ backgroundColor: '#f8fafc' }}>
      <View style={styles.page}>
        <AppHeader title="Live Animals" backgroundColor="#f8fafc" onBack={() => router.back()} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <Text style={styles.heroTitle}>Live animal listings</Text>
            <Text style={styles.heroSubtitle}>Choose premium livestock for dairy, poultry, breeding and farm work. Each listing is treated as a separate unit-based purchase.</Text>
          </View>

          {liveAnimalProducts.map((animal) => (
            <View key={animal.id} style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Image source={animal.image as any} style={styles.image} />
              <View style={styles.body}>
                <View style={styles.rowBetween}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>{animal.title}</Text>
                    <Text style={[styles.subtle, { color: theme.colors.textSecondary }]}>{animal.breed} • {animal.age}</Text>
                  </View>
                  <View style={styles.priceTag}>
                    <Text style={styles.price}>₹{animal.price.toLocaleString()}</Text>
                    <Text style={styles.unit}>{animal.unit}</Text>
                  </View>
                </View>

                <Text style={[styles.details, { color: theme.colors.textSecondary }]}>{animal.details}</Text>

                <View style={styles.metaGrid}>
                  <View style={styles.metaBox}><Text style={styles.metaLabel}>Weight</Text><Text style={styles.metaValue}>{animal.weight}</Text></View>
                  <View style={styles.metaBox}><Text style={styles.metaLabel}>Available</Text><Text style={styles.metaValue}>{animal.availability}</Text></View>
                  <View style={styles.metaBox}><Text style={styles.metaLabel}>Location</Text><Text style={styles.metaValue}>{animal.location}</Text></View>
                </View>

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push(`/animals/${animal.id}` as any)}
                  >
                    <Text style={styles.secondaryButtonText}>View details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setSelectedAnimal(animal)}
                  >
                    <Text style={styles.actionButtonText}>Book / Enquire</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal visible={Boolean(selectedAnimal)} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Enquiry for {selectedAnimal?.title}</Text>
              <Text style={styles.modalSubtitle}>Share your details and we will contact you for the animal.</Text>
              <TextInput placeholder="Your name" value={name} onChangeText={setName} style={styles.inputField} />
              <TextInput placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.inputField} />
              <TextInput placeholder="Tell us about your requirement" value={notes} onChangeText={setNotes} multiline style={[styles.inputField, styles.textArea]} />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedAnimal(null)}>
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
  content: { padding: 16, paddingBottom: 32 },
  heroCard: { backgroundColor: '#fff', borderRadius: 24, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  heroTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  heroSubtitle: { marginTop: 8, color: '#6b7280', fontSize: 13, lineHeight: 20 },
  card: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, marginBottom: 16 },
  image: { width: '100%', height: 180, backgroundColor: '#e5e7eb' },
  body: { padding: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  title: { fontSize: 16, fontWeight: '800' },
  subtle: { marginTop: 4, fontSize: 12 },
  priceTag: { alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: '800', color: '#0a8a3e' },
  unit: { fontSize: 11, color: '#6b7280', marginTop: 3 },
  details: { marginTop: 10, fontSize: 13, lineHeight: 20 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  metaBox: { minWidth: '31%', backgroundColor: '#f8fafc', borderRadius: 12, padding: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  metaLabel: { fontSize: 10, color: '#6b7280', textTransform: 'uppercase', fontWeight: '700' },
  metaValue: { marginTop: 4, fontSize: 12, color: '#111827', fontWeight: '700' },
  actionsRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  secondaryButton: { flex: 1, backgroundColor: '#f3f4f6', paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  secondaryButtonText: { color: '#111827', fontSize: 13, fontWeight: '700' },
  actionButton: { flex: 1, backgroundColor: '#0a8a3e', paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 13, fontWeight: '700' },
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
});
