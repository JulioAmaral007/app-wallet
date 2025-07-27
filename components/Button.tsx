import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewStyle,
} from 'react-native'

import { COLORS } from '@/constants/Colors'
import { Loading } from './Loading'

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle
  onPress?: () => void
  loading?: boolean
  children: React.ReactNode
}

export function Button({ style, onPress, loading = false, children }: CustomButtonProps) {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: 'transparent' }]}>
        <Loading />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 17,
    borderCurve: 'continuous',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
