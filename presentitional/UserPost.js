import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import userData from '../components/userData';
import Post from './Post';
import EditPost from './EditPost';

const UserPost = ({ navigation }) => {
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
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
      }}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Your Posts</Text>

      <View style={styles.horizontalLine} />

      <View style={styles.searchFilter}>
        <View style={styles.search}>
          <TextInput style={styles.inputSeach} placeholder="Search" />
          <Icon name="search" size={24} color="#00000" />
        </View>

        <View style={styles.filter}>
          <Image source={require('../assets/Home/Filter.png')} />
        </View>
      </View>

      {userData.map((post) => (
        <TouchableOpacity
          style={styles.post}
          key={post.id}
          onPress={() => navigation.navigate('Post', { data: post })}>
          <View style={styles.headerPost}>
            <View style={styles.titleContainer}>
              <Text style={styles.titlePost}>{post.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('EditPost', { data2: post })}>
                <Image
                  source={require('../assets/more.png')}
                  style={styles.img3dot}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.profilepost}>
              <Image source={post.avatar} style={styles.imgAvatar} />
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
          </View>

          <View style={styles.line}></View>
          <View style={styles.bodypost}>
            <Text style={styles.content}>{post.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default UserPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
    marginBottom: 10,
    marginHorizontal: 8,
    backgroundColor: '#F6F6F6',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '97%',
    marginLeft: 3,
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 37,
    marginVertical: 15,
  },
  horizontalLine: {
    width: '93%',
    height: 1,
    marginTop: 15,
    backgroundColor: '#C8C8C8',
  },
  searchFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#CCCBCB',
    marginTop: 20,
    width: 200,
    height: 42,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputSeach: {
    fontFamily: 'Montserrat',
    fontSize: 17,
    paddingStart: 5,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 51,
    height: 42,
    backgroundColor: '#fff',
    marginLeft: 15,
    borderWidth: 1,
    borderRadius: 4,
  },
  post: {
    backgroundColor: '#F6F6F6',
    width: '90%',
    height: 250,
    marginTop: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
  },
  titlePost: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  img3dot: {
    width: 5,
    height: 20,
  },
  profilepost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgAvatar: {
    marginLeft: 10,
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  username: {
    marginLeft: 10,
    fontWeight: 15,
    fontSize: 15,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 13,
    marginLeft: 30,
    color: '#C8C8C8',
  },
  line: {
    marginVertical: 5,
    alignSelf: 'center',
    height: 1,
    width: '95%',
    backgroundColor: '#C8C8C8',
  },
  content: {
    fontWeight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
});
