import React, { Component } from 'react';
import { Navigation} from "react-native-navigation";
import { View } from 'react-native';
import { connect } from 'react-redux'
import CustomHeader from '../components/Header';

import PlaceList from '../components/ListItem/ListPlaces';

class FindPlace extends Component {

  static navigationOptions = {
    tabBarLabel: 'Find Place',
    header: null,
  };

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);
    this.props.navigation.navigate('PlaceDetail', {
      selectedPlace: selectedPlace,
      text: selectedPlace.name
    })

  };
  render() {
    return(
      <View>
        {/* <CustomHeader {...this.props} /> */}
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
