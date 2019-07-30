import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class PickImage extends React.Component {
  state ={
    pickedLocation: null,
    initialRegion:{
      latitude: 37.7900352,
      longitude: -122.4023726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width /  Dimensions.get('window').width * 0.0122,
  }};

  handlePickLocation = (event) => {
    const {nativeEvent: {coordinate: {latitude, longitude }}} = event;
    this.map.animateToRegion({
      ...this.state.initialRegion,
      longitude: longitude,
      latitude: latitude,
    });
    this.setState(prevState => {
      return {
        initialRegion: {
          ...prevState.initialRegion,
          longitude: longitude,
          latitude: latitude,
        },
        pickedLocation: true,
      }
    })
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition( ({ coords:{latitude, longitude} }) => {
        const coordsEvent = {
          nativeEvent: {
            coordinate:{
              latitude: latitude,
              longitude: longitude
            }
          }
        };
        this.handlePickLocation(coordsEvent)
    },
      error => {
        console.log(error);
        alert('Fetching the current position failed, please pick one manually')
      })
  };
  render(){
    let marker = null;
    if(this.state.pickedLocation){
      marker = <MapView.Marker coordinate={this.state.initialRegion}/>
    }
    return(
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.initialRegion}
          onPress={this.handlePickLocation}
          ref = {ref => this.map = ref}
        >{marker}</MapView>
        <View style={styles.button}>
          <Button title='Locate me' onPress={this.getLocationHandler}/>
        </View>
        <View>
          <Text>
            {this.state.initialRegion.longitude}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width :'100%',
    alignItems: 'center',
  },
  placeHolder: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#eee',
    width: '80%',
    height: 200
  },
  map: {
    height: 250,
    width: "100%"
  },
  button : {
    margin: 8,
  }
});

export default PickImage;
