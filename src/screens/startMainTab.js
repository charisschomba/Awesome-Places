import React from 'react';
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons'

import SharePlace from './SharePlace';
import FindPlace from './FindPlace';
import MenuButton from '../components/MenuButton';

const Tab1 = createStackNavigator(
  {
    Tab1: {
      screen: FindPlace,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Find Place",
        headerRight: <MenuButton />,
      }
    },
  }
);

const Tab2 = createStackNavigator(
  {
    Tab1: {
      screen: SharePlace,
      navigationOptions: {
        headerLeft: null,
        headerTitle: "Share Place",
        headerRight: <MenuButton />,
      }
    },
  }
);



const TabNavigator = createBottomTabNavigator(
  {
  FindPlace: Tab1,
  SharePlace: Tab2
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'FindPlace') {
          iconName = `md-map`;
        } else if (routeName === 'SharePlace') {
          iconName = `ios-share-alt`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  });

export default TabNavigator;
