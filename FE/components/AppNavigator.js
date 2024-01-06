import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigator from './DrawerNavigator'
import AuthStack from './AuthStack'
import { Context } from './Context'

const Stack = createStackNavigator();
const AppNavigator = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated
          ? (
            <Stack.Screen name="NavBar" component={DrawerNavigator} options={{ headerShown: false }} />
          )
          : (
            <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;