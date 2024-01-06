import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import postsData from '../components/postsData';
import techData from '../components/techData';
import enterData from '../components/enterData';
import sportData from '../components/sportData';
import Notification from './Notification';
import Post from './Post';

const Home = () => {
  const navigation = useNavigation();

  const categories = ['For you', 'Technology', 'Entertainment', 'Sports'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  let dataRef = postsData;

  if (selectedCategory === 'For you') {
    dataRef = postsData;
  } else if (selectedCategory === 'Technology') {
    dataRef = techData;
  } else if (selectedCategory === 'Entertainment') {
    dataRef = enterData;
  } else if (selectedCategory === 'Sports') {
    dataRef = sportData;
  }

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
        backgroundColor: '#EFEFEF',
      }}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/Home/gg_menu-left.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(Notification)}>
          <Image source={require('../assets/Home/Notification.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchFilter}>
        <View style={styles.search}>
          <TextInput
            style={styles.inputSeach}
            placeholder="Search"
          />
          <Icon name="search" size={24} color="#00000" />
        </View>

        <View style={styles.filter}>
          <Image source={require('../assets/Home/Filter.png')} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: 10, marginTop: 30 }}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{
              paddingHorizontal: 10,
            }}
            onPress={() => {
              console.log('Selected category:', category);
              setSelectedCategory(category);
            }}>
            <Text
              style={
                selectedCategory === category
                  ? styles.selected
                  : styles.unselected
              }>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {dataRef.map((post) => (
        <TouchableOpacity
          style={styles.post}
          onPress={() => navigation.navigate('Post', { data: post })}>
          <View style={styles.headerPost}>
            <Text style={styles.title}>{post.title}</Text>
            <View style={styles.profilepost}>
              <Image source={post.avatar} style={styles.imgAvatar} />
              <Text style={styles.username}>{post.username}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
          </View>

          <View style={styles.line}></View>
          <View style={styles.bodypost}>
            <Text style={styles.content}>{post.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 50,
  },
  selected: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000',
    borderBottomWidth: 2,
  },
  unselected: {
    fontSize: 14,
    color: '#C8C8C8',
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
    width: 250,
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
    height: 200,
    marginTop: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
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

export default Home;

/* {data ? (
        data.metaData.map((post, index) => (
        <TouchableOpacity
          style={styles.post}
          key={index}
          onPress={() => navigation.navigate('Post', { postId: post._id })}>
          <View style={styles.headerPost}>
            <Text style={styles.title}>{post.post_title}</Text>
            <View style={styles.profilepost}>
              <Image source={post.avatar} style={styles.imgAvatar} />
              <Text style={styles.username}>{post.username}</Text>
            </View>
          </View>

          <View style={styles.line}></View>
          <View style={styles.bodypost}>
            <Text style={styles.content}>{post.post_description}</Text>
          </View>
        </TouchableOpacity>
        ))
      ) : (
        <Text>Loading...</Text>
      )}*/
