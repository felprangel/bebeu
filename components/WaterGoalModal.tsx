import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import BigCup from '@/assets/svg/big-cup.svg'
import { useState } from 'react'
import { Modal, Text, TextInput, View } from 'react-native'
import { Button } from './Button'

interface WaterGoalProps {
  visible: boolean
  goal: number
  loading: boolean
  confirmationFn(goal: number): void
}

export function WaterGoalModal(props: WaterGoalProps) {
  const [goalInput, setGoalInput] = useState<number>(props.goal)

  return (
    <Modal visible={props.visible}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TextInput
              onChangeText={input => setGoalInput(parseInt(input))}
              defaultValue={props.goal.toString()}
              style={{
                width: 150,
                color: colors.text.default,
                fontFamily: fontFamily.medium,
                fontSize: 20,
                paddingLeft: 20,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 10
              }}
              inputMode="numeric"
            />
            <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 25 }}>ml</Text>
          </View>
        </View>
        <Button
          loading={props.loading}
          text="Vamos hidratar!"
          onPress={() => props.confirmationFn(goalInput || props.goal)}
          style={{ width: 250, paddingHorizontal: 40 }}
        />
      </View>
    </Modal>
  )
}
