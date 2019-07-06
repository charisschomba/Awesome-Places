/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import ListPlaces from './src/components/ListItem/ListPlaces';
import AddPlaces from './src/components/InputForm';
import PlaceDetail from './src/components/PlaceDetail';
import { connect } from 'react-redux';
import {
  addPlace,
  selectPlace,
  deselectPlace,
  deletePlace
} from './src/store/actions'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component{
  state = {
    placeName: ''
  };

  changeName = (e) => {
    this.setState({placeName: e});
  };

  addPlace = () => {
    this.props.onAddPlace(this.state.placeName)
  };

  onDeletePlace = () => {
    this.props.onDelete()
  };

  closeModal = () => {
    this.props.onDeselectPlace()
  };

  onSelectedItem = key => {
    this.props.onSelectPlace(key)
  };

  render() {
    const { places, selectedPlace } = this.props;
    const {placeName} = this.state;
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={selectedPlace}
          closeModal={this.closeModal}
          deletePlace={this.onDeletePlace}
        />
        <AddPlaces
          addPlace={this.addPlace}
          name={placeName}
          changeName={this.changeName}
        />
        <View style={styles.listContainer}>
          <ListPlaces
            places={places}
            selectedItem={this.onSelectedItem}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    width: "100%",
  }
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (place) => dispatch(addPlace(place)),
    onDelete: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace()),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
