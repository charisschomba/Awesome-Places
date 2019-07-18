import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const defaultInput = props => (
  <TextInput
    style={[styles.input, props.style]}
    underlineColorAndroid='transparent'
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
  }
});


export default defaultInput;
