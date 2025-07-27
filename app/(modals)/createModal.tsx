import { Button } from '@/components/Button'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { Loading } from '@/components/Loading'
import { ModalWrapper } from '@/components/ModalWrapper'
import { COLORS } from '@/constants/Colors'
import { useTransactionsDatabase } from '@/hooks/useTransactionsDatabase'
import { useRouter } from 'expo-router'
import {
  ArrowLeft,
  Car,
  Check,
  DollarSign,
  MoreHorizontal,
  Play,
  Plus,
  Receipt,
  ShoppingCart,
  Tag,
  TrendingDown,
  TrendingUp,
  Utensils,
} from 'lucide-react-native'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const CATEGORIES = [
  { id: 'food', name: 'Food & Drinks', icon: Utensils },
  { id: 'shopping', name: 'Shopping', icon: ShoppingCart },
  { id: 'transportation', name: 'Transportation', icon: Car },
  { id: 'entertainment', name: 'Entertainment', icon: Play },
  { id: 'bills', name: 'Bills', icon: Receipt },
  { id: 'income', name: 'Income', icon: DollarSign },
  { id: 'other', name: 'Other', icon: MoreHorizontal },
]

export default function CreateScreen() {
  const router = useRouter()
  const { create } = useTransactionsDatabase()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isExpense, setIsExpense] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    if (!title.trim()) {
      setErrorMessage('Por favor, insira um título para a transação')
      setShowErrorModal(true)
      return false
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setErrorMessage('Por favor, insira um valor válido')
      setShowErrorModal(true)
      return false
    }
    if (!selectedCategory) {
      setErrorMessage('Por favor, selecione uma categoria')
      setShowErrorModal(true)
      return false
    }
    return true
  }

  const handleCreate = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount))

      await create({
        title: title.trim(),
        amount: formattedAmount,
        category: selectedCategory,
      })

      setShowSuccessModal(true)
    } catch (error) {
      setErrorMessage((error as Error)?.message || 'Falha ao criar transação')
      setShowErrorModal(true)
      console.error('Error creating transaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false)
    router.back()
  }

  const handleErrorClose = () => {
    setShowErrorModal(false)
    setErrorMessage('')
  }

  return (
    <ModalWrapper>
      {/* HEADER */}
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={COLORS.text} />
        </Button>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <Button
          style={{
            ...styles.saveButtonContainer,
            ...(isLoading && styles.saveButtonDisabled),
          }}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? 'Saving...' : 'Save'}</Text>
          {!isLoading && <Check size={18} color={COLORS.primary} />}
        </Button>
      </View>

      <View style={styles.card}>
        <View style={styles.typeSelector}>
          {/* EXPENSE SELECTOR */}
          <Button
            style={{
              ...styles.typeButton,
              ...(isExpense && styles.typeButtonActive),
            }}
            onPress={() => setIsExpense(true)}
          >
            <TrendingDown
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
              Expense
            </Text>
          </Button>

          {/* INCOME SELECTOR */}
          <Button
            style={{
              ...styles.typeButton,
              ...(!isExpense && styles.typeButtonActive),
            }}
            onPress={() => setIsExpense(false)}
          >
            <TrendingUp
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
              Income
            </Text>
          </Button>
        </View>

        {/* AMOUNT CONTAINER */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* INPUT CONTAINER */}
        <View style={styles.inputContainer}>
          <Plus size={22} color={COLORS.textLight} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>
          <Tag size={16} color={COLORS.text} /> Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map(category => (
            <Button
              key={category.id}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category.name && styles.categoryButtonActive),
              }}
              onPress={() => setSelectedCategory(category.name)}
            >
              <category.icon
                size={20}
                color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                style={styles.categoryIcon}
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </Button>
          ))}
        </View>
      </View>

      {isLoading && <Loading size="large" color={COLORS.primary} />}

      <ConfirmationModal
        visible={showSuccessModal}
        title="Sucesso!"
        message="Transação criada com sucesso"
        onConfirm={handleSuccessConfirm}
        onClose={handleSuccessConfirm}
        confirmText="OK"
        cancelText=""
      />

      <ConfirmationModal
        visible={showErrorModal}
        title="Erro"
        message={errorMessage}
        onConfirm={handleErrorClose}
        onClose={handleErrorClose}
        confirmText="OK"
        cancelText=""
      />
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  backButton: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  saveButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeIcon: {
    marginRight: 8,
  },
  typeButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: COLORS.white,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
