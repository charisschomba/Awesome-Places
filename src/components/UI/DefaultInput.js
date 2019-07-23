import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const defaultInput = props => (
  <TextInput
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
    underlineColorAndroid='transparent'
    {...props}
  />
);

const styles = StyleSheet.create({
  invalid:{
    borderColor: 'red'
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'black',
    backgroundColor: '#F0F0F0',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
  }
});


export default defaultInput;
