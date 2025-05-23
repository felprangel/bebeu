import { colors } from "@/assets/styles/colors";
import Logo from "@/assets/svg/logo.svg";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { styled } from "styled-components/native";

export default function Index() {
  return (
    <CenterView>
      <Logo />
      <View style={{ marginTop: 40, width: 300, height: 400 }}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Senha" />
        <TouchableHighlight style={{ backgroundColor: colors.primary }}>
          <Text style={{ color: colors.text.contrast }}>Login</Text>
        </TouchableHighlight>
      </View>
    </CenterView>
  );
}

const CenterView = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
