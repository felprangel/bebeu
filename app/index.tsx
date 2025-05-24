import { colors } from "@/assets/styles/colors";
import { fontFamily } from "@/assets/styles/font-family";
import Logo from "@/assets/svg/logo.svg";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text, View } from "react-native";

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
        <Button>
          <Text
            style={{
              color: colors.text.contrast,
              fontFamily: fontFamily.medium,
            }}
          >
            Login
          </Text>
        </Button>
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
