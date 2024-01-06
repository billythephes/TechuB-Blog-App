import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingOthers = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [Enable, setEnable] = useState();
  
  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  const HandleSwitch = () => {
    const trackColor = { false: '#C0C0C0', true: '#A9A9A9' };
    const thumbColor = isDarkMode ? '#309CFF' : '#f4f3f4';
    return (
      <View>
        <Switch
          trackColor={trackColor}
          thumbColor={thumbColor}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <Image
        source={require('../assets/SmallRectangle.png')}
        style={styles.layer}
      />

      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={[styles.title, isDarkMode ? styles.darkModeText : null]}>Others</Text>
      </View>

      <View style={styles.tabList}>
        <View style={[styles.commonContainer, styles.space]}>
          <Text style={[styles.colorText, isDarkMode ? styles.darkModeText : null]}>Dark Mode</Text>
          <HandleSwitch />
        </View>

        <View style={[styles.commonContainer, styles.space]}>
          <Text style={[styles.colorText, isDarkMode ? styles.darkModeText : null]}>Language</Text>
          <Picker
            selectedValue={Enable}
            style={styles.picker}
            onValueChange={(itemValue) => setEnable(itemValue)}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Vietnamese" value="vi" />
            <Picker.Item label="France" value="fr" />
            <Picker.Item label="Espanol" value="es" />
          </Picker>
        </View>

        <View style={[styles.commonContainer, styles.space]}>
          <Text style={[styles.colorText, isDarkMode ? styles.darkModeText : null]}>Region</Text>
          <Picker
            selectedValue={Enable}
            style={styles.picker}
            onValueChange={(itemValue) => setEnable(itemValue)}>
            <Picker.Item label="VietNam" value="vi" />
            <Picker.Item label="US" value="en" />
            <Picker.Item label="UK" value="en" />
            <Picker.Item label="France" value="fr" />
            <Picker.Item label="Spain" value="es" />
          </Picker>
        </View>
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
    alignItems: 'center',
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
  picker: {
    width: 80,
    fontSize: 11,
    borderRadius: 10,
  },
  darkModeContainer: {
    backgroundColor: 'black',
  },
  darkModeText: {
    color: 'white',
  },
});

export default SettingOthers;
