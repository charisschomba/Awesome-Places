import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';

import { Provider } from 'react-redux';

import configureStore from './src/store/configStore';

import AuthScreen from './src/screens/Auth';
import SharePlace from './src/screens/SharePlace';
import FindPlace from './src/screens/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer';
import PlacesTab from './src/screens/startMainTab';

const store = configureStore();

const AppNavigator =  createStackNavigator({
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      headerTitle: "Auth",
    }
  },
  PlacesTab:{
    screen: PlacesTab,
    navigationOptions: {
      header: null
    }
  },
  PlaceDetail: PlaceDetail
});

let Navigation = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App ;
