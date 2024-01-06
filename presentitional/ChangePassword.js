import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput'

const ChangePassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Change Password</Text>

      <View style={styles.horizontalLine} />

      <CustomTextInput placeholder="Current Password" />
      <CustomTextInput placeholder="New Password" />
      <CustomTextInput placeholder="Confirm New Password" />
      <View style={{ alignItems: 'center', marginTop: 15, }}>
        <TouchableOpacity style={styles.button}>
          <Text>Confirm Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: 'C8C8C8',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 35,
    marginVertical: 15,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
    marginBottom: 50,
  },
  button: {
    width: 205,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 25,
  },
});
