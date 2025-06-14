import { colors } from '@/assets/styles/colors'
import { fontFamily } from '@/assets/styles/font-family'
import BigCup from '@/assets/svg/big-cup.svg'
import { Modal, Text, View } from 'react-native'
import { Button } from './Button'

interface WaterGoalProps {
  visible: boolean
  goal: number
  loading: boolean
  confirmationFn(): void
}

export function WaterGoalModal(props: WaterGoalProps) {
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
          <Text style={{ color: colors.text.default, fontFamily: fontFamily.medium, fontSize: 30, paddingBottom: 30 }}>
            {props.goal} ml
          </Text>
        </View>
        <Button
          loading={props.loading}
          text="Vamos hidratar!"
          onPress={props.confirmationFn}
          style={{ width: 250, paddingHorizontal: 40 }}
        />
      </View>
    </Modal>
  )
}
