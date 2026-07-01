import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  title: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  backgroundColor?: string;
};

export default function AppHeader({ title, style, titleStyle, backgroundColor }: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const resolvedBackground = backgroundColor ?? theme.colors.background;

  return (
    <View style={[styles.header, { paddingTop: Math.max(12, insets.top), backgroundColor: resolvedBackground }, style]}>
      <Text style={[styles.title, { color: theme.colors.text }, titleStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '800' },
});
