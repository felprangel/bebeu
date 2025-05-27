import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'expo-router'
import { Text } from 'react-native'

export default function Home() {
  const Auth = useAuth()
  const Router = useRouter()

  return (
    <>
      <Text>Hello World</Text>
      <Button text="Teste" onPress={() => Auth.logout()} />
      <Button text="Ir pra outra tela" onPress={() => Router.push('/weight')} />
    </>
  )
}
