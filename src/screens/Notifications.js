import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from "react-native";


class Notifications extends Component {
  render() {
    return (
      <View>
        <Text>
          This is notification screen
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
export default connect(mapDispatchToProps,mapStateToProps)(Notifications);
