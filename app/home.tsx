import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { Text } from 'react-native'

export default function Home() {
  const Auth = useAuth()

  return (
    <>
      <Text>Hello World</Text>
      <Button onPress={() => Auth.logout()}>
        <Text>Teste</Text>
      </Button>
    </>
  )
}
