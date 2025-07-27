import { COLORS } from '@/constants/Colors'
import {
  Car,
  DollarSign,
  MoreHorizontal,
  Play,
  Receipt,
  ShoppingCart,
  Tag,
  Trash2,
  Utensils,
} from 'lucide-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { formatDate } from '../lib/utils'
import { Button } from './Button'
import { Typo } from './Typo'

const CATEGORY_ICONS = {
  'Food & Drinks': Utensils,
  Shopping: ShoppingCart,
  Transportation: Car,
  Entertainment: Play,
  Bills: Receipt,
  Income: DollarSign,
  Other: MoreHorizontal,
}

export function TransactionItem({ item, onDelete }: { item: any; onDelete: (id: string) => void }) {
  const isIncome = parseFloat(item.amount) > 0
  const iconName = CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS] || Tag

  return (
    <View style={styles.transactionCard} key={item.id}>
      <View style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          {React.createElement(iconName, {
            size: 22,
            color: isIncome ? COLORS.income : COLORS.expense,
          })}
        </View>
        <View style={styles.transactionLeft}>
          <Typo style={styles.transactionTitle}>{item.title}</Typo>
          <Typo style={styles.transactionCategory}>{item.category}</Typo>
        </View>
        <View style={styles.transactionRight}>
          <Typo
            style={{
              ...styles.transactionAmount,
              color: isIncome ? COLORS.income : COLORS.expense,
            }}
          >
            {isIncome ? '+' : '-'}${Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Typo>
          <Typo style={styles.transactionDate}>{formatDate(item.created_at)}</Typo>
        </View>
      </View>
      <Button style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Trash2 size={20} color={COLORS.expense} />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
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
  transactionLeft: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  deleteButton: {
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  transactionsContainer: {
    marginBottom: 20,
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
