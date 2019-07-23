import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from '../components/UI/DefaultInput';
import HeadingText from '../components/UI/HeaderText';
import TextWrapper from '../components/UI/MainTextWrapper';
import CustomButton from '../components/UI/CustomButton';
import background from '../assets/background.jpeg';
import validator from '../utils/validations';
import {tryAuth} from "../store/actions";

class AuthScreen extends Component {
  state = {
    authMode: 'login',
    viewMode: Dimensions.get('window').height > 500 ? "potrait" : "landscape",
    controls:{
      email:{
        value: "",
        valid: false,
        validationRules: {
          isEmail: false
        },
        touched: false
      },
      password:{
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPwd:{
        value: "",
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
  };
  constructor (props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles )
  }
  componentWillUnmount(){
    Dimensions.removeEventListener('change', this.updateStyles)
  }
  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? "potrait" : "landscape"
    });
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    });
  };

  login = () => {
    const data = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };

    this.props.onLogin(data);
    return this.props.navigation.navigate('Places');
  };
  updateInputState = (key, value) =>  {
    let connectedValue = {};
    if(this.state.controls[key].validationRules.equalTo){
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue,
      };
    }
    if(key === 'password'){
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      };
    }
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            confirmPwd: {
              ...prevState.controls.confirmPwd,
              valid: key === 'password'
                ? validator(prevState.controls.confirmPwd.value, prevState.controls.confirmPwd.validationRules, connectedValue)
                : prevState.controls.confirmPwd.valid
            },
            [key] : {
              ...prevState.controls[key],
              value: value,
              valid: validator(value, prevState.controls[key].validationRules, connectedValue),
              touched: true
            }
          }
        }
      })
  };
  render() {
    let headingText = null;
    if (this.state.viewMode === 'potrait'){
        headingText = (
        <View style={styles.headerText}>
          <TextWrapper>
            <HeadingText> {this.state.authMode === 'login'
              ? 'Login to continue'
              : 'Create a free account'}
            </HeadingText>
          </TextWrapper>
        </View>
        )
    }
    return(
      <ImageBackground source={background} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <CustomButton color='#29aaf4' onPress={() => this.switchAuthModeHandler()}>
            {this.state.authMode === 'login'
              ? 'switch to signup'
              : 'switch to login'
            }
          </CustomButton>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder='Your E-Mail Address'
                value={this.state.controls.email.value}
                onChangeText= {(value) => this.updateInputState('email', value)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={
                this.state.viewMode === 'potrait' || this.state.authMode === 'login'
                ? styles.potraitPwdContainer
                : styles.landscapePwContainer
                }>
                <View style={
                  this.state.viewMode === 'potrait' || this.state.authMode === 'login'
                  ? styles.potraitPwdWrapper
                  : styles.landscapePwWrapper
                }>
                <DefaultInput
                  placeholder='Password'
                  value={this.state.controls.password.value}
                  onChangeText= {(value) => this.updateInputState('password', value)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry={true}

                  />
                </View>
                {
                  this.state.authMode === 'login' ? null
                  : <View style={
                    this.state.viewMode === 'potrait'
                      ? styles.potraitPwdWrapper
                      : styles.landscapePwWrapper
                    }>
                    <DefaultInput
                      placeholder='Confirm Password'
                      value={this.state.controls.confirmPwd.value}
                      onChangeText= {(value) => this.updateInputState('confirmPwd', value)}
                      valid={this.state.controls.confirmPwd.valid}
                      touched={this.state.controls.confirmPwd.touched}
                      secureTextEntry={true}
                    />
                  </View>
                }
              </View>
            </View>
            </TouchableWithoutFeedback>
            <CustomButton
              type="submit"
              color='#29aaf4'
              onPress={this.login}
              disabled={
                !this.state.controls.confirmPwd.valid && this.state.authMode === 'signup' ||
                !this.state.controls.password.valid ||
                !this.state.controls.email.valid
              }
            >{this.state.authMode}</CustomButton>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapStateToDispatch = dispatch =>  {
  return {
    onLogin: (authData) => dispatch(tryAuth(authData))
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '100%',
    marginLeft: '20%',
  },
  headerText: {
    marginBottom: 30
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

export default connect(null, mapStateToDispatch)(AuthScreen);
