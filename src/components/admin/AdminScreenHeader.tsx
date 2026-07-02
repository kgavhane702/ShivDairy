import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  subtitle: string;
  onBack?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionVariant?: 'primary' | 'secondary';
};

export default function AdminScreenHeader({ title, subtitle, onBack, actionLabel, onAction, actionVariant = 'secondary' }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.85}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={styles.headerTextWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {actionLabel ? (
        <TouchableOpacity
          style={[styles.actionButton, actionVariant === 'primary' ? styles.primaryAction : styles.secondaryAction]}
          onPress={onAction}
          activeOpacity={0.9}
        >
          <Text style={[styles.actionButtonText, actionVariant === 'primary' ? styles.primaryActionText : styles.secondaryActionText]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  backButtonText: { fontSize: 18, color: '#111827', fontWeight: '700' },
  headerTextWrap: { flex: 1, marginHorizontal: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  subtitle: { color: '#6b7280', fontSize: 13, marginTop: 2 },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  primaryAction: { backgroundColor: '#0a8a3e' },
  secondaryAction: { backgroundColor: '#f3f4f6' },
  actionButtonText: { fontWeight: '700', fontSize: 13 },
  primaryActionText: { color: '#fff' },
  secondaryActionText: { color: '#111827' },
});
