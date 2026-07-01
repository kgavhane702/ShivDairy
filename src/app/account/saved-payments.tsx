import { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const initialMethods = [
  {
    id: 'card1',
    label: 'Visa ending 1234',
    details: 'Expires 09/26',
    type: 'Card',
  },
  {
    id: 'upi1',
    label: 'kgavhane702@okhdfcbank',
    details: 'Primary UPI',
    type: 'UPI',
  },
];

export default function SavedPaymentsPage() {
  const { theme } = useTheme();
  const [methods, setMethods] = useState(initialMethods);
  const [modalVisible, setModalVisible] = useState(false);
  const [methodType, setMethodType] = useState<'Card' | 'UPI'>('Card');
  const [label, setLabel] = useState('');
  const [details, setDetails] = useState('');

  const resetForm = () => {
    setMethodType('Card');
    setLabel('');
    setDetails('');
  };

  const saveMethod = () => {
    if (!label.trim()) {
      return;
    }

    const newMethod = {
      id: `method-${Date.now()}`,
      label: label.trim(),
      details: details.trim() || (methodType === 'Card' ? 'Expires N/A' : 'UPI handle'),
      type: methodType,
    };

    setMethods((current) => [newMethod, ...current]);
    resetForm();
    setModalVisible(false);
  };

  const deleteMethod = (methodId: string) => {
    Alert.alert('Remove payment method', 'Do you want to remove this saved payment method?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setMethods((current) => current.filter((method) => method.id !== methodId)),
      },
    ]);
  };

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Saved Payments" backgroundColor="#fff" />
      <View style={[styles.page, { backgroundColor: theme.colors.background }]}> 
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Manage your payment methods</Text>
          <Text style={styles.heroSubtitle}>Add or remove cards and UPI handles for faster checkout.</Text>
        </View>

        <FlatList
          data={methods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={[styles.emptyState, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No saved payments</Text>
              <Text style={styles.emptySubtitle}>Add a card or UPI handle to checkout faster next time.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <View style={styles.cardRow}>
                <View style={styles.cardTextWrap}>
                  <Text style={[styles.cardLabel, { color: theme.colors.text }]}>{item.label}</Text>
                  <Text style={styles.cardDetails}>{item.details}</Text>
                </View>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardType}>{item.type}</Text>
                  <Pressable style={styles.removeButton} onPress={() => deleteMethod(item.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={
            <Pressable style={[styles.addNewButton, { backgroundColor: theme.colors.primary }]} onPress={() => setModalVisible(true)}> 
              <Text style={styles.addNewText}>Add new payment method</Text>
            </Pressable>
          }
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add payment method</Text>
            <View style={styles.typeSwitcher}>
              <Pressable
                style={[styles.typeButton, methodType === 'Card' ? styles.typeButtonActive : undefined]}
                onPress={() => setMethodType('Card')}
              >
                <Text style={[styles.typeButtonText, methodType === 'Card' ? styles.typeButtonTextActive : undefined]}>Card</Text>
              </Pressable>
              <Pressable
                style={[styles.typeButton, methodType === 'UPI' ? styles.typeButtonActive : undefined]}
                onPress={() => setMethodType('UPI')}
              >
                <Text style={[styles.typeButtonText, methodType === 'UPI' ? styles.typeButtonTextActive : undefined]}>UPI</Text>
              </Pressable>
            </View>

            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder={methodType === 'Card' ? 'Card label (e.g. Visa ending 1234)' : 'UPI ID'}
              placeholderTextColor="#9ca3af"
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
            />
            <TextInput
              value={details}
              onChangeText={setDetails}
              placeholder={methodType === 'Card' ? 'Expiry (MM/YY)' : 'Additional note'}
              placeholderTextColor="#9ca3af"
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
            />
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => { setModalVisible(false); resetForm(); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.saveButton]} onPress={saveMethod}>
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardDetails: {
    color: '#6b7280',
    fontSize: 14,
  },
  cardMeta: {
    alignItems: 'flex-end',
  },
  cardType: {
    color: '#2563eb',
    fontWeight: '800',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#dbeafe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  addNewButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addNewText: {
    color: '#fff',
    fontWeight: '800',
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 24,
    marginBottom: 14,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  removeButton: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fef2f2',
  },
  removeText: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 320,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  typeSwitcher: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  typeButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  typeButtonText: {
    color: '#374151',
    fontWeight: '700',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 14,
    minHeight: 50,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  saveButton: {
    backgroundColor: '#0a8a3e',
  },
  cancelButtonText: {
    color: '#111827',
    fontWeight: '700',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
