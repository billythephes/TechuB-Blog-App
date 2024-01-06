import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, handleTextChange, password }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={password}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#000',
    marginVertical: 10,
    paddingStart: 5,
  },
  input: {
    height: 45,
    width: 320,
  },
});

export default CustomTextInput;
