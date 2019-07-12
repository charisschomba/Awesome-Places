import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text } from 'react-native';

class Settings extends Component {
  render() {
    return (
      <View>
        <Text>
          This is settings screen
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


export default connect(mapStateToProps,mapDispatchToProps)(Settings);
