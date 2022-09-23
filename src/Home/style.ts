import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { DataListProps } from ".";
import { FlatList } from "react-native";
export const Container = styled.View`
  flex: 1;

  background-color: #dedede;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 15px;
`;

export const User = styled.View`
  padding-left: 17px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const UserGreetings = styled.Text`
  font-size: ${RFValue(18)}px;

  color: white;
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  color: white;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.colors.primary};
`;
export const UserWrapper = styled.View`
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(32)}px;
`;

export const Icons = styled(Feather)`
  color: orange;
  font-size: ${RFValue(24)}px;
`;
export const CardScrl = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;

  margin-top: ${RFPercentage(20)}px;
`;

export const Transation = styled.View`
  flex: 1%;
  padding: 0px 24px;

  margin-top: ${RFPercentage(12)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`;
export const TransationList = styled(
  FlatList as new () => FlatList<DataListProps>
)``;
export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogOutButon = styled.TouchableOpacity``;
