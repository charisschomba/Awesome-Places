import React from 'react';
import DefaultInput from "./UI/DefaultInput";

const AddPlaces = ({ PlaceName }) => {
  return (
    <DefaultInput
      placeholder='Place Name'
      onChangeText={PlaceName}
    />
  )

};

export default AddPlaces;
