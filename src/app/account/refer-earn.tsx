import { View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function ReferEarnPage() {
  const { theme } = useTheme();
  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Refer & Earn" backgroundColor="#fff" />
      <View style={{ flex: 1 }} />
    </Screen>
  );
}
