import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import { Text, TouchableHighlight, TouchableHighlightProps } from 'react-native'

interface ButtonProps extends TouchableHighlightProps {
  text: string
}

export function Button(props: ButtonProps) {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: colors.primary,
        borderRadius: 10,
        width: 170,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(props.style as object)
      }}
      {...(({ style, ...rest }) => rest)(props)}
    >
      <Text
        style={{
          color: colors.text.contrast,
          fontFamily: fontFamily.medium,
          fontSize: 20,
          textAlign: 'center'
        }}
      >
        {props.text}
      </Text>
    </TouchableHighlight>
  )
}
