import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import Screen from '../../components/Screen';
import AdminScreenHeader from '../../components/admin/AdminScreenHeader';
import { useAdminStore } from '../../store/adminStore';
import { useTheme } from '../../theme/ThemeProvider';

export default function AdminCustomersScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const customers = useAdminStore((state) => state.customers);
  const toggleCustomerBan = useAdminStore((state) => state.toggleCustomerBan);
  const setCustomerBanReason = useAdminStore((state) => state.setCustomerBanReason);

  const toggleBan = (email: string) => {
    toggleCustomerBan(email);
  };

  const setReason = (email: string, reason: string) => {
    setCustomerBanReason(email, reason);
  };

  return (
    <Screen backgroundColor={theme.colors.surface} contentStyle={{ backgroundColor: theme.colors.surface }}>
      <AdminScreenHeader title="Customers" subtitle="Overview of your users" onBack={() => router.back()} />

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.largeColumn]}>Customer</Text>
            <Text style={styles.tableHeaderText}>Orders</Text>
            <Text style={[styles.tableHeaderText, styles.statusColumn]}>Banned</Text>
          </View>
          {customers.map((customer) => (
            <View key={customer.email} style={styles.tableRow}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={styles.customerEmail}>{customer.email}</Text>
              </View>
              <Text style={styles.tableCell}>{customer.orders}</Text>
              <View style={[styles.tableCell, styles.statusColumn, styles.switchCell]}>
                <Switch
                  value={customer.banned}
                  onValueChange={() => toggleBan(customer.email)}
                  thumbColor={customer.banned ? '#dc2626' : '#0a8a3e'}
                  trackColor={{ false: '#d1fae5', true: '#fecaca' }}
                />
              </View>
            </View>
          ))}
        </View>

        {customers
          .filter((customer) => customer.banned)
          .map((customer) => (
            <View key={`${customer.email}-reason`} style={styles.noteCard}>
              <Text style={styles.noteTitle}>Ban reason for {customer.name}</Text>
              <TextInput
                placeholder="Enter reason for ban"
                placeholderTextColor="#9ca3af"
                style={styles.noteInput}
                value={customer.reason}
                onChangeText={(text) => setReason(customer.email, text)}
                multiline
              />
            </View>
          ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  tableCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tableHeader: { flexDirection: 'row', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableHeaderText: { flex: 1, color: '#6b7280', fontWeight: '700', fontSize: 12 },
  largeColumn: { flex: 1.8 },
  statusColumn: { flex: 1.2 },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  tableCell: { flex: 1, color: '#111827', fontSize: 13 },
  customerInfo: { flex: 1.8 },
  customerName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  customerEmail: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  switchCell: { justifyContent: 'center' },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  noteTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 10 },
  noteInput: { backgroundColor: '#f9fafb', borderRadius: 14, borderWidth: 1, borderColor: '#e5e7eb', padding: 12, minHeight: 80, textAlignVertical: 'top' },
});
