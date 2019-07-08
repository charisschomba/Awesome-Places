import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-native';

class SideDrawer extends Component {
  render() {
    return (
      <View>
        <Text>
          This is a side drawer {this.props.text}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const  mapDispatchToProps = dispatch =>  {
  return {};
};


export default connect(mapStateToProps,mapDispatchToProps)(SideDrawer);
