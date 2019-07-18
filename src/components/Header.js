import React, { Component } from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

class CustomHeader extends Component {
  render() {
    return (
      <View>
          <Header style={styles.HeaderStyles}>
            <Left>
            <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() => this.props.navigationProps.openDrawer()}
                >
                  <Icon name='ios-menu' size={30} style={{color: 'black'}} />
                </TouchableOpacity>
            </Left>
              <Body>
                <Title>Awesome Places</Title>
              </Body>
            {/* <Right>
                <TouchableOpacity
                  style={{marginRight: 15}}
                  onPress={() => this.props.navigationProps.goBack()}
                >
                  <Icon name='arrow-back' size={30} style={{color: 'black'}} />
                </TouchableOpacity>
            </Right> */}
          </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  HeaderStyles: {
    // backgroundColor: 'grey'
  }
});

export default CustomHeader
