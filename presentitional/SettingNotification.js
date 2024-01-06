import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';

const HandleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View>
      <Switch
        trackColor={{ false: '#C0C0C0', true: '#A9A9A9' }}
        thumbColor={isEnabled ? '#309CFF' : '#f4f3f4'}   
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const SettingNotification = ({ navigation }) => {
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
        <Text style={styles.title}>Notification</Text>
      </View>

      <View style={styles.tabList}>
        <View style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Notification</Text>
            <HandleSwitch />
        </View>

         <View style={[styles.commonContainer, styles.space]}>
            <Text style={styles.colorText}>Updates</Text>
            <HandleSwitch />
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
    marginBottom: 20,
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

export default SettingNotification;
