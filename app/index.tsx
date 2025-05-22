import Logo from "@/assets/svg/logo.svg";
import { styled } from "styled-components/native";

export default function Index() {
  return (
    <CenterView>
      <Logo />
    </CenterView>
  );
}

const CenterView = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
