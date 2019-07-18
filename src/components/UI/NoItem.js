import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const NoItem = props => (
   <View style={styles.textContainer}>
      <Animated.Text style={props.style}>{props.children}</Animated.Text>
   </View>
);

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
  
      }
});

export default NoItem;
