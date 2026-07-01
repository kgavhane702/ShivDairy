import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const privacyOptions = [
  { id: 'personalized', label: 'Personalized ads', description: 'Allow recommendations based on your activity.' },
  { id: 'shareData', label: 'Share data with partners', description: 'Help us improve offers by sharing anonymous purchase info.' },
  { id: 'location', label: 'Location access', description: 'Use your location for faster checkout and delivery updates.' },
  { id: 'paymentHistory', label: 'Save payment history', description: 'Keep billing and transaction history on file for convenience.' },
];

export default function PrivacySettingsPage() {
  const { theme } = useTheme();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    personalized: false,
    shareData: true,
    location: true,
    paymentHistory: true,
  });

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Privacy Settings" backgroundColor="#fff" />
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} bounces={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Privacy settings</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Choose how KrishiKart uses your data and protects your account.</Text>
        </View>

        {privacyOptions.map((option) => (
          <View key={option.id} style={[styles.optionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <View style={styles.optionText}>
              <Text style={[styles.optionLabel, { color: theme.colors.text }]}>{option.label}</Text>
              <Text style={[styles.optionDescription, { color: theme.colors.secondary }]}>{option.description}</Text>
            </View>
            <Switch
              value={settings[option.id]}
              onValueChange={() => toggleSetting(option.id)}
              trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
              thumbColor={settings[option.id] ? '#fff' : '#fff'}
            />
          </View>
        ))}

        <View style={[styles.noteCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.noteTitle, { color: theme.colors.text }]}>Your data is safe</Text>
          <Text style={[styles.noteBody, { color: theme.colors.secondary }]}>We never sell your personal information. You can change these settings anytime from this screen.</Text>
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
  noteTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  noteBody: { fontSize: 14, lineHeight: 20 },
});
