import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoItem = props => (
    <View style={styles.textContainer}>
        <Text>{props.children}</Text>
    </View>
);

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
  
      }
});

export default NoItem;