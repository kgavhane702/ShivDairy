import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  children: React.ReactNode;
  style?: any;
  contentStyle?: any;
  backgroundColor?: string;
};

export default function Screen({ children, style, contentStyle, backgroundColor }: Props) {
  const { theme } = useTheme();
  const resolvedBackground = backgroundColor ?? theme.colors.background;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: resolvedBackground }, style]} edges={['top', 'bottom']}>
      <View style={[styles.content, { backgroundColor: resolvedBackground }, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flex: 1 },
});
