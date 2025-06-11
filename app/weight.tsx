import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import BigCup from '@/assets/svg/big-cup.svg'
import Man from '@/assets/svg/man.svg'
import { Button } from '@/components/Button'
import { useWater } from '@/hooks/useWater'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Modal, SafeAreaView, Text, TextInput, View } from 'react-native'
import { Snackbar } from 'react-native-paper'

export default function Weight() {
  const Water = useWater()
  const [weight, setWeight] = useState<number>(0)
  const [goal, setGoal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (!showError) return

    setTimeout(() => setShowError(false), 2000)
  }, [showError])

  const WATER_INTAKE_ML_PER_KG_PER_DAY = 35

  async function calculateWaterGoal() {
    if (weight < 10) {
      setErrorMessage(
        'O peso inserido é muito baixo para calcular a meta de ingestão de água. Por favor, verifique se digitou corretamente.'
      )
      setShowError(true)
      return
    }
    const calculatedGoal = WATER_INTAKE_ML_PER_KG_PER_DAY * weight
    setGoal(calculatedGoal)
    setShowModal(true)
  }

  async function saveWaterGoal() {
    try {
      setLoading(true)
      await Water.saveWaterGoal(goal)
    } catch (error) {
      setErrorMessage('Erro ao fazer login')
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message)
      }
      setShowError(true)
    } finally {
      setShowModal(false)
      setLoading(false)
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 35, paddingBottom: 30 }}>
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
              width: 150,
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
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        action={{
          label: 'Fechar'
        }}
      >
        {errorMessage}
      </Snackbar>
      <Modal visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 80
          }}
        >
          <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 35, paddingBottom: 30 }}>
            Sua meta diária é:
          </Text>
          <View style={{ alignItems: 'center', gap: 30 }}>
            <BigCup />
            <Text
              style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingBottom: 30 }}
            >
              {goal} ml
            </Text>
          </View>
          <Button
            loading={loading}
            text="Vamos hidratar!"
            onPress={saveWaterGoal}
            style={{ width: 250, paddingHorizontal: 40 }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}
