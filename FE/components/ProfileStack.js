import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileUser from '../presentitional/ProfileUser';
import ProfileOthers from '../presentitional/ProfileOthers';
import Post from '../presentitional/Post';
import Follow from '../presentitional/Follow';
import UserPost from '../presentitional/UserPost';
import OthersPost from '../presentitional/OthersPost';
import EditPost from '../presentitional/EditPost';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserPost"
        component={UserPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileOthers"
        component={ProfileOthers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Follow"
        component={Follow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OthersPost"
        component={OthersPost}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
