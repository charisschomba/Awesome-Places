import React from  'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  StyleSheet,
  TouchableNativeFeedback,
  Platform
 } from 'react-native';

const CustomButton = props => {
  const content = (
    <View style={[
      styles.button,
      {backgroundColor: props.color},
      props.disabled ? styles.disabled : null
    ]}>
      <Text>
        {props.children}
      </Text>
    </View>
  );
  if (props.disabled){
    return content
  }

  if(Platform.OS === "android") {
   return(
    <TouchableNativeFeedback onPress={props.onPress}>
    {content}
    </TouchableNativeFeedback>
   );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress}>
      {content}
    </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  disabled:{
    backgroundColor: "#eee",
    color: "#eee",
    borderColor: "black"

    },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  }
});

export default CustomButton;
