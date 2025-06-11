import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import SmallCup from '@/assets/svg/small-cup.svg'
import { Button } from '@/components/Button'
import { useAuth } from '@/hooks/useAuth'
import { SafeAreaView, Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default function Home() {
  const Auth = useAuth()

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
      <AnimatedCircularProgress
        size={300}
        width={15}
        fill={40}
        rotation={-90}
        tintColor={colors.primary}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor={colors.background}
      >
        {() => (
          <>
            <SmallCup />
            <Text
              style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingBottom: 30 }}
            >
              1000 ml
            </Text>
          </>
        )}
      </AnimatedCircularProgress>
      <Button text="Beber 300 ml" onPress={() => Auth.logout()} />
    </SafeAreaView>
  )
}
