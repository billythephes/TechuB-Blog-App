import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Setting from '../presentitional/Setting'
import SettingAccount from '../presentitional/SettingAccount'
import SettingNotification from '../presentitional/SettingNotification'
import SettingOthers from '../presentitional/SettingOthers'
import EditProfile from '../presentitional/EditProfile'
import ChangePassword from '../presentitional/ChangePassword'
import ProfileUser from '../presentitional/ProfileUser'

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />  
      <Stack.Screen name="SettingAccount" component={SettingAccount} options={{ headerShown: false }} />
      <Stack.Screen name="SettingNotification" component={SettingNotification} options={{ headerShown: false }} />
      <Stack.Screen name="SettingOthers" component={SettingOthers} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SettingStack;