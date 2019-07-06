import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const PlaceDetail = ({selectedPlace, closeModal, deletePlace }) => {
  let modalContent = null;
  if(selectedPlace) {
    modalContent = (
      <View>
        <Image
          source={selectedPlace.image}
          style={styles.placeImage}
        />
        <Text> {selectedPlace.name}</Text>
      </View>
    )
  }
  return(
    <Modal
      visible={selectedPlace !== null}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <Button
            title="Delete"
            color="red"
            onPress={() => deletePlace(selectedPlace.key)}
          />
          <Button
            title="Cancel"
            onPress={closeModal}

          />
        </View>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    marginRight: 8,
    height: 300,
    width: "100%",
  },
  placeName: {
  }


});

export default PlaceDetail;
