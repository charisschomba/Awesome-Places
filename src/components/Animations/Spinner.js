import React, { useEffect, useState} from 'react';
import { View, ActivityIndicator, Animated } from 'react-native';
import LoadingItem from '../UI/NoItem';

const Spinner = props => {
  const [aminValue] = useState(new Animated.Value(0));
  useEffect(() => animateText());

  animateText = () => {
    Animated.timing(aminValue,{
      duration: 5000,
      useNativeDriver: true,
      toValue: 1
    }).start();
  };

  const opacity = aminValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const Animstyles =  {
    opacityAnim: {
      opacity,
      marginBottom: 20,
      fontWeight: 'bold',
      fontSize: 20
    },
  }

  return( <View>
            <LoadingItem style={Animstyles.opacityAnim}>{props.children}</LoadingItem>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
};

export default Spinner;