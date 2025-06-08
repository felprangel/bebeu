import { AuthProvider } from '@/hooks/useAuth'
import { WaterProvider } from '@/hooks/useWater'
import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts
} from '@expo-google-fonts/fredoka'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold
  })

  if (!fontsLoaded) {
    return
  }
  return (
    <AuthProvider>
      <WaterProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </WaterProvider>
    </AuthProvider>
  )
}
