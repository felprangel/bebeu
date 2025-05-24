import { colors } from "@/assets/styles/colors";
import { TouchableHighlight, TouchableHighlightProps } from "react-native";

export function Button(props: TouchableHighlightProps) {
  return (
    <TouchableHighlight
      style={{
        backgroundColor: colors.primary,
        borderRadius: 10,
        width: 150,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      {props.children}
    </TouchableHighlight>
  );
}
