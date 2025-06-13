import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import HappyEmoji from '@/assets/svg/happy-emoji.svg'
import SmallCup from '@/assets/svg/small-cup.svg'
import Trophy from '@/assets/svg/trophy.svg'
import { Button } from '@/components/Button'
import { useWater } from '@/hooks/useWater'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Modal, SafeAreaView, Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

export default function Home() {
  const Water = useWater()
  const [waterGoal, setWaterGoal] = useState<number>(0)
  const [waterIntake, setWaterIntake] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [successAlreadyShown, setSuccessAlreadyShown] = useState<boolean>(false)

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
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message)
      }
      console.log(error)
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
        onAnimationComplete={() => {
          if (successAlreadyShown) return
          setShowSuccessModal(true)
        }}
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
      <Modal visible={showSuccessModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 80
          }}
        >
          <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 35, paddingBottom: 30 }}>
            Meta diária atingida!
          </Text>
          <View style={{ alignItems: 'center', gap: 30 }}>
            <Trophy />
            <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingTop: 30 }}>
              Seu rim está sorrindo agora!
            </Text>
            <HappyEmoji />
          </View>
          <Button
            text="Voltar para o progresso"
            onPress={() => {
              setSuccessAlreadyShown(true)
              setShowSuccessModal(false)
            }}
            style={{ width: 300, paddingHorizontal: 40 }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}
