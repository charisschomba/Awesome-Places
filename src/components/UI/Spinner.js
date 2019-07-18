import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner= props => (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
    </View> 
);

export default Spinner;