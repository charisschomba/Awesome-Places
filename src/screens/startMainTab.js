 import React from 'react';
import { createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import SharePlace from './SharePlace';
import FindPlace from './FindPlace';

// class PlacesBottomTaB extends React.Component {
//   render(){
//     return (

//     );
//   }
// }

const TabNavigator = createBottomTabNavigator(

  {
  FindPlace: FindPlace,
  SharePlace: SharePlace
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'FindPlace') {
          if(Platform.OS === 'android'){
            iconName = `md-map`;
          } else{
            iconName = `ios-map`;
          }
        } else if (routeName === 'SharePlace') {
          if(Platform.OS === 'android'){
            iconName = `md-share`;
          } else{
            iconName = `ios-share-alt`;
          }

        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },{
    navigationOptions: {
      // header: <CustomHeader />,
    }
  });

export default TabNavigator;
