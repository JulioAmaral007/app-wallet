import { COLORS } from '@/constants/Colors'
import type { TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native'

export type TypoProps = {
  size?: number
  color?: string
  fontWeight?: TextStyle['fontWeight']
  children: any | null
  style?: TextStyle
  textProps?: TextProps
}

export function Typo({
  size,
  color = COLORS.text,
  fontWeight = '400',
  children,
  style,
  textProps = {},
}: TypoProps) {
  const textStyle: TextStyle = {
    fontSize: size ? size : 18,
    color,
    fontWeight,
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  )
}
