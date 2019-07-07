import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from './src/store/configStore';

import AuthScreen from './src/screens/Auth';
import SharePlace from './src/screens/SharePlace';
import FindPlace from './src/screens/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer';

const store = configureStore();

Navigation.registerComponent('auth-screen',
  () => (props) =>
    (
      <Provider store={store}>
        <AuthScreen {...props} />
      </Provider>
    ),
  () => AuthScreen);
Navigation.registerComponent('share-place',
  () => (props) =>
  (
    <Provider store={store}>
      <SharePlace {...props} />
    </Provider>
  ),

  () => SharePlace);
Navigation.registerComponent('find-place',
  () => (props) =>
  (
    <Provider store={store}>
      <FindPlace {...props} />
    </Provider>
  ),
  () => FindPlace);

Navigation.registerComponent('view-place',
  () => (props) =>
    (
      <Provider store={store}>
        <PlaceDetail {...props} />
      </Provider>
    ),
  () => PlaceDetail);

Navigation.registerComponent('side-drawer',
  () => (props) =>
    (
      <Provider store={store}>
        <SideDrawer {...props} />
      </Provider>
    ),
  () => SideDrawer);



Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: "auth-screen"
          }
        }]
      }
    }
  });
});
