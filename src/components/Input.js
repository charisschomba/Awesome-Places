import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

const AddPlace = () => {
  const [placeName, setPlaceName] = useState('');
  const [places, setPlace] = useState([]);

  const handleSetPlace = () => {
    if(placeName.trim() === "") {
      return;
    }
    setPlace(prevState => prevState.concat(placeName));
  };

  return (
    <View style={styles.inputPlace}>
      <TextInput
        placeholder='An awesome place'
        value={placeName}
        onChangeText={(e) => setPlaceName(e)}
      />
      <Button
        style={styles.ButtonPlace}
        title='Add'
        onPress={handleSetPlace}
       />
    </View>
  );
};

const styles = StyleSheet.create({
  inputPlace: {
    width: "70%"
  },
  ButtonPlace: {
    width: "30%"
  },
  listContainer: {
    width: "100%",
  }
});
export default AddPlace;
