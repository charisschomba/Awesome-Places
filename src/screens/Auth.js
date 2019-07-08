import React, { Component } from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';

import PlacesTab from '../screens/startMainTab';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: 'red'
  }
});

class AuthScreen extends Component {
  login = () => {
    return this.props.navigation.navigate('PlacesTab');
  };
  render() {
    return(

      <View>
        <Text> This is Auth screen </Text>
        <Button title='Login' onPress={this.login} />
      </View>
    );
  }
}

export default AuthScreen;
