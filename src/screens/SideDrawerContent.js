import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon} from "native-base";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
} from 'react-native';
import { authLogout } from '../store/actions';
class SideDrawerContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.LogoutContainer}>
        <View  style={styles.icon}>
          <Icon name='log-out'/>
        </View>
        <TouchableOpacity onPress={() => this.props.onLogout(() => this.props.navigation.navigate('AuthScreen'))}>
          <Text>Logout</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const  mapDispatchToProps = dispatch =>  {
  return {
    onLogout: (callBack) => dispatch(authLogout(callBack))
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
  },
  LogoutContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: "10%",
  },
  icon: {
    marginRight: "10%",
    marginLeft: "10%"
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(SideDrawerContent);
