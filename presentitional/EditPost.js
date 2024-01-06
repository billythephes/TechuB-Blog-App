import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import RadioButton from '../components/RadioButton';
import { SelectList } from 'react-native-dropdown-select-list';

const EditPost = ({ navigation, route }) => {
  const { data2 } = route.params;
  
  const [option, setOption] = useState('General');
  const data = [{ value: 'General' }, { value: 'Comment' }];


  const optionStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 55,
  };

  const [selected, setSelected] = React.useState('');

  const datalist = [
    { key: '1', value: 'Reply' },
    { key: '2', value: 'Report comment' },
    { key: '3', value: 'Hide comment' },
    { key: '4', value: 'Copy' },
    { key: '5', value: 'Delete' },
  ];

  const [showList, setShowList] = useState(false);

  const handleImagePress = () => {
    setShowList(!showList);
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

   const [title, setTitle] = useState(data2.title);
  const [content, setContent] = useState(data2.content);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const handleSaveButtonPress = () => {
    const newData = {
      ...data2,
      title: title,
      content: content,
    };
  Alert.alert('Edit post sucessfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/Arrow.png')} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Post</Text>

      <RadioButton
        data={data}
        onSelect={(value) => setOption(value)}
        style={optionStyle}
      />

      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.horizontalLine} />
      </View>

      {option === 'General' && (
        <View style={{ flex: 1 }}>
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
          <View style={styles.content}>
            <TextInput
              style={styles.titlePost}
              placeholder="Title"
              multiline={true}
              value={title}
              onChangeText={handleTitleChange}
            />
            <TextInput
              placeholder="Add your description here..."
              multiline={true}
              value={content}
              onChangeText={handleContentChange}
            />
            <Image source={data2.img} style={styles.img} />
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.imgPost}
              resizeMode="contain"
            />
          )}

          <View style={styles.footer}>
            <View style={styles.horizontalLineFooter} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <EvilIcon name="camera" size={27} color="#00000" />
                <EvilIcon name="paperclip" size={27} color="#00000" />
                <TouchableOpacity onPress={pickImage}>
                  <EvilIcon name="image" size={27} color="#00000" />
                </TouchableOpacity>
                <EvilIcon name="location" size={27} color="#00000" />
                <IonIcon name="mic-outline" size={22} color="#00000" />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSaveButtonPress}>
                <Text style={{ color: '#FFFF' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {option === 'Comment' && (
        <View style={{ flex: 1 }}>
          <View style={styles.profile}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../assets/avtpost.png')} />
              <View style={{ marginLeft: 7 }}>
                <Text style={{ fontWeight: 'bold' }}>Robin Hood</Text>
                <Text style={{ color: '#536471' }}>@mrhood</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={require('../assets/more.png')} />
              {showList && (
                <View>
                  <SelectList
                    setSelected={setSelected}
                    data={datalist}
                    search={false}
                    boxStyles={{ position: 'absolute', right: 20, width: 166 }}
                    dropdownStyles={{
                      position: 'absolute',
                      right: 20,
                      top: 45,
                      width: 161,
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 7, marginLeft: 10 }}>
            Once upon a time, there is a boy who want to become the king of
            pirates
          </Text>
          <View style={{ marginHorizontal: 27 }}>
            <View style={styles.horizontalLineComment} />
          </View>
        </View>
      )}
    </View>
  );
};

export default EditPost;

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
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 7,
  },
  content: {
    marginLeft: 48,
  },
  titlePost: {
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
   img: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 40,
  },
   imgPost: {
    aspectRatio: 1,
    marginTop: 15,
    marginLeft: 15,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  horizontalLineFooter: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 15,
  },
  horizontalLineComment: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 13,
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
});
