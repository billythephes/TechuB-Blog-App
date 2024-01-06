import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../components/CustomTextInput'

const EditProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.horizontalLine} />

      <CustomTextInput placeholder="Fullname" />
      <CustomTextInput placeholder="Nick name" />
      <CustomTextInput placeholder="Email" />
      <CustomTextInput placeholder="Phone number" />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Country" />
        <TextInput style={styles.input} placeholder="Genre" />
      </View>
      <CustomTextInput placeholder="Address" />
      <View style={{ alignItems: 'center', marginTop: 15, }}>
        <TouchableOpacity style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

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
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#000',
    marginVertical: 10,
    paddingStart: 5,
    height: 45,
    width: 130,
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
