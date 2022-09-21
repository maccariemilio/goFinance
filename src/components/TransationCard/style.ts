import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'

interface TransactionTypeProps {
    type: "positivy" | "negativy"
}

export const Container = styled.View` 
background-color: ${({ theme }) => theme.colors.white};
border-radius: 5px;
padding: 17px 24px;
margin-bottom: 16px;
`;

export const Title = styled.Text `
font-size: ${RFValue(14)}px;
`;
export const Amount = styled.Text<TransactionTypeProps> `
font-size: ${RFValue(20)}px;
margin-top: 2px;
color: ${({theme, type}) => type === 'positivy' ? theme.colors.sucess : theme.colors.secondary};

font-family: ${({theme}) => theme.fonts.regular};
`;
export const Footer = styled.View `
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 19px;

`;
export const Category = styled.View `
flex-direction: row;
align-items: center;
`;
export const Icon = styled(Feather) `
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.colors.grey};
`;
export const CategoryName = styled.Text `
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.grey};
margin-left: 17px;

`;
export const Date = styled.Text `
font-size: ${RFValue(14)}px;
color: ${({ theme }) => theme.colors.grey};

`;