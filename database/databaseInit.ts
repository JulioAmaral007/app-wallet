import type { SQLiteDatabase } from 'expo-sqlite'

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
}
