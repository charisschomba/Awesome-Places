import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import PlaceInput from '../components/AddPlace';

import { addPlace } from '../store/actions/places'

class SharePlace extends Component {
  state = {
    placeName: ''
  };

  onAddPlaceHandler = () => {
    if(this.state.placeName.trim() === "") {
      return;
    }
    this.props.onAddPlace(this.state.placeName);
  };

  onChangeName = (e) => {
    this.setState({placeName: e})
  };
  render() {
    return(
      <View>
        <PlaceInput
          addPlace={this.onAddPlaceHandler}
          changeName={this.onChangeName}
        />
      </View>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};
export default connect(null, mapDispatchToProps)(SharePlace);
