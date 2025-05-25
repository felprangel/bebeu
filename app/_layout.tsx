import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  useFonts
} from '@expo-google-fonts/fredoka'
import { Slot } from 'expo-router'

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
  return <Slot />
}
