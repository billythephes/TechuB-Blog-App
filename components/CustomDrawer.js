import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Feather'
import Home from '../presentitional/Home'
import Favorites from '../presentitional/Favorites'
import UserPost from '../presentitional/UserPost'
import AuthStack from './AuthStack'
import SettingStack from './SettingStack'
import ProfileUser from '../presentitional/ProfileUser'
import CreatePost from '../presentitional/CreatePost'
import Activities from '../presentitional/Activities'
import ProfileStack from './ProfileStack'


function CustomDrawer(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView style={styles.drawerContainer} {...props}>
      <TouchableOpacity
        style={styles.profile}
        onPress={() => navigation.navigate(ProfileUser)}>
        <Image
          source={require('../assets/Profile/avatar.png')}
          style={styles.avt}
        />
        <Text style={{ fontSize: 24, color: '#FFFF' }}>Phúc Nguyễn</Text>
        <Text
          style={{
            fontSize: 14,
            fontStyle: 'italic',
            color: '#C8C8C8',
            marginBottom: 5,
          }}>
          @Phes
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
          }}>
          <Text style={{ fontSize: 15, color: '#C8C8C8' }}>3 Follower</Text>
          <Text style={{ fontSize: 15, color: '#C8C8C8' }}>3 Following</Text>
        </View>
        <View style={styles.horizontalLine} />
      </TouchableOpacity>

      <View style={styles.out}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image
            style={{
              position: 'absolute',
              top: 390,
              left: 0,
              width: 40,
              height: 40,
            }}
            source={require('../assets/circle.png')}
          />
          <Image
            style={{
              position: 'absolute',
              top: 400,
              left: 10,
              width: 20,
              height: 20,
            }}
            source={require('../assets/x.png')}
          />
        </TouchableOpacity>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate(Home)}
        icon={() => <IonIcon name="home-outline" size={24} color="#FFFF" />}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Add new article"
        onPress={() => navigation.navigate(CreatePost)}
        icon={() => (
          <IonIcon name="add-circle-outline" size={24} color="#FFFF" />
        )}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Your Blogs"
        onPress={() => navigation.navigate(ProfileStack)}
        icon={() => (
          <IonIcon name="document-text-outline" size={24} color="#FFFF" />
        )}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Your Activities"
        onPress={() => navigation.navigate(Activities)}
        icon={() => <Icon name="activity" size={24} color="#FFFF" />}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Your Favorites"
        onPress={() => navigation.navigate(Favorites)}
        icon={() => <IonIcon name="heart-outline" size={24} color="#FFFF" />}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Setting"
        onPress={() => navigation.navigate(SettingStack)}
        icon={() => <IonIcon name="settings-outline" size={24} color="#FFFF" />}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
      <DrawerItem
        label="Log Out"
        onPress={() => navigation.navigate(AuthStack)}
        icon={() => <IonIcon name="log-out-outline" size={24} color="#FFFF" />}
        labelStyle={{ fontSize: 15, color: '#FFFF' }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#181717',
  },
  profile: {
    marginLeft: 18,
  },
  avt: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  horizontalLine: {
    width: 198,
    height: 2,
    borderRadius: 5,
    backgroundColor: '#C8C8C8',
    marginTop: 25,
    marginBottom: 20,
  },
  out: {
    marginLeft: 20,
    marginTop: 20,
  },
});
