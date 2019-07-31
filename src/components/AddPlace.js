import React from 'react';
import DefaultInput from "./UI/DefaultInput";
import { StyleSheet } from 'react-native';

const AddPlaces = ({ PlaceName, valid, touched }) => {
  return (
    <DefaultInput
      placeholder='Place Name'
      onChangeText={PlaceName}
      valid={valid}
      touched={touched}
    />
  )

};

styles = StyleSheet.create({
  invalid:{
    borderColor: 'red'
  },
});

export default AddPlaces;
