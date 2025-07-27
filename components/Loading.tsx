import { ActivityIndicator, type ActivityIndicatorProps, View } from 'react-native'

import { COLORS } from '@/constants/colors'

export type LoadingProps = ActivityIndicatorProps

export function Loading({ size = 'large', color = COLORS.primary }: ActivityIndicatorProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}
