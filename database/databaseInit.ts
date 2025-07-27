import type { SQLiteDatabase } from 'expo-sqlite'
import { seedDatabase } from './seedData'

export async function databaseInit(database: SQLiteDatabase) {
  await database.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title  VARCHAR(255) NOT NULL,
        amount  DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)

  // Verificar se já existem dados
  const existingData = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM transactions'
  )

  // Se não houver dados, inserir dados fictícios
  if (existingData && existingData.count === 0) {
    console.log('📊 Banco de dados vazio detectado. Inserindo dados fictícios...')
    await seedDatabase(database)
  }
}
