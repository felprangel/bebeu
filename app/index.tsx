import { colors } from "@/assets/styles/colors";
import Logo from "@/assets/svg/logo.svg";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo />
      <View style={{ marginTop: 40, width: 300, height: 400 }}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Senha" />
        <TouchableHighlight style={{ backgroundColor: colors.primary }}>
          <Text style={{ color: colors.text.contrast }}>Login</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
