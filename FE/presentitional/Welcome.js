import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
  const navigation = useNavigation();
  
  const handleOnPressLogin = () => {
    navigation.navigate('Login');
  };
  const handleOnPressRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.blogdContainer}>
        <Text>
          <Text style={styles.blogdText}>TechuB</Text>
          <Text style={styles.dotText}>.</Text>
        </Text>
      </View>
      <Text style={styles.bloggingPartnerText}>Personal Blogging Partner</Text>

      <Image source={require('../assets/Grad.png')} style={styles.image} />
   
      <TouchableOpacity style={styles.button} onPress={handleOnPressLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.newHereText}>New here?</Text>
        <TouchableOpacity
          style={styles.registerBackground}
          onPress={handleOnPressRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  image: {
    width: '80%',
    resizeMode: 'contain',
  },
  blogdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  blogdText: {
    color: '#181717',
    fontSize: 50,
    fontFamily: 'Lora',
    fontWeight: '700',
    wordWrap: 'break-word',
  },
  dotText: {
    color: '#EA3D3D',
    fontSize: 50,
    fontFamily: 'Lora',
    fontWeight: '700',
    marginLeft: -6,
    marginRight: 2,
    wordWrap: 'break-word',
  },
  bloggingPartnerText: {
    left: 1,
    color: '#3C3939',
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    wordWrap: 'break-word',
  },
  button: {
    width: 270,
    height: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#181717',
    fontSize: 20,
  },
  registerContainer: {
    top: 33,
    alignItems: 'center',
  },
  registerBackground: {
    width: 270,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#181717',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '350',
  },
  newHereText: {
    color: '#3C3939',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
});
