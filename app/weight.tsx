import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import { Button } from '@/components/Button'
import { SafeAreaView, Text } from 'react-native'

export default function Weight() {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingBottom: 30 }}>
        Qual o seu peso atual?
      </Text>
      <Button
        text="Calcular a minha meta de água"
        onPress={() => console.log('teste')}
        style={{ width: 250, height: 70, paddingHorizontal: 40 }}
      />
      <Text
        style={{
          color: colors.text.default,
          fontFamily: fontFamily.regular,
          textAlign: 'center',
          fontSize: 17,
          paddingHorizontal: 35,
          marginTop: 50
        }}
      >
        *Usaremos essa informação para definir sua meta diária de hidratação
      </Text>
    </SafeAreaView>
  )
}
