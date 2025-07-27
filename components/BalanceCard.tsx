import { StyleSheet, View } from 'react-native'
import { COLORS } from '../constants/Colors'
import { Typo } from './Typo'

export function BalanceCard({
  summary,
}: {
  summary: { balance: number; income: number; expenses: number }
}) {
  return (
    <View style={styles.balanceCard}>
      <Typo style={styles.balanceTitle}>Total Balance</Typo>
      <Typo style={styles.balanceAmount}>${summary.balance.toFixed(2)}</Typo>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Typo style={styles.balanceStatLabel}>Income</Typo>
          <Typo style={{ ...styles.balanceStatAmount, color: COLORS.income }}>
            +${summary.income.toFixed(2)}
          </Typo>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
          <Typo style={styles.balanceStatLabel}>Expenses</Typo>
          <Typo style={{ ...styles.balanceStatAmount, color: COLORS.expense }}>
            -${Math.abs(summary.expenses).toFixed(2)}
          </Typo>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  balanceStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  balanceStatAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
})
