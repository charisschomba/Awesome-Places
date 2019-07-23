import React, { Component } from 'react'
import { Text, Animated } from 'react-native';

class TextFadeIn extends Component {
    state = {
        fadeAnim: Animated.Value(0)
    }

    componentDidMount(){
      this.animateText()
    };

    componentDidUpdate(){
      this.animateText() 
    };

    animateText = () => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }).start();
    };

  render() {
    return (
      <Animated.View style={this.props.style.view}>
        <Text style={[
            this.props.style.text, 
            {opacity: this.state.fadeAnim}
            ]}>{this.props.children}</Text>
      </Animated.View>
    )
  }
}

export default TextFadeIn