import { COLORS } from '@/constants/colors'
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'

export type ModalWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
  bg?: string
}

export function ModalWrapper({ style, children, bg = COLORS.background }: ModalWrapperProps) {
  return <View style={[styles.container, { backgroundColor: bg }, style && style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 30,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
})
