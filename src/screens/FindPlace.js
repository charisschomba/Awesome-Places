import React, { Component } from 'react';
import { Navigation} from "react-native-navigation";
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import NoItems from '../components/UI/NoItem';
import Spinner from '../components/UI/Spinner';
import PlaceList from '../components/ListItem/ListPlaces';

class FindPlace extends Component {
  state = {
    placesLoaded: true,
  }
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
      <View style={styles.container}>
        {
          this.state.placesLoaded && this.props.places.length !== 0 
          ? <PlaceList
          places={this.props.places}
          selectedItem={this.itemSelectedHandler}
          /> 
        : this.state.placesLoaded && this.props.places.length === 0 
        ? <NoItems>No places to display</NoItems>
        : <Spinner />
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
    }
  })
  

export default connect(mapStateToProps, null)(FindPlace);
