import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container =  styled.TouchableOpacity `
background-color: ${({ theme }) => theme.colors.orange};
align-items:  center;
width: 100%;
border-radius: 5px;
padding: 18px;
`;

export const Title =  styled.Text `
font-family: ${({ theme }) => theme.fonts.medium};
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.white};


`;