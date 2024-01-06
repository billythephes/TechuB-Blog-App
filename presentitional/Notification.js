import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import RadioButton from '../components/RadioButton';

const Notification = ({ navigation }) => {
  const [option, setOption] = useState('All');
  const data = [{ value: 'All' }, { value: 'Unread' }, { value: 'Read' }];

  const optionStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  };

  const [data1, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:6890/api/v1/notification');
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
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Notifications</Text>

      <RadioButton
        data={data}
        onSelect={(value) => setOption(value)}
        style={optionStyle}
      />

      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.horizontalLine} />
      </View>

      {option === 'All' && (
        <View style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={styles.profile}>
              <Image
                source={require('../assets/Post/avt.png')}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bold}>Goku</Text>
              <Text>comment on</Text>
              <Text style={styles.bold}>your post</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.verticalLine} />
            <Text style={{color: "#1A1F36", fontSize: 12,}}>"Kame!!"</Text>
            </View>
            <Text style={styles.date}>Last monday at 0:00 AM</Text>
             <View style={[styles.horizontalLine, {marginTop: 15,}]} />
          </View>
        </View>
      )}

      {option === 'Unread' && (
        <View style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={styles.profile}>
              <Image
                source={require('../assets/Post/avt.png')}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bold}>Naruto</Text>
              <Text>comment on</Text>
              <Text style={styles.bold}>your post</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.verticalLine} />
            <Text style={{color: "#1A1F36", fontSize: 12,}}>"Rasengan!!"</Text>
            </View>
            <Text style={styles.date}>Last monday at 0:00 AM</Text>
             <View style={[styles.horizontalLine, {marginTop: 15,}]} />
          </View>
        </View>
      )}

      {option === 'Read' && (
        <View style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={styles.profile}>
              <Image
                source={require('../assets/Post/avt.png')}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.bold}>Luffy</Text>
              <Text>comment on</Text>
              <Text style={styles.bold}>your post</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.verticalLine} />
            <Text style={{color: "#1A1F36", fontSize: 12,}}>"Gomu!!"</Text>
            </View>
            <Text style={styles.date}>Last monday at 0:00 AM</Text>
             <View style={[styles.horizontalLine, {marginTop: 15,}]} />
          </View>
        </View>
      )}
      
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 10,
    marginHorizontal: 8,
    backgroundColor: 'C8C8C8',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
    marginLeft: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 37,
    marginVertical: 15,
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
    marginBottom: 15,
  },
  body: {
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  bold: {
    marginHorizontal: 5,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  verticalLine: {
    width: 33,
    height: 1,
    backgroundColor: '#C8C8C8',
    marginTop: 30,
    marginBottom: 27,
    marginLeft: 8,
    transform: [{ rotate: '90deg' }],
  },
  date: {
    marginLeft: 25,
    fontStyle: 'italic',
    fontSize: 12,
    color: '#A5ACB8',
  },
});
