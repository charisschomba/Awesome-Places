import React from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import previewImage from "../assets/was.jpeg";

class PickImage extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Image source={previewImage} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title='Pick Image'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width :'100%',
    alignItems: 'center'
  },
  placeHolder: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#eee',
    width: '80%',
    height: 200
  },
  previewImage: {
    height: "100%",
    width: "100%"
  },
  button : {
    margin: 8,
  }
});

export default PickImage;
