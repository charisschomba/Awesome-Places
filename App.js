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
import SideDrawerContent from './src/screens/SideDrawerContent';
import PlacesTab from './src/screens/startMainTab';
import CustomHeader from './src/components/Header';

const store = configureStore();

export const AppDrawerNavigator  = createDrawerNavigator({
  Places:{
    screen: PlacesTab,
  },
},{
  navigationOptions: ({navigation}) => (
    {
      header: <CustomHeader navigationProps={navigation}/>
    }
  ),
  contentComponent: (props) =>  <SideDrawerContent  {...props} />
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
