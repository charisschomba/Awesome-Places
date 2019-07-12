import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

import {TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';

import { Provider } from 'react-redux';

import configureStore from './src/store/configStore';

import AuthScreen from './src/screens/Auth';
import PlaceDetail from './src/screens/PlaceDetail';
import Settings from './src/screens/Settings';
import Notifications from './src/screens/Notifications';
import PlacesTab from './src/screens/startMainTab';
import CustomHeader from './src/components/Header';

const store = configureStore();

export const AppDrawerNavigator  = createDrawerNavigator({
  Notification: Notifications,
  Settings: Settings,
  Places:{
    screen: PlacesTab,
  },
},{
  navigationOptions: ({navigation}) => (
    {
      header: <CustomHeader navigationProps={navigation}/>
    }
  )
});


const StackNavigator =  createStackNavigator({
  PlaceDetail: PlaceDetail,
  SideDrawer: AppDrawerNavigator,
},{
  initialRouteName: 'SideDrawer' 
});

const SwitchNavigator = createSwitchNavigator({
  AuthScreen: {
    screen: AuthScreen,
  },
  StackNavigator
});

const MainAppNavigator = createAppContainer(SwitchNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainAppNavigator />
      </Provider>
    );
  }
}

export default App ;
