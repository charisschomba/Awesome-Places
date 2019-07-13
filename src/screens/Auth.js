import React, { Component } from 'react';
import {View, Dimensions, StyleSheet, ImageBackground} from 'react-native';

import DefaultInput from '../components/UI/DefaultInput';
import HeadingText from '../components/UI/HeaderText';
import TextWrapper from '../components/UI/MainTextWrapper';
import CustomButton from '../components/UI/CustomButton';
import background from '../assets/background.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '90%',
  },
  input: {
  },
  backgroundImage: {
    flex: 1,
  },
  potraitPwdContainer: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  landscapePwContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  potraitPwdWrapper: {
    width: "100%"
  },
  landscapePwWrapper: {
    width: "45%"
  }
});

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "potrait" : "landscape"
  }
  constructor (props) {
    super(props);
    Dimensions.addEventListener("change", (dims) => {
      this.setState({
        viewMode: Dimensions.get('window').height > 500 ? "potrait" : "landscape"
      });
    })
  }

  login = () => {
    return this.props.navigation.navigate('Places');
  };
  render() {
    let headingText = null;
    if (this.state.viewMode === 'potrait'){
        headingText = (
          <TextWrapper>
          <HeadingText> Please Login In</HeadingText>
        </TextWrapper>
        )
    }
    return(
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <CustomButton color='#29aaf4' onPress={this.login}>Switch to Login</CustomButton>
          <View style={styles.inputContainer}>
            <DefaultInput  placeholder='Your E-Mail Address' style={styles.input} />
            <View style={
              this.state.viewMode === 'potrait' 
              ? styles.potraitPwdContainer
              : styles.landscapePwContainer 
              }>
              <View style={
                this.state.viewMode === 'potrait' 
                ? styles.potraitPwdWrapper
                : styles.landscapePwWrapper
              }>
              <DefaultInput  placeholder='Password'style={styles.input}/>
              </View>
              <View style={
                this.state.viewMode === 'potrait' 
                ? styles.potraitPwdWrapper
                : styles.landscapePwWrapper
              }>
              <DefaultInput  placeholder='Confirm Password'style={styles.input}/>
              </View>
            </View>
          </View>
          <CustomButton type="submit"  color='#29aaf4' onPress={() => alert('hello')} >Get started</CustomButton>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthScreen;
