import { colors } from "@/assets/styles/colors";
import { TextInput, TextInputProps } from "react-native";

export function Input(props: TextInputProps) {
  return (
    <TextInput
      style={{
        borderColor: colors.primary,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
        height: 55,
        width: 250,
      }}
      {...props}
    />
  );
}
