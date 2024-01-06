import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ProfileOthers from './ProfileOthers';
import EditPost from './EditPost';

const Post = ({ navigation, route }) => {
  const { data } = route.params;

  const [data1, setData] = useState(null);

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

  const [isLiked, setIsLiked] = useState(false);
  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  const handleGoBack = () => {
    setComments([]);
    navigation.goBack();
  };

  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
  const closeSheetAnimation = useRef(new Animated.Value(1)).current;

  const handleBottomSheet = () => {
    setIsVisible(!isVisible);
    Animated.parallel([
      Animated.timing(bottomSheetAnimation, {
        toValue: isVisible ? 0 : 1,
        duration: 300,
      }),
      Animated.timing(closeSheetAnimation, {
        toValue: isVisible ? 0 : 1,
        duration: 300,
      }),
    ]).start(() => {
      bottomSheetAnimation.setValue(isVisible ? 0 : 1);
      closeSheetAnimation.setValue(isVisible ? 0 : 1);
    });
  };

  const bottomSheetTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const closeSheetTranslateY = closeSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0],
  });

  const [isLikedCmt, setIsLikedCmt] = useState(false);
  const handleHeartCmtPress = () => {
    setIsLikedCmt(!isLikedCmt);
  };

  const [isFav, setIsFav] = useState(false);
  const handleFavPress = () => {
    setIsFav(!isFav);
  };

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handlePostButtonPress = () => {
    const newComment = {
      id: comments.length + 1,
      text: commentText,
    };

    setComments([...comments, newComment]);
    setCommentText('');

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavPress}>
          {isFav ? (
            <IonIcon name="bookmark" size={24} style={{ color: '#EA3D3D' }} />
          ) : (
            <IonIcon name="bookmark-outline" size={24} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
      </View>

      <View style={styles.info}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileOthers', { pro: data })}>
          <Image source={data.avatar} style={{width: 17, height: 17}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileOthers', { pro: data })}>
          <Text style={{ marginLeft: 7 }}>{data.username}</Text>
        </TouchableOpacity>
        <Text style={styles.date}>{data.date}</Text>
        <View style={styles.reaction}>
          <TouchableOpacity onPress={handleBottomSheet}>
            <FontAwesome name="comment-o" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHeartPress}>
            {isLiked ? (
              <FontAwesome
                name="heart"
                size={24}
                style={{ marginHorizontal: 10, color: '#EA3D3D' }}
              />
            ) : (
              <FontAwesome
                name="heart-o"
                size={24}
                style={{ marginHorizontal: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View>
        <Text style={styles.contentContainer}>{data.content}</Text>
        <Image source={data.img} style={styles.img} />
      </View>

      {isVisible && (
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [
                { translateY: bottomSheetTranslateY },
                { translateY: closeSheetTranslateY },
              ],
            },
          ]}>
          <Text style={styles.comment}>Comments</Text>

          <View style={styles.line} />

          {comments.map((comment) => (
            <View key={comment.id}>
              <View style={styles.profile}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('../assets/avtpost.png')} />
                  <View style={{ marginLeft: 7 }}>
                    <Text style={{ fontWeight: 'bold' }}>Phúc Nguyễn</Text>
                    <Text style={{ color: '#536471' }}>@phes</Text>
                  </View>
                </View>
                <Image source={require('../assets/more.png')} />
              </View>
              <Text style={styles.content}>{comment.text}</Text>
              <View style={styles.reactCmt}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={handleHeartCmtPress}>
                    {isLikedCmt ? (
                      <IonIcon
                        name="heart"
                        size={24}
                        style={{ color: '#EA3D3D' }}
                      />
                    ) : (
                      <IonIcon name="heart-outline" size={24} />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginRight: 100 }}>
                  <IonIcon
                    name="chatbox-outline"
                    size={24}
                    style={{ marginRight: 5 }}
                  />
                </View>

                <TouchableOpacity onPress={handleFavPress}>
                  {isFav ? (
                    <IonIcon
                      name="bookmark"
                      size={24}
                      style={{ color: '#EA3D3D' }}
                    />
                  ) : (
                    <IonIcon name="bookmark-outline" size={24} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <View style={styles.horizontalLineFooter} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <View style={styles.postContainer}>
                <Image source={require('../assets/avtpost.png')} />
                <TextInput
                  style={styles.inputSeach}
                  placeholder="What’s Happening?"
                  multiline={true}
                  value={commentText}
                  onChangeText={setCommentText}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePostButtonPress}>
                <Text style={{ color: '#FFFF' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 70,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    marginTop: 25,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginBottom: 7,
  },
  reaction: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginBottom: 3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  date: {
    marginLeft: 20,
    color: '#C8C8C8',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    marginTop: 5,
    backgroundColor: '#C8C8C8',
    marginHorizontal: 15,
  },
  contentContainer: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  img: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    marginTop: 10,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 580, //585
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  comment: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    alignSelf: 'center',
    marginTop: 7,
  },
  line: {
    width: '85%',
    height: 1,
    marginTop: 7,
    backgroundColor: '#000000',
    alignSelf: 'center',
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 17,
    marginTop: 13,
  },
  content: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  reactCmt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 17,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  horizontalLineFooter: {
    alignSelf: 'center',
    width: '95%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  button: {
    width: 63,
    height: 25,
    borderRadius: 11,
    backgroundColor: '#3671FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  inputSeach: {
    marginLeft: 7,
    width: 200,
  },
});

/* const [postData, setPostData] = useState(null); 
  useEffect(() => {
    const apiUrl = `https://localhost:6890/api/v1/posts/${postId}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setPostData(data))
      .catch(error => console.error(error));
  }, [postId]);

  if (!postData) {
    return <Text>Loading...</Text>;
  }*/
