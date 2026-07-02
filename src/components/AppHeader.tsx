import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  title: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  backgroundColor?: string;
  onBack?: () => void;
};

export default function AppHeader({ title, style, titleStyle, backgroundColor, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useTheme();
  const resolvedBackground = backgroundColor ?? theme.colors.background;
  const handleBack = onBack ?? (() => router.back());

  return (
    <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: resolvedBackground }, style]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.85}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.colors.text }, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 999, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 2, paddingTop: 0, paddingBottom: 0 },
  backButtonText: { fontSize: 20, color: '#111827', fontWeight: '700', lineHeight: 20, textAlign: 'center', includeFontPadding: false },
  title: { fontSize: 22, fontWeight: '800' },
});
