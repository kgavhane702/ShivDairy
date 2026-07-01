import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const notificationOptions = [
  { id: 'orders', label: 'Order updates', description: 'Status changes, delivery alerts and confirmations.' },
  { id: 'offers', label: 'Deals & offers', description: 'Personalised promotions, discounts and product offers.' },
  { id: 'app', label: 'App notifications', description: 'Reminders and feature updates from the app.' },
  { id: 'newsletter', label: 'Newsletter', description: 'Weekly email updates with new launches and trends.' },
];

export default function NotificationsPage() {
  const { theme } = useTheme();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    orders: true,
    offers: true,
    app: false,
    newsletter: false,
  });

  const toggleOption = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Notifications" backgroundColor="#fff" />
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} bounces={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Notification preferences</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Choose which notifications you want to receive from KrishiKart.</Text>
        </View>

        {notificationOptions.map((option) => (
          <View key={option.id} style={[styles.optionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <View style={styles.optionText}>
              <Text style={[styles.optionLabel, { color: theme.colors.text }]}>{option.label}</Text>
              <Text style={[styles.optionDescription, { color: theme.colors.secondary }]}>{option.description}</Text>
            </View>
            <Switch
              value={settings[option.id]}
              onValueChange={() => toggleOption(option.id)}
              trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
              thumbColor={settings[option.id] ? '#fff' : '#fff'}
            />
          </View>
        ))}

        <View style={[styles.noteCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.noteTitle, { color: theme.colors.text }]}>Need fewer notifications?</Text>
          <Text style={[styles.noteBody, { color: theme.colors.secondary }]}>Turn off any category anytime to reduce alerts and keep your feed focused on the information that matters most.</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  hero: { padding: 20, borderRadius: 18, marginBottom: 16, borderWidth: 1 },
  heroTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heroSubtitle: { fontSize: 14, lineHeight: 20 },
  optionCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 12 },
  optionText: { flex: 1, paddingRight: 12 },
  optionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  optionDescription: { fontSize: 13, lineHeight: 18 },
  noteCard: { padding: 18, borderRadius: 18, borderWidth: 1, marginTop: 8 },
  noteTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  noteBody: { fontSize: 14, lineHeight: 20 },
});
