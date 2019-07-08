import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const MenuButton = () => {
  return (
    <View>
      <TouchableOpacity
        style={{marginRight: 15}}
        onPress={() => alert('This is a button!')}
      >
        <Icon name='ios-menu' size={30} color="black"/>
      </TouchableOpacity>
    </View>
  )
};

export default MenuButton;
