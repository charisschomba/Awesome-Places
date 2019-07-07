import React, { Component } from 'react';
import { Navigation} from "react-native-navigation";
import { View } from 'react-native';
import { connect } from 'react-redux'

import PlaceList from '../components/ListItem/ListPlaces';

class FindPlace extends Component {

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'view-place',
        passProps: {
          selectedPlace: selectedPlace,
        },
        options: {
          topBar: {
            title: {
              text: selectedPlace.name
            }
          }
        }
      }
    })
  };
  render() {
    return(
      <View>
        <PlaceList
          places={this.props.places}
          selectedItem={this.itemSelectedHandler}
        />
      </View>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      places: state.places.places
    }
  };


export default connect(mapStateToProps, null)(FindPlace);
