import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Follow from './Follow';
import UserPost from './UserPost';

const ProfileUser = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:6890/api/v1/users');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Profile/Rectangle.png')}
        style={styles.layer}
      />

      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../assets/Home/Notification.png')} />
      </View>

      <View style={styles.profile}>
        <Image
          source={require('../assets/Profile/avataruser.png')}
          style={styles.avt}
        />
        <Text style={styles.username}>Phúc Nguyễn</Text>
        <Text>Studied at UIT</Text>
      </View>

      <View
        style={[
          styles.commonContainer,
          { marginHorizontal: 15, marginVertical: 17 },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate(Follow)}>
          <Text>3 Follower</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Follow)}>
          <Text>3 Following</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(UserPost)}>
          <Text>1 Posts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.info}>
        <View style={[styles.commonContainer, styles.space, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold' }}>Personal Info</Text>
          <Image source={require('../assets/Profile/3dot.png')} />
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="user" size={20} style={{ marginRight: 10 }} />
            <Text>Nick name</Text>
          </View>
          <Text>Phes</Text>
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="globe" size={20} style={{ marginRight: 10 }} />
            <Text>Website</Text>
          </View>
          <Text>billythephes.com</Text>
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              name="envelope"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text>Email</Text>
          </View>
          <Text>21521291@gmail.com</Text>
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome5 name="venus" size={24} style={{ marginRight: 10 }} />
            <Text>Genre</Text>
          </View>
          <Text>male</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
  },
  commonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    marginHorizontal: 15,
    marginVertical: 30,
  },
  profile: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 50,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avt: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  horizontalLine: {
    alignSelf: 'center',
    width: '90%',
    height: 1,
    marginBottom: 40,
    backgroundColor: '#C8C8C8',
  },
  space: {
    width: '88%',
    marginBottom: 25,
  },
});
