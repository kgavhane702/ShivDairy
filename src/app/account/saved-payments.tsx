import { View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

export default function SavedPaymentsPage() {
  const { theme } = useTheme();
  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Saved Payments" backgroundColor="#fff" />
      <View style={{ flex: 1 }} />
    </Screen>
  );
}
