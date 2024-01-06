import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Follow from './Follow';
import OthersPost from './OthersPost'

const ProfileOthers = ({ navigation, route }) => {
  const { pro } = route.params;

  const [isFollowing, setIsFollowing] = useState(false);

  const handlePress = () => {
    setIsFollowing(!isFollowing);
  };

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
          source={require('../assets/Profile/avatar.png')}
          style={styles.avt}
        />
        <Text style={styles.username}>{pro.username}</Text>
        <Text>Welcome to my profile</Text>
        <View style={[styles.commonContainer, { width: '88%' }]}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.commonContainer,
          { marginHorizontal: 15, marginVertical: 17 },
        ]}>
        <TouchableOpacity onPress={() => navigation.navigate(Follow)}>
          <Text>1K Follower</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Follow)}>
          <Text>2K Following</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OthersPost', { pro2: pro })}>
        <Text>3K Posts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.profile}>
        <View style={[styles.commonContainer, styles.space, { marginTop: 10 }]}>
          <Text style={{ fontWeight: 'bold' }}>{pro.username}'s Info</Text>
          <Image source={require('../assets/Profile/3dot.png')} />
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="user" size={20} style={{ marginRight: 10 }} />
            <Text>Nick name</Text>
          </View>
          <Text>NATN</Text>
        </View>
        <View style={[styles.commonContainer, styles.space]}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="globe" size={20} style={{ marginRight: 10 }} />
            <Text>Website</Text>
          </View>
          <Text>natn.com</Text>
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
          <Text>natn@gmail.com</Text>
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

export default ProfileOthers;

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
    height: '25%',
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
    width: 90,
    height: 90,
    marginTop: 10,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
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
