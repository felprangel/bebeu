import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import Lock from '@/assets/svg/lock-icon.svg'
import User from '@/assets/svg/user-icon.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Text, View } from 'react-native'

export default function Register() {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          marginTop: 40,
          width: 300,
          height: 400,
          gap: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Input placeholder="Email" autoComplete="email" icon={<User />} />
        <Input placeholder="Senha" autoComplete="new-password" secureTextEntry icon={<Lock />} />
        <Input placeholder="Confirme sua Senha" autoComplete="new-password" secureTextEntry icon={<Lock />} />
        <Button>
          <Text
            style={{
              color: colors.text.contrast,
              fontFamily: fontFamily.medium,
              fontSize: 20
            }}
          >
            Registrar
          </Text>
        </Button>
      </View>
    </View>
  )
}
