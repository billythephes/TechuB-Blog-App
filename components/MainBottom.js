import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../presentitional/Home'
import Search from '../presentitional/Search'
import Favorites from '../presentitional/Favorites'
import SettingStack from './SettingStack'
import IonIcon from 'react-native-vector-icons/Ionicons'

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  return <IonIcon name={name} size={25} color={focused ? '#0081F1' : '#000'} />;
};
const homeScreenOptions = (headerShown, name, bottab) => {
  return {
    headerShown: headerShown,
    tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
  };
};

const MainBottom = () => {
  return (
    
    <Bottom.Navigator>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={homeScreenOptions(false, 'home')}
      />

      <Bottom.Screen
        name="Search"
        component={Search}
        options={homeScreenOptions(false, 'search')}
      />
      <Bottom.Screen
        name="Favorites"
        component={Favorites}
        options={{ ...homeScreenOptions(false, 'heart'), tabBarBadge: 3 }}
      />

      <Bottom.Screen
        name="Setting"
        component={SettingStack}
        options={homeScreenOptions(false, 'settings')}
      />
    </Bottom.Navigator>
    
  );
};
export default MainBottom;
