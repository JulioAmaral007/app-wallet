import type { SQLiteDatabase } from 'expo-sqlite'

const mockTransactions = [
  // Receitas (valores positivos)
  {
    title: 'Salário',
    amount: 3500.0,
    category: 'Income',
  },
  {
    title: 'Freelance Design',
    amount: 800.0,
    category: 'Income',
  },
  {
    title: 'Bônus Trimestral',
    amount: 1200.0,
    category: 'Income',
  },
  {
    title: 'Venda de Produtos',
    amount: 450.0,
    category: 'Income',
  },

  // Despesas (valores negativos)
  {
    title: 'Aluguel',
    amount: -1200.0,
    category: 'Bills',
  },
  {
    title: 'Supermercado',
    amount: -350.0,
    category: 'Food & Drinks',
  },
  {
    title: 'Uber',
    amount: -45.0,
    category: 'Transportation',
  },
  {
    title: 'Netflix',
    amount: -39.9,
    category: 'Entertainment',
  },
  {
    title: 'Academia',
    amount: -89.9,
    category: 'Other',
  },
  {
    title: 'Restaurante',
    amount: -120.0,
    category: 'Food & Drinks',
  },
  {
    title: 'Combustível',
    amount: -180.0,
    category: 'Transportation',
  },
  {
    title: 'Shopping - Roupas',
    amount: -250.0,
    category: 'Shopping',
  },
  {
    title: 'Conta de Luz',
    amount: -150.0,
    category: 'Bills',
  },
  {
    title: 'Cinema',
    amount: -60.0,
    category: 'Entertainment',
  },
  {
    title: 'Farmácia',
    amount: -85.5,
    category: 'Other',
  },
  {
    title: 'Delivery Pizza',
    amount: -75.0,
    category: 'Food & Drinks',
  },
  {
    title: 'Estacionamento',
    amount: -25.0,
    category: 'Transportation',
  },
  {
    title: 'Conta de Água',
    amount: -80.0,
    category: 'Bills',
  },
  {
    title: 'Livros',
    amount: -120.0,
    category: 'Shopping',
  },
  {
    title: 'Spotify',
    amount: -19.9,
    category: 'Entertainment',
  },
]

export async function seedDatabase(database: SQLiteDatabase) {
  try {
    console.log('🌱 Iniciando inserção de dados fictícios...')

    // Limpar dados existentes (opcional)
    await database.runAsync('DELETE FROM transactions')
    console.log('🗑️ Dados anteriores removidos')

    // Inserir dados fictícios
    for (const transaction of mockTransactions) {
      await database.runAsync(
        'INSERT INTO transactions (title, amount, category) VALUES (?, ?, ?)',
        [transaction.title, transaction.amount, transaction.category]
      )
    }

    console.log(`✅ ${mockTransactions.length} transações inseridas com sucesso!`)
    console.log('📊 Resumo dos dados:')
    console.log('- Receitas: R$ 5.950,00')
    console.log('- Despesas: R$ 2.629,20')
    console.log('- Saldo: R$ 3.320,80')
  } catch (error) {
    console.error('❌ Erro ao inserir dados fictícios:', error)
    throw error
  }
}
