import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import CustomTextInput from '../components/CustomTextInput'
import CustomButton from '../components/CustomButton'
import { Context } from '../components/Context'


const Login = () => {
  const navigation = useNavigation();
  const { email, setEmail, password, setPassword, loginUser, isAuthenticated } =
    useContext(Context);

  const handleOnPressBack = () => {
    navigation.navigate('Welcome');
  };

   const handleLogin = () => {
    loginUser(email, password);
    if (isAuthenticated) {
      navigation.navigate('MainBottom');
    }
  };

  const handleOnPressCreateAccount = () => {
    navigation.navigate('Register');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.backImage}>
        <TouchableOpacity onPress={handleOnPressBack}>
          <Image
            source={require('../assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.blogdContainer}>
        <Text>
          <Text style={styles.blogdText}>TechuB</Text>
          <Text style={styles.dotText}>.</Text>
        </Text>
      </View>
      <Text style={styles.bloggingPartnerText}>Personal Blogging Partner</Text>

      <View>
        <CustomTextInput
          placeholder="Email"
          value={email}
          handleTextChange={(text) => setEmail(text)}
        />

        <CustomTextInput
          placeholder="Password"
          value={password}
          handleTextChange={(pwd) => setPassword(pwd)}
          password={true}
        />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      <CustomButton
          title="Login"
          onPress={handleLogin}
        />
      

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />

      <View style={styles.lineContainer}>
        <View style={styles.horizontalLine} />
        <Text style={styles.textInLine}>Or</Text>
        <View style={styles.horizontalLine} />
      </View>

      <Image source={require('../assets/Auth.png')} />

      <TouchableOpacity
        style={styles.footerContainer}
        onPress={handleOnPressCreateAccount}>
        <View>
          <Text style={[styles.text, styles.blackText]}>
            Don't have an account?
            <Text style={[styles.text, styles.blueText]}> Register</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  backImage: {
    height: 20,
    width: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginLeft: 3,
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
    marginBottom: 40,
  },
  forgotText: {
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'underline',
    marginBottom: 25,
  },
  lineContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  horizontalLine: {
    width: 100,
    height: 1,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  textInLine: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Nunito',
    fontWeight: '700',
    textDecorationLine: 'underline',
    wordWrap: 'break-word',
  },
  blackText: {
    color: 'black',
  },
  blueText: {
    color: '#003B95',
  },
});
