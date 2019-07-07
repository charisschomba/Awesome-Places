import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

const PlacesTab = async () => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            stack: {
              children: [{
                component: {
                  name: 'find-place',
                  passProps: {
                    text: 'Find Places'
                  }
                }
              }],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('md-map'),
                  text: 'Find Place',
                  testID: 'FIRST_TAB_BAR_BUTTON',
                }
              }
            }
          },
            {
              stack: {
                children: [{
                  component: {
                    name: 'share-place',
                    passProps: {
                      text: 'Share Places'
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    icon: await Icon.getImageSource('ios-share-alt'),
                    text: 'Share Place',
                    testID: 'FIRST_TAB_BAR_BUTTON',
                  }
                }
              }
            }],
          drawer: {
            left: {
              screen: 'side-drawer'
            }
          }
        }
      }
    });
};

export default PlacesTab;
