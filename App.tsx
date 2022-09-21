
import { StyleSheet, Text, View } from 'react-native';
import {Page} from './src/Home';
// import {Register} from './src/Register';
// import { CategorySelect } from './src/CategorySelect';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {useFonts,
Poppins_400Regular,
Poppins_500Medium,
Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import theme from './src/styles/theme';

import { Routes } from './src/routes';

import { AppRoutes } from './src/routes/app.routes';
import { Signin } from './src/Signin';

import { AuthProvider, useAuth } from './src/Hooks/Auth';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const {userStorageLoading} = useAuth();

  if(!fontsLoaded || userStorageLoading) {
    return <AppLoading></AppLoading>
  }
  
  return (
    <ThemeProvider theme={theme}>

        <StatusBar style="light"></StatusBar>
        <AuthProvider>
        <Routes></Routes>
      </AuthProvider>
      
    </ThemeProvider>
    
  )

}
