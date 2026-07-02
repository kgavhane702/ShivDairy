import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useAdminStore, type Promotion, type PromotionRuleType } from '../../store/adminStore';
import { useTheme } from '../../theme/ThemeProvider';

const ruleTypes: Array<{ key: PromotionRuleType; label: string }> = [
  { key: 'percentage', label: 'Percent off' },
  { key: 'flat', label: 'Flat discount' },
  { key: 'bogo', label: 'Buy X get Y' },
  { key: 'spend_get', label: 'Spend & get' },
  { key: 'free_shipping', label: 'Free shipping' },
];

export default function AdminPromotionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const promotions = useAdminStore((state) => state.promotions);
  const togglePromotion = useAdminStore((state) => state.togglePromotion);
  const addPromotion = useAdminStore((state) => state.addPromotion);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    detail: '',
    code: '',
    type: 'percentage' as PromotionRuleType,
    minSpend: '',
    discountPercent: '',
    discountAmount: '',
    buyQty: '',
    getQty: '',
    rewardType: 'amount' as 'percent' | 'amount',
    rewardValue: '',
  });

  const buildPromotionDetail = (promotionForm: typeof form) => {
    switch (promotionForm.type) {
      case 'percentage':
        return `${promotionForm.discountPercent || 0}% off${promotionForm.minSpend ? ` on orders above ₹${promotionForm.minSpend}` : ''}`;
      case 'flat':
        return `₹${promotionForm.discountAmount || 0} off${promotionForm.minSpend ? ` on orders above ₹${promotionForm.minSpend}` : ''}`;
      case 'bogo':
        return `Buy ${promotionForm.buyQty || 0} get ${promotionForm.getQty || 0} free`;
      case 'spend_get':
        return `Spend ₹${promotionForm.minSpend || 0} and get ${promotionForm.rewardType === 'percent' ? `${promotionForm.rewardValue || 0}%` : `₹${promotionForm.rewardValue || 0}`}`;
      case 'free_shipping':
        return `Free shipping on orders above ₹${promotionForm.minSpend || 0}`;
      default:
        return promotionForm.detail;
    }
  };

  const handleCreate = () => {
    if (!form.title.trim() || !form.code.trim()) return;

    const promotion: Promotion = {
      title: form.title.trim(),
      detail: form.detail.trim() || buildPromotionDetail(form),
      code: form.code.trim().toUpperCase(),
      active: true,
      type: form.type,
      minSpend: form.minSpend ? Number(form.minSpend) : undefined,
      discountPercent: form.discountPercent ? Number(form.discountPercent) : undefined,
      discountAmount: form.discountAmount ? Number(form.discountAmount) : undefined,
      buyQty: form.buyQty ? Number(form.buyQty) : undefined,
      getQty: form.getQty ? Number(form.getQty) : undefined,
      rewardType: form.rewardType,
      rewardValue: form.rewardValue ? Number(form.rewardValue) : undefined,
    };

    addPromotion(promotion);
    setIsFormVisible(false);
    setForm({
      title: '',
      detail: '',
      code: '',
      type: 'percentage',
      minSpend: '',
      discountPercent: '',
      discountAmount: '',
      buyQty: '',
      getQty: '',
      rewardType: 'amount',
      rewardValue: '',
    });
  };

  const renderRuleFields = () => {
    switch (form.type) {
      case 'percentage':
        return (
          <View>
            <Text style={styles.label}>Discount percent</Text>
            <TextInput value={form.discountPercent} onChangeText={(text) => setForm((current) => ({ ...current, discountPercent: text }))} placeholder="20" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
            <Text style={styles.label}>Minimum cart value (optional)</Text>
            <TextInput value={form.minSpend} onChangeText={(text) => setForm((current) => ({ ...current, minSpend: text }))} placeholder="499" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
          </View>
        );
      case 'flat':
        return (
          <View>
            <Text style={styles.label}>Discount amount</Text>
            <TextInput value={form.discountAmount} onChangeText={(text) => setForm((current) => ({ ...current, discountAmount: text }))} placeholder="50" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
            <Text style={styles.label}>Minimum cart value (optional)</Text>
            <TextInput value={form.minSpend} onChangeText={(text) => setForm((current) => ({ ...current, minSpend: text }))} placeholder="499" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
          </View>
        );
      case 'bogo':
        return (
          <View>
            <Text style={styles.label}>Buy quantity</Text>
            <TextInput value={form.buyQty} onChangeText={(text) => setForm((current) => ({ ...current, buyQty: text }))} placeholder="2" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
            <Text style={styles.label}>Get quantity</Text>
            <TextInput value={form.getQty} onChangeText={(text) => setForm((current) => ({ ...current, getQty: text }))} placeholder="1" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
          </View>
        );
      case 'spend_get':
        return (
          <View>
            <Text style={styles.label}>Spend amount</Text>
            <TextInput value={form.minSpend} onChangeText={(text) => setForm((current) => ({ ...current, minSpend: text }))} placeholder="1000" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
            <Text style={styles.label}>Reward type</Text>
            <View style={styles.pillRow}>
              {(['amount', 'percent'] as const).map((option) => (
                <TouchableOpacity key={option} style={[styles.pill, form.rewardType === option && styles.pillActive]} onPress={() => setForm((current) => ({ ...current, rewardType: option }))}>
                  <Text style={[styles.pillText, form.rewardType === option && styles.pillTextActive]}>{option === 'amount' ? '₹ off' : '% off'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Reward value</Text>
            <TextInput value={form.rewardValue} onChangeText={(text) => setForm((current) => ({ ...current, rewardValue: text }))} placeholder="100" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
          </View>
        );
      case 'free_shipping':
        return (
          <View>
            <Text style={styles.label}>Minimum cart value</Text>
            <TextInput value={form.minSpend} onChangeText={(text) => setForm((current) => ({ ...current, minSpend: text }))} placeholder="799" style={styles.input} keyboardType="numeric" placeholderTextColor="#9ca3af" />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Promotions" subtitle="Create configurable offers, discounts and bundles" onBack={() => router.back()} actionLabel="New promo" onAction={() => setIsFormVisible(true)} actionVariant="primary" />

      <Modal transparent visible={isFormVisible} animationType="slide" onRequestClose={() => setIsFormVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create promotion rule</Text>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsFormVisible(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
              <TextInput value={form.title} onChangeText={(text) => setForm((current) => ({ ...current, title: text }))} placeholder="Title" style={styles.input} placeholderTextColor="#9ca3af" />
              <TextInput value={form.code} onChangeText={(text) => setForm((current) => ({ ...current, code: text }))} placeholder="Code" style={styles.input} placeholderTextColor="#9ca3af" />
              <TextInput value={form.detail} onChangeText={(text) => setForm((current) => ({ ...current, detail: text }))} placeholder="Optional short description" style={styles.input} placeholderTextColor="#9ca3af" />

              <Text style={styles.label}>Offer type</Text>
              <View style={styles.pillRow}>
                {ruleTypes.map((option) => (
                  <TouchableOpacity key={option.key} style={[styles.pill, form.type === option.key && styles.pillActive]} onPress={() => setForm((current) => ({ ...current, type: option.key }))}>
                    <Text style={[styles.pillText, form.type === option.key && styles.pillTextActive]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {renderRuleFields()}

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsFormVisible(false)}>
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                  <Text style={styles.createButtonText}>Add promotion</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {promotions.map((promo) => (
          <View key={promo.code} style={styles.promoCard}>
            <View style={styles.promoInfo}>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDetail}>{promo.detail}</Text>
              <Text style={styles.promoCode}>Code: {promo.code}</Text>
              <Text style={styles.promoType}>{promo.type === 'percentage' ? 'Percentage discount' : promo.type === 'flat' ? 'Flat discount' : promo.type === 'bogo' ? 'Buy X get Y' : promo.type === 'spend_get' ? 'Spend and get reward' : 'Free shipping'}</Text>
            </View>
            <View style={styles.promoActions}>
              <View style={[styles.statusBadge, promo.active ? styles.active : styles.draft]}>
                <Text style={styles.statusText}>{promo.active ? 'Active' : 'Draft'}</Text>
              </View>
              <TouchableOpacity style={styles.toggleButton} onPress={() => togglePromotion(promo.code)}>
                <Text style={styles.toggleButtonText}>{promo.active ? 'Disable' : 'Activate'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(17,24,39,0.45)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  modalCloseButton: { width: 34, height: 34, borderRadius: 999, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  modalCloseText: { fontSize: 16, color: '#111827', fontWeight: '700' },
  modalBody: { padding: 18, paddingBottom: 24 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 10 },
  secondaryButton: { flex: 1, backgroundColor: '#f3f4f6', paddingVertical: 12, borderRadius: 14, alignItems: 'center' },
  secondaryButtonText: { color: '#111827', fontWeight: '700' },
  formTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '700', color: '#111827', marginBottom: 8, marginTop: 4 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  pill: { backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, marginRight: 8, marginBottom: 8 },
  pillActive: { backgroundColor: '#0a8a3e' },
  pillText: { fontSize: 12, fontWeight: '600', color: '#374151' },
  pillTextActive: { color: '#fff' },
  createButton: { backgroundColor: '#0a8a3e', borderRadius: 14, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  createButtonText: { color: '#fff', fontWeight: '700' },
  promoCard: { backgroundColor: '#fff', borderRadius: 20, padding: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  promoInfo: { flex: 1, paddingRight: 12 },
  promoTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  promoDetail: { color: '#6b7280', marginTop: 6, fontSize: 13 },
  promoCode: { marginTop: 10, fontSize: 13, fontWeight: '700', color: '#0a8a3e' },
  promoType: { marginTop: 6, fontSize: 12, color: '#6b7280' },
  promoActions: { alignItems: 'flex-end', justifyContent: 'space-between' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, marginBottom: 12 },
  active: { backgroundColor: '#dcfce7' },
  draft: { backgroundColor: '#f3f4f6' },
  statusText: { fontSize: 11, fontWeight: '700', color: '#111827' },
  toggleButton: { backgroundColor: '#0a8a3e', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14 },
  toggleButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
});
