import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import SmallCup from '@/assets/svg/small-cup.svg'
import { Button } from '@/components/Button'
import { useWater } from '@/hooks/useWater'
import { useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default function Home() {
  const Water = useWater()
  const [waterGoal, setWaterGoal] = useState<number>(0)
  const [waterIntake, setWaterIntake] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (loading) return
    async function getWaterGoal() {
      const goal = await Water.getWaterGoal()
      setWaterGoal(goal)
    }

    async function getWaterIntake() {
      const intake = await Water.getWaterIntake()
      setWaterIntake(intake)
    }

    getWaterIntake()
    getWaterGoal()
  }, [Water, loading])

  async function registerWaterIntake() {
    try {
      setLoading(true)
      await Water.registerWaterIntake()
    } catch (error) {
      console.log(error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
      <AnimatedCircularProgress
        size={300}
        width={20}
        fill={waterIntake}
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
              {waterGoal} ml
            </Text>
          </>
        )}
      </AnimatedCircularProgress>
      <Button loading={loading} text="Beber 300 ml" onPress={registerWaterIntake} />
    </SafeAreaView>
  )
}
