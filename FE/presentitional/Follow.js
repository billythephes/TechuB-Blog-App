import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RadioButtonFL from '../components/RadioButtonFL';

const Follow = ({ navigation }) => {
   const [data1, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:6890/api/v1/follow');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [option, setOption] = useState('Follower');
  const data = [{ value: 'Follower' }, { value: 'Following' }];

  const optionStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 13,
  };

  const [isFollowing, setIsFollowing] = useState(true);

  const handlePress = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <RadioButtonFL
        data={data}
        onSelect={(value) => setOption(value)}
        style={optionStyle}
      />

      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.horizontalLine} />
      </View>

      <View style={styles.searchFilter}>
        <View style={styles.search}>
          <TextInput style={styles.inputSeach} placeholder="Search" />
        </View>
        <Icon name="search" size={24} color="#00000" />
      </View>

      {option === 'Follower' && (
        <View style={{ flex: 1 }}>
          <View style={styles.profile2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robin Hood</Text>
                <Text style={{ color: '#536471' }}>@mrhood</Text>
              </View>
            </View>
            <Image source={require('../assets/more.png')} />
          </View>

          <View style={styles.profile2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robert Downey</Text>
                <Text style={{ color: '#536471' }}>@mrrobert</Text>
              </View>
            </View>
            <Image source={require('../assets/more.png')} />
          </View>

          <View style={styles.profile2}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robert Oppenheimer</Text>
                <Text style={{ color: '#536471' }}>@mrrobert</Text>
              </View>
            </View>
            <Image source={require('../assets/more.png')} />
          </View>

        </View>
      )}

      {option === 'Following' && (
        <View style={{ flex: 1 }}>
          <View style={styles.profile}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robin Hood</Text>
                <Text style={{ color: '#536471' }}>@mrhood</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={isFollowing ? styles.unfollow : styles.follow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profile}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robert Downey</Text>
                <Text style={{ color: '#536471' }}>@mrrobert</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={isFollowing ? styles.unfollow : styles.follow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profile}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robert Oppenheimer</Text>
                <Text style={{ color: '#536471' }}>@mrrobert</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={isFollowing ? styles.unfollow : styles.follow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </View>
  );
};

export default Follow;

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
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 10,
    backgroundColor: '#C8C8C8',
    marginBottom: 0,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 17,
  },
  profile2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 17,
    marginBottom: 25,
  },
  searchFilter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 250,
    backgroundColor: '#E8DCDC',
    borderRadius: 5,
    height: 42,
    marginTop: 20,
    marginBottom: 40,
  },
  search: {
    justifyContent: 'center',
    height: 42,
    width: '80%',
  },
  inputSeach: {
    fontFamily: 'Montserrat',
    fontSize: 17,
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  unfollow: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#756E6E',
  },
  follow: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
