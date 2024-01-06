import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'

const SettingAccount = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SmallRectangle.png')}
        style={styles.layer}
      />

      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} style={styles.backImage} />
        </TouchableOpacity>
        <Text style={styles.title}>Account</Text>
      </View>

      <View style={styles.tabList}>
        <TouchableOpacity style={[styles.commonContainer, styles.space]}  onPress={()=> navigation.navigate(EditProfile)}>
            <Text style={styles.colorText}>Edit Profile</Text>
        </TouchableOpacity>

         <TouchableOpacity style={[styles.commonContainer, styles.space]}  onPress={()=> navigation.navigate(ChangePassword)}>
            <Text style={styles.colorText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Privacy</Text>
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
    marginTop: 20,
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
    height: '10.2%',
  },
  commonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: '88%', 
    marginBottom: 25,
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

export default SettingAccount;
