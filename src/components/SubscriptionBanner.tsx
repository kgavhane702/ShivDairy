import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function SubscriptionBanner() {
  const { theme } = useTheme();
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}> 
        <Text style={{ fontWeight: '700' }}>Never run out of Milk!</Text>
        <Text style={{ color: '#666', marginTop: 6 }}>Subscribe to daily delivery. Get 5% OFF on all subscriptions</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]}> 
          <Text style={{ color: '#fff' }}>Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%', paddingHorizontal: 16, marginTop: 16 },
  container: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  button: { marginTop: 12, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 }
});
