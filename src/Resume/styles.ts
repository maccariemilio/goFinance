import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from '@expo/vector-icons'



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

export const Content = styled.ScrollView`
flex: 1;
padding-left: 24px;
padding-right: 24px;
`;

export const ChartContainer = styled.View `
width: 100%;
align-items: center;
`;


export const MonthSelect = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
margin-top: 24px;

`;
export const MonthSelectButton = styled.TouchableOpacity`


`;
export const MonthSelectIcon = styled(Feather)`
font-size: ${RFValue(24)}px;

`;
export const Month = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(20)}px;

`;

export const LoadContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;