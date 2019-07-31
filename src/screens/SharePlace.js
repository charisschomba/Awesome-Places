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
import validate from '../utils/validations';

import { addPlace } from '../store/actions/places'
import background from '../assets/share.jpeg';

class SharePlace extends Component {
  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      },
      location: {
        value: null,
        valid: false
      }
    }
  };

  static navigationOptions = {
    tabBarLabel: 'Share Place',
   };



  onAddPlaceHandler = () => {
    this.props.onAddPlace(this.state.controls.placeName.value,this.state.controls.location.value);
    this.props.navigation.navigate('FindPlace');
  };
  onLocationPicked = location => {
    this.setState(prevState => {
      return{
        controls: {
          ...prevState.controls,
          location: {
            ...prevState.controls.location,
            value: location,
            valid: true
          }

        }
      }
    })
  }

  onChangePlace = (val) => {
    this.setState(prevState => {
      return {
        controls : {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    });
  };
  render() {
    const {valid, touched} = this.state.controls.placeName;
    return(
        <KeyboardAvoidingView behavior="height">
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <TextWrapper>
                  <HeaderText>Share a place with us!</HeaderText>
                </TextWrapper>
                <PickImage />
                <PickLocation onLocationPicked={this.onLocationPicked}/>
                <PlaceInput PlaceName={this.onChangePlace} valid={valid} touched={touched}/>
                <View style={styles.button}>
                  <Button
                    title='share the place'
                    onPress={this.onAddPlaceHandler}
                    disabled={!valid || !this.state.controls.location.valid}
                  />
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
    onAddPlace: (placeName, location) => dispatch(addPlace(placeName, location))
  }
};
export default connect(null, mapDispatchToProps)(SharePlace);
