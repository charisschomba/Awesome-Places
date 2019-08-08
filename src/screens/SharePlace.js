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

import {addPlace, getPlaces} from '../store/actions/places'
import Spinner from '../components/Animations/Spinner';
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
      },
      image: {
        value: null,
        valid: false
      }
    }
  };

  static navigationOptions = {
    tabBarLabel: 'Share Place',
   };



  onAddPlaceHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
      () => {
        this.props.fetchPlaces();
        this.props.navigation.navigate('FindPlace');
      }
      );
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
  };
  onPickedImage = (image) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  };

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
                <PickImage onPickedImage={this.onPickedImage}/>
                <PickLocation onLocationPicked={this.onLocationPicked}/>
                <PlaceInput PlaceName={this.onChangePlace} valid={valid} touched={touched}/>
                <View style={styles.button}>
                  {
                    this.props.isLoading
                    ?  <Spinner/>
                     : <Button
                        title='share the place'
                        onPress={this.onAddPlaceHandler}
                        disabled={
                          !valid ||
                          !this.state.controls.location.valid ||
                          !this.state.controls.image.valid
                        }
                      />
                  }
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
const mapStateToProps = state => {
  return {
    isLoading: state.loader.isLoading
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image, callBack) => dispatch(addPlace(placeName, location, image, callBack)),
    fetchPlaces: () => dispatch(getPlaces())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SharePlace);
