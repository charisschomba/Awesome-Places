import React, { Component } from 'react';
import {
  View,
  Button,
  ImageBackground,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../components/AddPlace';
import HeaderText from '../components/UI/HeaderText';
import TextWrapper from '../components/UI/MainTextWrapper';
import PickImage from '../components/PickImage';
import PickLocation from '../components/PickLocation';

import { addPlace } from '../store/actions/places'
import background from '../assets/share.jpeg';

class SharePlace extends Component {
  state = {
    placeName: ''
  };

  static navigationOptions = {
    tabBarLabel: 'Share Place',
   };



  onAddPlaceHandler = () => {
    if(this.state.placeName.trim() === "") {
      return;
    }
    this.props.onAddPlace(this.state.placeName);
    this.props.navigation.navigate('FindPlace');
  };

  onChangePlace = (e) => {
    this.setState({placeName: e})
  };
  render() {
    return(
        <KeyboardAvoidingView behavior="height">
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <TextWrapper>
                  <HeaderText>Share a place with us!</HeaderText>
                </TextWrapper>
                <PickImage />
                <PickLocation />
                <PlaceInput PlaceName={this.onChangePlace}/>
                <View style={styles.button}>
                  <Button title='share the place' onPress={this.onAddPlaceHandler}/>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
    );
  }
}
 const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
  },
   backgroundImage: {
    flex: 1
   },
 });

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
};
export default connect(null, mapDispatchToProps)(SharePlace);
