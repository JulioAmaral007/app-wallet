import { BalanceCard } from '@/components/BalanceCard'
import { Button } from '@/components/Button'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { Loading } from '@/components/Loading'
import { NoTransactionsFound } from '@/components/NoTransactionsFound'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TransactionItem } from '@/components/TransactionItem'
import { Typo } from '@/components/Typo'
import { COLORS } from '@/constants/colors'
import { type TransactionResponse, useTransactionsDatabase } from '@/hooks/useTransactionsDatabase'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native'

export default function WalletScreen() {
  const router = useRouter()
  const { listAll, remove, getBalanceSummary } = useTransactionsDatabase()
  const [refreshing, setRefreshing] = useState(false)
  const [transactions, setTransactions] = useState<TransactionResponse[]>([])
  const [summary, setSummary] = useState({ balance: 0, income: 0, expenses: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionResponse | null>(null)

  const loadData = useCallback(async () => {
    try {
      const [transactionsData, summaryData] = await Promise.all([
        listAll().catch(() => []),
        getBalanceSummary().catch(() => ({ balance: 0, income: 0, expenses: 0 })),
      ])

      setTransactions(transactionsData || [])
      setSummary(summaryData)
    } catch (error) {
      console.error('Error loading data:', error)
      // Set default values on error
      setTransactions([])
      setSummary({ balance: 0, income: 0, expenses: 0 })
    } finally {
      setIsLoading(false)
    }
  }, [listAll, getBalanceSummary])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleDelete = (id: string) => {
    const transaction = transactions.find(t => t.id.toString() === id)
    if (transaction) {
      setTransactionToDelete(transaction)
      setShowDeleteModal(true)
    }
  }

  const confirmDelete = async () => {
    if (!transactionToDelete) return

    try {
      await remove(transactionToDelete.id)
      await loadData() // Reload data after deletion
      setShowDeleteModal(false)
      setTransactionToDelete(null)
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setTransactionToDelete(null)
  }

  if (isLoading) return <Loading size="large" color={COLORS.primary} />

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>
          {/* RIGHT */}
          <View style={styles.headerRight}>
            <Button onPress={() => router.push('/(modals)/createModal')} style={styles.addButton}>
              <Plus size={20} color={COLORS.white} />
              <Typo style={styles.addButtonText}>Add</Typo>
            </Button>
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Typo style={styles.sectionTitle}>Recent Transactions</Typo>
        </View>
      </View>

      {/* FlatList is a performant way to render long lists in React Native. */}
      {/* it renders items lazily — only those on the screen. */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <ConfirmationModal
        visible={showDeleteModal}
        title="Deletar Transação"
        message="Tem certeza que deseja deletar esta transação?"
        onConfirm={confirmDelete}
        onClose={cancelDelete}
        confirmText="Deletar"
        cancelText="Cancelar"
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 75,
    height: 75,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deleteButton: {
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logoutButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
  },
  transactionsList: {
    flex: 1,
    marginHorizontal: 20,
  },
  transactionsListContent: {
    paddingBottom: 20,
  },
})
