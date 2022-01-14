import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import { AuthGuard } from './src/helpers/AuthGuard'
import { Account } from './src/screens/Account'

const Stack = createStackNavigator()
const routes = {
  screens : {
    StartScreen : 'start',
    LoginScreen : 'login',
    Dashboard : 'dash/:id'
  }
}
const linking = {
  prefixes : ['utopios://']
}

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer linking={}>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Account" component={(props) => (AuthGuard(Account, props))} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
