import React, { Component } from 'react'; 
import { View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux'
import NoPlaces from '../components/UI/NoItem';
import Spinner from '../components/Animations/Spinner';
import PlaceList from '../components/ListItem/ListPlaces';

class FindPlace extends Component {
  state = {
    placesLoaded: true,
    aminValue: new Animated.Value(0),
  }
  static navigationOptions = {
    tabBarLabel: 'Find Place',
    header: null,
  };

  componentDidMount() {
    if(this.state.placesLoaded && this.props.places.length === 0)this.animateText();
  }
  
  componentDidUpdate(){
    if(this.state.placesLoaded && this.props.places.length === 0)this.animateText();
  }
  animateText = () => {
    Animated.timing(this.state.aminValue, {
      duration: 5000,
      useNativeDriver: true,
      toValue: 1
    }).start();
  }
  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);
    this.props.navigation.navigate('PlaceDetail', {
      selectedPlace: selectedPlace,
      text: selectedPlace.name
    })

  };
  render() {
    const opacity = this.state.aminValue
    const Animstyles =  {
      opacityAnim: {
        opacity,
        fontWeight: 'bold',
        fontSize:15
      },
      transform: [{
        translateY: this.state.aminValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        }),
      }],
    }
    return(
      <View style={styles.container}>
        {
          this.state.placesLoaded && this.props.places.length !== 0 
          ? <PlaceList
          places={this.props.places}
          selectedItem={this.itemSelectedHandler}
          /> 
        : this.state.placesLoaded && this.props.places.length === 0 
        ? <NoPlaces style={Animstyles.opacityAnim}>Awesome places will be displayed here</NoPlaces>
        : <Spinner>Fetching awesome places</Spinner>
        }
      </View>
    );
  }
}

  const mapStateToProps = (state) => {
    return {
      places: state.places.places
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      display: 'flex'
    },
  })
  

export default connect(mapStateToProps, null)(FindPlace);
