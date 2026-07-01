import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function PreferencesPage() {
  const { theme } = useTheme();
  const [autoFillAddress, setAutoFillAddress] = useState(true);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  const languages = ['English', 'हिन्दी', 'मराठी'];

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Preferences" backgroundColor="#fff" />
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} bounces={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Shopping preferences</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Personalise your experience across delivery, address and language options.</Text>
        </View>

        <View style={[styles.optionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <View>
            <Text style={[styles.optionLabel, { color: theme.colors.text }]}>Autofill saved address</Text>
            <Text style={[styles.optionDescription, { color: theme.colors.secondary }]}>Pre-fill your default delivery address at checkout.</Text>
          </View>
          <Switch
            value={autoFillAddress}
            onValueChange={setAutoFillAddress}
            trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
            thumbColor={autoFillAddress ? '#fff' : '#fff'}
          />
        </View>

        <View style={[styles.optionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <View>
            <Text style={[styles.optionLabel, { color: theme.colors.text }]}>Fast delivery alerts</Text>
            <Text style={[styles.optionDescription, { color: theme.colors.secondary }]}>Notify me when express delivery is available for my area.</Text>
          </View>
          <Switch
            value={fastDelivery}
            onValueChange={setFastDelivery}
            trackColor={{ false: '#d1d5db', true: '#4f46e5' }}
            thumbColor={fastDelivery ? '#fff' : '#fff'}
          />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Preferred language</Text>
          <View style={styles.languageRow}>
            {languages.map((language) => {
              const selected = preferredLanguage === language;
              return (
                <Pressable
                  key={language}
                  onPress={() => setPreferredLanguage(language)}
                  style={[styles.languageOption, { backgroundColor: selected ? '#4f46e5' : theme.colors.background, borderColor: theme.colors.border }]}
                >
                  <Text style={[styles.languageText, { color: selected ? '#fff' : theme.colors.text }]}>{language}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.noteCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.noteTitle, { color: theme.colors.text }]}>Preferences saved</Text>
          <Text style={[styles.noteBody, { color: theme.colors.secondary }]}>Your preferences are used to make checkout faster and more relevant to your needs.</Text>
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
  optionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  optionDescription: { fontSize: 13, lineHeight: 18 },
  section: { padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 20 },
  sectionLabel: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  languageOption: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, marginRight: 10, marginBottom: 10 },
  languageText: { fontSize: 14, fontWeight: '700' },
  noteCard: { padding: 18, borderRadius: 18, borderWidth: 1 },
  noteTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  noteBody: { fontSize: 14, lineHeight: 20 },
});
