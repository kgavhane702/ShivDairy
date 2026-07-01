import { useMemo, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Screen from '../../components/Screen';
import { useTheme } from '../../theme/ThemeProvider';

const initialLists = [
  {
    id: 'list1',
    title: 'Weekly groceries',
    itemCount: 12,
    lastUpdated: 'Today',
    summary: 'Vegetables, dairy, spices and staples for the week.',
    items: ['Potatoes', 'Tomatoes', 'Milk', 'Bread', 'Eggs', 'Coriander'],
  },
  {
    id: 'list2',
    title: 'Breakfast essentials',
    itemCount: 6,
    lastUpdated: 'Yesterday',
    summary: 'Milk, eggs, oats and fresh fruits for morning meals.',
    items: ['Milk', 'Eggs', 'Oats', 'Bananas', 'Honey', 'Yogurt'],
  },
  {
    id: 'list3',
    title: 'Party prep',
    itemCount: 8,
    lastUpdated: '2 days ago',
    summary: 'Snacks, beverages and fresh ingredients for guests.',
    items: ['Chips', 'Juice', 'Cookies', 'Nuts', 'Paneer', 'Tomatoes', 'Onions', 'Cucumber'],
  },
];

export default function ShoppingListsPage() {
  const { theme } = useTheme();
  const [lists, setLists] = useState(initialLists);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<typeof initialLists[number] | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [itemCount, setItemCount] = useState('1');
  const [itemName, setItemName] = useState('');

  const resetForm = () => {
    setTitle('');
    setSummary('');
    setItemCount('1');
  };

  const openList = (list: typeof initialLists[number]) => {
    setSelectedList(list);
    setDetailModalVisible(true);
  };

  const deleteList = (listId: string) => {
    Alert.alert('Delete list', 'Are you sure you want to delete this shopping list?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setLists((current) => current.filter((item) => item.id !== listId)),
      },
    ]);
  };

  const createList = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Please enter a name for your list.');
      return;
    }

    const newList = {
      id: `list-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim() || 'No description added yet.',
      itemCount: Number(itemCount) || 1,
      lastUpdated: 'Just now',
      items: [],
    };

    setLists((current) => [newList, ...current]);
    resetForm();
    setCreateModalVisible(false);
  };

  const addItemToList = () => {
    if (!selectedList) {
      return;
    }

    if (!itemName.trim()) {
      Alert.alert('Validation', 'Please enter an item name.');
      return;
    }

    const updatedList = {
      ...selectedList,
      items: [...selectedList.items, itemName.trim()],
      itemCount: selectedList.itemCount + 1,
      lastUpdated: 'Just now',
    };

    setLists((current) => current.map((list) => (list.id === selectedList.id ? updatedList : list)));
    setSelectedList(updatedList);
    setItemName('');
  };

  const deleteListItem = (index: number) => {
    if (!selectedList) {
      return;
    }

    const updatedItems = selectedList.items.filter((_, idx) => idx !== index);
    const updatedList = {
      ...selectedList,
      items: updatedItems,
      itemCount: updatedItems.length,
      lastUpdated: 'Just now',
    };

    setLists((current) => current.map((list) => (list.id === selectedList.id ? updatedList : list)));
    setSelectedList(updatedList);
  };

  const activeLists = useMemo(() => lists, [lists]);

  return (
    <Screen backgroundColor={theme.colors.background}>
      <AppHeader title="Shopping lists" backgroundColor="#fff" />
      <View style={[styles.page, { backgroundColor: theme.colors.background }]}> 
        <View style={[styles.headerCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
          <Text style={[styles.title, { color: theme.colors.text }]}>Organize items for every trip</Text>
          <Text style={styles.description}>Create and save your shopping lists so you can reorder favourites faster and keep essentials ready.</Text>
        </View>

        <FlatList
          data={activeLists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Your lists</Text>}
          ListEmptyComponent={
            <View style={[styles.emptyState, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <Text style={styles.emptyTitle}>No lists yet</Text>
              <Text style={styles.emptyText}>Save a shopping list for fruit, pantry, meals or any routine order.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.summary}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.itemCount} items</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Last updated</Text>
                <Text style={styles.metaValue}>{item.lastUpdated}</Text>
              </View>

              <View style={styles.actionsRow}>
                <Pressable style={[styles.actionButton, styles.primaryAction]} onPress={() => openList(item)}>
                  <Text style={styles.actionText}>Open</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.secondaryAction]} onPress={() => deleteList(item.id)}>
                  <Text style={[styles.actionText, styles.secondaryText]}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        <Pressable style={[styles.addButton, { backgroundColor: theme.colors.primary }]} onPress={() => setCreateModalVisible(true)}> 
          <Text style={styles.addButtonText}>Create new list</Text>
        </Pressable>
      </View>

      <Modal visible={createModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>New shopping list</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="List name"
              placeholderTextColor="#9ca3af"
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
            />
            <TextInput
              value={summary}
              onChangeText={setSummary}
              placeholder="Description"
              placeholderTextColor="#9ca3af"
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
            />
            <TextInput
              value={itemCount}
              onChangeText={setItemCount}
              placeholder="Item count"
              keyboardType="number-pad"
              placeholderTextColor="#9ca3af"
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
            />
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => { setCreateModalVisible(false); resetForm(); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.saveButton]} onPress={createList}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={detailModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}> 
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{selectedList?.title}</Text>
            <Text style={styles.modalSubtitle}>{selectedList?.summary}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Items</Text>
              <Text style={styles.detailValue}>{selectedList?.itemCount}</Text>
            </View>

            <View style={styles.itemList}>
              {selectedList?.items?.length ? (
                selectedList.items.map((item, index) => (
                  <View key={`${item}-${index}`} style={styles.itemRow}>
                    <Text style={styles.itemText}>{item}</Text>
                    <Pressable style={styles.itemDeleteButton} onPress={() => deleteListItem(index)}>
                      <Text style={styles.itemDeleteText}>✕</Text>
                    </Pressable>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No items in this list yet.</Text>
              )}
            </View>

            <View style={styles.addItemRow}> 
              <TextInput
                value={itemName}
                onChangeText={setItemName}
                placeholder="Enter item name"
                placeholderTextColor="#9ca3af"
                style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, flex: 1, marginRight: 10 }]}
              />
              <Pressable style={[styles.addItemButton, styles.addItemButtonShort]} onPress={addItemToList}>
                <Text style={styles.addItemText}>Add item</Text>
              </Pressable>
            </View>

            <View style={styles.modalActions}> 
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setDetailModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  if (selectedList) deleteList(selectedList.id);
                  setDetailModalVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Delete list</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  headerCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#6b7280',
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eef6ff',
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryAction: {
    backgroundColor: '#0a8a3e',
  },
  secondaryAction: {
    backgroundColor: '#f3f4f6',
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryText: {
    color: '#111827',
  },
  emptyState: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  addButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  modalSubtitle: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 18,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 14,
    minHeight: 50,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    minWidth: 140,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  saveButton: {
    backgroundColor: '#0a8a3e',
  },
  cancelButtonText: {
    color: '#111827',
    fontWeight: '700',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    color: '#6b7280',
    fontSize: 13,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  itemList: {
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#f8fafc',
  },
  itemText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  itemDeleteButton: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDeleteText: {
    color: '#b91c1c',
    fontWeight: '800',
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addItemButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    minWidth: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemText: {
    color: '#fff',
    fontWeight: '700',
  },
});
