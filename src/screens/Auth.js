import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

import PlacesTab from '../screens/startMainTab';


class AuthScreen extends Component {
  login = () => {
    return PlacesTab()
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
