import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Wrapper from '../components/UI/HeaderText';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../store/actions/places';

class PlaceDetail extends Component {
  state ={
    delta:{
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width /  Dimensions.get('window').width * 0.0122,
    }};

  onPlaceDeleteHandler = (placeKey) => {
    this.props.onDeletePlace(placeKey);
    this.props.navigation.navigate('Places');
  };
  render() {
    const { navigation } = this.props;
    const selectedPlace = navigation.getParam('selectedPlace');
    const marker = <MapView.Marker coordinate={selectedPlace.location}/>;
    return (
      <View style={styles.modalContainer}>
        <ScrollView>
        <View>
          <Wrapper><Text> {selectedPlace.name}</Text></Wrapper>
          <Image
            source={selectedPlace.image}
            style={styles.placeImage}
          />
        </View>
        <MapView
          style={styles.placeImage}
          initialRegion={{
            longitudeDelta: this.state.delta.longitudeDelta,
            latitudeDelta: this.state.delta.longitudeDelta,
            latitude: selectedPlace.location.latitude,
            longitude: selectedPlace.location.longitude
          }}
        >{marker}</MapView>
        <View>
          <TouchableOpacity
            onPress={() => this.onPlaceDeleteHandler(selectedPlace.key)}
            style={styles.deleteButton}
          >
            <Icon 
            name={Platform.OS === "android" ? 'md-trash' : 'ios-trash'} 
            size={30} 
            color='red'
            />
          </TouchableOpacity>
        </View>
        </ScrollView>
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
    height: 220,
    width: "100%",
    marginTop: 10
  },
   deleteButton: {
    alignItems: 'center'
  },


});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
};


export default connect(null, mapDispatchToProps)(PlaceDetail);
