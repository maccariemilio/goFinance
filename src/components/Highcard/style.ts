import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  type: "up" | "down" | "total";
}

export const Container = styled.View<IconProps>`
  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.orange : theme.colors.white};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text<IconProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.white : theme.colors.black};
`;
export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(40)}px;

  ${(props) =>
    props.type === "up" &&
    css`
      color: green;
    `};

  ${(props) =>
    props.type === "down" &&
    css`
      color: red;
    `};

  ${(props) =>
    props.type === "total" &&
    css`
      color: white;
    `};
`;
export const Footer = styled.View``;
export const Amount = styled.Text<IconProps>`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.white : theme.colors.black};
`;
export const LastTransition = styled.Text<IconProps>`
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.white : theme.colors.black};
`;
