import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainBottom from './MainBottom'
import CustomDrawer from './CustomDrawer'
import AuthStack from './AuthStack'
import Post from '../presentitional/Post'
import ProfileUser from '../presentitional/ProfileUser'
import ProfileOthers from '../presentitional/ProfileOthers'
import SettingStack from './SettingStack'
import CreatePost from '../presentitional/CreatePost'
import Notification from '../presentitional/Notification'
import Activities from '../presentitional/Activities'
import Follow from '../presentitional/Follow'
import ProfileStack from './ProfileStack'
import EditPost from '../presentitional/EditPost'
import UserPost from '../presentitional/UserPost'
import OthersPost from '../presentitional/OthersPost'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />} 
      >
      <Drawer.Screen
        name="MainBottom"
        component={MainBottom}  
      />
      <Drawer.Screen
        name="Post"
        component={Post}  
      />
      <Drawer.Screen
        name="SettingStack"
        component={SettingStack}  
      />
      <Drawer.Screen
        name="ProfileUser"
        component={ProfileUser}  
      />
      <Drawer.Screen
        name="ProfileOthers"
        component={ProfileOthers}  
      />
      <Drawer.Screen
        name="AuthStack"
        component={AuthStack}  
      />
      <Drawer.Screen
        name="CreatePost"
        component={CreatePost}  
      />
       <Drawer.Screen
        name="Notification"
        component={Notification}  
      />
       <Drawer.Screen
        name="Activities"
        component={Activities}  
      />
       <Drawer.Screen
        name="Follow"
        component={Follow}  
      />
        <Drawer.Screen
        name="ProfileStack"
        component={ProfileStack}  
      />
       <Drawer.Screen
        name="EditPost"
        component={EditPost}  
      />
      <Drawer.Screen
        name="UserPost"
        component={UserPost}  
      />
      <Drawer.Screen
        name="OthersPost"
        component={OthersPost}  
      />
    </Drawer.Navigator>
  );
}
