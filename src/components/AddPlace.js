import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';

const AddPlaces = ({ changeName, addPlace }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputPlace}
        placeholder='An awesome place'
        onChangeText={changeName}
      />
      <Button
        style={styles.ButtonPlace}
        title='Add'
        onPress={addPlace}
      />
    </View>
  )

};

styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputPlace: {
    width: "70%"
  },
  ButtonPlace: {
    width: "30%"
  },
});

export default AddPlaces;
