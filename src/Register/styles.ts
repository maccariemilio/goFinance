import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const  Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View `
background-color: ${({ theme }) => theme.colors.primary};
width: 100%;
height: ${RFValue(113)}px;
align-items: center;
justify-content: flex-end;
padding-bottom: 19px;

`;
export const Title = styled.Text `
color: ${({ theme }) => theme.colors.white};
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(18)}px;
`;

export const Form = styled.View `
width: 100%;
flex: 1;
padding: 24px;
justify-content: space-between;
`;

export const Fields =  styled.View `

`;


export const TransactionType = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 8px;
margin-bottom: 16px;
`;