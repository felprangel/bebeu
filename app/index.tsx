import { colors } from "@/assets/styles/colors";
import Logo from "@/assets/svg/logo.svg";
import { Input } from "@/components/Input";
import { Text, TouchableHighlight, View } from "react-native";

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
      <View
        style={{
          marginTop: 40,
          width: 300,
          height: 400,
          gap: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <TouchableHighlight
          style={{
            backgroundColor: colors.primary,
            borderRadius: 10,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 150,
          }}
        >
          <Text style={{ color: colors.text.contrast }}>Login</Text>
        </TouchableHighlight>
        <Text
          style={{
            color: colors.text.default,
            textDecorationLine: "underline",
            textAlign: "center",
          }}
        >
          Registre-se
        </Text>
      </View>
    </View>
  );
}
