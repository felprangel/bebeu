import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import Man from '@/assets/svg/man.svg'
import { Button } from '@/components/Button'
import { useWater } from '@/hooks/useWater'
import { useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'

export default function Weight() {
  const Water = useWater()
  const [weight, setWeight] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const WATER_INTAKE_ML_PER_KG_PER_DAY = 35

  async function calculateWaterGoal() {
    try {
      setLoading(true)
      const goal = WATER_INTAKE_ML_PER_KG_PER_DAY * weight
      await Water.saveWaterGoal(goal)
    } catch (error) {
      // TODO: tratar erro
    } finally {
      setLoading(false)
    }
  }

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
      <View style={{ marginVertical: 40, marginHorizontal: 100, flexDirection: 'row', alignItems: 'center' }}>
        <Man />
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text
            style={{
              color: colors.text.default,
              fontFamily: fontFamily.medium,
              textAlign: 'center',
              fontSize: 17
            }}
          >
            Digite seu peso em KG:
          </Text>
          <TextInput
            onChangeText={input => setWeight(parseInt(input))}
            style={{
              width: 200,
              color: colors.text.default,
              paddingLeft: 20,
              borderWidth: 1,
              borderColor: colors.primary,
              borderRadius: 10
            }}
            inputMode="numeric"
          />
        </View>
      </View>
      <Button
        loading={loading}
        text="Calcular a minha meta de água"
        onPress={calculateWaterGoal}
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
