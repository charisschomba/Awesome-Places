import React, { Component } from 'react';
import { Navigation} from "react-native-navigation";
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../store/actions/places';

class PlaceDetail extends Component {

  onPlaceDeleteHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.modalContainer}>
        <View>
          <Image
            source={this.props.selectedPlace.image}
            style={styles.placeImage}
          />
          <Text> {this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.onPlaceDeleteHandler()}
            style={styles.deleteButton}
          >
            <Icon name="ios-trash" size={30} color='red'/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    marginRight: 8,
    height: 300,
    width: "100%",
  },
   deleteButton: {
    alignItems: 'center'
  }


});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
};


export default connect(null, mapDispatchToProps)(PlaceDetail);
