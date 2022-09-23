import React, { useContext, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { ActivityIndicator, Alert, Platform } from "react-native";

import AppleSvg from "../assets/apple.svg";
import GoogleSvg from "../assets/google.svg";
import LogoSvg from "../assets/logo.svg";
import { SigInSocialButton } from "../components/SigInSocialButton";

import { useAuth } from "../Hooks/Auth";

import {
  Container,
  TitleWrapper,
  Header,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function Signin() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Nao foi possivel conectar a conta Google");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)}></LogoSvg>

          <Title>
            Controle suas {"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SigninTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          ></SigInSocialButton>
          {Platform.OS === "ios" && (
            <SigInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
            ></SigInSocialButton>
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
