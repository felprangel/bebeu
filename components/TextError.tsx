import { colors } from '@/assets/styles/colors'
import { Text, TextProps } from 'react-native'

export function TextError(props: TextProps) {
  return <Text style={{ color: colors.text.error }}>{props.children}</Text>
}
