import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const referrals = [
  'Share your code with friends and family.',
  'They get ₹100 off on their first order.',
  'You earn ₹100 for every successful referral.',
];

export default function ReferEarnPage() {
  const { theme } = useTheme();
  const referralCode = 'KRISHI123';

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Refer & Earn" backgroundColor="#fff" />
      <ScrollView style={styles.page} contentContainerStyle={{ padding: 16 }} bounces={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Share and earn rewards</Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.secondary }]}>Invite friends to KrishiKart and earn grocery credits on every successful referral.</Text>
        </View>

        <View style={[styles.codeCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.codeLabel, { color: theme.colors.secondary }]}>Your referral code</Text>
          <Text style={[styles.codeValue, { color: theme.colors.text }]}>{referralCode}</Text>
          <Pressable style={[styles.copyButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.copyText}>Copy code</Text>
          </Pressable>
        </View>

        <View style={[styles.rewardsCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.rewardsTitle, { color: theme.colors.text }]}>How it works</Text>
          {referrals.map((item) => (
            <View key={item} style={styles.rewardRow}>
              <Text style={[styles.rewardBullet, { color: theme.colors.primary }]}>•</Text>
              <Text style={[styles.rewardText, { color: theme.colors.secondary }]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.rewardSummary, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.rewardTitle, { color: theme.colors.text }]}>Rewards earned</Text>
          <Text style={[styles.rewardAmount, { color: theme.colors.text }]}>₹250</Text>
          <Text style={[styles.rewardNote, { color: theme.colors.secondary }]}>Your rewards are automatically added to your account balance.</Text>
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
  codeCard: { padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 16, alignItems: 'center' },
  codeLabel: { fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  codeValue: { fontSize: 28, fontWeight: '800', marginBottom: 14 },
  copyButton: { paddingVertical: 14, paddingHorizontal: 30, borderRadius: 14 },
  copyText: { color: '#fff', fontWeight: '800' },
  rewardsCard: { padding: 18, borderRadius: 18, borderWidth: 1, marginBottom: 16 },
  rewardsTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  rewardRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  rewardBullet: { fontSize: 18, marginRight: 10, lineHeight: 22 },
  rewardText: { flex: 1, fontSize: 14, lineHeight: 20 },
  rewardSummary: { padding: 18, borderRadius: 18, borderWidth: 1 },
  rewardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
  rewardAmount: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  rewardNote: { fontSize: 14, lineHeight: 20 },
});
