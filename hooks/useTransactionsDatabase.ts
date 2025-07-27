import { useSQLiteContext } from 'expo-sqlite'

export type TransactionCreate = {
  title: string
  amount: number
  category: string
}

export type TransactionResponse = {
  id: number
  title: string
  amount: number
  category: string
  created_at: string
}

export type Summary = {
  input: number
  output: number
}

export type BalanceSummary = {
  balance: number
  income: number
  expenses: number
}

export function useTransactionsDatabase() {
  const database = useSQLiteContext()

  async function create(data: TransactionCreate) {
    await database.runAsync(`INSERT INTO transactions (title, amount, category) VALUES (?, ?, ?)`, [
      data.title,
      data.amount,
      data.category,
    ])
  }

  function listByCategory(category: string) {
    return database.getAllAsync<TransactionResponse>(
      `
        SELECT id, title, amount, category, created_at
        FROM transactions
        WHERE category = ?
        ORDER BY created_at DESC
      `,
      [category]
    )
  }

  function listAll() {
    return database.getAllAsync<TransactionResponse>(`
        SELECT id, title, amount, category, created_at
        FROM transactions
        ORDER BY created_at DESC
      `)
  }

  async function remove(id: number) {
    await database.runAsync('DELETE FROM transactions WHERE id = ?', [id])
  }

  async function getBalanceSummary(): Promise<BalanceSummary> {
    const summaryData = await database.getFirstAsync<Summary>(`
      SELECT
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS input,
        COALESCE(SUM(CASE WHEN amount < 0 THEN ABS(amount) ELSE 0 END), 0) AS output
      FROM transactions
    `)

    if (!summaryData) {
      return {
        balance: 0,
        income: 0,
        expenses: 0,
      }
    }

    return {
      balance: summaryData.input - summaryData.output,
      income: summaryData.input,
      expenses: summaryData.output,
    }
  }

  return { create, listByCategory, listAll, remove, getBalanceSummary }
}
