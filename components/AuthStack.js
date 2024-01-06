import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '../presentitional/Welcome'
import Login from '../presentitional/Login'
import Register from '../presentitional/Register'
import Verification from '../presentitional/Verification'

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />  
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;