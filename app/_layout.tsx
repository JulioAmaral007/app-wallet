import LoadingInit from '@/components/LoadingInit'
import { databaseInit } from '@/database/databaseInit'
import { Stack } from 'expo-router'
import { SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { Suspense } from 'react'

export default function RootLayout() {
  return (
    <Suspense fallback={<LoadingInit />}>
      <SQLiteProvider databaseName="wallet.db" onInit={databaseInit} useSuspense>
        <StatusBar style="inverted" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="(modals)/createModal"
            options={{
              presentation: 'modal',
            }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  )
}
