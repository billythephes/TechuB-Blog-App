import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SettingAccount from './SettingAccount'
import SettingNotification from './SettingNotification'
import SettingOthers from './SettingOthers'
import ProfileUser from './ProfileUser'

const Setting = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:6890/api/v1/posts');
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
        source={require('../assets/BigRectangle.png')}
        style={styles.layer}
      />

      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Setting</Text>
      </View>

      <TouchableOpacity style={styles.profile}  onPress={()=> navigation.navigate(ProfileUser)}>
        <Image
          source={require('../assets/Profile/avatar.png')}
          style={styles.avt}
        />
        <View>
          <Text style={{ fontSize: 18, color: '#FFFF' }}>Phúc Nguyễn</Text>
          <Text style={[styles.smallSize, { marginVertical: 3 }]}>
            @phes
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.smallSize, { marginRight: 15 }]}>
              3 Follower
            </Text>
            <Text style={styles.smallSize}>3 Following</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.tabList}>
        <TouchableOpacity style={[styles.commonContainer, styles.space]} onPress={()=> navigation.navigate(SettingAccount)} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5
              name="user-cog"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.colorText}>Account</Text>
          </View>
          <Image source={require('../assets/greater.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.commonContainer, styles.space]} onPress={()=> navigation.navigate(SettingNotification)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IonIcon
              name="notifications-circle"
              size={26}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.colorText}>Notification</Text>
          </View>
          <Image source={require('../assets/greater.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.commonContainer, styles.space]} onPress={()=> navigation.navigate(SettingOthers)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="cogs" size={26} style={{ marginRight: 10 }} />
            <Text style={styles.colorText}>Other</Text>
          </View>
          <Image source={require('../assets/greater.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#EFEFEF',
  },
  homeHeader: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  layer: {
    position: 'absolute',
    width: '100%',
    height: '27.3%',
    
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginLeft: 25,
  },
  avt: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  commonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: '95%', 
    marginBottom: 25,
  },
  smallSize: {
    fontSize: 13,
    color: '#C8C8C8',
  },
  tabList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 90,
  },
  colorText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  backImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 7,
  },
});

export default Setting;
