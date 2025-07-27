import { useRouter } from 'expo-router'
import { Plus, Receipt } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../constants/colors'
import { Button } from './Button'
import { Typo } from './Typo'

export function NoTransactionsFound() {
  const router = useRouter()

  return (
    <View style={styles.emptyState}>
      <Receipt size={60} color={COLORS.textLight} style={styles.emptyStateIcon} />
      <Typo style={styles.emptyStateTitle}>No transactions yet</Typo>
      <Typo style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Typo>
      <Button style={styles.emptyStateButton} onPress={() => router.push('/(modals)/createModal')}>
        <Plus size={18} color={COLORS.white} />
        <Typo style={styles.emptyStateButtonText}>Add Transaction</Typo>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyState: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyStateText: {
    color: COLORS.textLight,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyStateButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 6,
  },
})
