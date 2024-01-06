import React, { useState, useRef } from 'react';
import { View, Pressable, Text, Animated, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect, style }) {
  const [userOption, setUserOption] = useState(data[0].value);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePress = (value) => {
    if (userOption !== value) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        selectHandler(value);
      });
    }
  };

  const animatedStyles = (item) => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.2],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5],
    });

    return {
      transform: [{ scale }],
      opacity: item.value === userOption ? 1 : opacity,
    };
  };

  return (
    <View style={ style }>
      {data.map((item) => {
        return (
          <Animated.View
            style={[item.value === userOption ? styles.selected : styles.unselected, animatedStyles(item)]}
            key={item.value}
          >
            <Pressable
              onPress={() => handlePress(item.value)}
            >
              <Text style={item.value === userOption ? styles.textSelected : styles.textUnselected}>
                {item.value}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  unselected: {
    margin: 10,
  },
  selected: {
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 7,
    margin: 5,
  },
  textSelected: {
    color: '#000000',
    fontWeight: 'bold',
  },
   textUnselected: {
    color: '#697386',
  },
});
