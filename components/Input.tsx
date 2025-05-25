import { colors } from "@/assets/styles/colors";
import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  icon: ReactNode;
}

export function Input(props: InputProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
      }}
    >
      {props.icon}
      <TextInput
        style={{
          height: 55,
          width: 250,
          color: colors.text.default,
          paddingLeft: 20,
        }}
        placeholderTextColor={colors.text.default}
        {...props}
      />
    </View>
  );
}
