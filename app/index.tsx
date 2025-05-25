import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import Lock from '@/assets/svg/lock-icon.svg'
import Logo from '@/assets/svg/logo.svg'
import User from '@/assets/svg/user-icon.svg'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'

export default function Index() {
  const Router = useRouter()

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Logo />
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
        <Input placeholder="Senha" autoComplete="password" secureTextEntry icon={<Lock />} />
        <Button>
          <Text
            style={{
              color: colors.text.contrast,
              fontFamily: fontFamily.medium,
              fontSize: 20
            }}
          >
            Login
          </Text>
        </Button>
        <Text
          style={{
            color: colors.text.default,
            textDecorationLine: 'underline',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
            fontSize: 17
          }}
          onPress={() => Router.push('/register')}
        >
          Registre-se
        </Text>
      </View>
    </View>
  )
}
