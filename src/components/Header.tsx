import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function Header({ title }: { title?: string }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e6e6e6",
  },
  title: { fontSize: 18, fontWeight: "600" },
});
