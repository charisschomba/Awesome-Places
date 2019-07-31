import React from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
class PickImage extends React.Component {
  state = {
    pickedImage: null
  };
  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: 'Pick an image'}, res => {
      if(res.didCancel) {
        console.log('user cancelled')
      } else if(res.error) {
        console.log('Error', res.error)
      } else {
        this.setState({
          pickedImage: {uri: res.uri}
        });
        this.props.onPickedImage({uri: res.uri, base64: res.data});
      }
    });
  };
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={this.state.pickedImage} style={styles.previewImage}/>
        </View>
        <View style={styles.button}>
          <Button title='Pick Image' onPress={this.pickImageHandler}/>
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
  image: {
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
