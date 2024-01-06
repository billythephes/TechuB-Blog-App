import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, bgColor, textColor, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, {style}]}
      onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center', 
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: '#181717',
    fontSize: 16,
  },
});

export default CustomButton;
